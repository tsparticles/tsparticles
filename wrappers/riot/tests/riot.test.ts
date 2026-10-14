/* eslint-disable */
import { compile } from "@riotjs/compiler";
import { readFileSync, unlinkSync, writeFileSync } from "node:fs";
import { pathToFileURL } from "node:url";
import { resolve } from "node:path";
import { afterEach, describe, expect, it, vi } from "vitest";

const { initMock } = vi.hoisted(() => ({
  initMock: vi.fn(async () => Promise.resolve()),
}));

vi.mock("@tsparticles/engine", () => ({
  tsParticles: {
    init: initMock,
  },
}));

const collectedFiles: string[] = [];

let counter = 0;

async function loadRiotModule(): Promise<{
  initParticlesEngine: (cb?: (engine: unknown) => Promise<void> | void) => Promise<void>;
  isParticlesEngineInitialized: () => boolean;
  waitForParticlesEngineInitialization: () => Promise<void>;
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
    const { tsParticles } = await import("@tsparticles/engine");

    (tsParticles.init as ReturnType<typeof vi.fn>).mockClear();

    const module = await loadRiotModule(),
      init = vi.fn(async () => Promise.resolve());

    await module.initParticlesEngine(init);

    expect(init).toHaveBeenCalledTimes(1);
    expect(init).toHaveBeenCalledWith(tsParticles);
    expect(tsParticles.init).toHaveBeenCalledTimes(1);
    expect(module.isParticlesEngineInitialized()).toBe(true);
  });

  it("does not re-run the init when already initialized", async () => {
    const module = await loadRiotModule(),
      init = vi.fn(async () => Promise.resolve());

    await module.initParticlesEngine(init);
    await module.initParticlesEngine(init);

    expect(init).toHaveBeenCalledTimes(1);
  });

  it("throws when the init callback changes across the app lifecycle", async () => {
    const module = await loadRiotModule(),
      first = module.initParticlesEngine(async () => Promise.resolve());

    await expect(module.initParticlesEngine(async () => Promise.resolve())).rejects.toThrow(
      /stable across the app lifecycle/i,
    );

    await first;
  });

  it("resolves the wait helper", async () => {
    const module = await loadRiotModule();

    await expect(module.waitForParticlesEngineInitialization()).resolves.toBeUndefined();
  });
});
