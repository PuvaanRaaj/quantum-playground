export const LIVE_WINDOW_MS = 40_000;

export type LessonStats = { views: number; live: number };
export type AudienceAction = "enter" | "ping" | "leave";
export type AudienceEvent = {
  action: AudienceAction;
  slug: string;
  visitor: string;
};

const SLUG = /^[a-z0-9-]{1,80}$/;
const VISITOR = /^[A-Za-z0-9_-]{8,80}$/;

export class AudienceMemory {
  private seen = new Map<string, Set<string>>();
  private presence = new Map<string, Map<string, number>>();

  enter(slug: string, visitor: string, now: number) {
    let viewers = this.seen.get(slug);
    if (!viewers) this.seen.set(slug, (viewers = new Set()));
    viewers.add(visitor);
    this.touch(slug, visitor, now);
  }

  ping(slug: string, visitor: string, now: number) {
    this.enter(slug, visitor, now);
  }

  leave(slug: string, visitor: string, now: number) {
    this.presence.get(slug)?.delete(visitor);
    this.prune(now);
  }

  touch(slug: string, visitor: string, now: number) {
    let viewers = this.presence.get(slug);
    if (!viewers) this.presence.set(slug, (viewers = new Map()));
    viewers.set(visitor, now);
    this.prune(now);
  }

  prune(now: number) {
    for (const [slug, viewers] of this.presence) {
      for (const [visitor, seenAt] of viewers) {
        if (now - seenAt > LIVE_WINDOW_MS) viewers.delete(visitor);
      }
      if (!viewers.size) this.presence.delete(slug);
    }
  }

  snapshot(now: number): Record<string, LessonStats> {
    this.prune(now);
    const slugs = new Set([...this.seen.keys(), ...this.presence.keys()]);
    const stats: Record<string, LessonStats> = {};
    for (const slug of slugs) {
      stats[slug] = {
        views: this.seen.get(slug)?.size ?? 0,
        live: this.presence.get(slug)?.size ?? 0,
      };
    }
    return stats;
  }
}

const globalAudience = globalThis as typeof globalThis & {
  __quantumAudience?: AudienceMemory;
};

export function memoryAudience(): AudienceMemory {
  if (!globalAudience.__quantumAudience)
    globalAudience.__quantumAudience = new AudienceMemory();
  return globalAudience.__quantumAudience;
}

export function readAudienceEvent(body: unknown): AudienceEvent | null {
  if (!body || typeof body !== "object") return null;
  const { action, slug, visitor } = body as Record<string, unknown>;
  if (action !== "enter" && action !== "ping" && action !== "leave")
    return null;
  if (typeof slug !== "string" || !SLUG.test(slug)) return null;
  if (typeof visitor !== "string" || !VISITOR.test(visitor)) return null;
  return { action, slug, visitor };
}
