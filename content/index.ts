import { quantumTopics } from "./quantum.ts";
import { relativityTopics } from "./relativity.ts";
import { mathematicsTopics } from "./mathematics.ts";
import { additions } from "./additions.ts";
// Independently reviewed lesson files replace original entries during migration.
export const topics = [
  ...new Map(
    [
      ...relativityTopics,
      ...quantumTopics,
      ...mathematicsTopics,
      ...additions,
    ].map((t) => [t.slug, t]),
  ).values(),
];
