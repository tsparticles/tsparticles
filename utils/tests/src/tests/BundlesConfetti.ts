/* eslint-disable */
import { tsParticles, type Container } from "@tsparticles/engine";
import { describe, expect, it } from "vitest";
import { TestWindow } from "../Fixture/Window.js";
import { confetti } from "@tsparticles/confetti";

describe("confetti bundle", async () => {
  globalThis.window = TestWindow;

  it("creates a confetti animation container", async () => {
    const container = (await confetti({})) as Container | undefined;

    expect(container).to.not.be.undefined;
    expect(tsParticles.items).to.include(container);

    container?.stop();
    container?.destroy(false);
  }, 120000);
});
