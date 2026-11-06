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
    component.ngOnDestroy();
  });

  it("releases a single-owner container on refire and destroy", async () => {
    confettiMock.mockClear();
    containerMock.destroy.mockClear();

    const nextContainer = { destroy: vi.fn() },
      component = createComponent();

    confettiMock.mockResolvedValueOnce(containerMock).mockResolvedValueOnce(nextContainer);

    component.ngAfterViewInit();

    await vi.waitFor(() => {
      expect(confettiMock).toHaveBeenCalledTimes(1);
    });

    component.id = "another-confetti";
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

    expect(containerMock.destroy).toHaveBeenCalledTimes(1);
    expect(nextContainer.destroy).not.toHaveBeenCalled();

    component.ngOnDestroy();

    expect(nextContainer.destroy).toHaveBeenCalledTimes(1);
  });

  it("destroys a container returned after the component is destroyed", async () => {
    confettiMock.mockClear();
    containerMock.destroy.mockClear();

    let resolveConfetti: ((container: typeof containerMock) => void) | undefined;
    const pendingResult = new Promise<typeof containerMock>(resolve => {
      resolveConfetti = resolve;
    });
    const component = createComponent();

    confettiMock.mockReturnValueOnce(pendingResult);

    component.ngAfterViewInit();
    component.ngOnDestroy();
    resolveConfetti?.(containerMock);

    await vi.waitFor(() => {
      expect(containerMock.destroy).toHaveBeenCalledTimes(1);
    });
  });

  it("does not destroy a pending container while another component awaits it", async () => {
    confettiMock.mockClear();
    containerMock.destroy.mockClear();

    let resolveFirst: ((container: typeof containerMock) => void) | undefined,
      resolveSecond: ((container: typeof containerMock) => void) | undefined;
    const firstResult = new Promise<typeof containerMock>(resolve => {
        resolveFirst = resolve;
      }),
      secondResult = new Promise<typeof containerMock>(resolve => {
        resolveSecond = resolve;
      }),
      abandonedComponent = createComponent(),
      liveComponent = createComponent();

    confettiMock.mockReturnValueOnce(firstResult).mockReturnValueOnce(secondResult);

    abandonedComponent.ngAfterViewInit();
    liveComponent.ngAfterViewInit();
    abandonedComponent.ngOnDestroy();

    resolveFirst?.(containerMock);

    await vi.waitFor(() => {
      expect(confettiMock).toHaveBeenCalledTimes(2);
    });

    expect(containerMock.destroy).not.toHaveBeenCalled();

    resolveSecond?.(containerMock);
    await Promise.resolve();

    expect(containerMock.destroy).not.toHaveBeenCalled();

    liveComponent.ngOnDestroy();

    expect(containerMock.destroy).toHaveBeenCalledTimes(1);
  });

  it("keeps an owned container alive while another component awaits it", async () => {
    confettiMock.mockClear();
    containerMock.destroy.mockClear();

    let resolveConfetti: ((container: typeof containerMock) => void) | undefined;
    const pendingResult = new Promise<typeof containerMock>(resolve => {
      resolveConfetti = resolve;
    });
    const ownerComponent = createComponent(),
      waitingComponent = createComponent();

    confettiMock.mockResolvedValueOnce(containerMock);

    ownerComponent.ngAfterViewInit();

    await vi.waitFor(() => {
      expect(confettiMock).toHaveBeenCalledTimes(1);
    });
    await Promise.resolve();

    confettiMock.mockReturnValueOnce(pendingResult);

    waitingComponent.ngAfterViewInit();

    await vi.waitFor(() => {
      expect(confettiMock).toHaveBeenCalledTimes(2);
    });

    ownerComponent.ngOnDestroy();

    expect(containerMock.destroy).not.toHaveBeenCalled();

    resolveConfetti?.(containerMock);
    await Promise.resolve();

    expect(containerMock.destroy).not.toHaveBeenCalled();

    waitingComponent.ngOnDestroy();

    expect(containerMock.destroy).toHaveBeenCalledTimes(1);
  });

  it("does not destroy a shared container when firing with a different id", async () => {
    confettiMock.mockClear();
    containerMock.destroy.mockClear();

    const nextContainer = { destroy: vi.fn() },
      component = createComponent(),
      sharedComponent = createComponent();

    confettiMock
      .mockResolvedValueOnce(containerMock)
      .mockResolvedValueOnce(containerMock)
      .mockResolvedValueOnce(nextContainer);

    component.ngAfterViewInit();

    await vi.waitFor(() => {
      expect(confettiMock).toHaveBeenCalledTimes(1);
    });

    sharedComponent.ngAfterViewInit();

    await vi.waitFor(() => {
      expect(confettiMock).toHaveBeenCalledTimes(2);
    });

    component.id = "another-confetti";
    component.ngOnChanges({
      fire: {
        currentValue: true,
        firstChange: false,
        isFirstChange: () => false,
        previousValue: false,
      },
    });

    await vi.waitFor(() => {
      expect(confettiMock).toHaveBeenCalledTimes(3);
    });

    expect(containerMock.destroy).not.toHaveBeenCalled();
    expect(nextContainer.destroy).not.toHaveBeenCalled();

    component.ngOnDestroy();

    expect(containerMock.destroy).not.toHaveBeenCalled();
    expect(nextContainer.destroy).toHaveBeenCalledTimes(1);

    sharedComponent.ngOnDestroy();

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

    component.ngOnDestroy();
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
