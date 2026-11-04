/* eslint-disable */
import { tsParticles, type Container } from "@tsparticles/engine";
import { tsParticles as lazyTsParticles } from "@tsparticles/engine/lazy";
import { describe, expect, it } from "vitest";
import { TestWindow } from "../Fixture/Window.js";
import { createCustomCanvas } from "../Fixture/CustomCanvas.js";
import { ribbons } from "@tsparticles/ribbons";
import { ribbons as lazyRibbons } from "@tsparticles/ribbons/lazy";

function createRibbonCanvas(): HTMLCanvasElement {
  const canvas = createCustomCanvas(1920, 1080) as unknown as HTMLCanvasElement,
    attributes = new Map<string, string>(),
    setAttribute = canvas.setAttribute;

  canvas.getAttribute = name => attributes.get(name) ?? null;
  canvas.setAttribute = (name, value): void => {
    attributes.set(name, value);
    setAttribute(name, value);
  };
  Object.defineProperty(canvas, "ownerDocument", { value: TestWindow.document });

  return canvas;
}

describe("ribbons bundle", async () => {
  globalThis.window = TestWindow;

  it("creates a ribbons animation container", async () => {
    const container = (await ribbons({})) as Container | undefined;

    expect(container).to.not.be.undefined;
    expect(tsParticles.items).to.include(container);

    container?.stop();
    container?.destroy(false);
  }, 120000);

  it("creates a separate container for each canvas without an ID", async () => {
    const firstCanvas = createRibbonCanvas(),
      secondCanvas = createRibbonCanvas(),
      previousContainers = new Set(tsParticles.items);

    try {
      await ribbons.create(firstCanvas, { autoPlay: false });
      await ribbons.create(secondCanvas, { autoPlay: false });

      expect(firstCanvas.getAttribute("id")).to.not.equal(secondCanvas.getAttribute("id"));
      expect([...tsParticles.items].filter(container => !previousContainers.has(container))).to.have.length(2);
    } finally {
      for (const container of tsParticles.items) {
        if (!previousContainers.has(container)) {
          container.stop();
          container.destroy(false);
        }
      }
    }
  }, 120000);

  it("creates a separate container for each canvas without an ID with the lazy API", async () => {
    const firstCanvas = createRibbonCanvas(),
      secondCanvas = createRibbonCanvas(),
      previousContainers = new Set(lazyTsParticles.items);

    try {
      await lazyRibbons.create(firstCanvas, { autoPlay: false });
      await lazyRibbons.create(secondCanvas, { autoPlay: false });

      expect(firstCanvas.getAttribute("id")).to.not.equal(secondCanvas.getAttribute("id"));
      expect([...lazyTsParticles.items].filter(container => !previousContainers.has(container))).to.have.length(2);
    } finally {
      for (const container of [...lazyTsParticles.items]) {
        if (!previousContainers.has(container)) {
          container.stop();
          container.destroy(true);
        }
      }
    }
  }, 120000);
});
