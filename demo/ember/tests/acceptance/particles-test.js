import { visit, waitFor } from "@ember/test-helpers";
import { setupApplicationTest } from "ember-qunit";
import { module, test } from "qunit";

module("Acceptance | particles", hooks => {
  setupApplicationTest(hooks);

  test("mounts the demo particles canvas", async assert => {
    await visit("/");
    const canvas = await waitFor(".fixed-size-particles canvas");

    assert.ok(canvas.width > 0);
    assert.ok(canvas.height > 0);
  });
});
