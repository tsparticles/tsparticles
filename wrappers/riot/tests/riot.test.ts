/* eslint-disable */
import { afterEach, describe, expect, it, vi } from "vitest";
import { readFileSync, unlinkSync, writeFileSync } from "node:fs";
import { compile } from "@riotjs/compiler";
import { pathToFileURL } from "node:url";
import { resolve } from "node:path";

const { initMock, loadMock } = vi.hoisted(() => ({
  initMock: vi.fn(async () => Promise.resolve()),
  loadMock: vi.fn(),
}));

vi.mock("@tsparticles/engine", () => ({
  tsParticles: {
    init: initMock,
    load: loadMock,
  },
}));

const engine = { init: initMock, load: loadMock };

const collectedFiles: string[] = [];

let counter = 0;

async function loadRiotModule(): Promise<{
  initParticlesEngine: (engine: unknown, cb?: (engine: unknown) => Promise<void> | void) => Promise<void>;
  isParticlesEngineInitialized: (engine: unknown) => boolean;
  waitForParticlesEngineInitialization: (engine: unknown) => Promise<void>;
}> {
  const source = readFileSync(resolve(process.cwd(), "src/riot-particles.riot"), "utf8"),
    { code } = compile(source, { file: "riot-particles.riot", format: "esm" }),
    file = resolve("tests", `.riot-particles-${counter++}.mjs`);

  writeFileSync(file, code);
  collectedFiles.push(file);

  return (await import(pathToFileURL(file).href)) as unknown as Awaited<ReturnType<typeof loadRiotModule>>;
}

afterEach(() => {
  while (collectedFiles.length > 0) {
    const file = collectedFiles.pop();

    if (file) {
      try {
        unlinkSync(file);
      } catch {}
    }
  }
});

describe("riot-particles component", () => {
  it("initializes the engine once and exposes the initialization state", async () => {
    const tsParticles = engine;

    (tsParticles.init as ReturnType<typeof vi.fn>).mockClear();

    const module = await loadRiotModule(),
      init = vi.fn(async () => Promise.resolve());

    await module.initParticlesEngine(engine, init);

    expect(init).toHaveBeenCalledTimes(1);
    expect(init).toHaveBeenCalledWith(tsParticles);
    expect(tsParticles.init).toHaveBeenCalledTimes(1);
    expect(module.isParticlesEngineInitialized(engine)).toBe(true);
  });

  it("does not re-run the init when already initialized", async () => {
    const module = await loadRiotModule(),
      init = vi.fn(async () => Promise.resolve());

    await module.initParticlesEngine(engine, init);
    await module.initParticlesEngine(engine, init);

    expect(init).toHaveBeenCalledTimes(1);
  });

  it("shares pending initialization when the init callback changes across the app lifecycle", async () => {
    const module = await loadRiotModule(),
      first = module.initParticlesEngine(engine, async () => Promise.resolve());

    await expect(module.initParticlesEngine(engine, async () => Promise.resolve())).resolves.toBeUndefined();

    await first;
  });

  it("resolves the wait helper", async () => {
    const module = await loadRiotModule();

    const waiting = module.waitForParticlesEngineInitialization(engine);
    await module.initParticlesEngine(engine);
    await expect(waiting).resolves.toBeUndefined();
  });

  it("keeps container and reload state per component instance", async () => {
    const { component } = await import("riot"),
      module = await loadRiotModule();

    await module.initParticlesEngine(engine, async () => Promise.resolve());

    loadMock.mockReset();

    const containers: { destroy: ReturnType<typeof vi.fn> }[] = [];

    loadMock.mockImplementation(async ({ id }: { id: string }) => {
      const container = { destroy: vi.fn(), id, loadTheme: vi.fn() };

      containers.push(container);

      return container;
    });

    const mount = component((module as unknown as { default: never }).default),
      first = mount(document.createElement("div"), { engine, id: "first", options: {} }),
      second = mount(document.createElement("div"), { engine, id: "second", options: {} });

    await new Promise(resolve => setTimeout(resolve, 0));

    expect(loadMock).toHaveBeenCalledTimes(2);
    expect(containers).toHaveLength(2);

    first.unmount();

    expect(containers[0]!.destroy).toHaveBeenCalledTimes(1);
    expect(containers[1]!.destroy).not.toHaveBeenCalled();

    second.unmount();

    expect(containers[1]!.destroy).toHaveBeenCalledTimes(1);
  });
});
