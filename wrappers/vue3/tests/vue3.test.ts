/* eslint-disable */
import { createApp } from "vue";
import { describe, expect, it, vi } from "vitest";

vi.mock("@tsparticles/engine", () => ({
  tsParticles: {
    init: vi.fn(async () => Promise.resolve()),
  },
}));

type ProviderModule = typeof import("../src/components/particles-provider.js");

async function loadModule(): Promise<{ module: ProviderModule; engine: { init: ReturnType<typeof vi.fn> } }> {
  vi.resetModules();

  delete (globalThis as Record<string, unknown>)["__tsparticles_vue3_init_state__"];

  const module = (await import("../src/components/particles-provider.js")) as ProviderModule,
    engine = (await import("@tsparticles/engine")).tsParticles as unknown as { init: ReturnType<typeof vi.fn> };

  engine.init.mockClear();

  return { module, engine };
}

describe("vue3 particles provider", () => {
  it("creates a reactive context starting unloaded", async () => {
    const { module } = await loadModule(),
      context = module.createParticlesProviderContext();

    expect(context.loaded).toBe(false);
  });

  it("calls the init callback and the engine init, then marks the context as loaded", async () => {
    const { module, engine } = await loadModule(),
      init = vi.fn(async () => Promise.resolve()),
      context = module.createParticlesProviderContext();

    await module.initParticlesProvider({} as never, context, init);

    expect(init).toHaveBeenCalledTimes(1);
    expect(init).toHaveBeenCalledWith(engine);
    expect(engine.init).toHaveBeenCalledTimes(1);
    expect(context.loaded).toBe(true);
  });

  it("does not re-run the init when called again after being loaded", async () => {
    const { module } = await loadModule(),
      init = vi.fn(async () => Promise.resolve()),
      context = module.createParticlesProviderContext();

    await module.initParticlesProvider({} as never, context, init);
    await module.initParticlesProvider({} as never, context, init);

    expect(init).toHaveBeenCalledTimes(1);
  });

  it("throws when the init callback changes while initializing", async () => {
    const { module } = await loadModule(),
      init = vi.fn(async () => Promise.resolve()),
      first = module.initParticlesProvider({} as never, module.createParticlesProviderContext(), init);

    expect(() =>
      module.initParticlesProvider({} as never, module.createParticlesProviderContext(), async () => Promise.resolve()),
    ).toThrow(/stable across the app lifecycle/i);

    await first;
  });

  it("resolves the context through useParticlesProvider inside an app", async () => {
    const { module } = await loadModule(),
      context = module.createParticlesProviderContext(),
      app = createApp({ render: () => null }),
      resolved = app.runWithContext(() => {
        app.provide(module.particlesProviderKey, context);

        return module.useParticlesProvider();
      });

    expect(resolved).toBe(context);
  });

  it("throws from useParticlesProvider when the plugin is not registered", async () => {
    const { module } = await loadModule(),
      app = createApp({ render: () => null });

    expect(() =>
      app.runWithContext(() => {
        return module.useParticlesProvider();
      }),
    ).toThrow(/plugin is required/i);
  });
});
