export type Expression = number | string | [string, ...Expression[]];
export type Exploration = {
  title: string;
  description: string;
  inputs: {
    key: string;
    label: string;
    unit: string;
    min: number;
    max: number;
    step: number;
    initial: number;
  }[];
  outputs: { label: string; unit: string; expression: Expression }[];
  assumptions: string;
};
export type Topic = {
  slug: string;
  title: string;
  category:
    | "Quantum mechanics"
    | "Space & relativity"
    | "Mathematics"
    | "Classical physics";
  subtitle: string;
  minutes: number;
  level: "Start here" | "Build intuition" | "Go deeper";
  accent: "violet" | "blue" | "amber" | "teal";
  intro: string;
  why: string;
  prerequisites: string[];
  terms: { term: string; definition: string }[];
  sections: { title: string; paragraphs: string[] }[];
  equation: {
    expression: string;
    symbols: { symbol: string; meaning: string }[];
    explanation: string;
    example: string;
  };
  insight: string;
  misconceptions: { myth: string; correction: string }[];
  check: {
    question: string;
    options: string[];
    answer: number;
    explanation: string;
  };
  sources: { title: string; url: string }[];
  model?: Exploration;
  visual:
    | "calculator"
    | "interference"
    | "uncertainty"
    | "entanglement"
    | "schrodinger"
    | "relativity"
    | "gravity"
    | "blackhole"
    | "expansion"
    | "pythagoras"
    | "calculus"
    | "euler"
    | "bayes";
};
