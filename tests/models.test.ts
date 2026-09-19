import test from "node:test";
import assert from "node:assert/strict";
import {
  lorentz,
  gravitationalClock,
  schwarzschildKm,
  bellCorrelation,
  gaussianUncertainty,
  bayes,
  midpointSquareArea,
} from "../lib/models.ts";
import { topics } from "../content/index.ts";
import { validateModel } from "../lib/expression.ts";
import { validateLesson } from "../lib/lesson-validation.ts";

test("Relativistic clock models reproduce known cases and reject invalid observers", () => {
  assert.equal(lorentz(0), 1);
  assert.equal(lorentz(0.6), 1.25);
  assert.ok(Math.abs(lorentz(0.8) - 5 / 3) < 1e-12);
  assert.throws(() => lorentz(1));
  assert.throws(() => lorentz(-0.5));
  assert.equal(gravitationalClock(4 / 3), 0.5);
  assert.throws(() => gravitationalClock(1));
  assert.ok(Math.abs(schwarzschildKm(10) - 29.5325008) < 1e-8);
});
test("Quantum examples preserve Gaussian uncertainty and singlet correlations", () => {
  for (const width of [0.25, 0.5, 1, 2, 3]) {
    const s = gaussianUncertainty(width);
    assert.equal(s.sigmaX * s.sigmaP, 0.5);
  }
  assert.equal(bellCorrelation(0), -1);
  assert.equal(bellCorrelation(180), 1);
  assert.ok(Math.abs(bellCorrelation(90)) < 1e-12);
});
test("Bayes normalization and calculus convergence match analytic examples", () => {
  assert.ok(Math.abs(bayes(0.1, 0.9, 0.05)! - 2 / 3) < 1e-12);
  assert.equal(bayes(0, 0.9, 0.05), 0);
  assert.equal(bayes(1, 0.9, 0.05), 1);
  assert.equal(bayes(0, 0.9, 0), null);
  const error = (n: number) => 1 / 3 - midpointSquareArea(n);
  assert.ok(Math.abs(error(1) - 1 / 12) < 1e-12);
  assert.ok(error(40) > 0 && error(40) < error(4));
});
test("Every published lesson has substantial theory, vocabulary, a valid quiz, and references", () => {
  assert.ok(topics.length >= 12 && topics.length <= 100);
  assert.equal(new Set(topics.map((t) => t.slug)).size, topics.length);
  for (const t of topics) {
    validateLesson(t);
    if (t.visual === "calculator") {
      assert.ok(t.model);
      validateModel(t.model);
    }
    const words = t.sections
      .flatMap((s) => s.paragraphs)
      .join(" ")
      .split(/\s+/).length;
    assert.ok(words >= 650, `${t.slug} has only ${words} narrative words`);
    assert.ok(t.terms.length >= 4, `${t.slug} needs vocabulary`);
    assert.ok(t.sources.length >= 2);
    assert.ok(t.sources.every((s) => s.url.startsWith("https://")));
    assert.ok(t.check.answer >= 0 && t.check.answer < t.check.options.length);
    assert.ok(t.equation.symbols.length >= 2);
    assert.ok(t.misconceptions.length >= 2);
  }
});
