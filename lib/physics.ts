export type Experiment = {
  phase: number;
  visibility: number;
  recombine: boolean;
};
export function validateExperiment(value: unknown): Experiment {
  const e = value as Experiment;
  if (
    !e ||
    typeof e.phase !== "number" ||
    !Number.isFinite(e.phase) ||
    e.phase < 0 ||
    e.phase > 360 ||
    typeof e.visibility !== "number" ||
    !Number.isFinite(e.visibility) ||
    e.visibility < 0 ||
    e.visibility > 1 ||
    typeof e.recombine !== "boolean"
  ) {
    throw new Error(
      "Use phase 0–360°, visibility 0–1, and a boolean recombine value.",
    );
  }
  return { phase: e.phase, visibility: e.visibility, recombine: e.recombine };
}
export function simulate(value: Experiment) {
  const e = validateExperiment(value);
  const p0 = e.recombine
    ? (1 + e.visibility * Math.cos((e.phase * Math.PI) / 180)) / 2
    : 0.5;
  return {
    ...e,
    p0,
    p1: 1 - p0,
    model: "Ideal two-path qubit; dephasing before optional final Hadamard.",
  };
}
export function sample(p0: number, shots: number, random = Math.random) {
  if (
    !Number.isFinite(p0) ||
    p0 < 0 ||
    p0 > 1 ||
    !Number.isInteger(shots) ||
    shots < 1 ||
    shots > 10000
  )
    throw new Error("Invalid sampling parameters.");
  let zero = 0;
  for (let i = 0; i < shots; i++) if (random() < p0) zero++;
  return { zero, one: shots - zero, shots };
}
export const lessons = [
  {
    title: "Two paths. One outcome.",
    phase: 0,
    visibility: 1,
    recombine: true,
    question: "With both paths open, will the detectors split 50/50?",
    explanation:
      "At 0°, the amplitudes add at detector 0 and cancel at detector 1. Each measurement has one outcome, but probabilities come from adding amplitudes first. Two balanced paths do not guarantee balanced outputs.",
  },
  {
    title: "Change nothing but phase.",
    phase: 180,
    visibility: 1,
    recombine: true,
    question: "If we turn the phase by half a cycle, which detector wins?",
    explanation:
      "A 180° phase shift reverses the relative sign of one path. After recombination, the cancellation switches sides: detector 1 receives every ideal outcome. The phase gate did not change either path’s population.",
  },
  {
    title: "Let the environment listen.",
    phase: 180,
    visibility: 0,
    recombine: true,
    question: "What happens when the paths become fully distinguishable?",
    explanation:
      "Full dephasing removes the off-diagonal terms of the path density matrix. With no coherence left, the interference disappears and the outputs are 50/50. No conscious observer is needed; interaction with an environment can do this.",
  },
  {
    title: "Remove the recombiner.",
    phase: 90,
    visibility: 1,
    recombine: false,
    question: "Can a path measurement reveal the relative phase?",
    explanation:
      "Without the second Hadamard, you measure the two paths directly. Their populations remain 50/50 at every phase. Relative phase becomes visible in an appropriate measurement basis, not in these path counts alone.",
  },
] as const;
