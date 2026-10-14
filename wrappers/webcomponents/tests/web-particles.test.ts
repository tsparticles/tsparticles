/* eslint-disable */
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

type WebcomponentsModule = typeof import("../src/web-particles.js");

const initMock = vi.fn(async () => Promise.resolve()),
  destroyMock = vi.fn(),
  loadMock = vi.fn(async () => ({ destroy: destroyMock }));

const globalWithEngine = globalThis as typeof globalThis & {
  tsParticles?: { init: typeof initMock; load: typeof loadMock };
};

async function loadModule(): Promise<WebcomponentsModule> {
  vi.resetModules();

  return await import("../src/web-particles.js");
}

beforeEach(() => {
  initMock.mockClear();
  loadMock.mockClear();
  destroyMock.mockClear();
  globalWithEngine.tsParticles = { init: initMock, load: loadMock };
});

afterEach(() => {
  delete globalWithEngine.tsParticles;
});

describe("webcomponents initParticlesEngine", () => {
  it("calls the init callback with the global engine and initializes it", async () => {
    const module = await loadModule(),
      init = vi.fn(async () => Promise.resolve());

    await module.initParticlesEngine(init);

    expect(init).toHaveBeenCalledTimes(1);
    expect(init).toHaveBeenCalledWith(globalWithEngine.tsParticles);
    expect(initMock).toHaveBeenCalledTimes(1);
    expect(module.isParticlesEngineInitialized()).toBe(true);
  });

  it("throws when the init callback changes across the app lifecycle", async () => {
    const module = await loadModule(),
      first = module.initParticlesEngine(async () => Promise.resolve());

    await expect(module.initParticlesEngine(async () => Promise.resolve())).rejects.toThrow(
      /stable across the app lifecycle/i,
    );

    await first;
  });
});

describe("webcomponents Particles element", () => {
  it("loads the engine with the configured id and options on connect", async () => {
    const module = await loadModule(),
      options = { particles: { number: { value: 4 } } };

    module.defineParticlesElement();

    const element = document.createElement("web-particles") as unknown as InstanceType<typeof module.Particles>;

    element.id = "web-particles-test";
    element.options = options;

    document.body.appendChild(element);

    await vi.waitFor(() => {
      expect(loadMock).toHaveBeenCalled();
    });

    expect(loadMock).toHaveBeenCalledWith(
      expect.objectContaining({
        id: "web-particles-test",
        options,
      }),
    );

    element.remove();
  });

  it("destroys the container on disconnect", async () => {
    const module = await loadModule();

    module.defineParticlesElement();

    const element = document.createElement("web-particles") as unknown as InstanceType<typeof module.Particles>;

    element.options = { particles: { number: { value: 1 } } };

    document.body.appendChild(element);

    await vi.waitFor(() => {
      expect(loadMock).toHaveBeenCalled();
    });

    element.remove();

    expect(destroyMock).toHaveBeenCalled();
    expect(element.container.current).toBeUndefined();
  });
});
