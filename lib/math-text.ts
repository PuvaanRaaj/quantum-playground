export type MathKind = "text" | "inline" | "block";
export type MathSegment = { kind: MathKind; value: string };

const FUNCS = new Set([
  "exp",
  "cos",
  "sin",
  "tan",
  "log",
  "ln",
  "sqrt",
  "mod",
  "gcd",
  "lim",
  "max",
  "min",
  "abs",
  "sec",
  "csc",
  "cot",
  "det",
  "sup",
  "inf",
  "erf",
]);
const UNITS = new Set([
  "second",
  "seconds",
  "metre",
  "metres",
  "meter",
  "meters",
  "kilogram",
  "kilograms",
  "joule",
  "joules",
  "radian",
  "radians",
  "degree",
  "degrees",
  "newton",
  "newtons",
  "hertz",
  "percent",
]);
const SHORT_WORDS = new Set([
  "a",
  "an",
  "as",
  "at",
  "be",
  "by",
  "do",
  "go",
  "he",
  "if",
  "in",
  "is",
  "it",
  "me",
  "my",
  "no",
  "of",
  "on",
  "or",
  "so",
  "to",
  "up",
  "we",
  "am",
  "us",
]);
const GLYPH =
  /[√∫∑∏∂∇ħℏ∞±×·≠≤≥≈≡∝⁰¹²³⁴⁵⁶⁷⁸⁹⁺⁻ⁿᵢⱼₖₘₙₚₛₜₓ₀₁₂₃₄₅₆₇₈₉γΔτπωλθφψρμνσαβωΩΓΛΦΨΣΠΞ]/u;

type Token = { raw: string; index: number; core: string; space: boolean };

