import { DurableObject } from "cloudflare:workers";
import { LIVE_WINDOW_MS, type AudienceEvent, type LessonStats } from "../lib/audience.ts";

export class AudienceRoom extends DurableObject {
  constructor(ctx: DurableObjectState, env: Cloudflare.Env) {
    super(ctx, env);
    ctx.storage.sql.exec(`CREATE TABLE IF NOT EXISTS viewers (
      slug TEXT NOT NULL,
      visitor TEXT NOT NULL,
      PRIMARY KEY (slug, visitor)
    )`);
    ctx.storage.sql.exec(`CREATE TABLE IF NOT EXISTS presence (
      slug TEXT NOT NULL,
      visitor TEXT NOT NULL,
      seen INTEGER NOT NULL,
      PRIMARY KEY (slug, visitor)
    )`);
  }

  async fetch(request: Request): Promise<Response> {
    const now = Date.now();
    if (request.method === "POST") {
      const event = (await request.json()) as AudienceEvent;
      this.apply(event, now);
    }
    return Response.json(this.snapshot(now));
  }

  private apply(event: AudienceEvent, now: number) {
    const { slug, visitor, action } = event;
    if (action === "leave") {
      this.ctx.storage.sql.exec(
        "DELETE FROM presence WHERE slug = ? AND visitor = ?",
        slug,
        visitor,
      );
    } else {
      this.ctx.storage.sql.exec(
        "INSERT OR IGNORE INTO viewers (slug, visitor) VALUES (?, ?)",
        slug,
        visitor,
      );
      this.ctx.storage.sql.exec(
        `INSERT INTO presence (slug, visitor, seen) VALUES (?, ?, ?)
         ON CONFLICT(slug, visitor) DO UPDATE SET seen = excluded.seen`,
        slug,
        visitor,
        now,
      );
    }
    this.ctx.storage.sql.exec(
      "DELETE FROM presence WHERE seen < ?",
      now - LIVE_WINDOW_MS,
    );
  }

  private snapshot(now: number): Record<string, LessonStats> {
    this.ctx.storage.sql.exec(
      "DELETE FROM presence WHERE seen < ?",
      now - LIVE_WINDOW_MS,
    );
    const views = this.ctx.storage.sql
      .exec<{ slug: string; views: number }>(
        "SELECT slug, COUNT(*) AS views FROM viewers GROUP BY slug",
      )
      .toArray();
    const live = this.ctx.storage.sql
      .exec<{ slug: string; live: number }>(
        "SELECT slug, COUNT(*) AS live FROM presence GROUP BY slug",
      )
      .toArray();
    const stats: Record<string, LessonStats> = {};
    for (const row of views)
      stats[row.slug] = { views: Number(row.views), live: 0 };
    for (const row of live) {
      const current = stats[row.slug] ?? { views: 0, live: 0 };
      current.live = Number(row.live);
      stats[row.slug] = current;
    }
    return stats;
  }
}
