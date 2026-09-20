"use client";
import type { ReactNode } from "react";
import type { Topic } from "../content/types";

type SceneProps = {
  topic: Pick<Topic, "visual" | "accent" | "title" | "category">;
  speed?: number;
  compact?: boolean;
};

function Stage({
  children,
  label,
  compact,
  className = "",
}: {
  children: ReactNode;
  label: string;
  compact?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`lesson-scene accent-${className || "blue"} ${compact ? "is-compact" : ""}`}
      role="img"
      aria-label={label}
    >
      <div className="scene-sky" aria-hidden="true" />
      {children}
    </div>
  );
}

function RelativityScene({ speed = 0.6, compact }: { speed?: number; compact?: boolean }) {
  const beta = Math.min(0.99, Math.max(0, speed));
  const gamma = 1 / Math.sqrt(1 - beta * beta);
  const duration = `${Math.max(0.55, 2.4 / Math.max(gamma, 0.8))}s`;
  return (
    <Stage
      compact={compact}
      className="blue"
      label={`A rocket with a light clock flies past Earth and the Sun at ${beta.toFixed(2)} c`}
    >
      <div className="scene-stars" aria-hidden="true" />
      <div className="scene-sun" aria-hidden="true">
        <span className="sun-core" />
        <span className="sun-glow" />
      </div>
      <div className="scene-earth-orbit" aria-hidden="true">
        <div className="scene-earth">
          <span className="earth-land" />
        </div>
      </div>
      <div
        className="scene-rocket"
        style={{ ["--fly-duration" as string]: `${Math.max(4, 14 - beta * 10)}s` }}
        aria-hidden="true"
      >
        <div className="rocket-body">
          <span className="rocket-window" />
          <span className="rocket-fin left" />
          <span className="rocket-fin right" />
          <span className="rocket-flame" />
        </div>
        <div
          className="light-clock"
          style={{ ["--tick-duration" as string]: duration }}
        >
          <span className="clock-mirror top" />
          <span className="clock-mirror bottom" />
          <span className="clock-photon" />
          <span className="clock-label">γ ≈ {gamma.toFixed(2)}</span>
        </div>
      </div>
      <p className="scene-caption">
        Earth and the Sun stay in one frame; the rocket carries a bouncing light
        clock that ticks more slowly as speed rises.
      </p>
    </Stage>
  );
}

function GravityScene({ compact }: { compact?: boolean }) {
  return (
    <Stage
      compact={compact}
      className="blue"
      label="Earth orbits the Sun while a nearby clock runs slower than a distant one"
    >
      <div className="scene-stars" aria-hidden="true" />
      <div className="gravity-star" aria-hidden="true">
        <span className="sun-core" />
        <span className="sun-glow" />
      </div>
      <div className="gravity-orbit" aria-hidden="true">
        <div className="gravity-planet">
          <span className="clock-badge near">near</span>
        </div>
      </div>
      <div className="gravity-far-clock" aria-hidden="true">
        <span className="clock-badge far">far</span>
      </div>
      <p className="scene-caption">
        A clock deeper in a gravity well ticks more slowly than a distant twin.
      </p>
    </Stage>
  );
}

function BlackHoleScene({ compact }: { compact?: boolean }) {
  return (
    <Stage
      compact={compact}
      className="blue"
      label="A black-hole horizon with a glowing accretion disk"
    >
      <div className="scene-stars" aria-hidden="true" />
      <div className="bh-disk" aria-hidden="true" />
      <div className="bh-horizon" aria-hidden="true" />
      <div className="bh-photon" aria-hidden="true" />
      <p className="scene-caption">
        The dark circle is a causal boundary; the ring is a simplified accretion
        disk, not a photograph.
      </p>
    </Stage>
  );
}

function ExpansionScene({ compact }: { compact?: boolean }) {
  return (
    <Stage
      compact={compact}
      className="blue"
      label="Galaxies drift apart as space expands"
    >
      <div className="expand-field" aria-hidden="true">
        {Array.from({ length: 12 }, (_, i) => (
          <span key={i} className={`expand-galaxy g-${i}`} />
        ))}
      </div>
      <p className="scene-caption">
        Galaxies stay put in comoving labels while the gaps between them grow.
      </p>
    </Stage>
  );
}

function QuantumScene({ compact }: { compact?: boolean }) {
  return (
    <Stage
      compact={compact}
      className="violet"
      label="Two quantum paths interfere at a detector"
    >
      <div className="qm-stage" aria-hidden="true">
        <span className="qm-source" />
        <span className="qm-path a" />
        <span className="qm-path b" />
        <span className="qm-screen" />
        <span className="qm-fringe" />
      </div>
      <p className="scene-caption">
        Amplitudes from two paths meet and interfere before a detection.
      </p>
    </Stage>
  );
}

function UncertaintyScene({ compact }: { compact?: boolean }) {
  return (
    <Stage
      compact={compact}
      className="violet"
      label="A wave packet that is narrow in position spreads in momentum"
    >
      <div className="wave-packet" aria-hidden="true">
        <span className="wave-envelope" />
        <span className="wave-ripples" />
      </div>
      <p className="scene-caption">
        Squeeze the packet in space and its momentum spread grows.
      </p>
    </Stage>
  );
}

function EntanglementScene({ compact }: { compact?: boolean }) {
  return (
    <Stage
      compact={compact}
      className="violet"
      label="Two entangled spins linked by a shared quantum state"
    >
      <div className="entangle-pair" aria-hidden="true">
        <span className="spin left" />
        <span className="entangle-link" />
        <span className="spin right" />
      </div>
      <p className="scene-caption">
        One joint state, two distant measurement choices.
      </p>
    </Stage>
  );
}

