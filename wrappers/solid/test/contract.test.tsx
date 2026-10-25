/* eslint-disable */
import { tsParticles, type Container } from "@tsparticles/engine";
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
