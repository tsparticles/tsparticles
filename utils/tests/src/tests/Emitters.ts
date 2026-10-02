/* eslint-disable */
import {
  type Container,
  type ICoordinates,
  type IDelta,
  type IDimension,
  type IMouseData,
  type IRandomPositionData,
  type ISourceOptions,
  tsParticles,
} from "@tsparticles/engine";
import { type EmitterContainer, EmitterShapeBase, loadEmittersPlugin } from "@tsparticles/plugin-emitters";
import { loadEmittersShapeSquare } from "@tsparticles/plugin-emitters-shape-square";
import { loadInteractivityPlugin } from "@tsparticles/plugin-interactivity";
import { beforeAll, describe, expect, it, vi } from "vitest";
import { TestWindow } from "../Fixture/Window.js";
import { createCustomCanvas } from "../Fixture/CustomCanvas.js";

/**
 * Minimally overrides the abstract {@link EmitterShapeBase} members.
 */
class TestEmitterShape extends EmitterShapeBase {
  constructor(position: ICoordinates, size: IDimension) {
    super(position, size, true);
  }

  init(): Promise<void> {
    return Promise.resolve();
  }

  randomPosition(): IRandomPositionData {
    return { position: { ...this.position } };
  }
}

/**
 * Container augmented with the interactivity interaction manager, used to drive the drag logic.
 */
interface EmittersDragTestContainer extends EmitterContainer {
  interactionManager?: {
    interactivityData: {
      mouse: IMouseData;
    };
    externalInteract(delta: IDelta): void;
    handleClickMode(mode: string): void;
  };
}

/**
 * Returns a plain object mimicking the canvas 2d context methods used by the emitter drawing code.
 */
function createMockContext(): Record<
  "save" | "restore" | "beginPath" | "fill" | "stroke" | "rect",
  ReturnType<typeof vi.fn>
> {
  return {
    save: vi.fn(),
    restore: vi.fn(),
    beginPath: vi.fn(),
    fill: vi.fn(),
    stroke: vi.fn(),
    rect: vi.fn(),
  };
}

const defaultEmitterOptions = {
  autoPlay: false,
  position: { x: 100, y: 100 },
  size: { width: 50, height: 50, mode: "pixel" },
};

/**
 * Loads a fresh container with the given options and a deterministic canvas size.
 * @param id - The container id
 * @param options - The options to load
 * @returns the loaded container
 */
async function loadEmitterContainer(id: string, options: ISourceOptions): Promise<EmitterContainer> {
  const container = (await tsParticles.load({
    id,
    options,

    element: createCustomCanvas(1920, 1080) as unknown as HTMLCanvasElement,
  })) as EmitterContainer | null;

  if (!container) {
    throw new Error(`Error test container ${id} not initialized`);
  }

  return container;
}

