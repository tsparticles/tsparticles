/* eslint-disable */
import { describe, expect, it, vi } from "vitest";
import { createApp } from "vue";

type ProviderModule = typeof import("../src/components/particles-provider.js");

async function loadModule(): Promise<{ module: ProviderModule; engine: { init: ReturnType<typeof vi.fn> } }> {
  vi.resetModules();

  delete (globalThis as Record<string, unknown>)["__tsparticles_vue3_init_state__"];

  const module = (await import("../src/components/particles-provider.js")) as ProviderModule,
    engine = { init: vi.fn(async () => undefined) };

  engine.init.mockClear();

  return { module, engine };
}

describe("vue3 particles provider", () => {
  it("creates a reactive context starting unloaded", async () => {
    const { module, engine } = await loadModule(),
      context = module.createParticlesProviderContext(engine as never);

    expect(context.loaded).toBe(false);
  });

  it("calls the init callback and the engine init, then marks the context as loaded", async () => {
    const { module, engine } = await loadModule(),
      init = vi.fn(async () => Promise.resolve()),
      context = module.createParticlesProviderContext(engine as never);

    await module.initParticlesProvider({} as never, context, init);

    expect(init).toHaveBeenCalledTimes(1);
    expect(init).toHaveBeenCalledWith(engine);
    expect(engine.init).toHaveBeenCalledTimes(1);
    expect(context.loaded).toBe(true);
  });

  it("does not re-run the init when called again after being loaded", async () => {
    const { module, engine } = await loadModule(),
      init = vi.fn(async () => Promise.resolve()),
      context = module.createParticlesProviderContext(engine as never);

    await module.initParticlesProvider({} as never, context, init);
    await module.initParticlesProvider({} as never, context, init);

    expect(init).toHaveBeenCalledTimes(1);
  });

  it("isolates two contexts with distinct engines", async () => {
    const { module, engine } = await loadModule(),
      other = { init: vi.fn(async () => undefined) };
    const first = module.createParticlesProviderContext(engine as never),
      second = module.createParticlesProviderContext(other as never);
    await module.initParticlesProvider({} as never, first);
    expect(first.loaded).toBe(true);
    expect(second.loaded).toBe(false);
    await module.initParticlesProvider({} as never, second);
    expect(other.init).toHaveBeenCalledOnce();
    expect(first.engine).toBe(engine);
  });

  it("resolves the context through useParticlesProvider inside an app", async () => {
    const { module, engine } = await loadModule(),
      context = module.createParticlesProviderContext(engine as never),
      app = createApp({ render: () => null }),
      resolved = app.runWithContext(() => {
        app.provide(module.particlesProviderKey, context);

        return module.useParticlesProvider();
      });

    expect(resolved).toBe(context);
  });

  it("throws from useParticlesProvider when the plugin is not registered", async () => {
    const { module, engine } = await loadModule(),
      app = createApp({ render: () => null });

    expect(() =>
      app.runWithContext(() => {
        return module.useParticlesProvider();
      }),
    ).toThrow(/requires app.use/i);
  });
});
