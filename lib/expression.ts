import type { Expression, Exploration } from "../content/types.ts";
export function evaluate(
  expr: Expression,
  values: Record<string, number>,
  depth = 0,
): number {
  if (depth > 30) throw Error("Expression nesting too deep.");
  if (typeof expr === "number") {
    if (!Number.isFinite(expr)) throw Error("Nonfinite constant.");
    return expr;
  }
  if (typeof expr === "string") {
    if (!Object.hasOwn(values, expr) || !Number.isFinite(values[expr]))
      throw Error(`Unknown input ${expr}`);
    return values[expr];
  }
  if (!Array.isArray(expr) || expr.length < 2)
    throw Error("Invalid expression.");
  const [op, ...args] = expr;
  const a = args.map((x) => evaluate(x, values, depth + 1));
  const unary = ["sqrt", "exp", "log", "sin", "cos", "abs", "factorial"];
  const binary = ["-", "/", "pow"];
  if (
    (unary.includes(op) && a.length !== 1) ||
    (binary.includes(op) && a.length !== 2) ||
    (["+", "*", "min", "max"].includes(op) && a.length < 2)
  )
    throw Error("Invalid operand count.");
  let result: number;
  switch (op) {
    case "+":
      result = a.reduce((s, x) => s + x, 0);
      break;
    case "-":
      result = a[0] - a[1];
      break;
    case "*":
      result = a.reduce((s, x) => s * x, 1);
      break;
    case "/":
      result = a[0] / a[1];
      break;
    case "pow":
      result = Math.pow(a[0], a[1]);
      break;
    case "sqrt":
      result = Math.sqrt(a[0]);
      break;
    case "exp":
      result = Math.exp(a[0]);
      break;
    case "log":
      result = Math.log(a[0]);
      break;
    case "sin":
      result = Math.sin(a[0]);
      break;
    case "cos":
      result = Math.cos(a[0]);
      break;
    case "abs":
      result = Math.abs(a[0]);
      break;
    case "min":
      result = Math.min(...a);
      break;
    case "max":
      result = Math.max(...a);
      break;
    case "factorial": {
      if (!Number.isInteger(a[0]) || a[0] < 0 || a[0] > 170)
        throw Error("Factorial domain.");
      result = 1;
      for (let n = 2; n <= a[0]; n++) result *= n;
      break;
    }
    default:
      throw Error(`Unsupported operation ${op}`);
  }
  if (!Number.isFinite(result)) throw Error("Result outside the model domain.");
  return result;
}
export function validateModel(model: Exploration) {
  if (
    !model ||
    !model.title ||
    !model.description ||
    !model.assumptions ||
    !Array.isArray(model.inputs) ||
    model.inputs.length < 1 ||
    model.inputs.length > 3 ||
    !Array.isArray(model.outputs) ||
    model.outputs.length < 1 ||
    model.outputs.length > 3
  )
    throw Error("Incomplete model.");
  const keys = new Set<string>();
  for (const p of model.inputs) {
    if (
      !/^[a-zA-Z][a-zA-Z0-9_]*$/.test(p.key) ||
      keys.has(p.key) ||
      ![p.min, p.max, p.step, p.initial].every(Number.isFinite) ||
      p.min >= p.max ||
      p.step <= 0 ||
      p.initial < p.min ||
      p.initial > p.max ||
      !p.label
    )
      throw Error("Invalid model input.");
    keys.add(p.key);
  }
  // Evaluate combinations of endpoints and the initial state, then sweep each input.
  const initial = Object.fromEntries(
    model.inputs.map((p) => [p.key, p.initial]),
  );
  function check(values: Record<string, number>) {
    for (const output of model.outputs) {
      if (!output.label) throw Error("Missing output label.");
      evaluate(output.expression, values);
    }
  }
  function corners(i: number, values: Record<string, number>) {
    if (i === model.inputs.length) {
      check(values);
      return;
    }
    const p = model.inputs[i];
    for (const v of [p.min, p.initial, p.max])
      corners(i + 1, { ...values, [p.key]: v });
  }
  corners(0, initial);
  for (const p of model.inputs) {
    const steps = Math.floor((p.max - p.min) / p.step);
    for (let i = 0; i <= Math.min(steps, 100); i++) {
      const tick = steps <= 100 ? i : Math.round((i * steps) / 100);
      check({ ...initial, [p.key]: p.min + tick * p.step });
    }
  }
}
