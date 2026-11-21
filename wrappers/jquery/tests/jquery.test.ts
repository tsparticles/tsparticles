/* eslint-disable */
import { beforeEach, describe, expect, it, vi } from "vitest";
import jQuery from "jquery";

type JQueryModule = typeof import("../src/particles.js");

const { initMock, loadMock, loadThemeMock } = vi.hoisted(() => {
  const loadTheme = vi.fn(async () => Promise.resolve());

  return {
    initMock: vi.fn(async () => Promise.resolve()),
    loadMock: vi.fn(async () => Promise.resolve({ loadTheme, destroy: vi.fn() })),
    loadThemeMock: loadTheme,
  };
});

const engine = { init: initMock, load: loadMock } as never;

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
  it("initializes the engine through $.particles(engine).init(registrar)", async () => {
    const module = await loadModule(),
      staticApi = jQuery.particles(engine),
      registrar = vi.fn(async () => Promise.resolve());

    await staticApi.init(registrar);

    expect(registrar).toHaveBeenCalledTimes(1);
    expect(registrar).toHaveBeenCalledWith(expect.objectContaining({ init: initMock }));
    expect(initMock).toHaveBeenCalledTimes(1);

    void module;
  });

  it("loads particles on the selected elements", async () => {
    await loadModule();

    await jQuery.particles(engine).init();

    const container = await jQuery('<div id="jquery-particles"></div>')
      .particles(engine)
      .load({
        particles: { number: { value: 3 } },
      });

    expect(loadMock).toHaveBeenCalledTimes(1);
    expect(loadMock).toHaveBeenCalledWith(
      expect.objectContaining({
        element: expect.objectContaining({ id: "jquery-particles" }),
        options: { particles: { number: { value: 3 } } },
      }),
    );
    expect(container).toBeDefined();
  });

  it("keeps anonymous selected elements independent", async () => {
    await loadModule();

    await jQuery.particles(engine).init();

    const hosts = jQuery("<div></div><div></div>");

    await hosts.particles(engine).load({ particles: { number: { value: 1 } } });

    expect(loadMock).toHaveBeenCalledTimes(2);
    expect(loadMock).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({ element: hosts[0], options: { particles: { number: { value: 1 } } } }),
    );
    expect(loadMock).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({ element: hosts[1], options: { particles: { number: { value: 1 } } } }),
    );
    expect(hosts[0]?.id).toBe("");
    expect(hosts[1]?.id).toBe("");
  });

  it("loads particles from a url through ajax", async () => {
    await loadModule();

    await jQuery.particles(engine).init();

    await jQuery('<div id="jquery-ajax"></div>').particles(engine).ajax("https://example.com/particles.json");

    expect(loadMock).toHaveBeenCalledWith(
      expect.objectContaining({
        element: expect.objectContaining({ id: "jquery-ajax" }),
        url: "https://example.com/particles.json",
      }),
    );
  });

  it("applies a theme to the loaded container", async () => {
    await loadModule();

    await jQuery.particles(engine).init();

    const result = jQuery('<div id="jquery-theme"></div>').particles(engine);

    await result.load({ particles: { number: { value: 1 } } });
    await result.setTheme("dark");

    expect(loadThemeMock).toHaveBeenCalledWith("dark");
  });
});
