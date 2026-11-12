/* eslint-disable */
import { getLogger, tsParticles, type Container } from "@tsparticles/engine";
import { createSignal } from "solid-js";
import { render } from "solid-js/web";
import { afterEach, describe, expect, it, vi } from "vitest";
import { Particles } from "../src";

const loadMock = vi.mocked(tsParticles.load);

const tick = async (): Promise<void> => {
  await new Promise(resolve => setTimeout(resolve, 0));
};

let dispose: (() => void) | undefined;

afterEach(() => {
  dispose?.();
  dispose = undefined;
  loadMock.mockClear();
});

describe("Particles contract", () => {
  it("loads the engine instance with the given options, id and url", async () => {
    const host = document.createElement("div"),
      options = { particles: { number: { value: 1 } } };

    document.body.appendChild(host);

    dispose = render(
      () => <Particles id="my-particles" options={options} url="https://example.com/config.json" />,
      host,
    );

    await tick();

    expect(loadMock).toHaveBeenCalledTimes(1);
    expect(loadMock).toHaveBeenCalledWith({
      id: "my-particles",
      options,
      url: "https://example.com/config.json",
    });

    host.remove();
  });

  it("invokes the particlesLoaded callback with the container", async () => {
    const host = document.createElement("div"),
      particlesLoaded = vi.fn();

    document.body.appendChild(host);

    dispose = render(() => <Particles particlesLoaded={particlesLoaded} />, host);

    await tick();

    expect(particlesLoaded).toHaveBeenCalledTimes(1);

    const container = (await loadMock.mock.results[0]!.value) as Container;

    expect(particlesLoaded).toHaveBeenCalledWith(container);

    host.remove();
  });

  it("logs a rejected engine load without emitting particlesLoaded", async () => {
    const host = document.createElement("div"),
      particlesLoaded = vi.fn(),
      loadError = new Error("load failed"),
      logger = getLogger();

    document.body.appendChild(host);
    loadMock.mockRejectedValueOnce(loadError);
    vi.mocked(logger.error).mockClear();

    dispose = render(
      () => <Particles options={{ particles: { number: { value: 1 } } }} particlesLoaded={particlesLoaded} />,
      host,
    );

    await tick();

    expect(logger.error).toHaveBeenCalledWith("Particles: error loading particles", loadError);
    expect(particlesLoaded).not.toHaveBeenCalled();

    dispose();
    dispose = undefined;
    dispose = render(
      () => <Particles options={{ particles: { number: { value: 2 } } }} particlesLoaded={particlesLoaded} />,
      host,
    );

    await tick();

    expect(particlesLoaded).toHaveBeenCalledTimes(1);

    host.remove();
  });

  it("reports a particlesLoaded callback rejection separately from load errors", async () => {
    const host = document.createElement("div"),
      callbackError = new Error("callback failed"),
      particlesLoaded = vi.fn(async () => {
        throw callbackError;
      }),
      logger = getLogger();

    document.body.appendChild(host);
    vi.mocked(logger.error).mockClear();

    dispose = render(() => <Particles particlesLoaded={particlesLoaded} />, host);

    await tick();

    expect(logger.error).toHaveBeenCalledWith("Particles: error in particlesLoaded callback", callbackError);
    expect(logger.error).not.toHaveBeenCalledWith("Particles: error loading particles", callbackError);

    host.remove();
  });

  it("discards a stale load that resolves after the current load", async () => {
    const host = document.createElement("div"),
      particlesLoaded = vi.fn(),
      staleContainer = { destroy: vi.fn(), destroyed: false } as unknown as Container,
      currentContainer = { destroy: vi.fn(), destroyed: false } as unknown as Container,
      [options, setOptions] = createSignal({ particles: { number: { value: 1 } } });

    let resolveStale: (container: Container | undefined) => void = () => undefined;

    loadMock.mockImplementationOnce(
      () =>
        new Promise<Container | undefined>(resolve => {
          resolveStale = resolve;
        }),
    );
    loadMock.mockImplementationOnce(async () => currentContainer);
    document.body.appendChild(host);

    dispose = render(() => <Particles options={options()} particlesLoaded={particlesLoaded} />, host);

    await tick();
    expect(loadMock).toHaveBeenCalledTimes(1);

    setOptions({ particles: { number: { value: 2 } } });

    await tick();

    expect(loadMock).toHaveBeenCalledTimes(2);
    expect(particlesLoaded).toHaveBeenCalledTimes(1);
    expect(particlesLoaded).toHaveBeenCalledWith(currentContainer);

    resolveStale(staleContainer);
    await tick();

    expect(staleContainer.destroy).toHaveBeenCalledOnce();
    expect(particlesLoaded).toHaveBeenCalledTimes(1);

    host.remove();
  });

  it("uses a separate canvas when a pending load is superseded by a different id", async () => {
    const host = document.createElement("div"),
      [id, setId] = createSignal("old-scene"),
      staleContainer = { destroy: vi.fn(), destroyed: false } as unknown as Container;

    let finishLoad: (container: Container) => void = () => undefined;

    loadMock.mockImplementationOnce(
      () =>
        new Promise<Container>(resolve => {
          finishLoad = resolve;
        }),
    );
    document.body.appendChild(host);
    dispose = render(() => <Particles id={id()} />, host);

    await tick();

    const oldCanvas = host.querySelector("#old-scene canvas");

    expect(oldCanvas).toBeInstanceOf(HTMLCanvasElement);

    setId("new-scene");
    await tick();

    expect(oldCanvas?.isConnected).toBe(false);
    expect(host.querySelector("#new-scene canvas")).toBeInstanceOf(HTMLCanvasElement);

    finishLoad(staleContainer);
    await tick();

    expect(staleContainer.destroy).toHaveBeenCalledOnce();
    host.remove();
  });

  it("applies the theme once the asynchronously loaded container exists", async () => {
    const host = document.createElement("div");

    document.body.appendChild(host);

    dispose = render(() => <Particles theme="dark" />, host);

    await tick();

    const container = (await loadMock.mock.results[0]!.value) as Container & {
      loadTheme: ReturnType<typeof vi.fn>;
    };

    expect(container.loadTheme).toHaveBeenCalledWith("dark");

    host.remove();
  });

  it("destroys the container exactly once on cleanup", async () => {
    const host = document.createElement("div");

    document.body.appendChild(host);

    dispose = render(() => <Particles />, host);

    await tick();

    const container = (await loadMock.mock.results[0]!.value) as Container,
      destroyMock = vi.mocked(container.destroy);

    dispose();
    dispose = undefined;

    expect(destroyMock).toHaveBeenCalledTimes(1);

    host.remove();
  });
});
