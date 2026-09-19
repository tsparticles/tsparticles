/* eslint-disable */
import { type Container, type IDelta, type IMouseData, type ISourceOptions, tsParticles } from "@tsparticles/engine";
import { type AbsorberContainer, loadAbsorbersPlugin } from "@tsparticles/plugin-absorbers";
import { loadInteractivityPlugin } from "@tsparticles/plugin-interactivity";
import { beforeAll, describe, expect, it } from "vitest";
import { TestWindow } from "../Fixture/Window.js";
import { createCustomCanvas } from "../Fixture/CustomCanvas.js";

globalThis.window = TestWindow;

/**
 * Container augmented with the interactivity interaction manager, used to drive the drag logic.
 */
interface AbsorbersDragTestContainer extends AbsorberContainer {
  interactionManager?: {
    interactivityData: {
      mouse: IMouseData;
    };
    externalInteract(delta: IDelta): void;
    handleClickMode(mode: string): void;
  };
}

const defaultAbsorberOptions = {
  position: { x: 100, y: 100 },
  size: { value: 50, density: 1 },
};

/**
 * Loads a fresh container with the given options and a deterministic canvas size.
 * @param id - The container id
 * @param options - The options to load
 * @returns the loaded container
 */
async function loadAbsorberContainer(id: string, options: ISourceOptions): Promise<AbsorberContainer> {
  const container = (await tsParticles.load({
    id,
    options,

    element: createCustomCanvas(1920, 1080) as unknown as HTMLCanvasElement,
  })) as AbsorberContainer | null;

  if (!container) {
    throw new Error(`Error test container ${id} not initialized`);
  }

  return container;
}

describe("Absorbers tests", () => {
  beforeAll(async () => {
    await loadInteractivityPlugin(tsParticles);
    await loadAbsorbersPlugin(tsParticles);
  });

  it("should drag the absorber when a mouse down happens inside its bounds without the click mode", async () => {
    const container = (await loadAbsorberContainer("absorbers-drag-inside", {
      autoPlay: false,
      absorbers: [
        {
          ...defaultAbsorberOptions,
          draggable: true,
        },
      ],
    })) as AbsorbersDragTestContainer;

    const absorber = container.getAbsorber?.();

    expect(absorber).to.be.not.undefined;
    expect(container.interactionManager).to.be.not.undefined;

    const absorberPosition = absorber?.position ?? { x: 0, y: 0 },
      downPosition = { x: absorberPosition.x + 5, y: absorberPosition.y + 5 },
      mouse = container.interactionManager!.interactivityData.mouse;

    mouse.clicking = true;
    mouse.downPosition = { ...downPosition };
    mouse.position = { x: 300, y: 320 };

    container.interactionManager!.externalInteract({ value: 1, factor: 1 });

    expect(absorber?.position.x).to.equal(300);
    expect(absorber?.position.y).to.equal(320);

    mouse.clicking = false;
    mouse.position = { x: 400, y: 400 };

    container.interactionManager!.externalInteract({ value: 1, factor: 1 });

    expect(absorber?.position.x).to.equal(300);
    expect(absorber?.position.y).to.equal(320);
  });

  it("should not drag the absorber when the mouse down happens outside its bounds", async () => {
    const container = (await loadAbsorberContainer("absorbers-drag-outside", {
      autoPlay: false,
      absorbers: [
        {
          ...defaultAbsorberOptions,
          draggable: true,
        },
      ],
    })) as AbsorbersDragTestContainer;

    const absorber = container.getAbsorber?.();

    expect(absorber).to.be.not.undefined;
    expect(container.interactionManager).to.be.not.undefined;

    const absorberPosition = absorber?.position ?? { x: 0, y: 0 },
      mouse = container.interactionManager!.interactivityData.mouse;

    mouse.clicking = true;
    mouse.downPosition = { x: absorberPosition.x + 1000, y: absorberPosition.y + 1000 };
    mouse.position = { x: 300, y: 320 };

    container.interactionManager!.externalInteract({ value: 1, factor: 1 });

    expect(absorber?.position.x).to.equal(absorberPosition.x);
    expect(absorber?.position.y).to.equal(absorberPosition.y);
  });

  it("should still add an absorber on an empty space click when the click mode is enabled", async () => {
    const container = (await loadAbsorberContainer("absorbers-click-mode", {
      autoPlay: false,
      interactivity: {
        events: {
          onClick: {
            enable: true,
            mode: "absorbers",
          },
        },
        modes: {
          absorbers: [
            {
              size: {
                value: 50,
                density: 1,
              },
            },
          ],
        },
      },
    })) as AbsorbersDragTestContainer;

    const manager = container.interactionManager!;

    expect(container.getAbsorber?.(0)).to.be.undefined;

    manager.interactivityData.mouse.clickPosition = { x: 100, y: 100 };
    manager.handleClickMode("absorbers");

    await new Promise(resolve => setTimeout(resolve, 20));

    expect(container.getAbsorber?.(0)).to.be.not.undefined;
  });
});
