import { tutorEnabled } from "../../../lib/tutor";
import { serverConfig } from "../../../lib/server-config";
export async function GET() {
  return Response.json(
    { enabled: tutorEnabled(await serverConfig()) },
    { headers: { "Cache-Control": "no-store" } },
  );
}
