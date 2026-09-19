export type Topic = {
  slug: string;
  title: string;
  category: "Quantum mechanics" | "Space & relativity" | "Mathematics";
  subtitle: string;
  minutes: number;
  level: "Start here" | "Build intuition" | "Go deeper";
  accent: "violet" | "blue" | "amber";
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
  visual:
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
