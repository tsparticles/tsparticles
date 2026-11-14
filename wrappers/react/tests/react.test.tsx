import { type Root, createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { act } from "react";

const { containerMock, errorMock, loadMock } = vi.hoisted(() => {
  const containerMock = {
    destroyed: false,
    destroy: vi.fn(),
  };

  return {
    containerMock,
    errorMock: vi.fn(),
    loadMock: vi.fn(async () => containerMock),
  };
});

const engine = {
  load: loadMock,
  init: vi.fn(async () => undefined),
} as unknown as import("@tsparticles/engine").Engine;

vi.mock("@tsparticles/engine", () => ({
  getLogger: () => ({ error: errorMock }),
  tsParticles: {
    load: loadMock,
  },
}));

type ParticlesModule = typeof import("../lib/Particles.js");
type ProviderModule = typeof import("../lib/ParticlesProvider.js");

const globalWithAct = globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean };

globalWithAct.IS_REACT_ACT_ENVIRONMENT = true;

let root: Root | undefined;
let host: HTMLDivElement | undefined;

async function loadModules(): Promise<{
  Particles: ParticlesModule["default"];
  ParticlesProvider: ProviderModule["ParticlesProvider"];
}> {
  vi.resetModules();

  const provider = (await import("../lib/ParticlesProvider.js")) as ProviderModule,
    particles = (await import("../lib/Particles.js")) as ParticlesModule;

  return { Particles: particles.default, ParticlesProvider: provider.ParticlesProvider };
}

beforeEach(() => {
  loadMock.mockClear();
  errorMock.mockClear();
  containerMock.destroy.mockClear();
  containerMock.destroyed = false;
  host = document.createElement("div");
  document.body.appendChild(host);
});

afterEach(() => {
  root?.unmount();
  root = undefined;
  host?.remove();
  host = undefined;
});

