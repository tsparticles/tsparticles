/* eslint-disable */
import jQuery from "jquery";
import { beforeEach, describe, expect, it, vi } from "vitest";

type JQueryModule = typeof import("../src/particles.js");

const { initMock, loadMock, loadThemeMock } = vi.hoisted(() => {
  const loadTheme = vi.fn(async () => Promise.resolve());

  return {
    initMock: vi.fn(async () => Promise.resolve()),
    loadMock: vi.fn(async () => Promise.resolve({ loadTheme, destroy: vi.fn() })),
    loadThemeMock: loadTheme,
  };
});

vi.mock("@tsparticles/engine", () => ({
  getRandom: () => 0,
  tsParticles: {
    init: initMock,
    load: loadMock,
  },
}));

(globalThis as Record<string, unknown>).$ = jQuery;
(globalThis as Record<string, unknown>).jQuery = jQuery;

async function loadModule(): Promise<JQueryModule> {
  vi.resetModules();

  return await import("../src/particles.js");
}

beforeEach(() => {
  initMock.mockClear();
  loadMock.mockClear();
  loadThemeMock.mockClear();
});

describe("jquery $.particles", () => {
  it("initializes the engine through $.particles().init(registrar)", async () => {
    const module = await loadModule(),
      staticApi = jQuery.particles(),
      registrar = vi.fn(async () => Promise.resolve());

    await staticApi.init(registrar);

    expect(registrar).toHaveBeenCalledTimes(1);
    expect(registrar).toHaveBeenCalledWith(expect.objectContaining({ init: initMock }));
    expect(initMock).toHaveBeenCalledTimes(1);

    void module;
  });

  it("loads particles on the selected elements", async () => {
    await loadModule();

    await jQuery.particles().init();

    const container = await jQuery('<div id="jquery-particles"></div>')
      .particles()
      .load({
        particles: { number: { value: 3 } },
      });

    expect(loadMock).toHaveBeenCalledTimes(1);
    expect(loadMock).toHaveBeenCalledWith(
      expect.objectContaining({
        id: "jquery-particles",
        options: { particles: { number: { value: 3 } } },
      }),
    );
    expect(container).toBeDefined();
  });

  it("loads particles from a url through ajax", async () => {
    await loadModule();

    await jQuery.particles().init();

    await jQuery('<div id="jquery-ajax"></div>').particles().ajax("https://example.com/particles.json");

    expect(loadMock).toHaveBeenCalledWith(
      expect.objectContaining({
        id: "jquery-ajax",
        url: "https://example.com/particles.json",
      }),
    );
  });

  it("applies a theme to the loaded container", async () => {
    await loadModule();

    await jQuery.particles().init();

    const result = jQuery('<div id="jquery-theme"></div>').particles();

    await result.load({ particles: { number: { value: 1 } } });
    await result.setTheme("dark");

    expect(loadThemeMock).toHaveBeenCalledWith("dark");
  });
});
