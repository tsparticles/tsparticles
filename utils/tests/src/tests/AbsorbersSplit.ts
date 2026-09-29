/* eslint-disable */
import {
  type IDelta,
  type IMouseData,
  type ISourceOptions,
  type RecursivePartial,
  tsParticles,
} from "@tsparticles/engine";
import {
  type AbsorberContainer,
  type AbsorberInstance,
  type AbsorbersInstancesManager,
  Absorber,
  AbsorberSplit,
  getAbsorbersInstancesManager,
  loadAbsorbersPlugin,
} from "@tsparticles/plugin-absorbers";
import { loadInteractivityPlugin } from "@tsparticles/plugin-interactivity";
import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import { TestWindow } from "../Fixture/Window.js";
import { createCustomCanvas } from "../Fixture/CustomCanvas.js";

globalThis.window = TestWindow;

/**
 * Container augmented with the interactivity interaction manager, used to drive the click modes.
 */
interface AbsorbersSplitTestContainer extends AbsorberContainer {
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

const frameDelta = { value: 16, factor: 1 };

const noParticles = {
  autoPlay: false,
  particles: { number: { value: 0 }, move: { enable: false } },
};

/** Waits for the pending microtasks, the absorbers creation is asynchronous */
const flush = async (): Promise<void> => {
  await new Promise(resolve => setTimeout(resolve, 0));
};

/**
 * Loads a fresh container with the given options and a deterministic canvas size.
 * @param id - The container id
 * @param options - The options to load
 * @returns the loaded container
 */
async function loadAbsorberContainer(
  id: string,
  options: RecursivePartial<ISourceOptions>,
): Promise<AbsorbersSplitTestContainer> {
  const container = (await tsParticles.load({
    id,
    options,

    element: createCustomCanvas(1920, 1080) as unknown as HTMLCanvasElement,
  })) as AbsorbersSplitTestContainer | null;

  if (!container) {
    throw new Error(`Error test container ${id} not initialized`);
  }

  return container;
}

/**
 * Runs a single container frame, this triggers the absorbers plugin `update` frame hook.
 * @param container - the container to update
 */
function runFrame(container: AbsorberContainer): void {
  container.particles.update(frameDelta);
}

/**
 * Simulates the size growth done by an absorber while absorbing particles.
 * @param absorber - the absorber to grow
 */
function growAbsorber(absorber: AbsorberInstance): void {
  absorber.size += 1;
}

/**
 * Places an absorber at the given coordinates, the test canvas has no size, so the positions coming
 * from the options options are always collapsed to the origin.
 * @param absorber - the absorber to place
 * @param x - the x coordinate
 * @param y - the y coordinate
 */
function placeAbsorber(absorber: AbsorberInstance | undefined, x: number, y: number): void {
  absorber?.position.setTo({ x, y });
}

/**
 * Returns the absorbers instances manager used by the engine.
 * @returns the absorbers instances manager
 */
function getInstancesManager(): Promise<AbsorbersInstancesManager> {
  return getAbsorbersInstancesManager(tsParticles);
}

/**
 * Loads the absorbers and the interactivity plugins, they can be registered only once, before the
 * first container is loaded.
 */
let pluginsLoaded: Promise<void> | undefined;

function loadPlugins(): Promise<void> {
  pluginsLoaded ??= (async (): Promise<void> => {
    await loadInteractivityPlugin(tsParticles);
    await loadAbsorbersPlugin(tsParticles);
  })();

  return pluginsLoaded;
}

/**
 * The absorbers instances manager is a shared singleton, every spy must be restored right after the
 * test that installed it.
 */
afterEach(() => {
  vi.restoreAllMocks();
});

describe("AbsorberSplit option loader tests", () => {
  it("should use the default values when nothing is loaded", () => {
    const split = new AbsorberSplit();

    expect(split.enable).to.equal(false);
    expect(split.quantity).to.equal(4);
  });

  it("should load the enable and quantity values", () => {
    const split = new AbsorberSplit();

    split.load({ enable: true, quantity: 12 });

    expect(split.enable).to.equal(true);
    expect(split.quantity).to.equal(12);
  });

  it("should keep the defaults when no data is loaded", () => {
    const split = new AbsorberSplit();

    expect(() => split.load()).not.to.throw();
    expect(() => split.load(null)).not.to.throw();

    expect(split.enable).to.equal(false);
    expect(split.quantity).to.equal(4);
  });

  it("should keep the current quantity for non finite values", () => {
    for (const quantity of [Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY, Number.NaN]) {
      const split = new AbsorberSplit();

      split.load({ quantity });

      expect(split.quantity).to.equal(4);
    }
  });

  it("should keep the current quantity for non numeric values", () => {
    const split = new AbsorberSplit();

    split.load({ quantity: "10" as unknown as number });
    split.load({ quantity: null as unknown as number });

    expect(split.quantity).to.equal(4);
  });

  it("should clamp the quantity between 0 and the maximum supported value", () => {
    const negative = new AbsorberSplit(),
      huge = new AbsorberSplit();

    negative.load({ quantity: -5 });
    huge.load({ quantity: 99999 });

    expect(negative.quantity).to.equal(0);
    expect(huge.quantity).to.equal(1000);
  });

  it("should truncate fractional quantities", () => {
    const split = new AbsorberSplit();

    split.load({ quantity: 3.9 });
    expect(split.quantity).to.equal(3);

    split.load({ quantity: 0.9 });
    expect(split.quantity).to.equal(0);
  });
});

describe("Absorber split options tests", () => {
  it("should keep the split defaults when no split data is loaded", () => {
    const absorber = new Absorber();

    absorber.load({ size: { value: 20 } });

    expect(absorber.split.enable).to.equal(false);
    expect(absorber.split.quantity).to.equal(4);
  });

  it("should load the split options from a config object", () => {
    const absorber = new Absorber();

    absorber.load({ split: { enable: true, quantity: 6 } });

    expect(absorber.split.enable).to.equal(true);
    expect(absorber.split.quantity).to.equal(6);
  });

  it("should load the split options from a config JSON string", () => {
    const source = JSON.parse('{"absorbers":{"split":{"enable":true,"quantity":9}}}') as {
        absorbers: RecursivePartial<ISourceOptions["absorbers"]>;
      },
      absorber = new Absorber();

    absorber.load(source.absorbers as RecursivePartial<IAbsorberShape>);

    expect(absorber.split.enable).to.equal(true);
    expect(absorber.split.quantity).to.equal(9);
  });

  it("should not throw and keep the default quantity for a malformed split config", () => {
    const absorber = new Absorber();

    expect(() =>
      absorber.load({ split: { enable: true, quantity: "many" } as unknown as IAbsorberShape }),
    ).not.to.throw();

    expect(absorber.split.enable).to.equal(true);
    expect(absorber.split.quantity).to.equal(4);
  });
});

/** Minimal absorber shape used by the raw config loading tests */
interface IAbsorberShape {
  split: { enable: boolean; quantity: number };
}

describe("AbsorberInstance.shouldSplit tests", () => {
  beforeAll(loadPlugins);

  it("should not split when the split is disabled, even over the size limit", async () => {
    const container = await loadAbsorberContainer("absorbers-split-disabled", {
      ...noParticles,
      absorbers: [{ ...defaultAbsorberOptions, size: { value: 50, density: 1, limit: { radius: 10 } } }],
    });

    try {
      const absorber = container.getAbsorber?.();

      expect(absorber).to.be.not.undefined;
      expect(absorber?.limit.radius).to.be.greaterThan(0);
      expect(absorber?.shouldSplit()).to.equal(false);

      if (absorber) {
        growAbsorber(absorber);
      }

      expect(absorber?.shouldSplit()).to.equal(false);
    } finally {
      container.destroy();
    }
  });

  it("should not split when the limits are disabled", async () => {
    const container = await loadAbsorberContainer("absorbers-split-no-limits", {
      ...noParticles,
      absorbers: [{ ...defaultAbsorberOptions, split: { enable: true, quantity: 2 } }],
    });

    try {
      const absorber = container.getAbsorber?.();

      expect(absorber).to.be.not.undefined;
      expect(absorber?.limit.radius).to.equal(0);
      expect(absorber?.limit.mass).to.equal(0);
      expect(absorber?.shouldSplit()).to.equal(false);

      if (absorber) {
        growAbsorber(absorber);
      }

      expect(absorber?.shouldSplit()).to.equal(false);
    } finally {
      container.destroy();
    }
  });

  it("should not split at creation, even when the absorber starts above the limit", async () => {
    const container = await loadAbsorberContainer("absorbers-split-growth-guard", {
      ...noParticles,
      absorbers: [
        {
          ...defaultAbsorberOptions,
          size: { value: 50, density: 1, limit: { radius: 10 } },
          split: { enable: true, quantity: 2 },
        },
      ],
    });

    try {
      const absorber = container.getAbsorber?.();

      expect(absorber).to.be.not.undefined;
      expect(absorber?.size).to.be.at.least(absorber?.limit.radius ?? 0);
      expect(absorber?.shouldSplit()).to.equal(false);
    } finally {
      container.destroy();
    }
  });

  it("should split only after the absorber reaches the radius limit", async () => {
    const container = await loadAbsorberContainer("absorbers-split-radius", {
      ...noParticles,
      absorbers: [
        {
          ...defaultAbsorberOptions,
          size: { value: 50, density: 1, limit: { radius: 60 } },
          split: { enable: true, quantity: 2 },
        },
      ],
    });

    try {
      const absorber = container.getAbsorber?.();

      expect(absorber).to.be.not.undefined;

      if (!absorber) {
        return;
      }

      expect(absorber.limit.radius).to.be.greaterThan(absorber.size);
      expect(absorber.shouldSplit()).to.equal(false);

      absorber.size = absorber.limit.radius - 1;

      expect(absorber.shouldSplit()).to.equal(false);

      absorber.size = absorber.limit.radius;

      expect(absorber.shouldSplit()).to.equal(true);
    } finally {
      container.destroy();
    }
  });

  it("should split only after the absorber reaches the mass limit", async () => {
    const container = await loadAbsorberContainer("absorbers-split-mass", {
      ...noParticles,
      absorbers: [
        {
          ...defaultAbsorberOptions,
          size: { value: 50, density: 1, limit: { mass: 200 } },
          split: { enable: true, quantity: 2 },
        },
      ],
    });

    try {
      const absorber = container.getAbsorber?.();

      expect(absorber).to.be.not.undefined;

      if (!absorber) {
        return;
      }

      expect(absorber.limit.mass).to.be.greaterThan(0);
      expect(absorber.mass).to.be.below(absorber.limit.mass);
      expect(absorber.shouldSplit()).to.equal(false);

      absorber.mass = absorber.limit.mass - 1;

      expect(absorber.shouldSplit()).to.equal(false);

      absorber.mass = absorber.limit.mass;

      expect(absorber.shouldSplit()).to.equal(true);
    } finally {
      container.destroy();
    }
  });
});

describe("AbsorbersInstancesManager.splitAbsorber tests", () => {
  beforeAll(loadPlugins);

  it("should do nothing when the absorber split is disabled", async () => {
    const container = await loadAbsorberContainer("absorbers-split-disabled-manager", {
      ...noParticles,
      absorbers: [{ ...defaultAbsorberOptions }],
    });

    try {
      const manager = await getInstancesManager(),
        absorber = container.getAbsorber?.(),
        splitSpy = vi.spyOn(manager, "splitAbsorber");

      expect(absorber).to.be.not.undefined;

      const result = absorber ? await manager.splitAbsorber(container, absorber) : undefined;

      expect(result).to.be.undefined;
      expect(container.getAbsorber?.()).to.equal(absorber);
      expect(container.particles.count).to.equal(0);
      expect(splitSpy).toHaveBeenCalledOnce();
    } finally {
      container.destroy();
    }
  });

  it("should replace the absorber without generating particles when the quantity is 0", async () => {
    const container = await loadAbsorberContainer("absorbers-split-zero-quantity", {
      ...noParticles,
      absorbers: [{ ...defaultAbsorberOptions, split: { enable: true, quantity: 0 } }],
    });

    try {
      const manager = await getInstancesManager(),
        absorber = container.getAbsorber?.(),
        pushSpy = vi.spyOn(container.particles, "push");

      expect(absorber).to.be.not.undefined;

      const replacement = absorber ? await manager.splitAbsorber(container, absorber) : undefined;

      expect(replacement).to.be.not.undefined;
      expect(replacement).to.not.equal(absorber);
      expect(pushSpy).not.toHaveBeenCalled();
      expect(container.getAbsorber?.()).to.equal(replacement);
      expect(container.particles.count).to.equal(0);
    } finally {
      container.destroy();
    }
  });

  it("should replace the absorber with the same options and push the particles at the old position", async () => {
    const container = await loadAbsorberContainer("absorbers-split-replace", {
      ...noParticles,
      absorbers: [{ ...defaultAbsorberOptions, split: { enable: true, quantity: 3 } }],
    });

    try {
      const manager = await getInstancesManager(),
        absorber = container.getAbsorber?.(),
        pushSpy = vi.spyOn(container.particles, "push");

      expect(absorber).to.be.not.undefined;

      if (!absorber) {
        return;
      }

      const oldPosition = { x: absorber.position.x, y: absorber.position.y };

      absorber.size += 100;

      const replacement = await manager.splitAbsorber(container, absorber);

      expect(replacement).to.be.not.undefined;
      expect(replacement?.options).to.equal(absorber.options);
      expect(replacement?.options.split.enable).to.equal(true);
      expect(replacement?.options.split.quantity).to.equal(3);
      expect(replacement?.position.x).to.equal(oldPosition.x);
      expect(replacement?.position.y).to.equal(oldPosition.y);
      expect(replacement?.size).to.equal(absorber.options.size.value);
      expect(pushSpy).toHaveBeenCalledWith(3, oldPosition);
      expect(container.getAbsorber?.()).to.equal(replacement);
    } finally {
      container.destroy();
    }
  });

  it("should keep the original absorber when the replacement creation fails", async () => {
    const container = await loadAbsorberContainer("absorbers-split-failure", {
      ...noParticles,
      absorbers: [{ ...defaultAbsorberOptions, split: { enable: true, quantity: 3 } }],
    });

    try {
      const manager = await getInstancesManager(),
        absorber = container.getAbsorber?.(),
        pushSpy = vi.spyOn(container.particles, "push");

      expect(absorber).to.be.not.undefined;

      const addSpy = vi.spyOn(manager, "addAbsorber").mockRejectedValue(new Error("split failed")),
        result = absorber ? await manager.splitAbsorber(container, absorber).catch(() => undefined) : undefined;

      expect(addSpy).toHaveBeenCalledOnce();
      expect(result).to.be.undefined;
      expect(container.getAbsorber?.()).to.equal(absorber);
      expect(pushSpy).not.toHaveBeenCalled();
      expect(container.particles.count).to.equal(0);
    } finally {
      container.destroy();
    }
  });
});

describe("AbsorbersPluginInstance.update tests", () => {
  beforeAll(loadPlugins);

  it("should not split anything when no absorber reached its limit", async () => {
    const container = await loadAbsorberContainer("absorbers-update-no-split", {
      ...noParticles,
      absorbers: [
        {
          ...defaultAbsorberOptions,
          size: { value: 50, density: 1, limit: { radius: 1000 } },
          split: { enable: true, quantity: 2 },
        },
      ],
    });

    try {
      const manager = await getInstancesManager(),
        splitSpy = vi.spyOn(manager, "splitAbsorber"),
        absorber = container.getAbsorber?.();

      runFrame(container);

      expect(splitSpy).not.toHaveBeenCalled();

      if (absorber) {
        growAbsorber(absorber);
      }

      runFrame(container);

      expect(splitSpy).not.toHaveBeenCalled();
    } finally {
      container.destroy();
    }
  });

  it("should split a single absorber per frame", async () => {
    const container = await loadAbsorberContainer("absorbers-update-single", {
      ...noParticles,
      absorbers: [
        {
          ...defaultAbsorberOptions,
          size: { value: 50, density: 1, limit: { radius: 60 } },
          split: { enable: true, quantity: 2 },
        },
        {
          ...defaultAbsorberOptions,
          position: { x: 300, y: 300 },
          size: { value: 50, density: 1, limit: { radius: 60 } },
          split: { enable: true, quantity: 2 },
        },
      ],
    });

    try {
      const manager = await getInstancesManager(),
        splitSpy = vi.spyOn(manager, "splitAbsorber"),
        first = container.getAbsorber?.(0),
        second = container.getAbsorber?.(1);

      expect(first).to.be.not.undefined;
      expect(second).to.be.not.undefined;

      if (first) {
        first.size = first.limit.radius + 1;
      }

      if (second) {
        second.size = second.limit.radius + 1;
      }

      runFrame(container);

      expect(splitSpy).toHaveBeenCalledOnce();
    } finally {
      container.destroy();
    }
  });

  it("should split the absorber that reached the limit and keep the others untouched", async () => {
    const container = await loadAbsorberContainer("absorbers-update-auto", {
      ...noParticles,
      absorbers: [
        {
          ...defaultAbsorberOptions,
          size: { value: 50, density: 1, limit: { radius: 60 } },
          split: { enable: true, quantity: 2 },
        },
        {
          ...defaultAbsorberOptions,
          position: { x: 300, y: 300 },
          size: { value: 50, density: 1, limit: { radius: 1000 } },
          split: { enable: true, quantity: 2 },
        },
      ],
    });

    try {
      const first = container.getAbsorber?.(0),
        second = container.getAbsorber?.(1);

      expect(first).to.be.not.undefined;
      expect(second).to.be.not.undefined;

      if (!first || !second) {
        return;
      }

      const initialSize = first.options.size.value;

      placeAbsorber(first, 100, 100);
      placeAbsorber(second, 300, 300);

      first.size = first.limit.radius + 1;

      runFrame(container);

      await vi.waitFor(() => {
        expect(container.particles.count).to.equal(2);
      });

      // the replacement is appended to the absorbers array, the split one is removed from it
      const replacement = container.getAbsorber?.(1);

      expect(container.getAbsorber?.(0)).to.equal(second);
      expect(replacement).to.be.not.undefined;
      expect(replacement).to.not.equal(first);
      expect(replacement?.options.split.enable).to.equal(true);
      expect(replacement?.size).to.equal(initialSize);
      expect(replacement?.position.x).to.equal(100);
      expect(replacement?.position.y).to.equal(100);
      expect(container.getAbsorber?.(2)).to.be.undefined;
    } finally {
      container.destroy();
    }
  });

  it("should never split an absorber that did not grow since its creation", async () => {
    const container = await loadAbsorberContainer("absorbers-update-growth-guard", {
      ...noParticles,
      absorbers: [
        {
          ...defaultAbsorberOptions,
          size: { value: 50, density: 1, limit: { radius: 10 } },
          split: { enable: true, quantity: 2 },
        },
      ],
    });

    try {
      const manager = await getInstancesManager(),
        splitSpy = vi.spyOn(manager, "splitAbsorber");

      for (let i = 0; i < 10; i++) {
        runFrame(container);
      }

      await flush();

      expect(splitSpy).not.toHaveBeenCalled();
      expect(container.getAbsorber?.()).to.be.not.undefined;
      expect(container.particles.count).to.equal(0);
    } finally {
      container.destroy();
    }
  });
});

describe("AbsorbersInteractor split mode tests", () => {
  beforeAll(loadPlugins);

  it("should do nothing on the split mode without a click position", async () => {
    const container = await loadAbsorberContainer("absorbers-click-split-no-position", {
      ...noParticles,
      interactivity: { events: { onClick: { enable: true, mode: "absorber-split" } } },
      absorbers: [{ ...defaultAbsorberOptions, split: { enable: true, quantity: 2 } }],
    });

    try {
      const manager = await getInstancesManager(),
        splitSpy = vi.spyOn(manager, "splitAbsorber");

      expect(container.interactionManager).to.be.not.undefined;

      container.interactionManager!.interactivityData.mouse.clickPosition = undefined;
      container.interactionManager!.handleClickMode("absorber-split");

      await flush();

      expect(splitSpy).not.toHaveBeenCalled();
      expect(container.getAbsorber?.()).to.be.not.undefined;
      expect(container.particles.count).to.equal(0);
    } finally {
      container.destroy();
    }
  });

  it("should do nothing on the split mode when the click misses every absorber", async () => {
    const container = await loadAbsorberContainer("absorbers-click-split-miss", {
      ...noParticles,
      interactivity: { events: { onClick: { enable: true, mode: "absorber-split" } } },
      absorbers: [{ ...defaultAbsorberOptions, split: { enable: true, quantity: 2 } }],
    });

    try {
      const manager = await getInstancesManager(),
        splitSpy = vi.spyOn(manager, "splitAbsorber");

      container.interactionManager!.interactivityData.mouse.clickPosition = { x: 900, y: 900 };
      container.interactionManager!.handleClickMode("absorber-split");

      await flush();

      expect(splitSpy).not.toHaveBeenCalled();
      expect(container.getAbsorber?.()).to.be.not.undefined;
      expect(container.particles.count).to.equal(0);
    } finally {
      container.destroy();
    }
  });

  it("should do nothing on the split mode when the clicked absorber has the split disabled", async () => {
    const container = await loadAbsorberContainer("absorbers-click-split-disabled", {
      ...noParticles,
      interactivity: { events: { onClick: { enable: true, mode: "absorber-split" } } },
      absorbers: [{ ...defaultAbsorberOptions }],
    });

    try {
      const manager = await getInstancesManager(),
        splitSpy = vi.spyOn(manager, "splitAbsorber");

      container.interactionManager!.interactivityData.mouse.clickPosition = { x: 100, y: 100 };
      container.interactionManager!.handleClickMode("absorber-split");

      await flush();

      expect(splitSpy).not.toHaveBeenCalled();
      expect(container.getAbsorber?.()).to.be.not.undefined;
      expect(container.particles.count).to.equal(0);
    } finally {
      container.destroy();
    }
  });

  it("should split the absorber under the cursor on the split mode", async () => {
    const container = await loadAbsorberContainer("absorbers-click-split-hit", {
      ...noParticles,
      interactivity: { events: { onClick: { enable: true, mode: "absorber-split" } } },
      absorbers: [{ ...defaultAbsorberOptions, split: { enable: true, quantity: 2 } }],
    });

    try {
      const original = container.getAbsorber?.();

      expect(original).to.be.not.undefined;

      placeAbsorber(original, 100, 100);

      container.interactionManager!.interactivityData.mouse.clickPosition = { x: 100, y: 100 };
      container.interactionManager!.handleClickMode("absorber-split");

      await vi.waitFor(() => {
        expect(container.getAbsorber?.()).to.not.equal(original);
      });

      expect(container.getAbsorber?.()?.options.split.enable).to.equal(true);
      expect(container.getAbsorber?.()?.position.x).to.equal(100);
      expect(container.particles.count).to.equal(2);
    } finally {
      container.destroy();
    }
  });

  it("should split the nearest absorber when multiple absorbers overlap the cursor", async () => {
    const container = await loadAbsorberContainer("absorbers-click-split-overlap", {
      ...noParticles,
      interactivity: { events: { onClick: { enable: true, mode: "absorber-split" } } },
      absorbers: [
        {
          ...defaultAbsorberOptions,
          position: { x: 100, y: 100 },
          size: { value: 80, density: 1 },
          split: { enable: true, quantity: 0 },
        },
        {
          ...defaultAbsorberOptions,
          position: { x: 130, y: 100 },
          size: { value: 80, density: 1 },
          split: { enable: true, quantity: 0 },
        },
      ],
    });

    try {
      const first = container.getAbsorber?.(0),
        second = container.getAbsorber?.(1);

      expect(first).to.be.not.undefined;
      expect(second).to.be.not.undefined;

      placeAbsorber(first, 100, 100);
      placeAbsorber(second, 130, 100);

      container.interactionManager!.interactivityData.mouse.clickPosition = { x: 110, y: 100 };
      container.interactionManager!.handleClickMode("absorber-split");

      // the split one is removed, the untouched one shifts to the first slot
      await vi.waitFor(() => {
        expect(container.getAbsorber?.(0)).to.not.equal(first);
      });

      const replacement = container.getAbsorber?.(1);

      expect(container.getAbsorber?.(0)).to.equal(second);
      expect(replacement).to.be.not.undefined;
      expect(replacement).to.not.equal(first);
      expect(replacement?.options.split.enable).to.equal(true);
      expect(container.particles.count).to.equal(0);
    } finally {
      container.destroy();
    }
  });

  it("should apply the attraction once per frame, the interactor must not attract", async () => {
    const container = await loadAbsorberContainer("absorbers-single-attract", {
      autoPlay: false,
      interactivity: { events: { onClick: { enable: true, mode: "absorbers" } } },
      absorbers: [{ ...defaultAbsorberOptions, draggable: true }],
    });

    try {
      const absorber = container.getAbsorber?.(0);

      expect(absorber).to.be.not.undefined;

      if (!absorber) {
        return;
      }

      placeAbsorber(absorber, 100, 100);

      const attract = vi.spyOn(absorber, "attract"),
        mouse = container.interactionManager!.interactivityData.mouse;

      container.particles.addParticle({ x: 100, y: 100 });

      // a click used to make the interactor attract on top of the plugin particle update, doubling
      // both the force and the absorbers growth
      mouse.clickPosition = { x: 900, y: 900 };

      container.interactionManager!.externalInteract(frameDelta);

      expect(attract).not.toHaveBeenCalled();

      container.particles.update(frameDelta);

      expect(attract).toHaveBeenCalledTimes(1);
    } finally {
      container.destroy();
    }
  });

  it("should drag a draggable absorber while the mouse is down", async () => {
    const container = await loadAbsorberContainer("absorbers-drag-interactor", {
      autoPlay: false,
      interactivity: { events: { onClick: { enable: true, mode: "absorbers" } } },
      absorbers: [{ ...defaultAbsorberOptions, draggable: true }],
    });

    try {
      const absorber = container.getAbsorber?.(0);

      expect(absorber).to.be.not.undefined;

      if (!absorber) {
        return;
      }

      placeAbsorber(absorber, 100, 100);

      const mouse = container.interactionManager!.interactivityData.mouse;

      mouse.clicking = true;
      mouse.downPosition = { x: 100, y: 100 };
      mouse.position = { x: 300, y: 400 };

      container.interactionManager!.externalInteract(frameDelta);

      expect(absorber.position.x).to.equal(300);
      expect(absorber.position.y).to.equal(400);
    } finally {
      container.destroy();
    }
  });

  it("should not add an absorber on the classic add mode when clicking an existing one", async () => {
    const container = await loadAbsorberContainer("absorbers-click-add-guard", {
      ...noParticles,
      interactivity: {
        events: { onClick: { enable: true, mode: "absorbers" } },
        modes: { absorbers: [{ size: { value: 20, density: 1 } }] },
      },
    });

    try {
      const manager = await getInstancesManager();

      await manager.addAbsorber(container, { ...defaultAbsorberOptions });

      const absorber = container.getAbsorber?.(0);

      expect(absorber).to.be.not.undefined;

      placeAbsorber(absorber, 100, 100);

      container.interactionManager!.interactivityData.mouse.clickPosition = { x: 100, y: 100 };
      container.interactionManager!.handleClickMode("absorbers");

      await flush();

      expect(container.getAbsorber?.(1)).to.be.undefined;
    } finally {
      container.destroy();
    }
  });

  it("should still add an absorber on the classic add mode on an empty area", async () => {
    const container = await loadAbsorberContainer("absorbers-click-add-empty", {
      ...noParticles,
      interactivity: {
        events: { onClick: { enable: true, mode: "absorbers" } },
        modes: { absorbers: [{ size: { value: 20, density: 1 } }] },
      },
    });

    try {
      expect(container.getAbsorber?.(0)).to.be.undefined;

      container.interactionManager!.interactivityData.mouse.clickPosition = { x: 800, y: 800 };
      container.interactionManager!.handleClickMode("absorbers");

      await vi.waitFor(() => {
        expect(container.getAbsorber?.(0)).to.be.not.undefined;
      });
    } finally {
      container.destroy();
    }
  });

  it("should still drag a draggable absorber when only the split mode is configured", async () => {
    const container = await loadAbsorberContainer("absorbers-click-split-drag", {
      ...noParticles,
      interactivity: { events: { onClick: { enable: true, mode: "absorber-split" } } },
      absorbers: [{ ...defaultAbsorberOptions, draggable: true, split: { enable: true, quantity: 0 } }],
    });

    try {
      const absorber = container.getAbsorber?.(),
        mouse = container.interactionManager!.interactivityData.mouse;

      expect(absorber).to.be.not.undefined;
      expect(container.interactionManager).to.be.not.undefined;

      placeAbsorber(absorber, 100, 100);

      mouse.clicking = true;
      mouse.clickPosition = { x: 100, y: 100 };
      mouse.downPosition = { x: 100, y: 100 };
      mouse.position = { x: 500, y: 500 };

      container.interactionManager!.externalInteract(frameDelta);

      expect(absorber?.position.x).to.equal(500);
      expect(absorber?.position.y).to.equal(500);
    } finally {
      container.destroy();
    }
  });
});

describe("Absorbers particle attraction tests", () => {
  beforeAll(loadPlugins);

  const twoDestroyingAbsorbers = {
    ...noParticles,
    absorbers: [
      {
        ...defaultAbsorberOptions,
        position: { x: 100, y: 100 },
        size: { value: 60, density: 1 },
        destroy: true,
      },
      {
        ...defaultAbsorberOptions,
        position: { x: 400, y: 400 },
        size: { value: 60, density: 1 },
        destroy: true,
      },
    ],
  };

  it("should stop the plugin attraction once the particle is destroyed", async () => {
    const container = await loadAbsorberContainer("absorbers-particle-update-break", twoDestroyingAbsorbers);

    try {
      const first = container.getAbsorber?.(0),
        second = container.getAbsorber?.(1);

      expect(first).to.be.not.undefined;
      expect(second).to.be.not.undefined;

      if (!first || !second) {
        return;
      }

      placeAbsorber(first, 100, 100);
      placeAbsorber(second, 400, 400);

      const particle = container.particles.addParticle({ x: 100, y: 100 }),
        secondAttract = vi.spyOn(second, "attract");

      expect(particle).to.be.not.undefined;

      runFrame(container);

      expect(particle.destroyed).to.equal(true);
      expect(secondAttract).not.toHaveBeenCalled();
    } finally {
      container.destroy();
    }
  });
});