describe("Particles", () => {
  it("loads the engine instance with the given options, id and url", async () => {
    const { Particles, ParticlesProvider } = await loadModules(),
      options = { particles: { number: { value: 1 } } };

    root = createRoot(host!);

    await act(async () => {
      root!.render(
        <ParticlesProvider engine={engine} init={async () => Promise.resolve()}>
          <Particles id="my-particles" options={options} url="https://example.com/config.json" />
        </ParticlesProvider>,
      );
      await Promise.resolve();
    });

    expect(loadMock).toHaveBeenCalledTimes(1);
    expect(loadMock).toHaveBeenCalledWith({
      id: "my-particles",
      options,
      url: "https://example.com/config.json",
    });
  });

  it("invokes the particlesLoaded callback with the container", async () => {
    const { Particles, ParticlesProvider } = await loadModules(),
      particlesLoaded = vi.fn();

    root = createRoot(host!);

    await act(async () => {
      root!.render(
        <ParticlesProvider engine={engine} init={async () => Promise.resolve()}>
          <Particles particlesLoaded={particlesLoaded} />
        </ParticlesProvider>,
      );
      await Promise.resolve();
    });

    expect(particlesLoaded).toHaveBeenCalledTimes(1);
    expect(particlesLoaded).toHaveBeenCalledWith(containerMock);
  });

  it("reports a rejected load and recovers on a later render", async () => {
    const { Particles, ParticlesProvider } = await loadModules(),
      loadError = new Error("load failed"),
      particlesLoaded = vi.fn();

    loadMock.mockRejectedValueOnce(loadError);
    root = createRoot(host!);

    await act(async () => {
      root!.render(
        <ParticlesProvider engine={engine} init={async () => Promise.resolve()}>
          <Particles options={{ particles: { number: { value: 1 } } }} particlesLoaded={particlesLoaded} />
        </ParticlesProvider>,
      );
      await Promise.resolve();
    });

    await vi.waitFor(() => {
      expect(errorMock).toHaveBeenCalledWith("Particles: error loading particles", loadError);
    });
    expect(particlesLoaded).not.toHaveBeenCalled();

    await act(async () => {
      root!.render(
        <ParticlesProvider engine={engine} init={async () => Promise.resolve()}>
          <Particles options={{ particles: { number: { value: 2 } } }} particlesLoaded={particlesLoaded} />
        </ParticlesProvider>,
      );
      await Promise.resolve();
    });

    await vi.waitFor(() => {
      expect(particlesLoaded).toHaveBeenCalledWith(containerMock);
    });
  });

  it("reports particlesLoaded callback errors separately from engine load errors", async () => {
    const { Particles, ParticlesProvider } = await loadModules(),
      callbackError = new Error("callback failed"),
      particlesLoaded = vi.fn(() => {
        throw callbackError;
      });

    root = createRoot(host!);

    await act(async () => {
      root!.render(
        <ParticlesProvider engine={engine} init={async () => Promise.resolve()}>
          <Particles options={{ particles: { number: { value: 1 } } }} particlesLoaded={particlesLoaded} />
        </ParticlesProvider>,
      );
      await Promise.resolve();
    });

    await vi.waitFor(() => {
      expect(errorMock).toHaveBeenCalledWith("Particles: error in particlesLoaded callback", callbackError);
    });
    expect(errorMock).not.toHaveBeenCalledWith("Particles: error loading particles", callbackError);
  });

  it("destroys the container on unmount", async () => {
    const { Particles, ParticlesProvider } = await loadModules();

    root = createRoot(host!);

    await act(async () => {
      root!.render(
        <ParticlesProvider engine={engine} init={async () => Promise.resolve()}>
          <Particles />
        </ParticlesProvider>,
      );
      await Promise.resolve();
    });

    await act(async () => {
      root!.unmount();
      root = undefined;
    });

    expect(containerMock.destroy).toHaveBeenCalledTimes(1);
  });

  it("replaces the host when a pending load is superseded by a different id", async () => {
    const { Particles, ParticlesProvider } = await loadModules(),
      init = async (): Promise<void> => Promise.resolve(),
      staleContainer = { destroyed: false, destroy: vi.fn() };

    let finishLoad: (container: typeof containerMock) => void = () => undefined;

    loadMock.mockImplementationOnce(
      () =>
        new Promise<typeof containerMock>(resolve => {
          finishLoad = resolve;
        }),
    );
    root = createRoot(host!);

    await act(async () => {
      root!.render(
        <ParticlesProvider engine={engine} init={init}>
          <Particles id="old-scene" />
        </ParticlesProvider>,
      );
    });

    const oldHost = host!.querySelector("#old-scene");

    expect(oldHost).toBeInstanceOf(HTMLDivElement);

    await act(async () => {
      root!.render(
        <ParticlesProvider engine={engine} init={init}>
          <Particles id="new-scene" />
        </ParticlesProvider>,
      );
    });

    expect(oldHost?.isConnected).toBe(false);
    expect(host!.querySelector("#new-scene")).toBeInstanceOf(HTMLDivElement);

    await act(async () => {
      finishLoad(staleContainer);
    });

    expect(staleContainer.destroy).toHaveBeenCalledOnce();
  });

  it("ignores a superseded load that resolves after the newer one", async () => {
    const { Particles, ParticlesProvider } = await loadModules(),
      particlesLoaded = vi.fn(),
      newerContainer = { destroyed: false, destroy: vi.fn() };

    let resolveOlder: (container: typeof containerMock | undefined) => void = () => undefined;

    const olderLoad = new Promise<typeof containerMock | undefined>(resolve => {
      resolveOlder = resolve;
    });

    loadMock.mockImplementationOnce(() => olderLoad);
    loadMock.mockImplementation(async () => newerContainer);

    root = createRoot(host!);

    await act(async () => {
      root!.render(
        <ParticlesProvider engine={engine} init={async () => Promise.resolve()}>
          <Particles options={{ particles: { number: { value: 1 } } }} particlesLoaded={particlesLoaded} />
        </ParticlesProvider>,
      );
      await Promise.resolve();
    });

    await act(async () => {
      root!.render(
        <ParticlesProvider engine={engine} init={async () => Promise.resolve()}>
          <Particles options={{ particles: { number: { value: 2 } } }} particlesLoaded={particlesLoaded} />
        </ParticlesProvider>,
      );
      await Promise.resolve();
    });

    expect(loadMock).toHaveBeenCalledTimes(2);
    expect(particlesLoaded).toHaveBeenCalledTimes(1);
    expect(particlesLoaded).toHaveBeenCalledWith(newerContainer);

    await act(async () => {
      /* the superseded load resolves with undefined, as the engine does for the same id */
      resolveOlder(undefined);
      await Promise.resolve();
    });

    expect(particlesLoaded).toHaveBeenCalledTimes(1);

    await act(async () => {
      root!.unmount();
      root = undefined;
    });

    expect(newerContainer.destroy).toHaveBeenCalledTimes(1);
  });

  it("unmounts while a load is pending without destroying the newer container", async () => {
    const { Particles, ParticlesProvider } = await loadModules(),
      particlesLoaded = vi.fn();

    let resolveOlder: (container: typeof containerMock | undefined) => void = () => undefined;

    const olderLoad = new Promise<typeof containerMock | undefined>(resolve => {
      resolveOlder = resolve;
    });

    const pendingContainer = { destroyed: false, destroy: vi.fn() };
    loadMock.mockImplementationOnce(async () => {
      await olderLoad;
      return pendingContainer;
    });

    root = createRoot(host!);

    await act(async () => {
      root!.render(
        <ParticlesProvider engine={engine} init={async () => Promise.resolve()}>
          <Particles options={{ particles: { number: { value: 1 } } }} particlesLoaded={particlesLoaded} />
        </ParticlesProvider>,
      );
      await Promise.resolve();
    });

    await act(async () => {
      root!.unmount();
      root = undefined;
    });

    // Resolve the pending load with undefined so the wrapper continuation completes before the
    // pending container cleanup assertions.
    await act(async () => {
      resolveOlder(undefined);
      await Promise.resolve();
    });

    await olderLoad;

    expect(loadMock).toHaveBeenCalledTimes(1);
    expect(particlesLoaded).not.toHaveBeenCalled();
    expect(pendingContainer.destroy).toHaveBeenCalledTimes(1);
  });

  it("calls the init callback with the engine instance", async () => {
    const { Particles, ParticlesProvider } = await loadModules(),
      init = vi.fn(async () => Promise.resolve());

    root = createRoot(host!);

    await act(async () => {
      root!.render(
        <ParticlesProvider engine={engine} init={init}>
          <Particles />
        </ParticlesProvider>,
      );
      await Promise.resolve();
    });

    expect(init).toHaveBeenCalledTimes(1);
  });
  it("keeps two providers independent when one is unmounted", async () => {
    const { Particles, ParticlesProvider } = await loadModules();
    const firstContainer = { destroy: vi.fn() },
      secondContainer = { destroy: vi.fn() };
    const first = { init: vi.fn(async () => undefined), load: vi.fn(async () => firstContainer) } as never;
    const second = { init: vi.fn(async () => undefined), load: vi.fn(async () => secondContainer) } as never;
    root = createRoot(host!);
    const render = (includeFirst: boolean) => (
      <>
        {includeFirst && (
          <ParticlesProvider key="first" engine={first}>
            <Particles id="first" />
          </ParticlesProvider>
        )}
        <ParticlesProvider key="second" engine={second}>
          <Particles id="second" />
        </ParticlesProvider>
      </>
    );
    await act(async () => {
      root!.render(render(true));
    });
    await act(async () => {
      root!.render(render(false));
    });
    expect(firstContainer.destroy).toHaveBeenCalledOnce();
    expect(secondContainer.destroy).not.toHaveBeenCalled();
  });
});
