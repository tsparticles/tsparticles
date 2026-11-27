import { describe, expect, it, vi } from "vitest";
import { ParticlesInstance } from "../src/ParticlesInstance.js";
import { getParticlesInstance } from "../src/utils.js";
import type { Container, Engine } from "@tsparticles/engine";

describe("particles cache cleanup", () => {
  it("removes a cached wrapper destroyed through a second wrapper and preserves replacements", async () => {
    const container = {
      destroyed: false,
      destroy() {
        this.destroyed = true;
      },
    };
    const engine = { load: vi.fn().mockResolvedValue(container) };
    const cached = await getParticlesInstance(engine as unknown as Engine, "cache-test", {});
    if (!cached) {
      throw new Error("Expected the particles instance to load");
    }
    const cachedDestroyed = vi.spyOn(cached, "destroyed", "get");

    new ParticlesInstance(container as Container, "cache-test").destroy();
    cachedDestroyed.mockClear();

    const replacement = {
      destroyed: false,
      destroy() {
        this.destroyed = true;
      },
    };
    engine.load.mockResolvedValue(replacement);
    const next = await getParticlesInstance(engine as unknown as Engine, "cache-test", {});
    expect(cachedDestroyed).not.toHaveBeenCalled();
    expect(next).not.toBe(cached);
    expect(engine.load).toHaveBeenCalledTimes(2);
    cached?.destroy();
    expect(await getParticlesInstance(engine as unknown as Engine, "cache-test", {})).toBe(next);
    next?.destroy();
  });
});
