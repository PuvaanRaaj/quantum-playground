import test from "node:test";
import assert from "node:assert/strict";
import {
  AudienceMemory,
  LIVE_WINDOW_MS,
  readAudienceEvent,
} from "../lib/audience.ts";

test("A visitor is counted once and stays live until they leave or time out", () => {
  const store = new AudienceMemory();
  const now = 1_000_000;
  store.enter("special-relativity", "visitor-one", now);
  store.enter("special-relativity", "visitor-one", now + 1000);
  store.ping("special-relativity", "visitor-two", now + 1000);
  assert.deepEqual(store.snapshot(now + 1000), {
    "special-relativity": { views: 2, live: 2 },
  });
  store.leave("special-relativity", "visitor-one", now + 2000);
  assert.equal(store.snapshot(now + 2000)["special-relativity"].live, 1);
  assert.equal(store.snapshot(now + 2000)["special-relativity"].views, 2);
  assert.equal(
    store.snapshot(now + 2000 + LIVE_WINDOW_MS)["special-relativity"].live,
    0,
  );
});

test("Audience events reject malformed visitors and slugs", () => {
  assert.equal(readAudienceEvent(null), null);
  assert.equal(
    readAudienceEvent({ action: "enter", slug: "../x", visitor: "abcdefgh" }),
    null,
  );
  assert.deepEqual(
    readAudienceEvent({
      action: "ping",
      slug: "special-relativity",
      visitor: "abcdefghijklmnop",
    }),
    {
      action: "ping",
      slug: "special-relativity",
      visitor: "abcdefghijklmnop",
    },
  );
});
