import { beforeAll, beforeEach, expect, it, vi } from "vitest";
import type { IParticlesProps } from "../src/components/particles/IParticlesProps";
import Particles from "../src/components/particles/particles";
import { initParticlesEngine } from "../src/components/particles/initParticlesEngine";

type Task = (context: { cleanup: (callback: () => void) => void; track: <T>(read: () => T) => T }) => void;

const { errorMock, loadMock, tasks } = vi.hoisted(() => ({
  errorMock: vi.fn(),
  loadMock: vi.fn(),
  tasks: [] as Task[],
}));

const engine = {
  load: loadMock,
  init: vi.fn(async () => undefined),
} as unknown as import("@tsparticles/engine").Engine;

vi.mock("@builder.io/qwik", async importOriginal => ({
  ...(await importOriginal<typeof import("@builder.io/qwik")>()),
  component$: (component: unknown) => component,
  noSerialize: (value: unknown) => value,
  useSignal: () => ({ value: undefined }),
  useVisibleTask$: (task: Task) => tasks.push(task),
}));

vi.mock("@tsparticles/engine", () => ({
  getLogger: () => ({ error: errorMock }),
  tsParticles: { load: loadMock },
}));

beforeAll(async () => {
  await initParticlesEngine(engine);
});

beforeEach(() => {
  tasks.length = 0;
  errorMock.mockClear();
  loadMock.mockReset();
});

function start(loaded: ReturnType<typeof vi.fn>): () => () => void {
  Particles({ engine, loaded: loaded as unknown as NonNullable<IParticlesProps["loaded"]> });

  return () => {
    let cleanup: () => void = () => undefined;

    tasks[0]!({
      track: read => read(),
      cleanup: callback => {
        cleanup = callback;
      },
    });

    return cleanup;
  };
}

it("reports a load rejection and distinguishes a later callback rejection", async () => {
  const engineError = new Error("engine failed"),
    callbackError = new Error("callback failed"),
    current = { destroy: vi.fn() },
    loaded = vi.fn().mockRejectedValueOnce(callbackError);

  loadMock.mockRejectedValueOnce(engineError).mockResolvedValueOnce(current);

  const rerun = start(loaded);
  const cleanup = rerun();

  await vi.waitFor(() => expect(errorMock).toHaveBeenCalledWith("Particles: error loading particles", engineError));
  expect(loaded).not.toHaveBeenCalled();
  cleanup();

  const cleanupCurrent = rerun();

  await vi.waitFor(() => expect(errorMock).toHaveBeenCalledWith("Particles: error in loaded callback", callbackError));
  expect(loaded).toHaveBeenCalledExactlyOnceWith(current);
  cleanupCurrent();
  expect(current.destroy).toHaveBeenCalledOnce();
});

it("disposes a result that arrives after the task was replaced", async () => {
  const stale = { destroy: vi.fn() },
    current = { destroy: vi.fn() },
    pending = Promise.withResolvers<typeof stale>(),
    loaded = vi.fn();

  loadMock.mockReturnValueOnce(pending.promise).mockResolvedValueOnce(current);

  const rerun = start(loaded);
  const cleanup = rerun();

  await vi.waitFor(() => expect(loadMock).toHaveBeenCalledOnce());
  cleanup();
  const cleanupCurrent = rerun();
  await vi.waitFor(() => expect(loaded).toHaveBeenCalledExactlyOnceWith(current));

  pending.resolve(stale);

  await vi.waitFor(() => expect(stale.destroy).toHaveBeenCalledOnce());
  expect(current.destroy).not.toHaveBeenCalled();
  expect(loaded).toHaveBeenCalledOnce();
  cleanupCurrent();
  expect(current.destroy).toHaveBeenCalledOnce();
});

it("keys the canvas by the scene id", () => {
  for (const id of ["first", "second"]) {
    expect(Particles({ engine, id })).toMatchObject({ children: { key: id } });
  }
});
