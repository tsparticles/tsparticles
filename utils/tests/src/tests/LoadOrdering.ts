import { type Container, tsParticles } from "@tsparticles/engine";
import { describe, expect, it } from "vitest";
import { TestWindow } from "../Fixture/Window.js";
import { createCustomCanvas } from "../Fixture/CustomCanvas.js";

const canvasWidth = 400,
  canvasHeight = 300,
  noParticles = 0;

let containerId = 0;

/**
 * Loads a container without particles for the given id.
 * @param id - The container id
 * @returns The load promise
 */
function loadContainer(id: string): Promise<Container | undefined> {
  return tsParticles.load({
    id,
    element: createCustomCanvas(canvasWidth, canvasHeight) as unknown as HTMLCanvasElement,
    options: { autoPlay: false, particles: { number: { value: noParticles } } },
  });
}

describe("container load ordering", () => {
  it("discards an overlapping load for the same id instead of replacing the newer container", async () => {
    globalThis.window = TestWindow as unknown as Window & typeof globalThis;
    containerId += 1;

    const id = `load-order-${containerId.toString()}`,
      older = loadContainer(id),
      newer = loadContainer(id),
      [olderContainer, newerContainer] = await Promise.all([older, newer]);

    try {
      expect(olderContainer).toBeUndefined();
      expect(newerContainer).toBeDefined();

      const items = tsParticles.items.filter(item => item.id.description === id);

      expect(items).toHaveLength(1);
      expect(items[0]).toBe(newerContainer);
      expect(newerContainer?.destroyed).toBe(false);
    } finally {
      newerContainer?.destroy();
    }
  });

  it("returns the container of sequential loads for the same id", async () => {
    globalThis.window = TestWindow as unknown as Window & typeof globalThis;
    containerId += 1;

    const id = `load-order-sequential-${containerId.toString()}`,
      firstContainer = await loadContainer(id);

    expect(firstContainer).toBeDefined();

    const secondContainer = await loadContainer(id);

    try {
      expect(secondContainer).toBeDefined();
      expect(tsParticles.items.filter(item => item.id.description === id)).toEqual([secondContainer]);
    } finally {
      secondContainer?.destroy();
    }
  });
});
