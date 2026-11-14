/* eslint-disable */
import "@angular/compiler";
import { describe, expect, it, vi } from "vitest";

const { containerMock, errorMock, loadMock } = vi.hoisted(() => {
  const containerMock = {
    destroy: vi.fn(),
    loadTheme: vi.fn(async () => Promise.resolve()),
  };

  return {
    containerMock,
    errorMock: vi.fn(),
    loadMock: vi.fn(async () => containerMock),
  };
});

vi.mock("@tsparticles/engine", () => ({
  getLogger: () => ({ error: errorMock }),
  tsParticles: {
    load: loadMock,
  },
}));

import type { NgParticlesService } from "../projects/ng-particles/src/lib/ng-particles.service.js";
import { NgxParticlesComponent } from "../projects/ng-particles/src/lib/ng-particles.component.js";

function createService(): NgParticlesService {
  return {
    engine: { load: loadMock },
    assertInitialized: vi.fn(),
    init: vi.fn(async () => Promise.resolve()),
    loaded: true,
    waitForInitialization: vi.fn(async () => Promise.resolve()),
  } as unknown as NgParticlesService;
}

function createComponent(platformId = "browser"): {
  component: NgxParticlesComponent;
  service: NgParticlesService;
  loaded: ReturnType<typeof vi.fn>;
} {
  const service = createService(),
    component = new NgxParticlesComponent(platformId, service),
    loaded = vi.fn();

  component.particlesLoaded.subscribe(loaded);

  return { component, service, loaded };
}

describe("NgxParticlesComponent", () => {
  it("does not load on the server platform", () => {
    loadMock.mockClear();

    const { component } = createComponent("server");

    component.ngAfterViewInit();

    expect(loadMock).not.toHaveBeenCalled();
  });

  it("loads the engine instance with the configured id, options and url", async () => {
    loadMock.mockClear();
    errorMock.mockClear();

    const { component, loaded } = createComponent(),
      options = { particles: { number: { value: 2 } } };

    component.id = "ng-particles";
    component.options = options;
    component.url = "https://example.com/config.json";

    component.ngAfterViewInit();

    await vi.waitFor(() => {
      expect(loadMock).toHaveBeenCalledTimes(1);
    });

    expect(loadMock).toHaveBeenCalledWith({
      id: "ng-particles",
      options,
      url: "https://example.com/config.json",
    });

    await vi.waitFor(() => {
      expect(loaded).toHaveBeenCalledWith(containerMock);
    });
  });

  it("reports a rejected load without emitting particlesLoaded", async () => {
    loadMock.mockClear();
    errorMock.mockClear();

    const { component, loaded } = createComponent(),
      loadError = new Error("load failed");

    loadMock.mockRejectedValueOnce(loadError);

    component.ngAfterViewInit();

    await vi.waitFor(() => {
      expect(errorMock).toHaveBeenCalledWith("ng-particles: error loading particles", loadError);
    });
    expect(loaded).not.toHaveBeenCalled();
  });

  it.each(["id", "options"] as const)("discards an older load when %s changes", async input => {
    loadMock.mockClear();

    const { component, loaded } = createComponent(),
      staleContainer = { destroy: vi.fn(), loadTheme: vi.fn(async () => Promise.resolve()) },
      currentContainer = { destroy: vi.fn(), loadTheme: vi.fn(async () => Promise.resolve()) };

    let resolveStale: (container: typeof staleContainer) => void = () => undefined;

    loadMock.mockImplementationOnce(
      () =>
        new Promise(resolve => {
          resolveStale = resolve;
        }),
    );
    loadMock.mockImplementationOnce(async () => currentContainer);

    component.id = "first";
    component.ngAfterViewInit();

    await vi.waitFor(() => {
      expect(loadMock).toHaveBeenCalledTimes(1);
    });

    const previousValue = component[input];

    if (input === "id") {
      component.id = "second";
    } else {
      component.options = { particles: { number: { value: 2 } } };
    }

    component.ngOnChanges({
      [input]: {
        currentValue: component[input],
        firstChange: false,
        isFirstChange: () => false,
        previousValue,
      },
    });

    await vi.waitFor(() => {
      expect(loaded).toHaveBeenCalledWith(currentContainer);
    });

    expect(loadMock).toHaveBeenLastCalledWith({ id: component.id, options: component.options, url: undefined });

    resolveStale(staleContainer);

    await vi.waitFor(() => {
      expect(staleContainer.destroy).toHaveBeenCalledOnce();
    });
    expect(loaded).toHaveBeenCalledTimes(1);

    component.ngOnDestroy();

    expect(currentContainer.destroy).toHaveBeenCalledOnce();
  });

  it("destroys the container on destroy", async () => {
    loadMock.mockClear();
    containerMock.destroy.mockClear();

    const { component } = createComponent();

    component.ngAfterViewInit();

    await vi.waitFor(() => {
      expect(loadMock).toHaveBeenCalledTimes(1);
    });

    component.ngOnDestroy();

    expect(containerMock.destroy).toHaveBeenCalledTimes(1);
  });

  it("reloads when the options input changes", async () => {
    loadMock.mockClear();

    const { component } = createComponent();

    component.ngAfterViewInit();

    await vi.waitFor(() => {
      expect(loadMock).toHaveBeenCalledTimes(1);
    });

    component.ngOnChanges({
      options: {
        currentValue: { particles: { number: { value: 5 } } },
        firstChange: false,
        isFirstChange: () => false,
        previousValue: undefined,
      },
    });

    await vi.waitFor(() => {
      expect(loadMock).toHaveBeenCalledTimes(2);
    });
  });

  it("applies the theme to the current container", async () => {
    loadMock.mockClear();
    containerMock.loadTheme.mockClear();

    const { component } = createComponent();

    component.ngAfterViewInit();

    await vi.waitFor(() => {
      expect(loadMock).toHaveBeenCalledTimes(1);
    });

    component.ngOnChanges({
      theme: {
        currentValue: "dark",
        firstChange: false,
        isFirstChange: () => false,
        previousValue: undefined,
      },
    });

    expect(containerMock.loadTheme).toHaveBeenCalledWith("dark");
  });

  it("does not react to changes on the server platform", () => {
    loadMock.mockClear();

    const { component } = createComponent("server");

    component.ngOnChanges({
      options: {
        currentValue: {},
        firstChange: false,
        isFirstChange: () => false,
        previousValue: undefined,
      },
    });

    expect(loadMock).not.toHaveBeenCalled();
  });
});
