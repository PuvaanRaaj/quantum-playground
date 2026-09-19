# Quantum Playground

**A thought experiment lab for curious people.** Predict what will happen, change the experiment, then connect the result to the mathematics.

The first lab explores quantum interference: two paths, a relative phase, environmental dephasing, and an optional recombiner. No physics background or API key required.

## What works

- Interactive two-path schematic with phase and coherence controls.
- Rust/WebAssembly calculation engine with an independently checked TypeScript reference.
- Exact detector probabilities, 1,000-shot simulated measurements, and a phase-sweep curve.
- Four guided experiments, predictions, and explanations.
- Expandable mathematical derivation and links to learning resources.
- Shareable experiment settings in the URL.
- Optional AI tutor that calls a validated simulation tool and offers experiments to apply.
- Responsive layout, keyboard controls, and reduced-motion support.

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

The optional server integration uses the OpenAI Responses API with function calling. It is **disabled unless all three server variables are set**:

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

Tests cover known outcomes, normalization, dephasing, input rejection, WASM/reference parity across 1,210 parameter combinations, deterministic sampling, and the tutor's authorization and tool-call protocol with a mocked provider. CI rebuilds WASM before verification. A successful mocked tutor test does not establish live provider access.

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

This release is a complete single-experiment learning slice. Entanglement/Bell tests, relativity/spacetime diagrams, and Lean-checked proofs are possible future labs, not implemented features.

## License

MIT. The build integration includes the Sites starter's vendored build plugin and its upstream license. Third-party packages retain their own licenses.
