/* eslint-disable */
import { describe, expect, it, vi } from "vitest";

const { initMock } = vi.hoisted(() => ({
  initMock: vi.fn(async () => Promise.resolve()),
}));

vi.mock("@tsparticles/engine", () => ({
  tsParticles: {
    init: initMock,
  },
}));

type EngineModule = typeof import("../src/initParticlesEngine.js");

async function loadEngineModule(): Promise<EngineModule> {
  vi.resetModules();

  return await import("../src/initParticlesEngine.js");
}

describe("initParticlesEngine", () => {
  it("calls the init callback with the engine and initializes it", async () => {
    const { tsParticles } = await import("@tsparticles/engine");

    (tsParticles.init as ReturnType<typeof vi.fn>).mockClear();

    const module = await loadEngineModule(),
      init = vi.fn(async () => Promise.resolve());

    await module.initParticlesEngine(init);

    expect(init).toHaveBeenCalledTimes(1);
    expect(init).toHaveBeenCalledWith(tsParticles);
    expect(tsParticles.init).toHaveBeenCalledTimes(1);
    expect(module.isParticlesEngineInitialized()).toBe(true);
  });

  it("does not re-run the init when already initialized", async () => {
    const module = await loadEngineModule(),
      init = vi.fn(async () => Promise.resolve());

    await module.initParticlesEngine(init);
    await module.initParticlesEngine(init);

    expect(init).toHaveBeenCalledTimes(1);
  });

  it("throws when the init callback changes across the app lifecycle", async () => {
    const module = await loadEngineModule(),
      first = module.initParticlesEngine(async () => Promise.resolve());

    await expect(module.initParticlesEngine(async () => Promise.resolve())).rejects.toThrow(
      /stable across the app lifecycle/i,
    );

    await first;
  });

  it("resolves the wait helper", async () => {
    const module = await loadEngineModule();

    await expect(module.waitForParticlesEngineInitialization()).resolves.toBeUndefined();
  });
});
