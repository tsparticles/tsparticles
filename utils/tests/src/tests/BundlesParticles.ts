/* eslint-disable */
import { describe, expect, it } from "vitest";
import { TestWindow } from "../Fixture/Window.js";
import { particles } from "@tsparticles/particles";

describe("particles.js bundle", async () => {
  globalThis.window = TestWindow;

  it("creates a particles instance", async () => {
    const instance = await particles({ count: 1, color: "#fff", radius: 1 });

    expect(instance).to.not.be.undefined;
    expect(instance?.destroyed).to.be.false;

    instance?.stop();
    instance?.destroy();

    expect(instance?.destroyed).to.be.true;
  }, 120000);
});
