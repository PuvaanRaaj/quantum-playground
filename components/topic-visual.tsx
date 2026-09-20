"use client";
import { useState } from "react";
import type { Topic } from "../content/types";
import {
  lorentz,
  gravitationalClock,
  schwarzschildKm,
  bellCorrelation,
  gaussianUncertainty,
  bayes,
  midpointSquareArea,
} from "../lib/models";
import InterferenceLab from "./interference-lab";
import CalculatorModel from "./calculator-model";
import LessonScene, { RelativityScene } from "./animated-scenes";
function Slider({
  label,
  value,
  min,
  max,
  step = 1,
  unit = "",
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  onChange: (v: number) => void;
}) {
  return (
    <label className="model-slider">
      <span>
        {label}
        <output>
          {Number(value.toFixed(3))}
          {unit}
        </output>
      </span>
      <input
        aria-label={label}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
      <span className="slider-extents">
        <span>
          {min}
          {unit}
        </span>
        <span>
          {max}
          {unit}
        </span>
      </span>
    </label>
  );
}
function Plot({
  fn,
  min = 0,
  max = 1,
  yMax = 1,
  label,
  xLabel = "x",
  yLabel = "value",
  color = "var(--accent)",
  marker,
}: {
  fn: (x: number) => number;
  min?: number;
  max?: number;
  yMax?: number;
  label: string;
  xLabel?: string;
  yLabel?: string;
  color?: string;
  marker?: number;
}) {
  const pts = Array.from({ length: 161 }, (_, i) => {
    const x = min + ((max - min) * i) / 160;
    return `${45 + (510 * i) / 160},${220 - (180 * fn(x)) / yMax}`;
  }).join(" ");
  return (
    <svg
      viewBox="0 0 600 285"
      role="img"
      aria-label={label}
      className="model-svg"
    >
      <text x="45" y="17">
        {yLabel}
      </text>
      <text x="300" y="278" textAnchor="middle">
        {xLabel}
      </text>
      <path d="M45 25V220H555M45 130H555M45 40H555" className="plot-grid" />
      <polyline points={pts} fill="none" stroke={color} strokeWidth="3" />
      {marker !== undefined && (
        <circle
          cx={45 + (510 * (marker - min)) / (max - min)}
          cy={220 - (180 * fn(marker)) / yMax}
          r="6"
          fill={color}
        />
      )}
      <text x="45" y="249">
        {min}
      </text>
      <text x="535" y="249">
        {max}
      </text>
      <text x="9" y="44">
        {yMax}
      </text>
      <text x="19" y="220">
        0
      </text>
    </svg>
  );
}
function Metric({ value, label }: { value: string; label: string }) {
  return (
    <div className="model-metric">
      <strong>{value}</strong>
      <span>{label}</span>
    </div>
  );
}
export default function TopicVisual({ topic }: { topic: Topic }) {
  const [x, setX] = useState(
    topic.visual === "relativity"
      ? 0.6
      : topic.visual === "gravity"
        ? 3
        : topic.visual === "blackhole"
          ? 10
          : topic.visual === "expansion"
            ? 1
            : topic.visual === "uncertainty"
              ? 1
              : topic.visual === "entanglement"
                ? 60
                : topic.visual === "schrodinger"
                  ? 1
                  : topic.visual === "pythagoras"
                    ? 3
                    : topic.visual === "calculus"
                      ? 4
                      : topic.visual === "euler"
                        ? 45
                        : 10,
  );
  const [y, setY] = useState(topic.visual === "pythagoras" ? 4 : 5);
  if (topic.visual === "calculator" && topic.model)
    return <CalculatorModel model={topic.model} />;
  if (topic.visual === "interference")
    return (
      <div className="legacy-lab">
        <InterferenceLab />
      </div>
    );
  let controls: React.ReactNode,
    diagram: React.ReactNode,
    metrics: React.ReactNode,
    caption = "",
    tryThis = "";
  switch (topic.visual) {
    case "relativity": {
      const gamma = lorentz(x);
      const mirrorGap = Math.min(180, 210 / Math.max(x * gamma, 1));
      const displacement = x * gamma * mirrorGap;
      controls = (
        <Slider
          label="Relative speed"
          value={x}
          min={0}
          max={0.99}
          step={0.01}
          unit=" c"
          onChange={setX}
        />
      );
      diagram = (
        <div className="relativity-model-stack">
          <RelativityScene speed={x} compact />
          <svg
            viewBox="0 0 600 200"
            className="model-svg"
            role="img"
            aria-label="Light-clock right triangle: the diagonal light path grows with relative speed"
          >
            <path
              d={`M70 170H540M70 ${170 - mirrorGap * 0.75}H540`}
              className="mirror"
            />
            <path
              d={`M90 170L${90 + displacement * 0.75} ${170 - mirrorGap * 0.75}L${90 + 2 * displacement * 0.75} 170`}
              fill="none"
              stroke="var(--accent)"
              strokeWidth="3"
            />
            <path
              d={`M90 170V${170 - mirrorGap * 0.75}H${90 + displacement * 0.75}`}
              className="plot-grid"
              strokeDasharray="5 5"
            />
            <circle cx="90" cy="170" r="6" fill="var(--accent)" />
            <text x="85" y={155 - mirrorGap * 0.75}>
              upper mirror
            </text>
            <text x="115" y="192">
              lower mirror
            </text>
            <text x="280" y="28">
              longer path, same light speed
            </text>
          </svg>
        </div>
      );
      metrics = (
        <>
          <Metric value={`${gamma.toFixed(3)}×`} label="Lorentz factor γ" />
          <Metric
            value={`${(10 / gamma).toFixed(2)} years`}
            label="moving clock during 10 frame-years"
          />
        </>
      );
      caption =
        "Ideal inertial clocks in special relativity. The triangle has horizontal/vertical ratio βγ; a common display zoom adapts at high speeds, so changing pixel mirror spacing is not physical contraction. The comparison uses one chosen inertial frame and does not model a twin’s turnaround.";
      tryThis =
        "Compare 0.60c and 0.80c. Why does the moving clock accumulate less time in the chosen frame?";
      break;
    }
    case "gravity": {
      const rate = gravitationalClock(x);
      controls = (
        <Slider
          label="Clock radius / horizon radius"
          value={x}
          min={1.05}
          max={20}
          step={0.05}
          onChange={setX}
        />
      );
      diagram = (
        <div className="relativity-model-stack">
          <LessonScene topic={topic} compact />
          <Plot
            min={1.05}
            max={20}
            fn={gravitationalClock}
            marker={x}
            xLabel="radius r / rₛ"
            yLabel="clock rate dτ / dt"
            label="Static clock rate increases with distance from a Schwarzschild mass"
          />
        </div>
      );
      metrics = (
        <>
          <Metric
            value={`${rate.toFixed(3)} s`}
            label="local clock time per second at infinity"
          />
          <Metric
            value={`${x.toFixed(2)} rₛ`}
            label="distance from the centre"
          />
        </>
      );
      caption =
        "Exact Schwarzschild clock-rate relation outside a spherical, nonrotating mass, for stationary clocks relative to a clock infinitely far away. It is one solution of general relativity, not a general spacetime solver. Hovering near the horizon requires extreme acceleration.";
      tryThis =
        "Move the clock farther away. What value does its rate approach? The slider never places a stationary clock on or inside the horizon.";
      break;
    }
    case "blackhole": {
      const radius = schwarzschildKm(x);
      controls = (
        <Slider
          label="Mass"
          value={x}
          min={1}
          max={50}
          unit=" Suns"
          onChange={setX}
        />
      );
      diagram = (
        <div className="relativity-model-stack">
          <LessonScene topic={topic} compact />
          <svg
            viewBox="0 0 600 220"
            className="model-svg"
            role="img"
            aria-label={`A Schwarzschild black hole of ${x} solar masses has horizon radius ${radius.toFixed(1)} kilometres`}
          >
            <circle cx="300" cy="110" r={8 + x * 2} className="horizon-halo" />
            <circle cx="300" cy="110" r={x * 2} fill="var(--ink)" />
            <path
              d={`M300 110H${300 + x * 2}`}
              stroke="var(--accent)"
              strokeWidth="3"
            />
            <text x="300" y="205" textAnchor="middle">
              event horizon — a boundary in spacetime
            </text>
          </svg>
        </div>
      );
      metrics = (
        <>
          <Metric
            value={`${radius.toFixed(2)} km`}
            label="event-horizon radius rₛ"
          />
          <Metric
            value={`${(radius * 2).toFixed(2)} km`}
            label="event-horizon diameter"
          />
        </>
      );
      caption =
        "Schwarzschild radius for an uncharged, nonrotating black hole. The circle is a size illustration, not a rendered photograph, accretion disc, or simulation of gravitational lensing.";
      tryThis =
        "Double the mass. Does the horizon’s radius double or quadruple?";
      break;
    }
    case "expansion": {
      controls = (
        <Slider
          label="Scale factor a"
          value={x}
          min={0.5}
          max={2}
          step={0.05}
          onChange={setX}
        />
      );
      diagram = (
        <div className="relativity-model-stack">
          <LessonScene topic={topic} compact />
          <svg
            viewBox="0 0 600 220"
            className="model-svg"
            role="img"
            aria-label="Comoving galaxy separations grow with a uniform scale factor"
          >
            {Array.from({ length: 25 }, (_, i) => {
              const col = (i % 5) - 2,
                row = Math.floor(i / 5) - 2;
              return (
                <circle
                  key={i}
                  cx={300 + col * 50 * x}
                  cy={100 + row * 24 * x}
                  r={i === 12 ? 7 : 4}
                  fill={i === 12 ? "var(--accent)" : "var(--text-secondary)"}
                />
              );
            })}
            <path
              d={`M300 100H${300 + 100 * x}`}
              stroke="var(--accent)"
              strokeWidth="2"
            />
            <text x="300" y="205" textAnchor="middle">
              chosen observer in a small comoving patch
            </text>
          </svg>
        </div>
      );
      metrics = (
        <>
          <Metric
            value={`${(100 * x).toFixed(0)} Mpc`}
            label="separation for a 100 Mpc comoving pair"
          />
          <Metric
            value={`${x.toFixed(2)}×`}
            label="all illustrated separations"
          />
        </>
      );
      caption =
        "Kinematic illustration of D = aχ for ideal comoving galaxies. The slider is scale factor, not elapsed time; no cosmological parameters or Friedmann evolution are being solved. Bound systems need not expand with the universe.";
      tryThis =
        "Compare a nearby pair with a distant pair as you double a. Which gains more distance?";
      break;
    }
    case "uncertainty": {
      const s = gaussianUncertainty(x);
      controls = (
        <Slider
          label="Position spread σx"
          value={x}
          min={0.25}
          max={3}
          step={0.05}
          onChange={setX}
        />
      );
      diagram = (
        <div className="paired-plots">
          <div>
            <h4>Position distribution</h4>
            <Plot
              min={-6}
              max={6}
              yMax={2}
              fn={(q) =>
                Math.exp((-q * q) / (2 * x * x)) / (x * Math.sqrt(2 * Math.PI))
              }
              xLabel="position x (ℏ = 1 units)"
              yLabel="position probability density"
              label="Normalized Gaussian position probability density"
            />
          </div>
          <div>
            <h4>Momentum distribution</h4>
            <Plot
              min={-6}
              max={6}
              yMax={3}
              fn={(p) =>
                Math.exp((-p * p) / (2 * s.sigmaP * s.sigmaP)) /
                (s.sigmaP * Math.sqrt(2 * Math.PI))
              }
              xLabel="momentum p (ℏ = 1 units)"
              yLabel="momentum probability density"
              label="Normalized Gaussian momentum probability density"
            />
          </div>
        </div>
      );
      metrics = (
        <>
          <Metric value={s.sigmaP.toFixed(3)} label="momentum spread σp" />
          <Metric value="0.500" label="σx σp in units where ℏ = 1" />
        </>
      );
      caption =
        "Minimum-uncertainty Gaussian states in units ℏ = 1. These particular states saturate ΔxΔp ≥ ℏ/2; general quantum states can have a larger product. Curves are probability densities, not particle paths.";
      tryThis =
        "Squeeze position to 0.25. Watch momentum broaden rather than shift to one known value.";
      break;
    }
    case "entanglement": {
      const corr = bellCorrelation(x);
      controls = (
        <Slider
          label="Angle between spin-measurement axes"
          value={x}
          min={0}
          max={180}
          unit="°"
          onChange={setX}
        />
      );
      diagram = (
        <Plot
          min={0}
          max={180}
          fn={(a) => (1 + bellCorrelation(a)) / 2}
          marker={x}
          xLabel="angle between measurement axes (degrees)"
          yLabel="P(equal outcomes)"
          label="Probability of equal spin outcomes for a singlet pair versus measurement-axis angle"
        />
      );
      metrics = (
        <>
          <Metric
            value={`${((100 * (1 + corr)) / 2).toFixed(1)}%`}
            label="probability of equal outcomes"
          />
          <Metric value="50 / 50" label="either observer’s local outcomes" />
        </>
      );
      caption =
        "Two spin-½ particles in the singlet state; correlation E = −cos θ. This is not the cos(2θ) convention for photon polarization. A single correlation curve is not a Bell test; demonstrating a CHSH violation requires four setting pairs and explicit assumptions.";
      tryThis =
        "At 0°, the outcomes are always opposite. At 180°, they are equal. Neither observer can choose their own random result to send a message.";
      break;
    }
    case "schrodinger": {
      controls = (
        <Slider
          label="Energy level n"
          value={x}
          min={1}
          max={5}
          onChange={setX}
        />
      );
      diagram = (
        <Plot
          fn={(q) => 2 * Math.sin(x * Math.PI * q) ** 2}
          yMax={2}
          xLabel="position x / L"
          yLabel="scaled probability density L|ψ|²"
          label={`Position probability density for infinite-well energy eigenstate n=${x}, with L=1`}
        />
      );
      metrics = (
        <>
          <Metric
            value={`${x * x} E₁`}
            label="energy relative to ground state"
          />
          <Metric value={`${x - 1}`} label="interior probability nodes" />
        </>
      );
      caption =
        "One-dimensional infinite square well, 0 < x/L < 1, in a stationary energy eigenstate. The y-axis is L|ψ|². The density integrates to one; its peak may exceed one because density is not a point probability. Infinite walls are an idealization.";
      tryThis =
        "Increase n from 1 to 2. Notice that the energy quadruples and an interior node appears.";
      break;
    }
    case "pythagoras": {
      const c = Math.hypot(x, y);
      controls = (
        <>
          <Slider
            label="Horizontal leg a"
            value={x}
            min={1}
            max={8}
            onChange={setX}
          />
          <Slider
            label="Vertical leg b"
            value={y}
            min={1}
            max={8}
            onChange={setY}
          />
        </>
      );
      diagram = (
        <svg
          viewBox="0 0 600 290"
          className="model-svg"
          role="img"
          aria-label={`Right triangle with legs ${x} and ${y}, hypotenuse ${c.toFixed(3)}`}
        >
          <path
            d={`M100 245H${100 + x * 26}L100 ${245 - y * 26}Z`}
            fill="var(--accent-soft)"
            stroke="var(--accent)"
            strokeWidth="3"
          />
          <path
            d="M100 227H118V245"
            fill="none"
            stroke="var(--text-secondary)"
          />
          <text x={100 + x * 13} y="275">
            a = {x}
          </text>
          <text x="40" y={245 - y * 13}>
            b = {y}
          </text>
          <text x={125 + x * 13} y={235 - y * 13}>
            c = {c.toFixed(2)}
          </text>
        </svg>
      );
      metrics = (
        <>
          <Metric value={`${x * x} + ${y * y}`} label="a² + b²" />
          <Metric value={`${x * x + y * y}`} label="c², exactly" />
        </>
      );
      caption =
        "A Euclidean right triangle. Changing side lengths checks examples; the geometric argument in the lesson proves the general theorem. Both axes use the same geometric scale.";
      tryThis =
        "Set a = 3 and b = 4. Then try 5 and 8: the theorem does not require whole-number hypotenuses.";
      break;
    }
    case "calculus": {
      controls = (
        <Slider
          label="Midpoint rectangles"
          value={x}
          min={1}
          max={40}
          onChange={setX}
        />
      );
      const area = midpointSquareArea(x);
      diagram = (
        <svg
          viewBox="0 0 600 270"
          className="model-svg"
          role="img"
          aria-label={`Midpoint approximation to the area under x squared using ${x} rectangles`}
        >
          <path d="M45 30V220H555" className="plot-grid" />
          {Array.from({ length: x }, (_, i) => {
            const h = 180 * ((i + 0.5) / x) ** 2;
            return (
              <rect
                key={i}
                x={45 + (510 * i) / x}
                y={220 - h}
                width={510 / x}
                height={h}
                fill="var(--accent-soft)"
                stroke="var(--accent)"
                strokeWidth="1"
              />
            );
          })}
          <polyline
            points={Array.from(
              { length: 101 },
              (_, i) => `${45 + 5.1 * i},${220 - 180 * (i / 100) ** 2}`,
            ).join(" ")}
            fill="none"
            stroke="var(--ink)"
            strokeWidth="2"
          />
          <text x="45" y="250">
            0
          </text>
          <text x="548" y="250">
            1
          </text>
        </svg>
      );
      metrics = (
        <>
          <Metric value={area.toFixed(6)} label="midpoint area estimate" />
          <Metric value={(1 / 3).toFixed(6)} label="exact integral 1/3" />
        </>
      );
      caption =
        "Midpoint Riemann sums for f(x) = x² on [0,1]. A finite sum approximates the area; the integral is the limit, whose value follows from the fundamental theorem of calculus.";
      tryThis =
        "Compare 2 and 20 rectangles. The error shrinks, but a picture alone is not a proof of convergence.";
      break;
    }
    case "euler": {
      const theta = (x * Math.PI) / 180;
      controls = (
        <Slider
          label="Rotation angle θ"
          value={x}
          min={0}
          max={360}
          unit="°"
          onChange={setX}
        />
      );
      diagram = (
        <svg
          viewBox="0 0 600 290"
          className="model-svg"
          role="img"
          aria-label="Complex unit circle with real and imaginary components"
        >
          <path d="M145 145H455M300 15V275" className="plot-grid" />
          <circle
            cx="300"
            cy="145"
            r="110"
            fill="none"
            stroke="var(--border)"
            strokeWidth="2"
          />
          <path
            d={`M300 145H${300 + 110 * Math.cos(theta)}V${145 - 110 * Math.sin(theta)}Z`}
            fill="var(--accent-soft)"
            stroke="var(--accent)"
            strokeWidth="2"
          />
          <circle
            cx={300 + 110 * Math.cos(theta)}
            cy={145 - 110 * Math.sin(theta)}
            r="6"
            fill="var(--accent)"
          />
          <text x="458" y="150">
            Re
          </text>
          <text x="305" y="20">
            Im
          </text>
          <text x="174" y="164">
            −1
          </text>
          <text x="416" y="164">
            1
          </text>
        </svg>
      );
      metrics = (
        <>
          <Metric
            value={Math.cos(theta).toFixed(3)}
            label="real component cos θ"
          />
          <Metric
            value={Math.sin(theta).toFixed(3)}
            label="imaginary component sin θ"
          />
        </>
      );
      caption =
        "eⁱθ on the complex unit circle, with θ converted from degrees to radians. At 180° (π radians), eⁱπ = −1. This visualizes the identity; the lesson’s series argument supplies the mathematical justification.";
      tryThis =
        "Set θ to 180°. Where did the imaginary component go, and why does adding 1 give zero?";
      break;
    }
    case "bayes": {
      const prior = x / 100,
        falsePositive = y / 100,
        sensitivity = 0.9;
      const posterior = bayes(prior, sensitivity, falsePositive)!;
      controls = (
        <>
          <Slider
            label="Prior defect rate"
            value={x}
            min={1}
            max={50}
            unit="%"
            onChange={setX}
          />
          <Slider
            label="False alarm rate"
            value={y}
            min={1}
            max={30}
            unit="%"
            onChange={setY}
          />
        </>
      );
      const trueAlerts = 1000 * prior * sensitivity,
        falseAlerts = 1000 * (1 - prior) * falsePositive;
      diagram = (
        <div className="bayes-bars">
          <p>Expected alerts in 1,000 manufactured parts</p>
          <div>
            <span style={{ width: `${posterior * 100}%` }}>True</span>
            <span style={{ width: `${(1 - posterior) * 100}%` }}>False</span>
          </div>
          <p>
            {trueAlerts.toFixed(1)} true alerts + {falseAlerts.toFixed(1)} false
            alerts
          </p>
        </div>
      );
      metrics = (
        <>
          <Metric
            value={`${(posterior * 100).toFixed(1)}%`}
            label="defective given an alert"
          />
          <Metric
            value="90%"
            label="fixed sensitivity: alert given defective"
          />
        </>
      );
      caption =
        "Fictional manufacturing sensor with fixed 90% sensitivity. Fractional counts are expectations, not sampled parts. Prior, sensitivity, and false-positive rate are assumed known; no independence between defect and alert is assumed.";
      tryThis =
        "Keep false alarms at 5% and lower the defect rate to 1%. Why do many alerts now come from good parts?";
      break;
    }
  }
  return (
    <div className="topic-model">
      <div className="model-toolbar">
        <span className="label-caps">INTERACTIVE EXPLORATION</span>
        <span>Change a value. Watch the consequence.</span>
      </div>
      <div className="model-body">
        <div className="model-picture">
          {diagram}
          <div className="model-metrics">{metrics}</div>
        </div>
        <div className="model-controls">
          {controls}
          <div className="try-this">
            <strong>Try this</strong>
            <p>{tryThis}</p>
          </div>
        </div>
      </div>
      <p className="model-caption">
        <strong>What this model represents.</strong> {caption}
      </p>
    </div>
  );
}
