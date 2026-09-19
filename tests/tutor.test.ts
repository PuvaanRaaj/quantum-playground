import test from "node:test";
import assert from "node:assert/strict";
import { handleTutor } from "../lib/tutor.ts";
const config = {
  OPENAI_API_KEY: "test-placeholder",
  OPENAI_MODEL: "test-model",
  TUTOR_ACCESS_TOKEN: "test-access-code-at-least-24-chars",
};
const experiment = { phase: 180, visibility: 1, recombine: true };
const request = (
  body: unknown = { question: "Why?", experiment },
  token = config.TUTOR_ACCESS_TOKEN,
) =>
  new Request("https://lab.test/api/tutor", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
test("Tutor fails closed without configuration or access; rejects invalid settings", async () => {
  assert.equal((await handleTutor(request(), {})).status, 503);
  assert.equal((await handleTutor(request({}, "wrong"), config)).status, 401);
  assert.equal(
    (
      await handleTutor(
        request({
          question: "Why?",
          experiment: { ...experiment, phase: 900 },
        }),
        config,
      )
    ).status,
    400,
  );
  assert.equal(
    (
      await handleTutor(
        request({ question: "x".repeat(13000), experiment }),
        config,
      )
    ).status,
    400,
  );
});
test("Tutor executes validated tools and returns tool-grounded response", async () => {
  let round = 0;
  const fakeFetch = (async (_url: unknown, init: RequestInit) => {
    const body = JSON.parse(init.body as string);
    assert.equal(body.store, false);
    if (round++ === 0)
      return Response.json({
        output: [
          {
            type: "function_call",
            name: "simulate_experiment",
            call_id: "call_1",
            arguments: JSON.stringify(experiment),
          },
        ],
      });
    const output = body.input.find(
      (x: { type: string }) => x.type === "function_call_output",
    );
    assert.equal(output.call_id, "call_1");
    assert.equal(JSON.parse(output.output).p0, 0);
    return Response.json({
      status: "completed",
      output: [
        {
          type: "message",
          content: [
            { type: "output_text", text: "Detector 1 has probability 1." },
          ],
        },
      ],
    });
  }) as typeof fetch;
  const response = await handleTutor(request(), config, fakeFetch);
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), {
    text: "Detector 1 has probability 1.",
    experiments: [experiment],
  });
});
test("Provider errors never disclose secrets", async () => {
  const response = await handleTutor(
    request(),
    config,
    (async () =>
      new Response("secret provider internals", {
        status: 401,
      })) as typeof fetch,
  );
  assert.equal(response.status, 502);
  assert.doesNotMatch(
    await response.text(),
    /secret provider|test-placeholder/,
  );
});
