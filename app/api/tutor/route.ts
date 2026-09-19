import { handleTutor } from "../../../lib/tutor";
import { serverConfig } from "../../../lib/server-config";
export async function POST(request: Request) {
  return handleTutor(request, await serverConfig());
}
