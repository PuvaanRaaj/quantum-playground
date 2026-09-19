import test from "node:test";
import assert from "node:assert/strict";
import { evaluate, validateModel } from "../lib/expression.ts";
test("Arithmetic AST supports scientific formulas with no arbitrary execution", () => {
  assert.equal(
    evaluate(["+", ["pow", "a", 2], ["pow", "b", 2]], { a: 3, b: 4 }),
    25,
  );
  assert.ok(
    Math.abs(
      evaluate(["/", 1, ["sqrt", ["-", 1, ["pow", "beta", 2]]]], {
        beta: 0.6,
      }) - 1.25,
    ) < 1e-12,
  );
  assert.equal(evaluate(["factorial", 5], {}), 120);
  for (const expr of [
    ["eval", "x"],
    ["/", 1, 0],
    ["sqrt", -1],
    ["log", 0],
    ["factorial", 0.5],
    ["sin", 1, 2],
    ["pow", 2],
    ["+", 1],
  ] as any[])
    assert.throws(() => evaluate(expr, {}));
  assert.throws(() => evaluate("constructor", {}));
});
test("Model validation checks corner combinations and rejects undefined output domains", () => {
  const model = {
    title: "Area",
    description: "Rectangle area",
    inputs: [
      {
        key: "a",
        label: "Width",
        unit: "m",
        min: 1,
        max: 10,
        step: 1,
        initial: 3,
      },
    ],
    outputs: [
      { label: "Area", unit: "m²", expression: ["pow", "a", 2] as any },
    ],
    assumptions: "Square with positive side length.",
  };
  assert.doesNotThrow(() => validateModel(model));
  assert.throws(() =>
    validateModel({
      ...model,
      outputs: [
        { label: "Broken", unit: "", expression: ["/", 1, ["-", "a", 1]] },
      ],
    }),
  );
});
