/* eslint-disable */
import "@angular/compiler";
import { describe, expect, it, vi } from "vitest";

const { containerMock, loadMock } = vi.hoisted(() => {
  const containerMock = {
    destroy: vi.fn(),
    loadTheme: vi.fn(async () => Promise.resolve()),
  };

  return {
    containerMock,
    loadMock: vi.fn(async () => containerMock),
  };
});

vi.mock("@tsparticles/engine", () => ({
  tsParticles: {
    load: loadMock,
  },
}));

import { NgxParticlesComponent } from "../projects/ng-particles/src/lib/ng-particles.component.js";
import type { NgParticlesService } from "../projects/ng-particles/src/lib/ng-particles.service.js";

function createService(): NgParticlesService {
  return {
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
