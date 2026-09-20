import type { ReactNode } from "react";
import { segmentMath, type MathSegment } from "../lib/math-text.ts";

function pieces(text: string, inlineOnly: boolean) {
  return segmentMath(text).map((segment) =>
    inlineOnly && segment.kind === "block"
      ? { ...segment, kind: "inline" as const }
      : segment,
  );
}

function Equation({ segment }: { segment: MathSegment }) {
  if (segment.kind === "text") return <>{segment.value}</>;
  return <code className="eq-inline">{segment.value}</code>;
}

export function MathSpan({ text }: { text: string }) {
  return (
    <>
      {pieces(text, true).map((segment, index) => (
        <Equation key={index} segment={segment} />
      ))}
    </>
  );
}

export function MathProse({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const segments = segmentMath(text);
  const blocks: ReactNode[] = [];
  let inline: ReactNode[] = [];
  let key = 0;
  const flush = () => {
    if (!inline.length) return;
    blocks.push(
      <p className={className} key={key++}>
        {inline}
      </p>,
    );
    inline = [];
  };
  for (const segment of segments) {
    if (segment.kind === "block") {
      flush();
      blocks.push(
        <div className="equation-display" key={key++} role="math">
          <code>{segment.value}</code>
        </div>,
      );
    } else {
      inline.push(<Equation key={key++} segment={segment} />);
    }
  }
  flush();
  return <>{blocks}</>;
}

export function EquationBlock({ expression }: { expression: string }) {
  const lines = expression
    .split(";")
    .map((line) => line.trim())
    .filter(Boolean);
  return (
    <div className="equation-display" role="math">
      {lines.map((line) => (
        <code className="equation-line" key={line}>
          {line}
        </code>
      ))}
    </div>
  );
}
