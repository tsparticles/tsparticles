/* eslint-disable */
import { describe, expect, it, vi } from "vitest";

type Nuxt2Module = ((this: Nuxt2Context, options?: { initPath?: string }) => void) & {
  meta: { name: string; configKey: string };
};

interface Nuxt2Context {
  options: { tsparticles?: { initPath?: string } };
  addPlugin: ReturnType<typeof vi.fn>;
}

async function loadModule(): Promise<Nuxt2Module> {
  vi.resetModules();

  const imported: Record<string, unknown> = await import("../lib/index.js");

  return (imported["default"] ?? imported) as unknown as Nuxt2Module;
}

function createContext(tsparticles?: { initPath?: string }): Nuxt2Context {
  return {
    options: { tsparticles },
    addPlugin: vi.fn(),
  };
}

describe("@tsparticles/nuxt2 module", () => {
  it("exposes its meta name and config key", async () => {
    const module = await loadModule();

    expect(module.meta).toEqual({ name: "@tsparticles/nuxt2", configKey: "tsparticles" });
  });

  it("registers the client plugin with the default init path", async () => {
    const module = await loadModule(),
      context = createContext();

    module.call(context);

    expect(context.addPlugin).toHaveBeenCalledWith(
      expect.objectContaining({
        fileName: "tsparticles.client.js",
        mode: "client",
        options: { initPath: "~/utils/particlesInit" },
      }),
    );
  });

  it("prefers the module option init path", async () => {
    const module = await loadModule(),
      context = createContext({ initPath: "~/nuxt/init" });

    module.call(context, { initPath: "~/module/init" });

    expect(context.addPlugin).toHaveBeenCalledWith(expect.objectContaining({ options: { initPath: "~/module/init" } }));
  });

  it("falls back to the nuxt config init path", async () => {
    const module = await loadModule(),
      context = createContext({ initPath: "~/nuxt/init" });

    module.call(context);

    expect(context.addPlugin).toHaveBeenCalledWith(expect.objectContaining({ options: { initPath: "~/nuxt/init" } }));
  });
});