describe("Emitters tests", () => {
  globalThis.window = TestWindow;

  beforeAll(async () => {
    await loadInteractivityPlugin(tsParticles);
    await loadEmittersPlugin(tsParticles);
    await loadEmittersShapeSquare(tsParticles);
  });

  it("should load the emitter default draw and draggable options", async () => {
    const container = await loadEmitterContainer("emitters-default", {
      autoPlay: false,
      emitters: defaultEmitterOptions,
    });

    try {
      const emitter = container.getEmitter?.();

      expect(emitter).to.be.not.undefined;
      expect(emitter?.options.draw).to.be.true;
      expect(emitter?.options.draggable).to.be.false;
    } finally {
      container.destroy();
    }
  });

  it("should load the emitter draw and draggable options from the config", async () => {
    const container = await loadEmitterContainer("emitters-options", {
      autoPlay: false,
      emitters: {
        ...defaultEmitterOptions,
        draw: false,
        draggable: true,
      },
    });

    try {
      const emitter = container.getEmitter?.();

      expect(emitter).to.be.not.undefined;
      expect(emitter?.options.draw).to.be.false;
      expect(emitter?.options.draggable).to.be.true;
    } finally {
      container.destroy();
    }
  });

  it("should not draw the emitter when the draw option is false", async () => {
    const container = await loadEmitterContainer("emitters-draw-off", {
      autoPlay: false,
      emitters: {
        ...defaultEmitterOptions,
        draw: false,
      },
    });

    try {
      const emitter = container.getEmitter?.();

      expect(emitter).to.be.not.undefined;

      const context = createMockContext();

      emitter?.draw(context as unknown as OffscreenCanvasRenderingContext2D);

      expect(context.save).not.toHaveBeenCalled();
      expect(context.beginPath).not.toHaveBeenCalled();
      expect(context.fill).not.toHaveBeenCalled();
    } finally {
      container.destroy();
    }
  });

  it("should draw the emitter shape when the draw option is enabled", async () => {
    const container = await loadEmitterContainer("emitters-draw-on", {
      autoPlay: false,
      emitters: defaultEmitterOptions,
    });

    try {
      const emitter = container.getEmitter?.();

      expect(emitter).to.be.not.undefined;

      const context = createMockContext();

      emitter?.draw(context as unknown as OffscreenCanvasRenderingContext2D);

      expect(context.save).toHaveBeenCalled();
      expect(context.beginPath).toHaveBeenCalled();
      expect(context.rect).toHaveBeenCalled();
      expect(context.fill).toHaveBeenCalled();
      expect(context.restore).toHaveBeenCalled();
    } finally {
      container.destroy();
    }
  });

  it("should not fill the emitter shape when the spawn fill is disabled", async () => {
    const container = await loadEmitterContainer("emitters-draw-no-fill", {
      autoPlay: false,
      emitters: {
        ...defaultEmitterOptions,
        spawn: {
          fill: {
            enable: false,
            color: "#ff0000",
          },
        },
      },
    });

    try {
      const emitter = container.getEmitter?.();

      expect(emitter).to.be.not.undefined;

      const context = createMockContext();

      emitter?.draw(context as unknown as OffscreenCanvasRenderingContext2D);

      expect(context.save).toHaveBeenCalled();
      expect(context.beginPath).toHaveBeenCalled();
      expect(context.rect).toHaveBeenCalled();
      expect(context.fill).not.toHaveBeenCalled();
      expect(context.restore).toHaveBeenCalled();
    } finally {
      container.destroy();
    }
  });

  it("should set the emitter position keeping the size", async () => {
    const container = await loadEmitterContainer("emitters-set-position", {
      autoPlay: false,
      emitters: defaultEmitterOptions,
    });

    try {
      const emitter = container.getEmitter?.();

      expect(emitter).to.be.not.undefined;

      emitter?.setPosition({ x: 250, y: 300 });

      expect(emitter?.position).to.deep.equal({ x: 250, y: 300 });
      expect(emitter?.size.width).to.equal(50);
      expect(emitter?.size.height).to.equal(50);
    } finally {
      container.destroy();
    }
  });

  it("should keep the dragged position after a canvas resize", async () => {
    const container = await loadEmitterContainer("emitters-resize-drag", {
      autoPlay: false,
      emitters: {
        ...defaultEmitterOptions,
        position: { x: 150, y: 150 },
      },
    });

    try {
      const emitter = container.getEmitter?.();

      expect(emitter).to.be.not.undefined;

      emitter?.setPosition({ x: 250, y: 300 });

      emitter?.resize();

      expect(emitter?.position).to.deep.equal({ x: 250, y: 300 });
    } finally {
      container.destroy();
    }
  });

  it("should drag the emitter when a mouse down happens inside its bounds", async () => {
    const container = (await loadEmitterContainer("emitters-drag-inside", {
      autoPlay: false,

      emitters: {
        ...defaultEmitterOptions,
        draggable: true,
        position: { x: 200, y: 200 },
      },
    })) as EmittersDragTestContainer;

    try {
      const emitter = container.getEmitter?.();

      expect(emitter).to.be.not.undefined;
      expect(container.interactionManager).to.be.not.undefined;

      const emitterPosition = emitter?.position ?? { x: 0, y: 0 },
        downPosition = { x: emitterPosition.x + 5, y: emitterPosition.y + 5 },
        mouse = container.interactionManager!.interactivityData.mouse;

      mouse.clicking = true;
      mouse.clickPosition = { ...downPosition };
      mouse.downPosition = { ...downPosition };
      mouse.position = { x: 300, y: 320 };

      container.interactionManager!.externalInteract({ value: 1, factor: 1 });

      expect(emitter?.position).to.deep.equal({ x: 300, y: 320 });

      mouse.clicking = false;
      mouse.position = { x: 400, y: 400 };

      container.interactionManager!.externalInteract({ value: 1, factor: 1 });

      expect(emitter?.position).to.deep.equal({ x: 300, y: 320 });
    } finally {
      container.destroy();
    }
  });

  it("should not drag the emitter when the mouse down happens outside its bounds", async () => {
    const container = (await loadEmitterContainer("emitters-drag-outside", {
      autoPlay: false,

      emitters: {
        ...defaultEmitterOptions,
        draggable: true,
        position: { x: 200, y: 200 },
      },
    })) as EmittersDragTestContainer;

    try {
      const emitter = container.getEmitter?.();

      expect(emitter).to.be.not.undefined;
      expect(container.interactionManager).to.be.not.undefined;

      const emitterPosition = emitter?.position ?? { x: 0, y: 0 },
        mouse = container.interactionManager!.interactivityData.mouse;

      mouse.clicking = true;
      mouse.clickPosition = { x: emitterPosition.x + 1000, y: emitterPosition.y + 1000 };
      mouse.downPosition = { ...mouse.clickPosition };
      mouse.position = { x: 300, y: 320 };

      container.interactionManager!.externalInteract({ value: 1, factor: 1 });

      expect(emitter?.position).to.deep.equal({ x: emitterPosition.x, y: emitterPosition.y });
    } finally {
      container.destroy();
    }
  });

  it("should not drag the emitter when the draggable option is false", async () => {
    const container = (await loadEmitterContainer("emitters-drag-disabled", {
      autoPlay: false,

      emitters: {
        ...defaultEmitterOptions,
        position: { x: 200, y: 200 },
      },
    })) as EmittersDragTestContainer;

    try {
      const emitter = container.getEmitter?.();

      expect(emitter).to.be.not.undefined;
      expect(container.interactionManager).to.be.not.undefined;

      const emitterPosition = emitter?.position ?? { x: 0, y: 0 },
        mouse = container.interactionManager!.interactivityData.mouse;

      mouse.clicking = true;
      mouse.clickPosition = { x: emitterPosition.x + 5, y: emitterPosition.y + 5 };
      mouse.downPosition = { ...mouse.clickPosition };
      mouse.position = { x: 300, y: 320 };

      container.interactionManager!.externalInteract({ value: 1, factor: 1 });

      expect(emitter?.position).to.deep.equal({ x: emitterPosition.x, y: emitterPosition.y });
    } finally {
      container.destroy();
    }
  });

  it("should keep dragging the selected emitter when two draggable emitters overlap", async () => {
    const container = (await loadEmitterContainer("emitters-drag-overlap", {
      autoPlay: false,

      emitters: [
        {
          ...defaultEmitterOptions,
          draggable: true,
          position: { x: 200, y: 200 },
        },
        {
          ...defaultEmitterOptions,
          draggable: true,
          position: { x: 200, y: 200 },
        },
      ],
    })) as EmittersDragTestContainer;

    try {
      const firstEmitter = container.getEmitter?.(0),
        secondEmitter = container.getEmitter?.(1),
        mouse = container.interactionManager!.interactivityData.mouse;

      expect(firstEmitter).to.be.not.undefined;
      expect(secondEmitter).to.be.not.undefined;
      expect(container.interactionManager).to.be.not.undefined;

      firstEmitter?.setPosition({ x: 200, y: 200 });
      secondEmitter?.setPosition({ x: 200, y: 200 });

      mouse.clicking = true;
      mouse.downPosition = { x: 200, y: 200 };
      mouse.position = { x: 300, y: 320 };

      container.interactionManager!.externalInteract({ value: 1, factor: 1 });

      expect(firstEmitter?.position).to.deep.equal({ x: 300, y: 320 });
      expect(secondEmitter?.position).to.deep.equal({ x: 200, y: 200 });
    } finally {
      container.destroy();
    }
  });

  it("should still add an emitter on an empty space click when the click mode is enabled", async () => {
    const container = (await loadEmitterContainer("emitters-click-mode", {
      autoPlay: false,
      interactivity: {
        events: {
          onClick: {
            enable: true,
            mode: "emitter",
          },
        },
        modes: {
          emitters: {
            value: {
              position: { x: 100, y: 100 },
              size: { width: 50, height: 50, mode: "pixel" },
            },
          },
        },
      },
    })) as EmittersDragTestContainer;

    const manager = container.interactionManager!;

    try {
      expect(container.getEmitter?.(0)).to.be.undefined;

      manager.interactivityData.mouse.clickPosition = { x: 100, y: 100 };
      manager.handleClickMode("emitter");

      await vi.waitFor(() => {
        expect(container.getEmitter?.(0)).to.be.not.undefined;
      });
    } finally {
      container.destroy();
    }
  });

  it("should keep the base shape draw method as a no-op", () => {
    const shape = new TestEmitterShape({ x: 0, y: 0 }, { width: 10, height: 10 }),
      context = createMockContext();

    shape.draw(context as unknown as OffscreenCanvasRenderingContext2D);

    expect(context.beginPath).not.toHaveBeenCalled();
    expect(context.fill).not.toHaveBeenCalled();
  });
});
