/* eslint-disable */
import "@angular/compiler";
import { describe, expect, it, vi } from "vitest";

const { confettiMock, containerMock } = vi.hoisted(() => {
  const containerMock = {
    destroy: vi.fn(),
  };

  return {
    confettiMock: vi.fn(async () => containerMock),
    containerMock,
  };
});

vi.mock("@tsparticles/confetti", () => ({
  confetti: confettiMock,
  default: confettiMock,
}));

import { NgxConfettiComponent } from "../projects/ng-confetti/src/lib/ng-confetti.component.js";

function createComponent(platformId = "browser"): NgxConfettiComponent {
  return new NgxConfettiComponent(platformId);
}

describe("NgxConfettiComponent", () => {
  it("does not fire on the server platform", () => {
    confettiMock.mockClear();

    const component = createComponent("server");

    component.ngAfterViewInit();

    expect(confettiMock).not.toHaveBeenCalled();
  });

  it("fires with the configured id and options", async () => {
    confettiMock.mockClear();

    const component = createComponent(),
      options = { count: 50 };

    component.id = "my-confetti";
    component.options = options;

    component.ngAfterViewInit();

    await vi.waitFor(() => {
      expect(confettiMock).toHaveBeenCalledTimes(1);
    });

    expect(confettiMock).toHaveBeenCalledWith("my-confetti", options);
  });

  it("destroys the container on destroy", async () => {
    confettiMock.mockClear();
    containerMock.destroy.mockClear();

    const component = createComponent();

    component.ngAfterViewInit();

    await vi.waitFor(() => {
      expect(confettiMock).toHaveBeenCalledTimes(1);
    });

    component.ngOnDestroy();

    expect(containerMock.destroy).toHaveBeenCalledTimes(1);
  });

  it("re-fires when the fire input changes", async () => {
    confettiMock.mockClear();

    const component = createComponent();

    component.ngAfterViewInit();

    await vi.waitFor(() => {
      expect(confettiMock).toHaveBeenCalledTimes(1);
    });

    component.ngOnChanges({
      fire: {
        currentValue: true,
        firstChange: false,
        isFirstChange: () => false,
        previousValue: false,
      },
    });

    await vi.waitFor(() => {
      expect(confettiMock).toHaveBeenCalledTimes(2);
    });
  });

  it("does not react to changes on the server platform", () => {
    confettiMock.mockClear();

    const component = createComponent("server");

    component.ngOnChanges({
      fire: {
        currentValue: true,
        firstChange: false,
        isFirstChange: () => false,
        previousValue: false,
      },
    });

    expect(confettiMock).not.toHaveBeenCalled();
  });
});
