/* eslint-disable @typescript-eslint/no-magic-numbers */
import { type Container, EventType, tsParticles } from "@tsparticles/engine";
import { describe, expect, it, vi } from "vitest";
import { TestWindow } from "../Fixture/Window.js";
import { createCustomCanvas } from "../Fixture/CustomCanvas.js";

let id = 0;

/**
 * Loads a stopped container with a nonzero start delay.
 * @returns The stopped container.
 */
async function loadStoppedContainer(): Promise<Container> {
  vi.useFakeTimers();
  try {
    globalThis.window = TestWindow as unknown as Window & typeof globalThis;
    id += 1;

    const loading = tsParticles.load({
      id: `cancel-delayed-start-${id.toString()}`,
      element: createCustomCanvas(800, 600) as unknown as HTMLCanvasElement,
      options: { delay: 0.02, autoPlay: false, particles: { number: { value: 0 } } },
    });

    let loaded = false;
    void loading.then(() => {
      loaded = true;
    });
    await vi.waitFor(() => {
      expect(loaded).toBe(true);
    });
    const container = await loading;

    if (!container) {
      throw new Error("Container not initialized");
    }
    container.stop();

    return container;
  } finally {
    vi.useRealTimers();
  }
}

describe("delayed container start cancellation", () => {
  for (const action of ["stop", "destroy"] as const) {
    it(`settles start when ${action} cancels its delay without emitting a start event`, async () => {
      const container = await loadStoppedContainer(),
        started = vi.fn();

      tsParticles.addEventListener(EventType.containerStarted, started);
      vi.useFakeTimers();
      try {
        let settled = false;
        const pending = container.start().then(() => {
          settled = true;
        });

        await vi.advanceTimersByTimeAsync(0);
        expect(container.started).toBe(true);
        container[action]();
        await vi.advanceTimersByTimeAsync(100);
        expect(settled).toBe(true);
        expect(started).not.toHaveBeenCalled();
        expect(container.started).toBe(false);
        await pending;
      } finally {
        tsParticles.removeEventListener(EventType.containerStarted, started);
        container.destroy();
        vi.useRealTimers();
      }
    });
  }

  it("settles a cancelled start independently of the next start", async () => {
    const container = await loadStoppedContainer();

    vi.useFakeTimers();
    try {
      let firstSettled = false,
        secondSettled = false;
      const first = container.start().then(() => {
        firstSettled = true;
      });

      await vi.advanceTimersByTimeAsync(0);
      container.stop();
      const second = container.start().then(() => {
        secondSettled = true;
      });

      await vi.advanceTimersByTimeAsync(0);
      expect(firstSettled).toBe(true);
      expect(secondSettled).toBe(false);
      await vi.advanceTimersByTimeAsync(20);
      expect(secondSettled).toBe(true);
      expect(container.started).toBe(true);
      await Promise.all([first, second]);
    } finally {
      container.destroy();
      vi.useRealTimers();
    }
  });

  it("settles an earlier start when refresh schedules a replacement", async () => {
    const container = await loadStoppedContainer();

    vi.useFakeTimers();
    try {
      let firstSettled = false,
        refreshed = false;
      const first = container.start().then(() => {
        firstSettled = true;
      });

      await vi.advanceTimersByTimeAsync(0);
      const refresh = container.refresh().then(() => {
        refreshed = true;
      });

      await vi.advanceTimersByTimeAsync(0);
      expect(firstSettled).toBe(true);
      expect(refreshed).toBe(false);
      await vi.advanceTimersByTimeAsync(20);
      expect(refreshed).toBe(true);
      await Promise.all([first, refresh]);
    } finally {
      container.destroy();
      vi.useRealTimers();
    }
  });

  it("waits for an uncancelled delay and emits one start event", async () => {
    const container = await loadStoppedContainer(),
      started = vi.fn();

    tsParticles.addEventListener(EventType.containerStarted, started);
    vi.useFakeTimers();
    try {
      let settled = false;
      const pending = container.start().then(() => {
        settled = true;
      });

      await vi.advanceTimersByTimeAsync(19);
      expect(settled).toBe(false);
      expect(started).not.toHaveBeenCalled();
      await vi.advanceTimersByTimeAsync(1);
      expect(settled).toBe(true);
      expect(started).toHaveBeenCalledTimes(1);
      await pending;
      container.stop();
      expect(started).toHaveBeenCalledTimes(1);
    } finally {
      tsParticles.removeEventListener(EventType.containerStarted, started);
      container.destroy();
      vi.useRealTimers();
    }
  });
});
