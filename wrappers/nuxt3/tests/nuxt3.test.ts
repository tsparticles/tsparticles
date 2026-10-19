/* eslint-disable */
import { beforeEach, describe, expect, it, vi } from "vitest";

const { addPluginMock, addTemplateMock, moduleConfigs } = vi.hoisted(() => ({
  addPluginMock: vi.fn(),
  addTemplateMock: vi.fn(() => ({ dst: "/virtual/tsparticles.client.mjs" })),
  moduleConfigs: [] as Record<string, unknown>[],
}));

vi.mock("@nuxt/kit", () => ({
  addPlugin: addPluginMock,
  addTemplate: addTemplateMock,
  defineNuxtModule: (config: Record<string, unknown>) => {
    moduleConfigs.push(config);

    const moduleFn = ((inlineOptions: Record<string, unknown> = {}) => {
      (config["setup"] as (options: Record<string, unknown>) => void)({
        ...(config["defaults"] as Record<string, unknown>),
        ...inlineOptions,
      });
    }) as ((options?: Record<string, unknown>) => void) & Record<string, unknown>;

    moduleFn["meta"] = config["meta"];
    moduleFn["defaults"] = config["defaults"];

    return moduleFn;
  },
}));

type NuxtModule = ((options?: { initPath?: string }) => void) & { meta: Record<string, unknown> };

async function loadModule(): Promise<NuxtModule> {
  vi.resetModules();
  moduleConfigs.length = 0;

  return (await import("../lib/index.js")).default as unknown as NuxtModule;
}

beforeEach(() => {
  addPluginMock.mockClear();
  addTemplateMock.mockClear();
});

describe("@tsparticles/nuxt3 module", () => {
  it("declares its meta name, config key and compatibility", async () => {
    await loadModule();

    expect(moduleConfigs[0]?.["meta"]).toEqual({
      name: "@tsparticles/nuxt3",
      configKey: "tsparticles",
      compatibility: { nuxt: ">=3.0.0 <4" },
    });
  });

  it("registers a client plugin using the configured init path", async () => {
    const module = await loadModule();

    module({ initPath: "~/custom/init" });

    expect(addTemplateMock).toHaveBeenCalledTimes(1);

    const templateArg = addTemplateMock.mock.calls[0]?.[0] as unknown as {
      filename: string;
      getContents: () => string;
    };

    expect(templateArg.filename).toBe("tsparticles.client.mjs");
    expect(templateArg.getContents()).toContain("~/custom/init");
    expect(templateArg.getContents()).toContain("registerParticles");

    expect(addPluginMock).toHaveBeenCalledWith({ src: "/virtual/tsparticles.client.mjs", mode: "client" });
  });

  it("falls back to the default init path", async () => {
    const module = await loadModule();

    module();

    const templateArg = addTemplateMock.mock.calls[0]?.[0] as unknown as { getContents: () => string };

    expect(templateArg.getContents()).toContain("~/utils/particlesInit");
  });
});
