import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { simulate, sample, validateExperiment } from "../lib/physics.ts";

test("Rust/WASM agrees with reference and normalized probabilities over the parameter space", async () => {
  const module = await WebAssembly.compile(
    readFileSync(new URL("../public/quantum_core.wasm", import.meta.url)),
  );
  const instance = await WebAssembly.instantiate(module);
  const p = instance.exports.probability_zero as (
    p: number,
    v: number,
    r: number,
  ) => number;
  for (let phase = 0; phase <= 360; phase += 3)
    for (const visibility of [0, 0.25, 0.5, 0.75, 1])
      for (const recombine of [false, true]) {
        const result = simulate({ phase, visibility, recombine });
        assert.ok(
          Math.abs(
            p((phase * Math.PI) / 180, visibility, Number(recombine)) -
              result.p0,
          ) < 1e-12,
        );
        assert.equal(result.p0 + result.p1, 1);
        assert.ok(result.p0 >= 0 && result.p0 <= 1);
      }
});
test("Known interference, dephasing, and no-recombination outcomes", () => {
  assert.equal(simulate({ phase: 0, visibility: 1, recombine: true }).p0, 1);
  assert.equal(simulate({ phase: 180, visibility: 1, recombine: true }).p0, 0);
  assert.equal(
    simulate({ phase: 0, visibility: 0.5, recombine: true }).p0,
    0.75,
  );
  assert.equal(
    simulate({ phase: 180, visibility: 0, recombine: true }).p0,
    0.5,
  );
  assert.equal(simulate({ phase: 0, visibility: 1, recombine: false }).p0, 0.5);
});
test("Reject invalid model inputs and sample actual Bernoulli outcomes", () => {
  for (const phase of [-1, 361, NaN, Infinity])
    assert.throws(() =>
      validateExperiment({ phase, visibility: 1, recombine: true }),
    );
  assert.throws(() =>
    validateExperiment({ phase: 0, visibility: 2, recombine: true }),
  );
  assert.throws(() =>
    validateExperiment({ phase: 0, visibility: 1, recombine: "yes" }),
  );
  assert.deepEqual(sample(1, 100), { zero: 100, one: 0, shots: 100 });
  assert.deepEqual(sample(0, 100), { zero: 0, one: 100, shots: 100 });
  let i = 0;
  assert.equal(sample(0.5, 100, () => (i++ % 2 ? 0.75 : 0.25)).zero, 50);
});
