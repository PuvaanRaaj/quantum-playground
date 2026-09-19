"use client";
import { useMemo, useState } from "react";
import type { Exploration } from "../content/types";
import { evaluate } from "../lib/expression";
const format = (n: number) =>
  n === 0
    ? "0"
    : Math.abs(n) >= 1e6 || Math.abs(n) < 0.001
      ? n.toExponential(3)
      : Number(n.toPrecision(6)).toString();
export default function CalculatorModel({ model }: { model: Exploration }) {
  const [values, setValues] = useState<Record<string, number>>(() =>
    Object.fromEntries(model.inputs.map((p) => [p.key, p.initial])),
  );
  const outputs = model.outputs.map((o) => ({
    ...o,
    value: evaluate(o.expression, values),
  }));
  const variable = model.inputs[0];
  const points = useMemo(
    () =>
      Array.from({ length: 81 }, (_, i) => {
        const steps = Math.floor((variable.max - variable.min) / variable.step);
        const tick = Math.round((steps * i) / 80);
        const x = Math.min(variable.max, variable.min + tick * variable.step);
        return {
          x,
          y: evaluate(model.outputs[0].expression, {
            ...values,
            [variable.key]: x,
          }),
        };
      }),
    [model, values, variable],
  );
  let yMin = Math.min(0, ...points.map((p) => p.y)),
    yMax = Math.max(0, ...points.map((p) => p.y));
  if (yMax === yMin) {
    const margin = Math.abs(yMax) * 0.1 || 1;
    yMin -= margin;
    yMax += margin;
  }
  const sx = (x: number) =>
    65 + (470 * (x - variable.min)) / (variable.max - variable.min);
  const sy = (y: number) => 205 - (165 * (y - yMin)) / (yMax - yMin);
  return (
    <div className="topic-model calculator-model">
      <div className="model-toolbar">
        <strong>{model.title}</strong>
        <span>{model.description}</span>
      </div>
      <div className="model-body">
        <div className="model-picture">
          <svg
            viewBox="0 0 600 285"
            className="model-svg"
            role="img"
            aria-label={`${model.outputs[0].label} as ${variable.label} changes; other inputs held fixed`}
          >
            <text x="65" y="20">
              {model.outputs[0].label}
              {model.outputs[0].unit ? ` (${model.outputs[0].unit})` : ""}
            </text>
            <path d="M65 35V205H535" className="plot-grid" />
            <polyline
              points={points.map((p) => `${sx(p.x)},${sy(p.y)}`).join(" ")}
              fill="none"
              stroke="var(--accent)"
              strokeWidth="2.5"
            />
            <circle
              cx={sx(values[variable.key])}
              cy={sy(outputs[0].value)}
              r="5"
              fill="var(--accent)"
            />
            <text x="58" y="45" textAnchor="end">
              {format(yMax)}
            </text>
            <text x="58" y="205" textAnchor="end">
              {format(yMin)}
            </text>
            <text x="65" y="233">
              {format(variable.min)}
            </text>
            <text x="535" y="233" textAnchor="end">
              {format(variable.max)}
            </text>
            <text x="300" y="265" textAnchor="middle">
              {variable.label}
              {variable.unit ? ` (${variable.unit})` : ""}
            </text>
          </svg>
          <div className="model-metrics">
            {outputs.map((o) => (
              <div className="model-metric" key={o.label}>
                <strong>
                  {format(o.value)} {o.unit}
                </strong>
                <span>{o.label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="model-controls">
          {model.inputs.map((p) => (
            <label className="model-slider" key={p.key}>
              <span>
                {p.label}
                <output>
                  {format(values[p.key])} {p.unit}
                </output>
              </span>
              <input
                aria-label={p.label}
                type="range"
                min={p.min}
                max={p.max}
                step={p.step}
                value={values[p.key]}
                onChange={(e) =>
                  setValues((v) => ({ ...v, [p.key]: Number(e.target.value) }))
                }
              />
              <span className="slider-extents">
                <span>{format(p.min)}</span>
                <span>{format(p.max)}</span>
              </span>
            </label>
          ))}
          <button
            className="model-reset"
            onClick={() =>
              setValues(
                Object.fromEntries(model.inputs.map((p) => [p.key, p.initial])),
              )
            }
          >
            Reset values
          </button>
        </div>
      </div>
      <p className="model-caption">
        <strong>Assumptions and limits.</strong> {model.assumptions} The curve
        samples the first output as the first input changes, with the other
        inputs fixed. Connecting lines are a visual guide, including when inputs
        are discrete.
      </p>
    </div>
  );
}
