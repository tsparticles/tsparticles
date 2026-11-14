/* eslint-disable */
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

type WebcomponentsModule = typeof import("../src/web-particles.js");

const initMock = vi.fn(async () => Promise.resolve()),
  destroyMock = vi.fn(),
  loadThemeMock = vi.fn(async () => Promise.resolve()),
  loadMock = vi.fn(async () => ({ destroy: destroyMock, loadTheme: loadThemeMock }));

let engine: import("@tsparticles/engine").Engine;

async function loadModule(): Promise<WebcomponentsModule> {
  // Keep the module that owns the registered custom element; each test uses a fresh engine.
  return await import("../src/web-particles.js");
}

beforeEach(() => {
  initMock.mockClear();
  loadMock.mockClear();
  loadThemeMock.mockClear();
  destroyMock.mockClear();
  engine = { init: initMock, load: loadMock } as unknown as import("@tsparticles/engine").Engine;
});

afterEach(() => {
  document.body.replaceChildren();
});

describe("webcomponents initParticlesEngine", () => {
  it("calls the init callback with the supplied engine and initializes it", async () => {
    const module = await loadModule(),
      init = vi.fn(async () => Promise.resolve());

    await module.initParticlesEngine(engine, init);

    expect(init).toHaveBeenCalledTimes(1);
    expect(init).toHaveBeenCalledWith(engine);
    expect(initMock).toHaveBeenCalledTimes(1);
    expect(module.isParticlesEngineInitialized(engine)).toBe(true);
  });

  it("shares the first registration while initialization is pending", async () => {
    const module = await loadModule(),
      first = module.initParticlesEngine(engine, async () => Promise.resolve());

    await expect(module.initParticlesEngine(engine, async () => Promise.resolve())).resolves.toBeUndefined();

    await first;
  });
});

describe("webcomponents Particles element", () => {
  it("loads the engine with the configured id and options on connect", async () => {
    const module = await loadModule(),
      options = { particles: { number: { value: 4 } } };

    await module.initParticlesEngine(engine);
    module.defineParticlesElement();

    const element = document.createElement("web-particles") as unknown as InstanceType<typeof module.Particles>;

    element.engine = engine;
    element.id = "web-particles-test";
    element.engine = engine;
    element.options = options;

    element.engine = engine;
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

    await module.initParticlesEngine(engine);
    module.defineParticlesElement();

    const element = document.createElement("web-particles") as unknown as InstanceType<typeof module.Particles>;

    element.engine = engine;
    element.options = { particles: { number: { value: 1 } } };

    element.engine = engine;
    document.body.appendChild(element);

    await vi.waitFor(() => {
      expect(loadMock).toHaveBeenCalled();
    });

    element.remove();

    expect(destroyMock).toHaveBeenCalled();
    expect(element.container.current).toBeUndefined();
  });

  it("applies the current data-theme to each loaded container", async () => {
    const module = await loadModule();
    let resolveLoad: (() => void) | undefined;

    loadMock.mockImplementationOnce(async () => {
      await new Promise<void>(resolve => {
        resolveLoad = resolve;
      });

      return { destroy: destroyMock, loadTheme: loadThemeMock };
    });

    await module.initParticlesEngine(engine);
    module.defineParticlesElement();

    const element = document.createElement("web-particles") as unknown as InstanceType<typeof module.Particles>;

    element.setAttribute("options", JSON.stringify({ particles: { number: { value: 1 } } }));
    element.setAttribute("data-theme", "dark");
    element.engine = engine;
    document.body.appendChild(element);

    await vi.waitFor(() => {
      expect(loadMock).toHaveBeenCalledTimes(1);
    });

    element.setAttribute("data-theme", "light");
    expect(resolveLoad).toBeDefined();
    resolveLoad?.();

    await vi.waitFor(() => {
      expect(loadThemeMock).toHaveBeenCalledWith("light");
    });

    element.engine = engine;
    element.options = { particles: { number: { value: 2 } } };

    await vi.waitFor(() => {
      expect(loadMock).toHaveBeenCalledTimes(2);
      expect(loadThemeMock).toHaveBeenCalledTimes(2);
    });

    expect(loadThemeMock).toHaveBeenNthCalledWith(2, "light");

    element.remove();
  });

  it("waits for the theme refresh before dispatching particlesLoaded", async () => {
    const module = await loadModule();
    let resolveTheme: (() => void) | undefined;

    loadThemeMock.mockImplementationOnce(async () => {
      await new Promise<void>(resolve => {
        resolveTheme = resolve;
      });
    });

    await module.initParticlesEngine(engine);
    module.defineParticlesElement();

    const element = document.createElement("web-particles") as unknown as InstanceType<typeof module.Particles>,
      loaded = vi.fn();

    element.addEventListener("particlesLoaded", loaded);
    element.engine = engine;
    element.options = { particles: { number: { value: 1 } } };
    element.setAttribute("data-theme", "dark");
    element.engine = engine;
    document.body.appendChild(element);

    await vi.waitFor(() => {
      expect(loadThemeMock).toHaveBeenCalledWith("dark");
    });

    expect(loaded).not.toHaveBeenCalled();
    resolveTheme?.();

    await vi.waitFor(() => {
      expect(loaded).toHaveBeenCalledOnce();
    });

    element.remove();
  });

  it("does not dispatch particlesLoaded when a load becomes stale during the theme refresh", async () => {
    const module = await loadModule();
    let resolveTheme: (() => void) | undefined;

    loadThemeMock.mockImplementationOnce(async () => {
      await new Promise<void>(resolve => {
        resolveTheme = resolve;
      });
    });

    await module.initParticlesEngine(engine);
    module.defineParticlesElement();

    const element = document.createElement("web-particles") as unknown as InstanceType<typeof module.Particles>,
      loaded = vi.fn();

    element.addEventListener("particlesLoaded", loaded);
    element.engine = engine;
    element.options = { particles: { number: { value: 1 } } };
    element.setAttribute("data-theme", "dark");
    element.engine = engine;
    document.body.appendChild(element);

    await vi.waitFor(() => {
      expect(loadThemeMock).toHaveBeenCalledWith("dark");
    });

    element.remove();
    resolveTheme?.();

    await vi.waitFor(() => {
      expect(destroyMock).toHaveBeenCalled();
    });

    expect(loaded).not.toHaveBeenCalled();
  });

  it("reports theme refresh failures through particlesError", async () => {
    const module = await loadModule(),
      consoleError = vi.spyOn(console, "error").mockImplementation(() => {});

    loadThemeMock.mockRejectedValueOnce(new Error("theme refresh failed"));

    await module.initParticlesEngine(engine);
    module.defineParticlesElement();

    const element = document.createElement("web-particles") as unknown as InstanceType<typeof module.Particles>,
      error = vi.fn(),
      loaded = vi.fn();

    element.addEventListener("particlesError", error);
    element.addEventListener("particlesLoaded", loaded);
    element.engine = engine;
    element.options = { particles: { number: { value: 1 } } };
    element.setAttribute("data-theme", "dark");
    element.engine = engine;
    document.body.appendChild(element);

    try {
      await vi.waitFor(() => {
        expect(error).toHaveBeenCalledOnce();
      });

      expect(loaded).not.toHaveBeenCalled();
    } finally {
      element.remove();
      consoleError.mockRestore();
    }
  });
});
