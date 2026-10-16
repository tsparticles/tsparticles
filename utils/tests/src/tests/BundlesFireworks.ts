/* eslint-disable */
import { describe, expect, it } from "vitest";
import { TestWindow } from "../Fixture/Window.js";
import { fireworks } from "@tsparticles/fireworks";

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
