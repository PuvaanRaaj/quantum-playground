import {
  memoryAudience,
  readAudienceEvent,
  type AudienceEvent,
} from "../../../lib/audience.ts";

type AudienceNamespace = {
  idFromName(name: string): unknown;
  get(id: unknown): { fetch(request: Request): Promise<Response> };
};

async function audienceNamespace(): Promise<AudienceNamespace | null> {
  try {
    const { env } = await import("cloudflare:workers");
    const namespace = (env as { AUDIENCE?: AudienceNamespace }).AUDIENCE;
    return namespace ?? null;
  } catch {
    return null;
  }
}

function json(body: unknown, status = 200) {
  return Response.json(body, {
    status,
    headers: { "Cache-Control": "no-store" },
  });
}

async function snapshotFromNamespace(namespace: AudienceNamespace, event?: AudienceEvent) {
  const stub = namespace.get(namespace.idFromName("playground"));
  const response = await stub.fetch(
    new Request("https://audience.internal/event", {
      method: event ? "POST" : "GET",
      body: event ? JSON.stringify(event) : undefined,
    }),
  );
  return response.json();
}

export async function GET() {
  const namespace = await audienceNamespace();
  if (namespace) return json(await snapshotFromNamespace(namespace));
  return json(memoryAudience().snapshot(Date.now()));
}

export async function POST(request: Request) {
  const raw = await request.text();
  if (raw.length > 400) return json({ error: "Invalid audience event." }, 400);
  let event: AudienceEvent | null = null;
  try {
    event = readAudienceEvent(JSON.parse(raw));
  } catch {
    event = null;
  }
  if (!event) return json({ error: "Invalid audience event." }, 400);
  const namespace = await audienceNamespace();
  if (namespace) return json(await snapshotFromNamespace(namespace, event));
  const store = memoryAudience();
  const now = Date.now();
  if (event.action === "leave") store.leave(event.slug, event.visitor, now);
  else if (event.action === "ping") store.ping(event.slug, event.visitor, now);
  else store.enter(event.slug, event.visitor, now);
  return json(store.snapshot(now));
}
