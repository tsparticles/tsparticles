import { beforeAll, beforeEach, expect, it, vi } from "vitest";
import type { IParticlesProps } from "../src/IParticlesProps";
import Particles from "../src/Particles";
import { initParticlesEngine } from "../src/initParticlesEngine";
import { isValidElement } from "preact";

const { errorMock, loadMock } = vi.hoisted(() => ({ errorMock: vi.fn(), loadMock: vi.fn() }));

const engine = {
  load: loadMock,
  init: vi.fn(async () => undefined),
} as unknown as import("@tsparticles/engine").Engine;

vi.mock("@tsparticles/engine", () => ({
  getLogger: () => ({ error: errorMock }),
  tsParticles: { load: loadMock },
}));

beforeAll(async () => {
  await initParticlesEngine(engine);
});

beforeEach(() => {
  errorMock.mockClear();
  loadMock.mockReset();
});

function mount(props: Omit<IParticlesProps, "engine">): Particles {
  const component = new Particles({ ...props, engine });

  // Run the mount callback without a DOM renderer.
  vi.spyOn(component, "setState").mockImplementation((_state, callback) => callback?.());
  component.componentDidMount();

  return component;
}

it("reports engine and consumer callback failures separately and can load again", async () => {
  const loadFailure = new Error("load failed"),
    callbackFailure = new Error("callback failed"),
    container = { destroy: vi.fn() },
    loaded = vi.fn().mockRejectedValueOnce(callbackFailure);

  loadMock.mockRejectedValueOnce(loadFailure).mockResolvedValueOnce(container);

  const component = mount({ id: "current", particlesLoaded: loaded });

  await vi.waitFor(() => expect(errorMock).toHaveBeenCalledWith("Particles: error loading particles", loadFailure));
  expect(loaded).not.toHaveBeenCalled();

  component.componentDidUpdate({ engine, id: "previous", particlesLoaded: loaded });

  await vi.waitFor(() => {
    expect(errorMock).toHaveBeenCalledWith("Particles: error in particlesLoaded callback", callbackFailure);
  });
  expect(loaded).toHaveBeenCalledExactlyOnceWith(container);
  component.componentWillUnmount();
  expect(container.destroy).toHaveBeenCalledOnce();
});

it("disposes a result arriving after unmount without publishing it", async () => {
  const container = { destroy: vi.fn() },
    pending = Promise.withResolvers<typeof container>(),
    loaded = vi.fn();

  loadMock.mockReturnValueOnce(pending.promise);

  const component = mount({ particlesLoaded: loaded });

  component.componentWillUnmount();
  pending.resolve(container);

  await vi.waitFor(() => expect(container.destroy).toHaveBeenCalledOnce());
  expect(loaded).not.toHaveBeenCalled();
});

it("keys the canvas by the scene id", () => {
  for (const id of ["first", "second"]) {
    const host = new Particles({ engine, id }).render();

    if (!isValidElement(host)) {
      throw new Error("Expected a particles host");
    }

    const { children: canvas } = host.props as { children?: unknown };

    expect(isValidElement(canvas) && canvas.key).toBe(id);
  }
});
