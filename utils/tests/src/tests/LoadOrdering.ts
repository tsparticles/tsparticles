import { type Container, tsParticles } from "@tsparticles/engine";
import { describe, expect, it } from "vitest";
import { Engine } from "../../../../engine/src/Core/Engine.js";
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
  it("shares plugin initialization between concurrent callers", async () => {
    const engine = new Engine();
    let release!: () => void,
      calls = 0;
    const barrier = new Promise<void>(resolve => {
        release = resolve;
      }),
      loader = async (): Promise<void> => {
        calls++;
        await barrier;
      };

    await engine.pluginManager.register(loader);

    const first = engine.init(),
      second = engine.init();

    await Promise.resolve();
    expect(calls).to.equal(1);
    release();
    await Promise.all([first, second]);
    expect(calls).to.equal(1);
  });

  it("waits for a loader registered while initialization is in flight", async () => {
    const engine = new Engine();
    let releaseInitial!: () => void,
      releaseLate!: () => void,
      markInitialFinished!: () => void,
      markLateStarted!: () => void;
    const initialGate = new Promise<void>(resolve => {
        releaseInitial = resolve;
      }),
      lateGate = new Promise<void>(resolve => {
        releaseLate = resolve;
      }),
      initialFinished = new Promise<void>(resolve => {
        markInitialFinished = resolve;
      }),
      lateStarted = new Promise<void>(resolve => {
        markLateStarted = resolve;
      });

    await engine.pluginManager.register(async () => {
      await initialGate;
      markInitialFinished();
    });

    const initialization = engine.init();

    await Promise.resolve();

    const registration = engine.pluginManager.register(async () => {
      markLateStarted();
      await lateGate;
    });

    await lateStarted;
    releaseInitial();
    await initialFinished;
    await new Promise<void>(resolve => setTimeout(resolve, 0));

    expect(engine.pluginManager.initialized).toBe(false);

    releaseLate();
    await Promise.all([initialization, registration]);

    expect(engine.pluginManager.initialized).toBe(true);
  });

  it("awaits a nested child loader without waiting on its parent", async () => {
    const engine = new Engine();
    let releaseChild!: () => void,
      markChildStarted!: () => void,
      parentFinished = false,
      childFinished = false;
    const childGate = new Promise<void>(resolve => {
        releaseChild = resolve;
      }),
      childStarted = new Promise<void>(resolve => {
        markChildStarted = resolve;
      });

    await engine.pluginManager.register(async () => {
      await engine.pluginManager.register(async () => {
        markChildStarted();
        await childGate;
        childFinished = true;
      });
      parentFinished = true;
    });

    const initialization = engine.init();

    await childStarted;

    expect(parentFinished).toBe(false);

    releaseChild();
    await initialization;

    expect(parentFinished).toBe(true);
    expect(childFinished).toBe(true);
  });

  it("shares loader rejection and retries an incomplete registration batch", async () => {
    const engine = new Engine(),
      failure = new Error("controlled loader failure");
    let attempts = 0;

    await engine.pluginManager.register(async () => {
      attempts++;
      await Promise.resolve();

      if (attempts === 1) {
        throw failure;
      }
    });

    const [first, second] = await Promise.allSettled([engine.init(), engine.init()]);

    expect(first.status).to.equal("rejected");
    expect(second.status).to.equal("rejected");

    if (first.status === "rejected" && second.status === "rejected") {
      expect(first.reason).to.equal(failure);
      expect(second.reason).to.equal(failure);
    }

    await engine.init();

    expect(attempts).to.equal(2);
  });

  it("keeps anonymous DOM hosts independent and reuses their identity", async () => {
    globalThis.window = TestWindow;

    const containers: Container[] = [];

    try {
      const firstElement = document.createElement("div"),
        secondElement = document.createElement("div"),
        options = { autoPlay: false, particles: { number: { value: noParticles } } },
        firstContainer = await tsParticles.load({ element: firstElement, options });

      if (firstContainer) {
        containers.push(firstContainer);
      }

      const secondContainer = await tsParticles.load({ element: secondElement, options });

      if (secondContainer) {
        containers.push(secondContainer);
      }

      expect(firstContainer).toBeDefined();
      expect(secondContainer).toBeDefined();
      expect(firstContainer?.id).not.toBe(secondContainer?.id);
      expect(firstElement.id).toBe("");
      expect(secondElement.id).toBe("");

      const reloaded = await tsParticles.load({ element: firstElement, options });

      if (reloaded) {
        containers.push(reloaded);
      }

      expect(reloaded?.id.description).toBe(firstContainer?.id.description);
      expect(firstContainer?.destroyed).toBe(true);
    } finally {
      for (const container of containers) {
        container.destroy();
      }
    }
  });

  it("discards an overlapping load for the same id instead of replacing the newer container", async () => {
    globalThis.window = TestWindow;

    const one = 1,
      firstIndex = 0;

    containerId++;

    const id = `load-order-${containerId.toString()}`,
      older = loadContainer(id),
      newer = loadContainer(id);

    try {
      const [olderContainer, newerContainer] = await Promise.all([older, newer]);

      expect(olderContainer).toBeUndefined();
      expect(newerContainer).toBeDefined();

      const items = tsParticles.items.filter(item => item.id.description === id);

      expect(items).toHaveLength(one);
      expect(items[firstIndex]).toBe(newerContainer);
      expect(newerContainer?.destroyed).toBe(false);
    } finally {
      /* both loads must settle, so a rejected one cannot install a container after the cleanup */
      await Promise.allSettled([older, newer]);

      for (const item of tsParticles.items.filter(item => item.id.description === id)) {
        item.destroy();
      }
    }
  });

  it("returns the container of sequential loads for the same id", async () => {
    globalThis.window = TestWindow;

    containerId++;

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
