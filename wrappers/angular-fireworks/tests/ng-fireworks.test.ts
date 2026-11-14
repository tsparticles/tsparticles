/* eslint-disable */
import "@angular/compiler";
import { describe, expect, it, vi } from "vitest";

const { fireworksMock, instanceMock } = vi.hoisted(() => {
  const instanceMock = {
    destroy: vi.fn(),
    play: vi.fn(async () => Promise.resolve()),
  };

  return {
    fireworksMock: vi.fn(async () => instanceMock),
    instanceMock,
  };
});

vi.mock("@tsparticles/fireworks", () => ({
  createFireworks: () => fireworksMock,
  default: fireworksMock,
}));

import { NgxFireworksComponent } from "../projects/ng-fireworks/src/lib/ng-fireworks.component.js";

function createComponent(platformId = "browser"): NgxFireworksComponent {
  const component = new NgxFireworksComponent(platformId);
  component.engine = {} as never;
  return component;
}

describe("NgxFireworksComponent", () => {
  it("discards a pending result when the engine changes", async () => {
    fireworksMock.mockClear();
    let resolveOld: (value: any) => void = () => {};
    const oldResult = new Promise<any>(resolve => {
      resolveOld = resolve;
    });
    const oldContainer = { destroy: vi.fn(), play: vi.fn() };
    const nextContainer = { destroy: vi.fn(), play: vi.fn() };
    fireworksMock.mockReturnValueOnce(oldResult).mockResolvedValueOnce(nextContainer);
    const component = createComponent();
    component.ngAfterViewInit();
    const previousEngine = component.engine;
    component.engine = {} as never;
    component.ngOnChanges({
      engine: {
        previousValue: previousEngine,
        currentValue: component.engine,
        firstChange: false,
        isFirstChange: () => false,
      },
    });
    await vi.waitFor(() => expect(fireworksMock).toHaveBeenCalledTimes(2));
    resolveOld(oldContainer);
    await vi.waitFor(() => expect(oldContainer.destroy).toHaveBeenCalledTimes(1));
    expect(nextContainer.destroy).not.toHaveBeenCalled();
    component.ngOnDestroy();
    expect(nextContainer.destroy).toHaveBeenCalledTimes(1);
  });

  it("does not start on the server platform", () => {
    fireworksMock.mockClear();

    const component = createComponent("server");

    component.ngAfterViewInit();

    expect(fireworksMock).not.toHaveBeenCalled();
  });

  it("starts with the configured id and options and plays the instance", async () => {
    fireworksMock.mockClear();
    instanceMock.play.mockClear();

    const component = createComponent(),
      options = { count: 10 };

    component.id = "my-fireworks";
    component.options = options;

    component.ngAfterViewInit();

    await vi.waitFor(() => {
      expect(fireworksMock).toHaveBeenCalledTimes(1);
    });

    expect(fireworksMock).toHaveBeenCalledWith("my-fireworks", options);

    await vi.waitFor(() => {
      expect(instanceMock.play).toHaveBeenCalledTimes(1);
    });
  });

  it("destroys the instance on destroy", async () => {
    fireworksMock.mockClear();
    instanceMock.destroy.mockClear();

    const component = createComponent();

    component.ngAfterViewInit();

    await vi.waitFor(() => {
      expect(fireworksMock).toHaveBeenCalledTimes(1);
    });

    component.ngOnDestroy();

    expect(instanceMock.destroy).toHaveBeenCalledTimes(1);
  });

  it("restarts when the options input changes", async () => {
    fireworksMock.mockClear();

    const component = createComponent();

    component.ngAfterViewInit();

    await vi.waitFor(() => {
      expect(fireworksMock).toHaveBeenCalledTimes(1);
    });

    component.ngOnChanges({
      options: {
        currentValue: { count: 20 },
        firstChange: false,
        isFirstChange: () => false,
        previousValue: undefined,
      },
    });

    await vi.waitFor(() => {
      expect(fireworksMock).toHaveBeenCalledTimes(2);
    });
  });

  it("does not restart after destroy", async () => {
    fireworksMock.mockClear();

    const component = createComponent();

    component.ngAfterViewInit();

    await vi.waitFor(() => {
      expect(fireworksMock).toHaveBeenCalledTimes(1);
    });

    component.ngOnDestroy();

    component.ngOnChanges({
      options: {
        currentValue: { count: 30 },
        firstChange: false,
        isFirstChange: () => false,
        previousValue: undefined,
      },
    });

    expect(fireworksMock).toHaveBeenCalledTimes(1);
  });
});
