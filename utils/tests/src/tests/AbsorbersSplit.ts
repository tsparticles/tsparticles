/* eslint-disable */
import {
  type IDelta,
  type IMouseData,
  type ISourceOptions,
  type RecursivePartial,
  doublePI,
  getDistance,
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
        addSpy = vi.spyOn(container.particles, "addParticle");

      expect(absorber).to.be.not.undefined;

      if (!absorber) {
        return;
      }

      manager.splitAbsorber(container, absorber);

      // a disabled split must leave the absorber alive, it is the only thing keeping it there
      expect(container.getAbsorber?.()).to.equal(absorber);
      expect(addSpy).not.toHaveBeenCalled();
      expect(container.particles.count).to.equal(0);
    } finally {
      container.destroy();
    }
  });

  it("should remove the absorber without generating particles when the quantity is 0", async () => {
    const container = await loadAbsorberContainer("absorbers-split-zero-quantity", {
      ...noParticles,
      absorbers: [{ ...defaultAbsorberOptions, split: { enable: true, quantity: 0 } }],
    });

    try {
      const manager = await getInstancesManager(),
        absorber = container.getAbsorber?.(),
        addSpy = vi.spyOn(container.particles, "addParticle");

      expect(absorber).to.be.not.undefined;

      if (!absorber) {
        return;
      }

      manager.splitAbsorber(container, absorber);

      expect(addSpy).not.toHaveBeenCalled();
      expect(container.getAbsorber?.()).to.be.undefined;
      expect(container.particles.count).to.equal(0);
    } finally {
      container.destroy();
    }
  });

  it("should consume the absorber and release the particles on its rim", async () => {
    const container = await loadAbsorberContainer("absorbers-split-consume", {
      ...noParticles,
      absorbers: [{ ...defaultAbsorberOptions, split: { enable: true, quantity: 3 } }],
    });

    try {
      const manager = await getInstancesManager(),
        absorber = container.getAbsorber?.(),
        addSpy = vi.spyOn(container.particles, "addParticle");

      expect(absorber).to.be.not.undefined;

      if (!absorber) {
        return;
      }

      const oldPosition = { x: absorber.position.x, y: absorber.position.y };

      absorber.size += 100;

      const releasedSize = absorber.size;

      manager.splitAbsorber(container, absorber);

      // the split consumes the absorber: nothing is left behind to absorb the very particles it
      // has just released
      expect(container.getAbsorber?.()).to.be.undefined;
      expect(addSpy).toHaveBeenCalledTimes(3);

      for (const [spawned] of addSpy.mock.calls) {
        // the particles are released on the rim the absorber was covering, never on its centre
        expect(getDistance(spawned, oldPosition)).to.be.closeTo(releasedSize, 1e-6);
      }
    } finally {
      container.destroy();
    }
  });

  it("should release less mass than the absorber was holding", async () => {
    const container = await loadAbsorberContainer("absorbers-split-mass", {
      ...noParticles,
      absorbers: [{ ...defaultAbsorberOptions, split: { enable: true, quantity: 4 } }],
    });

    try {
      const manager = await getInstancesManager(),
        absorber = container.getAbsorber?.(),
        addSpy = vi.spyOn(container.particles, "addParticle");

      expect(absorber).to.be.not.undefined;

      if (!absorber) {
        return;
      }

      absorber.size += 100;

      const absorbedSize = absorber.size,
        quantity = 4;

      manager.splitAbsorber(container, absorber);

      let releasedSize = 0;

      for (const [, options] of addSpy.mock.calls) {
        releasedSize += options?.size?.value ?? 0;
      }

      // the causal invariant of a non endless split: the released particles are worth strictly
      // less than the mass the absorber had accumulated, so every split drains a slice out of the
      // system instead of manufacturing particles out of nothing
      expect(releasedSize).to.be.lessThan(absorbedSize);
      expect(releasedSize).to.be.greaterThan(0);
      expect(addSpy).toHaveBeenCalledTimes(quantity);
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

  it("should not multiply the particles out of control when an absorber splits", async () => {
    const W = 1920,
      H = 1080;
    const container = (await tsParticles.load({
      id: "probe-split-mult",
      options: {
        autoPlay: false,
        particles: { number: { value: 0 }, move: { enable: false }, size: { value: 2 } },
        absorbers: [
          {
            ...defaultAbsorberOptions,
            destroy: false,
            orbits: true,
            size: { value: 6, density: 600, limit: { radius: 45, mass: 7200 } },
            split: { enable: true, quantity: 12 },
          },
          {
            ...defaultAbsorberOptions,
            destroy: false,
            orbits: true,
            size: { value: 6, density: 600, limit: { radius: 45, mass: 7200 } },
            split: { enable: true, quantity: 12 },
          },
        ],
      } as RecursivePartial<ISourceOptions>,
      element: createCustomCanvas(W, H) as unknown as HTMLCanvasElement,
    })) as AbsorberContainer | null;

    if (!container) throw new Error("no container");

    (container.canvas.size as { width: number }).width = W;
    (container.canvas.size as { height: number }).height = H;
    container.canvas.resize();

    try {
      const manager = await getInstancesManager(),
        absorbers = manager.getArray(container);

      for (const a of absorbers) a.position.setTo({ x: W / 2, y: H / 2 });
      for (let i = 0; i < 300; i++) {
        container.particles.addParticle({ x: 100 + (i % 30) * 60, y: 100 + Math.floor(i / 30) * 100 });
      }

      const startCount = container.particles.count,
        // one split per absorber, 12 particles each, and nothing more
        maxCount = startCount + 24;

      for (const a of absorbers) a.size = a.limit.radius;

      // both absorbers are already over their limit and the frames are not awaited, exactly like
      // the animation loop: each absorber can be split only once because the split consumes it, so
      // the particle count stays bounded instead of growing on every frame
      for (let f = 0; f < 60; f++) {
        runFrame(container);
      }

      await flush();

      expect(container.particles.count).to.be.at.most(maxCount);
    } finally {
      container.destroy();
    }
  });

  it("should recycle the particles absorbed by a non orbiting absorber", async () => {
    const W = 1920,
      H = 1080,
      container = (await tsParticles.load({
        id: "absorbers-split-non-orbit-recycle",
        options: {
          autoPlay: false,
          particles: {
            number: { value: 0 },
            move: { enable: true, speed: 0.6, random: true },
            size: { value: { min: 1, max: 3 } },
          },
          absorbers: [
            {
              ...defaultAbsorberOptions,
              destroy: false,
              orbits: false,
              size: { value: 6, density: 100, limit: { radius: 40 } },
              split: { enable: true, quantity: 12 },
            },
          ],
        } as RecursivePartial<ISourceOptions>,
        element: createCustomCanvas(W, H) as unknown as HTMLCanvasElement,
      })) as AbsorberContainer | null;

    if (!container) {
      throw new Error("Error test container not initialized");
    }

    (container.canvas.size as { width: number }).width = W;
    (container.canvas.size as { height: number }).height = H;
    container.canvas.resize();

    try {
      const manager = await getInstancesManager(),
        absorbers = manager.getArray(container);

      expect(absorbers).to.have.length(1);

      absorbers[0]?.position.setTo({ x: W / 2, y: H / 2 });

      // every particle starts inside the absorber, so all of them are absorbed on the first frame
      for (let i = 0; i < 200; i++) {
        const angle = (i / 200) * doublePI;

        container.particles.addParticle({ x: W / 2 + Math.cos(angle) * 2, y: H / 2 + Math.sin(angle) * 2 });
      }

      const startCount = container.particles.count;

      for (let f = 0; f < 40; f++) {
        runFrame(container);

        await flush();
      }

      // a non orbiting absorber sets `needsNewPosition` on the particles it absorbs, and it has to
      // recycle them just like the orbit branch does: left inside, they keep feeding the absorber
      // mass, it grows to its limit, splits, and the particles keep multiplying
      const stuck = container.particles.filter(
        particle => (particle as unknown as { needsNewPosition?: boolean }).needsNewPosition,
      );

      expect(stuck).to.have.length(0);
      expect(absorbers[0]?.size).to.be.lessThan(absorbers[0]?.limit.radius ?? 0);
      expect(container.particles.count).to.be.at.most(startCount);
    } finally {
      container.destroy();
    }
  });

  it("should split an absorber only once, the split consumes it", async () => {
    const container = await loadAbsorberContainer("absorbers-update-single-flight", {
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
      const manager = await getInstancesManager(),
        splitSpy = vi.spyOn(manager, "splitAbsorber"),
        addSpy = vi.spyOn(container.particles, "addParticle"),
        absorber = container.getAbsorber?.(0);

      expect(absorber).to.be.not.undefined;

      if (!absorber) {
        return;
      }

      absorber.size = absorber.limit.radius + 1;

      // the split is synchronous: the absorber is consumed by the very first frame, so the frames
      // that follow find nothing left to split. This is what keeps a split from repeating itself
      // forever, no in flight guard needed
      runFrame(container);
      runFrame(container);
      runFrame(container);

      expect(splitSpy).toHaveBeenCalledOnce();
      expect(addSpy).toHaveBeenCalledTimes(2);
      expect(container.getAbsorber?.(0)).to.be.undefined;
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

      placeAbsorber(first, 100, 100);
      placeAbsorber(second, 300, 300);

      first.size = first.limit.radius + 1;

      runFrame(container);

      await vi.waitFor(() => {
        expect(container.particles.count).to.equal(2);
      });

      // the split one is consumed, the untouched one is the only absorber left
      expect(container.getAbsorber?.(0)).to.equal(second);
      expect(container.getAbsorber?.(1)).to.be.undefined;
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

      // the click consumed the absorber it landed on, leaving only the released particles
      expect(container.getAbsorber?.()).to.be.undefined;
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

      // the split one is consumed, the untouched one is the only absorber left
      expect(container.getAbsorber?.(0)).to.equal(second);
      expect(container.getAbsorber?.(1)).to.be.undefined;
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
