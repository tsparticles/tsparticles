import { describe, expect, it } from "vitest";
/* eslint-disable */
import { TestWindow } from "../Fixture/Window.js";
import { createEngine } from "@tsparticles/engine";
import { createFireworks } from "@tsparticles/fireworks";

const fireworks = createFireworks(createEngine());

describe("fireworks bundle", async () => {
  globalThis.window = TestWindow;

  it("creates a fireworks instance", async () => {
    const instance = await fireworks({});

    expect(instance).to.not.be.undefined;
    expect(instance?.destroyed).to.be.false;

    instance?.stop();
    instance?.destroy();

    expect(instance?.destroyed).to.be.true;
  }, 120000);
});