function coreOf(token: string): string {
  return token.replace(/^[“"‘']+/u, "").replace(/[.,;:!?…"'”’]+$/u, "");
}

function parenDelta(raw: string): number {
  let balance = 0;
  for (const char of raw) {
    if (char === "(" || char === "[") balance++;
    if (char === ")" || char === "]") balance--;
  }
  return balance;
}

function tokenKind(core: string): "math" | "unit" | "break" | "empty" {
  if (!core) return "empty";
  const lower = core.toLowerCase();
  if (UNITS.has(lower)) return "unit";
  if (FUNCS.has(lower)) return "math";
  if (core === "|") return "math";
  const bare = core.replace(/^[()[\]{}|]+|[()[\]{}|]+$/g, "");
  if (
    /^[A-Za-z][A-Za-z'’-]{2,}$/u.test(bare) &&
    !FUNCS.has(bare.toLowerCase()) &&
    !GLYPH.test(core)
  )
    return "break";
  if (GLYPH.test(core)) return "math";
  if (/[=≠≤≥≈≡<>]/.test(core)) return "math";
  if (/^[+\-−–—×·*/^]$/.test(core)) return "math";
  if (/^-?\d+(?:\.\d+)?%?$/.test(core)) return "math";
  if (/^[A-Za-z]{1,2}$/.test(core) && !SHORT_WORDS.has(lower)) return "math";
  if (/^[A-Za-z]{1,6}\([^)]*\)$/.test(core)) return "math";
  if (/[A-Za-z]/.test(core) && /\d/.test(core) && core.length <= 16)
    return "math";
  if (/[/]/.test(core) && core.length <= 48 && /[A-Za-z0-9√Δγπθ]/.test(core))
    return "math";
  if (/[()[\]{}+\-−×·*/^=√]/.test(core) && !/^[A-Za-z][A-Za-z'’-]*$/u.test(core))
    return "math";
  return "break";
}

function canStart(core: string, next: string | undefined): boolean {
  if (tokenKind(core) !== "math") return false;
  if (/^[+\-−–—×·*/^=≠≤≥≈≡<>]$/.test(core)) return false;
  if (/^-?\d+(?:\.\d+)?$/.test(core)) return false;
  if (
    GLYPH.test(core) ||
    /[=√/]/.test(core) ||
    FUNCS.has(core.toLowerCase()) ||
    /\(/.test(core)
  ) {
    if (core.length === 1 && !/[=√]/.test(core))
      return !!next && /^=/.test(next);
    return true;
  }
  return !!next && /^=/.test(next);
}

function isEquation(cores: string[]): boolean {
  if (!cores.length) return false;
  const joined = cores.join("");
  if (cores.length === 1) {
    const core = cores[0];
    if (core.length < 2) return false;
    if (/[=√]/.test(core)) return true;
    if (GLYPH.test(core) && (/[/()+\-−×·*^]/.test(core) || core.length >= 4))
      return true;
    if (/\(/.test(core) && /[A-Za-zΔγπτθφψρμνσαβ]/.test(core) && core.length >= 3)
      return true;
    return false;
  }
  const hasEq = cores.some((core) => /=/.test(core));
  const hasGlyph = cores.some((core) => GLYPH.test(core));
  const hasOp = cores.some((core) => /[+\-−×·*/^√]/.test(core));
  if (hasEq && (hasGlyph || hasOp || cores.length >= 3)) return true;
  if (cores.some((core) => /√/.test(core))) return true;
  if (hasGlyph && hasOp && cores.length >= 3) return true;
  if (joined.includes("=") && joined.length >= 5) return true;
  return false;
}

function displayKind(value: string): "inline" | "block" {
  const compact = value.replace(/\s+/g, "");
  const tokens = value.trim().split(/\s+/);
  if (
    compact.includes("√") ||
    compact.length >= 18 ||
    tokens.length >= 5 ||
    (compact.includes("=") && tokens.length >= 4)
  )
    return "block";
  return "inline";
}

function tokenize(text: string): Token[] {
  return [...text.matchAll(/\s+|\S+/g)].map((match) => {
    const raw = match[0];
    const space = /^\s+$/.test(raw);
    return {
      raw,
      index: match.index ?? 0,
      core: space ? "" : coreOf(raw),
      space,
    };
  });
}

export function segmentMath(text: string): MathSegment[] {
  if (!text) return [];
  const tokens = tokenize(text);
  const words = tokens
    .map((token, index) => ({ token, index }))
    .filter((item) => !item.token.space);
  const spans: { from: number; to: number }[] = [];
  const used = new Set<number>();
  for (let i = 0; i < words.length; i++) {
    if (used.has(i)) continue;
    const next = words[i + 1]?.token.core;
    if (!canStart(words[i].token.core, next)) continue;
    let j = i;
    while (j + 1 < words.length) {
      const balance = words
        .slice(i, j + 1)
        .reduce((sum, item) => sum + parenDelta(item.token.raw), 0);
      const nextKind = tokenKind(words[j + 1].token.core);
      if (balance > 0 || nextKind === "math" || nextKind === "unit") {
        j++;
        continue;
      }
      break;
    }
    while (
      j > i &&
      /^[+\-−–—×·*/^=≠≤≥≈≡<>]$/.test(words[j].token.core)
    )
      j--;
    const cores = words.slice(i, j + 1).map((item) => item.token.core);
    if (!isEquation(cores)) continue;
    spans.push({ from: words[i].index, to: words[j].index });
    for (let k = i; k <= j; k++) used.add(k);
    i = j;
  }
  if (!spans.length) return [{ kind: "text", value: text }];

  const segments: MathSegment[] = [];
  let cursor = 0;
  for (const span of spans) {
    const start = tokens[span.from].index;
    const end = tokens[span.to].index + tokens[span.to].raw.length;
    if (start > cursor)
      segments.push({ kind: "text", value: text.slice(cursor, start) });
    let slice = text.slice(start, end);
    const trail = slice.match(/[.,;:!?]+$/u)?.[0] ?? "";
    if (trail && !/=$/.test(slice.slice(0, -trail.length)))
      slice = slice.slice(0, -trail.length);
    const keptTrail = text.slice(start, end).slice(slice.length);
    if (slice)
      segments.push({ kind: displayKind(slice), value: slice });
    cursor = start + slice.length;
    if (keptTrail) {
      // Punctuation stays with the following prose.
      cursor = start + slice.length;
    }
  }
  if (cursor < text.length)
    segments.push({ kind: "text", value: text.slice(cursor) });
  return segments.filter((segment) => segment.value.length > 0);
}
