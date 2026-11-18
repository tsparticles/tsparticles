import { describe, expect, it, vi } from "vitest";
import { FireworksInstance } from "../src/FireworksInstance.js";
import { FireworkOptions } from "../src/FireworkOptions.js";
import { getFireworksInstance } from "../src/utils.js";
import type { Container, Engine } from "@tsparticles/engine";

describe("fireworks cache cleanup", () => {
  it("removes a cached wrapper destroyed through a second wrapper and preserves replacements", async () => {
    const container = {
      destroyed: false,
      destroy() {
        this.destroyed = true;
      },
    };
    const engine = { load: vi.fn().mockResolvedValue(container) };
    const cached = await getFireworksInstance(engine as unknown as Engine, "cache-test", {});
    if (!cached) {
      throw new Error("Expected the fireworks instance to load");
    }
    const cachedDestroyed = vi.spyOn(cached, "destroyed", "get");

    new FireworksInstance(container as Container, "cache-test").destroy();
    cachedDestroyed.mockClear();

    const replacement = {
      destroyed: false,
      destroy() {
        this.destroyed = true;
      },
    };
    engine.load.mockResolvedValue(replacement);
    const next = await getFireworksInstance(engine as unknown as Engine, "cache-test", {});
    expect(cachedDestroyed).not.toHaveBeenCalled();
    expect(next).not.toBe(cached);
    expect(engine.load).toHaveBeenCalledTimes(2);
    cached?.destroy();
    expect(await getFireworksInstance(engine as unknown as Engine, "cache-test", {})).toBe(next);
    next?.destroy();
  });

  it("loads split chroma offsets in absolute OKLCH units", () => {
    const options = new FireworkOptions();

    expect(options.chroma).toEqual({ min: -0.03, max: 0.03 });

    options.load({ chroma: { min: -0.02, max: 0.04 } });

    expect(options.chroma).toEqual({ min: -0.02, max: 0.04 });
  });
});
