import type { TutorConfig } from "./tutor";
export async function serverConfig(): Promise<TutorConfig> {
  // Cloudflare bindings are authoritative in Workers; process.env supports Node development.
  try {
    const { env } = await import("cloudflare:workers");
    return env as TutorConfig;
  } catch {
    return {
      OPENAI_API_KEY: process.env.OPENAI_API_KEY,
      OPENAI_MODEL: process.env.OPENAI_MODEL,
      TUTOR_ACCESS_TOKEN: process.env.TUTOR_ACCESS_TOKEN,
    };
  }
}
