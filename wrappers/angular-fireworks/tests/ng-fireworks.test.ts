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
  fireworks: fireworksMock,
  default: fireworksMock,
}));

import { NgxFireworksComponent } from "../projects/ng-fireworks/src/lib/ng-fireworks.component.js";

function createComponent(platformId = "browser"): NgxFireworksComponent {
  return new NgxFireworksComponent(platformId);
}

describe("NgxFireworksComponent", () => {
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
