import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { segmentMath } from "../lib/math-text.ts";

const relativity = JSON.parse(
  readFileSync(
    new URL("../content/lessons/special-relativity.json", import.meta.url),
    "utf8",
  ),
);

test("Special relativity pulls the light-clock equations into blocks", () => {
  const paragraph = relativity.sections[2].paragraphs[0];
  const segments = segmentMath(paragraph);
  const blocks = segments
    .filter((segment) => segment.kind === "block")
    .map((segment) => segment.value);
  assert.ok(blocks.some((value) => value.includes("(ct)² = L² + (vt)²")));
  assert.ok(blocks.some((value) => value.includes("√(c² − v²)")));
  assert.ok(blocks.some((value) => value.includes("γ = 1 / √(1 − v²/c²)")));
  assert.equal(
    segments.map((segment) => segment.value).join(""),
    paragraph,
  );
});

test("Worked examples keep the calculation readable without dropping words", () => {
  const segments = segmentMath(relativity.equation.example);
  assert.ok(
    segments.some(
      (segment) =>
        segment.kind !== "text" && segment.value.includes("1/√0.64"),
    ),
  );
  assert.equal(
    segments.map((segment) => segment.value).join(""),
    relativity.equation.example,
  );
});

test("Conditional probabilities stay one equation", () => {
  const text =
    "With a 2% crack rate, 90% detection, and 5% false alerts, P(crack | alert) = 0.018/0.067 ≈ 26.9%.";
  const segments = segmentMath(text);
  assert.ok(
    segments.some(
      (segment) =>
        segment.kind === "block" &&
        segment.value.includes("P(crack | alert)") &&
        segment.value.includes("0.018/0.067"),
    ),
  );
  assert.equal(segments.map((segment) => segment.value).join(""), text);
});

test("Ordinary sentences stay prose", () => {
  const text = "Observers moving uniformly still agree about the laws of physics.";
  assert.deepEqual(segmentMath(text), [{ kind: "text", value: text }]);
});

test("Every published lesson keeps its full text after equation segmentation", () => {
  const directory = new URL("../content/lessons/", import.meta.url);
  for (const file of readdirSync(directory)) {
    if (!file.endsWith(".json")) continue;
    const topic = JSON.parse(
      readFileSync(new URL(file, directory), "utf8"),
    ) as {
      sections: { paragraphs: string[] }[];
      equation: { explanation: string; example: string };
      intro: string;
    };
    const texts = [
      topic.intro,
      topic.equation.explanation,
      topic.equation.example,
      ...topic.sections.flatMap((section) => section.paragraphs),
    ];
    for (const text of texts) {
      const segments = segmentMath(text);
      assert.equal(
        segments.map((segment) => segment.value).join(""),
        text,
        file,
      );
    }
  }
});
