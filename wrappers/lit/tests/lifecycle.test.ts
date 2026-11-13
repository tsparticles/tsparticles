import { afterEach, beforeAll, beforeEach, expect, it, vi } from "vitest";
import { LitParticles, initParticlesEngine } from "../src/lit-tsparticles.js";

const { errorMock, loadMock } = vi.hoisted(() => ({ errorMock: vi.fn(), loadMock: vi.fn() }));

vi.mock("@tsparticles/engine", () => ({
  getLogger: () => ({ error: errorMock }),
  tsParticles: { load: loadMock },
}));

beforeAll(async () => {
  await initParticlesEngine();
});

beforeEach(() => {
  errorMock.mockClear();
  loadMock.mockReset();
});

afterEach(() => {
  document.body.replaceChildren();
});

function mount(): { element: LitParticles; loaded: ReturnType<typeof vi.fn> } {
  const element = document.createElement("lit-particles") as LitParticles,
    loaded = vi.fn();

  element.options = {};
  element.addEventListener("particlesLoaded", loaded);
  document.body.append(element);

  return { element, loaded };
}

it("reports a load rejection and recovers when options change", async () => {
  const failure = new Error("load failed"),
    container = { destroy: vi.fn() };

  loadMock.mockRejectedValueOnce(failure).mockResolvedValueOnce(container);

  const { element, loaded } = mount();

  await vi.waitFor(() => expect(errorMock).toHaveBeenCalledWith("LitParticles: error loading particles", failure));
  expect(loaded).not.toHaveBeenCalled();

  element.options = { particles: { number: { value: 2 } } };

  await vi.waitFor(() => expect(loaded).toHaveBeenCalledOnce());
  expect(element.container).toBe(container);
});

it("disposes a late result without publishing it, and loads again on reconnect", async () => {
  const stale = { destroy: vi.fn() },
    current = { destroy: vi.fn() },
    pending = Promise.withResolvers<typeof stale>();

  loadMock.mockReturnValueOnce(pending.promise).mockResolvedValueOnce(current);

  const { element, loaded } = mount();

  await vi.waitFor(() => expect(loadMock).toHaveBeenCalledOnce());
  element.remove();
  document.body.append(element);

  await vi.waitFor(() => expect(loaded).toHaveBeenCalledOnce());
  pending.resolve(stale);

  await vi.waitFor(() => expect(stale.destroy).toHaveBeenCalledOnce());
  expect(element.container).toBe(current);
  expect(current.destroy).not.toHaveBeenCalled();
  expect(loaded).toHaveBeenCalledOnce();
});

it("replaces the canvas when the id changes during startup", async () => {
  const stale = { destroy: vi.fn() },
    pending = Promise.withResolvers<typeof stale>(),
    current = { destroy: vi.fn() };

  loadMock.mockReturnValueOnce(pending.promise).mockResolvedValueOnce(current);

  const { element, loaded } = mount();

  await vi.waitFor(() => expect(loadMock).toHaveBeenCalledOnce());

  const firstCanvas = element.querySelector("canvas");

  expect(firstCanvas).toBeInstanceOf(HTMLCanvasElement);

  element.id = "updated";

  await vi.waitFor(() => expect(loaded).toHaveBeenCalledOnce());
  expect(firstCanvas?.isConnected).toBe(false);
  expect(element.querySelector("canvas")).toBeInstanceOf(HTMLCanvasElement);

  pending.resolve(stale);

  await vi.waitFor(() => expect(stale.destroy).toHaveBeenCalledOnce());
  expect(element.container).toBe(current);
  expect(loaded).toHaveBeenCalledOnce();
});
