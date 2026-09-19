import handler from "vinext/server/fetch-handler";

export { AudienceRoom } from "./audience-room.ts";

const vinext = handler as {
  fetch: (
    request: Request,
    env: unknown,
    ctx: ExecutionContext,
  ) => Response | Promise<Response>;
};

export default {
  fetch(request: Request, env: unknown, ctx: ExecutionContext) {
    return vinext.fetch(request, env, ctx);
  },
};
