"use client";
import { useEffect, useState } from "react";
import {
  Atom,
  ArrowRight,
  Play,
  RotateCcw,
  Share2,
  BookOpen,
  Sparkles,
  ChevronDown,
  ExternalLink,
} from "lucide-react";
import { lessons, sample, simulate, type Experiment } from "../lib/physics";

type Counts = ReturnType<typeof sample>;
type Entry = {
  role: "user" | "assistant";
  text: string;
  actions?: Experiment[];
};
const initial: Experiment = { phase: 0, visibility: 1, recombine: true };
const percent = (n: number) => `${(n * 100).toFixed(1)}%`;

function Apparatus({
  experiment,
  p0,
  running,
}: {
  experiment: Experiment;
  p0: number;
  running: boolean;
}) {
  return (
    <svg
      className={`apparatus ${running ? "running" : ""}`}
      viewBox="0 0 760 320"
      role="img"
      aria-label={`Two-path experiment at ${experiment.phase} degrees. Detector zero probability ${percent(p0)}.`}
    >
      <defs>
        <pattern id="grid" width="24" height="24" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r=".7" fill="#293342" />
        </pattern>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" />
        </filter>
      </defs>
      <rect width="760" height="320" fill="url(#grid)" />
      <path
        d="M70 160H190L325 65H440L565 160H668M190 160L325 255H440L565 160L668 255"
        className="track"
      />
      <path d="M70 160H190L325 65H440L565 160H668" className="beam beam-a" />
      <path
        d="M190 160L325 255H440L565 160L668 255"
        className="beam beam-b"
        style={{ opacity: 0.3 + experiment.visibility * 0.7 }}
      />
      <circle cx="70" cy="160" r="18" className="source" />
      <circle cx="70" cy="160" r="5" fill="#c9ff85" />
      <text x="70" y="207" textAnchor="middle" className="svg-label">
        SOURCE
      </text>
      <rect x="174" y="140" width="32" height="40" rx="5" className="gate" />
      <text x="190" y="166" textAnchor="middle" className="gate-label">
        H
      </text>
      <rect
        x="348"
        y="44"
        width="69"
        height="42"
        rx="7"
        className="phase-gate"
      />
      <text x="382" y="70" textAnchor="middle" className="phase-label">
        {experiment.phase}°
      </text>
      <text x="382" y="25" textAnchor="middle" className="svg-label">
        PHASE SHIFT
      </text>
      <text x="382" y="292" textAnchor="middle" className="svg-label">
        REFERENCE PATH
      </text>
      <rect
        x="549"
        y="140"
        width="32"
        height="40"
        rx="5"
        className={experiment.recombine ? "gate" : "gate removed"}
      />
      <text x="565" y="166" textAnchor="middle" className="gate-label">
        {experiment.recombine ? "H" : "—"}
      </text>
      <text x="565" y="119" textAnchor="middle" className="svg-label">
        {experiment.recombine ? "RECOMBINE" : "BYPASS"}
      </text>
      {[160, 255].map((y, i) => (
        <g key={y}>
          <rect
            x="658"
            y={y - 23}
            width="70"
            height="46"
            rx="8"
            className={`detector d${i}`}
          />
          <text
            x="693"
            y={y + 5}
            textAnchor="middle"
            className="detector-label"
          >
            D{i}
          </text>
        </g>
      ))}
      <circle className="particle particle-a" r="4" fill="#c9ff85">
        <animateMotion
          dur="2.8s"
          repeatCount="indefinite"
          path="M70 160H190L325 65H440L565 160H658"
        />
      </circle>
      <circle className="particle particle-b" r="4" fill="#a699ff">
        <animateMotion
          dur="2.8s"
          repeatCount="indefinite"
          path="M70 160H190L325 255H440L565 160L658 255"
        />
      </circle>
    </svg>
  );
}
function Fringe({ experiment }: { experiment: Experiment }) {
  const points = Array.from(
    { length: 121 },
    (_, i) =>
      `${30 + i * 4.5},${135 - simulate({ ...experiment, phase: i * 3 }).p0 * 110}`,
  ).join(" ");
  const result = simulate(experiment);
  return (
    <svg
      viewBox="0 0 600 173"
      role="img"
      aria-label="Probability of detector zero across a full phase cycle"
      className="fringe"
    >
      <path d="M30 25V135H570M30 80H570" className="chart-grid" />
      <polyline
        points={points}
        fill="none"
        stroke="#bcfa79"
        strokeWidth="2.5"
      />
      <path
        d={`M${30 + experiment.phase * 1.5} 25V135`}
        stroke="#71805f"
        strokeDasharray="4 5"
      />
      <circle
        cx={30 + experiment.phase * 1.5}
        cy={135 - result.p0 * 110}
        r="5"
        fill="#bcfa79"
      />
      {[0, 90, 180, 270, 360].map((x) => (
        <text key={x} x={30 + x * 1.5} y="162" textAnchor="middle">
          {x}°
        </text>
      ))}
      <text x="24" y="28" textAnchor="end">
        1
      </text>
      <text x="24" y="139" textAnchor="end">
        0
      </text>
    </svg>
  );
}
export default function Page() {
  const [experiment, setExperiment] = useState<Experiment>(initial);
  const [lesson, setLesson] = useState(0);
  const [counts, setCounts] = useState<Counts | null>(null);
  const [prediction, setPrediction] = useState("");
  const [reveal, setReveal] = useState(false);
  const [notice, setNotice] = useState("");
  const [engine, setEngine] = useState<
    ((p: number, v: number, r: number) => number) | null
  >(null);
  const [engineStatus, setEngineStatus] = useState("Loading physics engine");
  const [ai, setAi] = useState(false);
  const [token, setToken] = useState("");
  const [question, setQuestion] = useState("");
  const [busy, setBusy] = useState(false);
  const [entries, setEntries] = useState<Entry[]>([]);
  useEffect(() => {
    let active = true;
    fetch("/quantum_core.wasm")
      .then((r) => {
        if (!r.ok) throw Error();
        return r.arrayBuffer();
      })
      .then((b) => WebAssembly.compile(b))
      .then((m) => WebAssembly.instantiate(m))
      .then((instance) => {
        if (active) {
          setEngine(
            () =>
              instance.exports.probability_zero as (
                p: number,
                v: number,
                r: number,
              ) => number,
          );
          setEngineStatus("Rust / WebAssembly");
        }
      })
      .catch(() => {
        if (active) setEngineStatus("JavaScript reference engine");
      });
    fetch("/api/status")
      .then((r) => r.json())
      .then((d) => {
        if (active) setAi((d as { enabled?: boolean }).enabled === true);
      })
      .catch(() => {});
    const query = new URLSearchParams(window.location.search);
    const phase = Number(query.get("phase") ?? 0),
      visibility = Number(query.get("visibility") ?? 1);
    if (
      Number.isFinite(phase) &&
      phase >= 0 &&
      phase <= 360 &&
      Number.isFinite(visibility) &&
      visibility >= 0 &&
      visibility <= 1
    )
      setExperiment({
        phase,
        visibility,
        recombine: query.get("recombine") !== "0",
      });
    return () => {
      active = false;
    };
  }, []);
  const exact = simulate(experiment);
  const p0 = engine
    ? engine(
        (experiment.phase * Math.PI) / 180,
        experiment.visibility,
        Number(experiment.recombine),
      )
    : exact.p0;
  function change(patch: Partial<Experiment>) {
    setExperiment((e) => ({ ...e, ...patch }));
    setCounts(null);
    setReveal(false);
    setNotice("");
  }
  function chooseLesson(index: number) {
    setLesson(index);
    const l = lessons[index];
    setExperiment({
      phase: l.phase,
      visibility: l.visibility,
      recombine: l.recombine,
    });
    setCounts(null);
    setReveal(false);
    setPrediction("");
  }
  function run() {
    setCounts(sample(p0, 1000));
    setReveal(true);
  }
  async function share() {
    const url = new URL(window.location.href);
    url.search = new URLSearchParams({
      phase: String(experiment.phase),
      visibility: String(experiment.visibility),
      recombine: experiment.recombine ? "1" : "0",
    }).toString();
    try {
      await navigator.clipboard.writeText(url.toString());
      setNotice("Experiment link copied.");
    } catch {
      setNotice(url.toString());
    }
  }
  async function ask(event: React.FormEvent) {
    event.preventDefault();
    if (!question.trim() || busy) return;
    const text = question.trim();
    setEntries((e) => [...e, { role: "user", text }]);
    setQuestion("");
    setBusy(true);
    try {
      const response = await fetch("/api/tutor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ question: text, experiment }),
      });
      const data = (await response.json()) as {
        error?: string;
        text: string;
        experiments: Experiment[];
      };
      if (!response.ok)
        throw Error(data.error || "The tutor could not respond.");
      setEntries((e) => [
        ...e,
        { role: "assistant", text: data.text, actions: data.experiments },
      ]);
    } catch (error) {
      setEntries((e) => [
        ...e,
        {
          role: "assistant",
          text:
            error instanceof Error
              ? error.message
              : "The tutor could not respond.",
        },
      ]);
    } finally {
      setBusy(false);
    }
  }
  return (
    <>
      <header className="topbar">
        <a className="brand" href="/">
          <span className="brand-symbol">
            <Atom size={24} />
          </span>
          quantum<span className="brand-light">playground</span>
        </a>
        <span className="edition">A THOUGHT EXPERIMENT LAB</span>
        <a
          className="github"
          href="https://github.com/PuvaanRaaj/quantum-playground"
          target="_blank"
          rel="noreferrer"
        >
          Source <ExternalLink size={14} />
        </a>
      </header>
      <main>
        <div className="intro">
          <div>
            <p className="eyebrow">
              EXPERIMENT 01 <span>/</span> QUANTUM INTERFERENCE
            </p>
            <h1>Possibility has a phase.</h1>
            <p>
              Make a prediction. Change one thing. Let the universe surprise
              you.
            </p>
          </div>
          <button className="secondary share" onClick={share}>
            <Share2 size={16} /> Share experiment
          </button>
        </div>
        {notice && (
          <p className="notice" role="status">
            {notice}
          </p>
        )}
        <div className="workspace">
          <section className="lab" aria-label="Quantum experiment">
            <div className="panel-heading">
              <span className="section-label">THE EXPERIMENT</span>
              <span className="engine">{engineStatus}</span>
            </div>
            <Apparatus
              experiment={experiment}
              p0={p0}
              running={counts !== null}
            />
            <div className="diagram-caption">
              <span>
                <i className="key green" />
                phase path
              </span>
              <span>
                <i className="key violet" />
                reference path
              </span>
              <span>Paths are schematic, not particle trajectories.</span>
            </div>
            <div className="controls">
              <div className="phase-control">
                <div className="control-label">
                  <label htmlFor="phase">
                    Relative phase <span>φ</span>
                  </label>
                  <output htmlFor="phase">{experiment.phase}°</output>
                </div>
                <input
                  id="phase"
                  type="range"
                  min="0"
                  max="360"
                  value={experiment.phase}
                  onChange={(e) => change({ phase: Number(e.target.value) })}
                />
                <div className="range-labels">
                  <span>0</span>
                  <span>π</span>
                  <span>2π</span>
                </div>
                <div className="presets">
                  {[0, 90, 180, 270].map((p) => (
                    <button
                      key={p}
                      aria-pressed={experiment.phase === p}
                      onClick={() => change({ phase: p })}
                    >
                      {p}°
                    </button>
                  ))}
                </div>
              </div>
              <div className="coherence-control">
                <div className="control-label">
                  <label htmlFor="visibility">Remaining coherence</label>
                  <output htmlFor="visibility">
                    {Math.round(experiment.visibility * 100)}%
                  </output>
                </div>
                <input
                  id="visibility"
                  type="range"
                  min="0"
                  max="100"
                  value={Math.round(experiment.visibility * 100)}
                  onChange={(e) =>
                    change({ visibility: Number(e.target.value) / 100 })
                  }
                />
                <p className="hint">
                  Lower it to model interaction with an environment.
                </p>
                <label className="toggle">
                  <input
                    type="checkbox"
                    checked={experiment.recombine}
                    onChange={(e) => change({ recombine: e.target.checked })}
                  />
                  <span>Recombine the paths</span>
                  <span className="toggle-state">
                    {experiment.recombine ? "ON" : "OFF"}
                  </span>
                </label>
              </div>
            </div>
            <div className="results">
              <div className="results-heading">
                <h2>Where will it land?</h2>
                <span>EXACT MODEL PROBABILITIES</span>
              </div>
              <div className="detector-results">
                {[p0, 1 - p0].map((p, i) => (
                  <div className={`detector-result result-${i}`} key={i}>
                    <div>
                      <span>Detector {i}</span>
                      <strong>{percent(p)}</strong>
                    </div>
                    <div className="bar">
                      <span style={{ width: percent(p) }} />
                    </div>
                    <p>
                      {counts
                        ? `${i === 0 ? counts.zero : counts.one} of ${counts.shots.toLocaleString()} simulated measurements`
                        : "Run an experiment to collect measurements"}
                    </p>
                  </div>
                ))}
              </div>
              <div className="run-row">
                <button className="primary" onClick={run}>
                  <Play size={16} fill="currentColor" />
                  Run 1,000 measurements
                </button>
                <button
                  className="icon-button"
                  aria-label="Reset experiment"
                  onClick={() => {
                    chooseLesson(0);
                    setNotice("Experiment reset.");
                  }}
                >
                  <RotateCcw size={17} />
                </button>
                <span>Each run samples fresh outcomes.</span>
              </div>
            </div>
          </section>
          <aside className="learning">
            <div className="lesson-header">
              <BookOpen size={18} />
              <span>FIELD NOTES</span>
              <span className="step-count">0{lesson + 1} / 04</span>
            </div>
            <div className="steps" aria-label="Guided experiments">
              {lessons.map((l, i) => (
                <button
                  key={l.title}
                  aria-label={`Lesson ${i + 1}: ${l.title}`}
                  aria-pressed={lesson === i}
                  onClick={() => chooseLesson(i)}
                />
              ))}
            </div>
            <h2>{lessons[lesson].title}</h2>
            <p className="lesson-question">{lessons[lesson].question}</p>
            <fieldset className="prediction">
              <legend>YOUR PREDICTION</legend>
              {["Mostly detector 0", "An even split", "Mostly detector 1"].map(
                (p) => (
                  <label key={p} className={prediction === p ? "selected" : ""}>
                    <input
                      type="radio"
                      name="prediction"
                      value={p}
                      checked={prediction === p}
                      onChange={() => setPrediction(p)}
                    />
                    {p}
                  </label>
                ),
              )}
            </fieldset>
            <button className="lesson-run" onClick={run}>
              {prediction ? "Test my prediction" : "Try the experiment"}
              <ArrowRight size={16} />
            </button>
            {reveal && (
              <div className="explanation" role="status">
                <strong>What the model says</strong>
                <p>
                  {experiment.phase === lessons[lesson].phase &&
                  experiment.visibility === lessons[lesson].visibility &&
                  experiment.recombine === lessons[lesson].recombine
                    ? lessons[lesson].explanation
                    : `At your current settings, detector 0 has probability ${percent(p0)} and detector 1 has probability ${percent(1 - p0)}. ${!experiment.recombine ? "With no recombination, phase does not change path populations." : experiment.visibility === 0 ? "Full dephasing removes all phase dependence." : "Recombination converts relative phase into an observable difference in the output probabilities."}`}
                </p>
                {prediction && (
                  <p>
                    You predicted: {prediction.toLowerCase()}. Compare it with
                    the probabilities and sampled counts.
                  </p>
                )}
              </div>
            )}
            <button
              className="next-lesson"
              onClick={() => chooseLesson((lesson + 1) % lessons.length)}
            >
              {lesson === 3 ? "Start again" : "Next experiment"}
              <ArrowRight size={15} />
            </button>
            <div className="small-note">
              A classical simulation of quantum predictions. No quantum hardware
              required.
            </div>
          </aside>
        </div>
        <div className="lower-grid">
          <section className="curve-panel">
            <div className="panel-heading">
              <h2>The interference fingerprint</h2>
              <span className="section-label">P(D0) vs. PHASE</span>
            </div>
            <Fringe experiment={experiment} />
            <p className="hint">
              Move the phase slider. The dot follows your experiment; the curve
              shows every possible phase.
            </p>
          </section>
          <section className="math-panel">
            <details>
              <summary>
                <span>
                  <span className="math-symbol">ψ</span> Show me the maths
                </span>
                <ChevronDown size={18} />
              </summary>
              <div className="math-content">
                <p>
                  Begin in |0⟩. The first Hadamard creates equal path
                  amplitudes. A phase gate rotates the second amplitude.
                </p>
                <code>|ψ⟩ = (|0⟩ + eⁱᶲ|1⟩) / √2</code>
                <p>For full coherence and recombination:</p>
                <code>
                  a₀ = (1 + eⁱᶲ) / 2<br />
                  a₁ = (1 − eⁱᶲ) / 2
                </code>
                <p>
                  Probabilities are squared magnitudes. With remaining coherence
                  v, the density-matrix model gives:
                </p>
                <code>
                  P(0) = (1 + v cos φ) / 2<br />
                  P(1) = 1 − P(0)
                </code>
                <p>
                  At v &lt; 1, the state is mixed; the pure-state formula above
                  no longer describes the whole state. Without the final
                  Hadamard, both probabilities are ½.
                </p>
                <a
                  href="https://quantum.cloud.ibm.com/learning/en/modules/quantum-mechanics/superposition-with-qiskit"
                  target="_blank"
                  rel="noreferrer"
                >
                  Explore the physics at IBM Quantum ↗
                </a>
              </div>
            </details>
            <div className="math-preview">
              <span>H</span>
              <i>→</i>
              <span>P(φ)</span>
              <i>→</i>
              <span>dephase</span>
              <i>→</i>
              <span>{experiment.recombine ? "H" : "I"}</span>
              <i>→</i>
              <span>measure</span>
            </div>
            <p className="hint">
              The equation and experiment describe the same thing. Explore at
              your own pace.
            </p>
          </section>
        </div>
        <section className="tutor">
          <div className="tutor-intro">
            <span className="tutor-icon">
              <Sparkles size={21} />
            </span>
            <div>
              <h2>A little help with the big questions.</h2>
              <p>
                {ai
                  ? "Ask the AI tutor to compare experiments. Its calculations come from the simulator."
                  : "The guided experiments work without AI. Connect a server-side model to explore your own questions."}
              </p>
            </div>
            <span className="tutor-badge">
              {ai ? "AI TUTOR AVAILABLE" : "GUIDED MODE"}
            </span>
          </div>
          {ai ? (
            <>
              <label className="access-label">
                Tutor access code
                <input
                  type="password"
                  autoComplete="off"
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                  placeholder="Provided by the host"
                />
              </label>
              <div className="conversation" aria-live="polite">
                {entries.map((e, i) => (
                  <div className={`message ${e.role}`} key={i}>
                    <strong>{e.role === "user" ? "You" : "Lab tutor"}</strong>
                    <p>{e.text}</p>
                    {e.actions?.map((a, j) => (
                      <button
                        className="secondary"
                        key={j}
                        onClick={() => change(a)}
                      >
                        Try {a.phase}° · {Math.round(a.visibility * 100)}%
                        coherence · recombiner {a.recombine ? "on" : "off"}
                      </button>
                    ))}
                  </div>
                ))}
              </div>
              <form onSubmit={ask}>
                <label htmlFor="question" className="sr-only">
                  Ask the tutor
                </label>
                <input
                  id="question"
                  value={question}
                  maxLength={2000}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="Why does adding a second path make one detector go dark?"
                />
                <button
                  className="primary"
                  disabled={busy || !question.trim() || !token}
                >
                  {busy ? "Investigating…" : "Ask the lab"}
                  <ArrowRight size={16} />
                </button>
              </form>
              <p className="hint">
                Each question includes the current settings. Sent to OpenAI by
                the host; AI explanations can be mistaken.
              </p>
            </>
          ) : (
            <div className="guided-prompts">
              <button onClick={() => chooseLesson(1)}>
                Can phase change the outcome?
                <ArrowRight size={15} />
              </button>
              <button onClick={() => chooseLesson(2)}>
                What does “observing” really do?
                <ArrowRight size={15} />
              </button>
              <button onClick={() => chooseLesson(3)}>
                Where is the phase hiding?
                <ArrowRight size={15} />
              </button>
            </div>
          )}
        </section>
        <footer>
          <span>
            <Atom size={16} /> Curiosity first. Equations when you’re ready.
          </span>
          <a
            href="https://github.com/PuvaanRaaj/quantum-playground#ai-tutor"
            target="_blank"
            rel="noreferrer"
          >
            Build your own lab ↗
          </a>
        </footer>
      </main>
    </>
  );
}