function SchrodingerScene({ compact }: { compact?: boolean }) {
  return (
    <Stage
      compact={compact}
      className="violet"
      label="A probability density oscillating inside a quantum well"
    >
      <div className="well-scene" aria-hidden="true">
        <span className="well-walls" />
        <span className="well-wave" />
      </div>
      <p className="scene-caption">
        The Schrödinger equation updates the whole amplitude pattern in time.
      </p>
    </Stage>
  );
}

function PythagorasScene({ compact }: { compact?: boolean }) {
  return (
    <Stage
      compact={compact}
      className="amber"
      label="Animated right triangle with squares on each side"
    >
      <div className="pythagoras-board" aria-hidden="true">
        <span className="tri-leg a" />
        <span className="tri-leg b" />
        <span className="tri-hyp" />
        <span className="tri-sq a" />
        <span className="tri-sq b" />
        <span className="tri-sq c" />
      </div>
      <p className="scene-caption">
        The two smaller squares match the square on the hypotenuse.
      </p>
    </Stage>
  );
}

function CalculusScene({ compact }: { compact?: boolean }) {
  return (
    <Stage
      compact={compact}
      className="amber"
      label="A curve with moving tangent and accumulating area"
    >
      <div className="calc-board" aria-hidden="true">
        <svg viewBox="0 0 320 120" className="calc-svg">
          <path
            className="calc-curve"
            d="M20 95 C 80 95, 110 20, 160 45 S 250 110, 300 30"
          />
          <path className="calc-area" d="M40 95 C 70 95, 95 40, 140 50 L 140 95 Z" />
          <line className="calc-tangent" x1="110" y1="70" x2="190" y2="20" />
          <circle className="calc-dot" cx="150" cy="42" r="4" />
        </svg>
      </div>
      <p className="scene-caption">
        Derivatives read the slope; integrals gather the area underneath.
      </p>
    </Stage>
  );
}

function EulerScene({ compact }: { compact?: boolean }) {
  return (
    <Stage
      compact={compact}
      className="amber"
      label="A point rotating on the complex unit circle"
    >
      <div className="euler-board" aria-hidden="true">
        <span className="euler-circle" />
        <span className="euler-arm" />
        <span className="euler-point" />
      </div>
      <p className="scene-caption">
        eⁱθ traces a unit circle: a turn, not an ordinary real power.
      </p>
    </Stage>
  );
}

function BayesScene({ compact }: { compact?: boolean }) {
  return (
    <Stage
      compact={compact}
      className="amber"
      label="Prior beliefs updating into a posterior after new evidence"
    >
      <div className="bayes-flow" aria-hidden="true">
        <span className="bayes-chip prior">prior</span>
        <span className="bayes-arrow" />
        <span className="bayes-chip evidence">evidence</span>
        <span className="bayes-arrow" />
        <span className="bayes-chip posterior">posterior</span>
      </div>
      <p className="scene-caption">
        New evidence reshapes the odds without erasing the base rate.
      </p>
    </Stage>
  );
}

function MathGenericScene({ compact }: { compact?: boolean }) {
  return (
    <Stage
      compact={compact}
      className="amber"
      label="Abstract mathematical lattice and orbiting markers"
    >
      <div className="math-lattice" aria-hidden="true">
        <span className="lattice-grid" />
        <span className="lattice-orb a" />
        <span className="lattice-orb b" />
      </div>
      <p className="scene-caption">
        Structures, symmetries, and counts — made visible as motion.
      </p>
    </Stage>
  );
}

function ClassicalScene({ compact }: { compact?: boolean }) {
  return (
    <Stage
      compact={compact}
      className="teal"
      label="Two colliding masses exchanging momentum"
    >
      <div className="collide-stage" aria-hidden="true">
        <span className="mass left" />
        <span className="mass right" />
      </div>
      <p className="scene-caption">
        When external impulse vanishes, total momentum is conserved.
      </p>
    </Stage>
  );
}

export default function LessonScene({
  topic,
  speed = 0.6,
  compact = false,
}: SceneProps) {
  switch (topic.visual) {
    case "relativity":
      return <RelativityScene speed={speed} compact={compact} />;
    case "gravity":
      return <GravityScene compact={compact} />;
    case "blackhole":
      return <BlackHoleScene compact={compact} />;
    case "expansion":
      return <ExpansionScene compact={compact} />;
    case "interference":
      return <QuantumScene compact={compact} />;
    case "uncertainty":
      return <UncertaintyScene compact={compact} />;
    case "entanglement":
      return <EntanglementScene compact={compact} />;
    case "schrodinger":
      return <SchrodingerScene compact={compact} />;
    case "pythagoras":
      return <PythagorasScene compact={compact} />;
    case "calculus":
      return <CalculusScene compact={compact} />;
    case "euler":
      return <EulerScene compact={compact} />;
    case "bayes":
      return <BayesScene compact={compact} />;
    case "calculator":
      if (topic.category === "Classical physics")
        return <ClassicalScene compact={compact} />;
      if (topic.category === "Quantum mechanics")
        return <QuantumScene compact={compact} />;
      if (topic.category === "Space & relativity")
        return <RelativityScene speed={speed} compact={compact} />;
      return <MathGenericScene compact={compact} />;
    default:
      return <MathGenericScene compact={compact} />;
  }
}

export { RelativityScene };
