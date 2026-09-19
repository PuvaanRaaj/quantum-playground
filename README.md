# Quantum Playground

**A thought experiment lab for curious people.** Predict what will happen, change the experiment, then connect the result to the mathematics.

The library introduces twelve famous ideas across quantum mechanics, relativity, astronomy, and mathematics. Every lesson teaches the theory **before** showing its interactive model. This is a curated foundation, not an encyclopedia of every theory or a promise of complete mastery.

## Learn before experimenting

Each lesson includes substantial original explanations (650+ words in the theory sections alone), historical context, plain-language terminology, prerequisite ideas, an equation with every symbol explained, a worked example, misconceptions, a comprehension check, model assumptions, and further reading.

| Subject            | Lessons                                                                            |
| ------------------ | ---------------------------------------------------------------------------------- |
| Space & relativity | Special relativity, general relativity, black holes, the expanding universe        |
| Quantum mechanics  | Interference, uncertainty, entanglement & Bell’s theorem, the Schrödinger equation |
| Mathematics        | Pythagoras, calculus, Euler’s formula, Bayes’ theorem                              |

The reading library includes subject navigation, lesson search, a searchable cross-lesson glossary, direct lesson URLs (`?topic=general-relativity`), browser back/forward navigation, and a persistent light/dark preference. The default theme is light. Experiments are opened explicitly after the explanation, with a shortcut for returning readers.

## Interactive models

- Relativistic light-clock geometry and the Lorentz factor.
- Gravitational clock rates in the Schwarzschild exterior; black-hole horizon sizes.
- Comoving galaxy separations as a function of scale factor.
- The original Rust/WebAssembly interference lab, including phase, coherence, random measurements, and optional AI tutoring.
- Gaussian position/momentum uncertainty, singlet spin correlations, and infinite-well probability densities.
- Right-triangle geometry, midpoint integration, the complex unit circle, and Bayesian updating for a fictional factory sensor.

Every model states what it assumes and what it does not establish. The mathematical lessons include arguments or derivations; an animation is not presented as proof. The relativity and astronomy visualizations are bounded educational models, not general numerical physics solvers.

## Run locally

Requires Node.js 24 or newer. The compiled WASM module is included, so Rust is optional unless changing the engine.

```sh
npm ci
npm run dev
```

Open http://localhost:5173. Guided mode works immediately. Nothing is saved to a database.

## The physics

The model begins in |0⟩ and applies:

```text
H → P(φ) → dephasing(v) → optional H → measurement
```

The phase gate is diag(1, exp(iφ)). Before the second H, the density matrix is:

```text
ρ = ½ [[1, v exp(-iφ)], [v exp(iφ), 1]]
```

With recombination:

```text
P(0) = (1 + v cos φ) / 2
P(1) = 1 - P(0)
```

Without recombination, both probabilities are ½ for every phase and visibility. Here `v` is remaining coherence (0–1), not the probability of a conscious observer watching. For `v < 1`, this is a mixed state. The interface uses degrees; the Rust ABI takes radians.

The path diagram is schematic. Moving dots illustrate paths, not literal trajectories, a split particle, or recorded detections. Exact probabilities and finite-shot samples are labeled separately. Changing settings resets measurement counts. This classical simulation illustrates predictions of a specified model; it does not experimentally establish quantum mechanics. It models no other hardware noise.

Scientific references:

- [IBM Quantum: superposition and interference](https://quantum.cloud.ibm.com/learning/en/modules/quantum-mechanics/superposition-with-qiskit)
- [IBM Quantum: representations of quantum channels](https://quantum.cloud.ibm.com/learning/en/courses/general-formulation-of-quantum-information/quantum-channels/representations-of-channels)
- [Quirk](https://github.com/Strilanc/Quirk), an independent circuit playground for further exploration

## AI tutor

The optional interference-lab server integration uses the OpenAI Responses API with function calling. It remains scoped to the interference experiment; other lessons use authored explanations and deterministic models. It is **disabled unless all three server variables are set**:

| Variable             | Purpose                                                                    |
| -------------------- | -------------------------------------------------------------------------- |
| `OPENAI_API_KEY`     | Server-only API key                                                        |
| `OPENAI_MODEL`       | A model available to your account that supports Responses function calling |
| `TUTOR_ACCESS_TOKEN` | A random access code of at least 24 characters for invited testers         |

For local Cloudflare/Vinext development, copy `.env.example` to `.dev.vars` and fill in the values. `.dev.vars` is ignored by Git. For hosted Workers, configure these as Worker secrets. Never use `NEXT_PUBLIC_` for any of them and never commit credentials.

Restart after configuration. The tutor section will expose a password field for the access code. The browser never receives the provider key; the code stays in React memory and is sent in the Authorization header. Questions and current settings are sent to OpenAI; responses are requested with `store: false`, which does not override the provider's other data policies. Each question is independent; past messages are displayed locally but not sent as conversation history.

The agent can only call `simulate_experiment`. Parameters are validated, calls are bounded to four rounds, requests time out after 45 seconds, and provider errors are redacted. Simulator outputs ground numerical answers; prose is still AI-generated and can be wrong. This is not a theorem prover.

The shared access code is appropriate for a small invited demo. Before offering unrestricted paid AI access publicly, add real user authentication and durable per-user quotas. The existing eight-request/minute and two-concurrent-request limits are **per isolate**, not a global spending cap. The no-key guided lab can be public without exposing a paid endpoint.

## Engineering

- **Rust → WebAssembly:** dependency-free probability core, exported through a small C ABI.
- **TypeScript / React:** experiment controls, visualization, reference calculations, and sampling.
- **Vinext / Vite / Cloudflare Workers:** browser app and same-origin tutor API.
- **No database, tracking, or client-side API credentials.**

Rebuild the engine with rustup's stable toolchain:

```sh
rustup toolchain install stable --profile minimal
rustup target add wasm32-unknown-unknown --toolchain stable
npm run build:wasm
npm run test:rust
npm test
npm run typecheck
npm run build
```

Tests cover known outcomes, normalization, dephasing, input rejection, WASM/reference parity across 1,210 parameter combinations, deterministic sampling, relativistic clock limits, Gaussian uncertainty, singlet correlations, Bayesian updating, integral convergence, lesson completeness, and the tutor's authorization and tool-call protocol with a mocked provider. CI rebuilds WASM before verification. A successful mocked tutor test does not establish live provider access.

## Hosting

```sh
npm run build
npm start
```

`npm start` serves the production Worker locally. The build emits `dist/server/index.js`, `dist/server/wrangler.json`, and `dist/client` assets. A Cloudflare account can deploy the build with:

```sh
npx wrangler deploy --config dist/server/wrangler.json
```

Configure runtime secrets on that Worker to enable AI; leave them absent for guided mode. The included Sites-compatible metadata has no registered project or deployment. No live hosted URL is assumed.

## Scope

The twelve lessons provide a substantial beginner foundation. The entanglement visualization shows singlet correlations; it does not perform a full CHSH experiment. The GR visualization calculates one Schwarzschild clock-rate relation, not arbitrary spacetime curvature. Lean-checked proofs, actual quantum hardware, and cosmological parameter fitting are not implemented. The AI tutor is still limited to interference.

## License

MIT. The build integration includes the Sites starter's vendored build plugin and its upstream license. Third-party packages retain their own licenses.
