/* eslint-disable */
import { type Container, type IDelta, type ISourceOptions, tsParticles } from "@tsparticles/engine";
import { loadEasingLinearPlugin } from "@tsparticles/plugin-easing-linear";
import { loadEasingQuadPlugin } from "@tsparticles/plugin-easing-quad";
import { loadExternalAttractInteraction } from "@tsparticles/interaction-external-attract";
import { loadExternalBounceInteraction } from "@tsparticles/interaction-external-bounce";
import { loadExternalBubbleInteraction } from "@tsparticles/interaction-external-bubble";
import { loadExternalCannonInteraction } from "@tsparticles/interaction-external-cannon";
import { loadExternalConnectInteraction } from "@tsparticles/interaction-external-connect";
import { loadExternalDestroyInteraction } from "@tsparticles/interaction-external-destroy";
import { loadExternalDragInteraction } from "@tsparticles/interaction-external-drag";
import { loadExternalGrabInteraction } from "@tsparticles/interaction-external-grab";
import { loadExternalParallaxInteraction } from "@tsparticles/interaction-external-parallax";
import { loadExternalParticleInteraction } from "@tsparticles/interaction-external-particle";
import { loadExternalPauseInteraction } from "@tsparticles/interaction-external-pause";
import { loadExternalPopInteraction } from "@tsparticles/interaction-external-pop";
import { loadExternalPushInteraction } from "@tsparticles/interaction-external-push";
import { loadExternalRemoveInteraction } from "@tsparticles/interaction-external-remove";
import { loadExternalRepulseInteraction } from "@tsparticles/interaction-external-repulse";
import { loadExternalSlowInteraction } from "@tsparticles/interaction-external-slow";
import { loadExternalTrailInteraction } from "@tsparticles/interaction-external-trail";
import { loadParticlesAttractInteraction } from "@tsparticles/interaction-particles-attract";
import { loadParticlesLinksInteraction } from "@tsparticles/interaction-particles-links";
import { loadParticlesRepulseInteraction } from "@tsparticles/interaction-particles-repulse";
import { loadHexColorPlugin } from "@tsparticles/plugin-hex-color";
import { InteractorType, loadInteractivityPlugin } from "@tsparticles/plugin-interactivity";
import { loadMovePlugin } from "@tsparticles/plugin-move";
import { loadOpacityUpdater } from "@tsparticles/updater-opacity";
import { loadRgbColorPlugin } from "@tsparticles/plugin-rgb-color";
import { loadCircleShape } from "@tsparticles/shape-circle";
import { loadSizeUpdater } from "@tsparticles/updater-size";
import { beforeAll, describe, expect, it } from "vitest";
import { TestWindow } from "../Fixture/Window.js";
import { createCustomCanvas } from "../Fixture/CustomCanvas.js";

globalThis.window = TestWindow;

interface TestMouseData {
  clickPosition?: { x: number; y: number };
  clickTime?: number;
  clicking: boolean;
  downPosition?: { x: number; y: number };
  inside: boolean;
  position?: { x: number; y: number };
}

interface TestInteractivityData {
  mouse: TestMouseData;
  status?: string;
}

interface TestInteractor {
  type: string;
  maxDistance: number;
  isEnabled: (data: TestInteractivityData, particle?: unknown) => boolean;
  handleClickMode?: (mode: string, data: TestInteractivityData) => void;
}

interface TestInteractionManager {
  interactivityData: TestInteractivityData;
  interactors: TestInteractor[];
  externalInteract: (delta: IDelta) => void;
  handleClickMode: (mode: string) => void;
  particlesInteract: (particle: unknown, delta: IDelta) => void;
}

interface TestParticle {
  position: { x: number; y: number; z: number };
  velocity: { x: number; y: number; z: number };
  links?: { destination: unknown; opacity: number }[];
  getModifier: (
    id: string,
  ) => { enabled: boolean; opacity?: number; radius?: number; speedFactor?: number } | undefined;
  getRadius: () => number;
}

interface TestContainer extends Container {
  interactionManager?: TestInteractionManager;
  particles: Container["particles"] & {
    get: (index: number) => TestParticle | undefined;
    grid: { insert: (particle: TestParticle) => void };
  };
}

const canvasWidth = 800,
  canvasHeight = 600,
  testDelta: IDelta = { value: 1, factor: 1 };

let containerId = 0;

async function loadContainer(
  particles: Record<string, unknown>,
  interactivity?: Record<string, unknown>,
): Promise<TestContainer> {
  const id = `interaction-geometry-${(containerId += 1).toString()}`,
    options = {
      autoPlay: false,
      detectRetina: false,
      particles: {
        number: { value: 0 },
        move: { enable: false },
        size: { value: 5, animation: { enable: false } },
        opacity: { value: 1, animation: { enable: false } },
        ...particles,
      },
      interactivity,
    } as ISourceOptions,
    container = (await tsParticles.load({
      id,
      options,
      autoPlay: false,
      element: createCustomCanvas(canvasWidth, canvasHeight) as unknown as HTMLCanvasElement,
    })) as unknown as TestContainer | undefined;

  if (!container) {
    throw new Error(`test container ${id} not initialized`);
  }

  container.canvas.size.width = canvasWidth;
  container.canvas.size.height = canvasHeight;

  return container;
}

function particleAt(container: TestContainer, index: number, x: number, y: number): TestParticle {
  const particle = container.particles.get(index);

  if (!particle) {
    throw new Error(`particle ${index.toString()} not found`);
  }

  particle.position.x = x;
  particle.position.y = y;
  particle.velocity.x = 0;
  particle.velocity.y = 0;

  return particle;
}

function managerOf(container: TestContainer): TestInteractionManager {
  const manager = container.interactionManager;

  if (!manager) {
    throw new Error("interaction manager not initialized");
  }

  return manager;
}

function interactorByDistance(manager: TestInteractionManager, distance: number): TestInteractor {
  const interactor = manager.interactors.find(i => i.maxDistance === distance);

  if (!interactor) {
    throw new Error(`interactor with maxDistance ${distance.toString()} not found`);
  }

  return interactor;
}

describe("Interaction geometry tests", () => {
  beforeAll(async () => {
    const engine = tsParticles;

    await loadInteractivityPlugin(engine);
    await loadMovePlugin(engine);
    await loadCircleShape(engine);
    await loadSizeUpdater(engine);
    await loadOpacityUpdater(engine);
    await loadHexColorPlugin(engine);
    await loadRgbColorPlugin(engine);
    await loadEasingQuadPlugin(engine);
    await loadEasingLinearPlugin(engine);

    await loadExternalAttractInteraction(engine);
    await loadExternalBounceInteraction(engine);
    await loadExternalBubbleInteraction(engine);
    await loadExternalCannonInteraction(engine);
    await loadExternalConnectInteraction(engine);
    await loadExternalDestroyInteraction(engine);
    await loadExternalDragInteraction(engine);
    await loadExternalGrabInteraction(engine);
    await loadExternalParallaxInteraction(engine);
    await loadExternalParticleInteraction(engine);
    await loadExternalPauseInteraction(engine);
    await loadExternalPopInteraction(engine);
    await loadExternalPushInteraction(engine);
    await loadExternalRemoveInteraction(engine);
    await loadExternalRepulseInteraction(engine);
    await loadExternalSlowInteraction(engine);
    await loadExternalTrailInteraction(engine);
    await loadParticlesAttractInteraction(engine);
    await loadParticlesLinksInteraction(engine);
    await loadParticlesRepulseInteraction(engine);

    const boot = (await tsParticles.load({
      id: "interaction-geometry-boot",
      options: { autoPlay: false, detectRetina: false } as ISourceOptions,
      autoPlay: false,
      element: createCustomCanvas(1, 1) as unknown as HTMLCanvasElement,
    })) as unknown as TestContainer | undefined;

    boot?.destroy(false);
  });

  it("external attract moves a particle toward the pointer by the eased velocity [exact]", async () => {
    const container = await loadContainer(
      { number: { value: 1 } },
      {
        events: { onHover: { enable: true, mode: "attract" } },
        modes: { attract: { distance: 200, speed: 1, factor: 1, maxSpeed: 50, easing: "ease-out-quad" } },
      },
    );

    try {
      const particle = particleAt(container, 0, 100, 100),
        manager = managerOf(container);

      manager.interactivityData.mouse.inside = true;
      manager.interactivityData.mouse.position = { x: 200, y: 100 };
      manager.interactivityData.status = "pointermove";

      container.particles.update(testDelta);

      expect(particle.position.x).to.be.closeTo(101, 1e-9);
      expect(particle.position.y).to.be.closeTo(100, 1e-9);
    } finally {
      container.destroy(false);
    }
  });

  it("external attract clamps the movement to maxSpeed [exact]", async () => {
    const container = await loadContainer(
      { number: { value: 1 } },
      {
        events: { onHover: { enable: true, mode: "attract" } },
        modes: { attract: { distance: 200, speed: 100, factor: 1, maxSpeed: 50, easing: "ease-out-quad" } },
      },
    );

    try {
      const particle = particleAt(container, 0, 100, 100),
        manager = managerOf(container);

      manager.interactivityData.mouse.inside = true;
      manager.interactivityData.mouse.position = { x: 200, y: 100 };
      manager.interactivityData.status = "pointermove";

      container.particles.update(testDelta);

      expect(particle.position.x).to.be.closeTo(150, 1e-9);
    } finally {
      container.destroy(false);
    }
  });

  it("external bounce reverses an incoming particle velocity against the cursor circle [structural]", async () => {
    const container = await loadContainer(
      { number: { value: 1 }, size: { value: 20, animation: { enable: false } } },
      {
        events: { onHover: { enable: true, mode: "bounce" } },
        modes: { bounce: { distance: 200 } },
      },
    );

    try {
      const particle = particleAt(container, 0, 100, 100),
        manager = managerOf(container);

      particle.velocity.x = 10;
      particle.velocity.y = 0;

      manager.interactivityData.mouse.inside = true;
      manager.interactivityData.mouse.position = { x: 150, y: 100 };
      manager.interactivityData.status = "pointermove";

      container.particles.update(testDelta);

      expect(particle.velocity.x).to.be.lessThan(0);
    } finally {
      container.destroy(false);
    }
  });

  it("external bubble maps the proximity ratio onto size and opacity modifiers [exact]", async () => {
    const container = await loadContainer(
      { number: { value: 1 } },
      {
        events: { onHover: { enable: true, mode: "bubble" } },
        modes: { bubble: { distance: 100, size: 20, opacity: 0.2, duration: 0.4 } },
      },
    );

    try {
      const particle = particleAt(container, 0, 100, 100),
        manager = managerOf(container);

      manager.interactivityData.mouse.inside = true;
      manager.interactivityData.mouse.position = { x: 150, y: 100 };
      manager.interactivityData.status = "pointermove";

      container.particles.update(testDelta);

      const mod = particle.getModifier("bubble");

      expect(mod).to.not.be.undefined;
      expect(mod?.radius).to.be.closeTo(12.5, 1e-9);
      expect(mod?.opacity).to.be.closeTo(0.6, 1e-9);
      expect(particle.getRadius()).to.be.closeTo(12.5, 1e-9);
    } finally {
      container.destroy(false);
    }
  });

  it("external cannon fires a burst sized by the drag length [exact]", async () => {
    const container = await loadContainer(
      { number: { value: 0 } },
      {
        events: { onClick: { enable: true, mode: "cannon" } },
        modes: {
          cannon: {
            maxDragDistance: 1000,
            velocityFactor: 10,
            particleFactor: 0.2,
            minParticles: 1,
            maxParticles: 200,
            spread: 0,
            drawVector: false,
          },
        },
      },
    );

    try {
      const manager = managerOf(container),
        mouse = manager.interactivityData.mouse;

      mouse.inside = true;
      mouse.clicking = true;
      mouse.downPosition = { x: 100, y: 100 };
      mouse.position = { x: 100, y: 100 };

      manager.externalInteract(testDelta);

      mouse.position = { x: 200, y: 100 };

      manager.externalInteract(testDelta);

      mouse.clicking = false;

      manager.externalInteract(testDelta);

      expect(container.particles.count).to.equal(20);
    } finally {
      container.destroy(false);
    }
  });

  it("external connect enables on cursor hover within its maximum distance [structural]", async () => {
    const container = await loadContainer(
      { number: { value: 2 } },
      {
        events: { onHover: { enable: true, mode: "connect" } },
        modes: { connect: { distance: 100, radius: 100 } },
      },
    );

    try {
      particleAt(container, 0, 100, 100);
      particleAt(container, 1, 150, 100);

      const manager = managerOf(container),
        interactor = interactorByDistance(manager, 100);

      manager.interactivityData.mouse.inside = true;
      manager.interactivityData.mouse.position = { x: 125, y: 100 };
      manager.interactivityData.status = "pointermove";

      expect(interactor.isEnabled(manager.interactivityData)).to.be.true;

      manager.interactivityData.mouse.position = undefined;

      expect(interactor.isEnabled(manager.interactivityData)).to.be.false;
      expect(container.particles.count).to.equal(2);
    } finally {
      container.destroy(false);
    }
  });

  it("external destroy removes particles inside its radius and keeps the outsiders [exact]", async () => {
    const container = await loadContainer(
      { number: { value: 2 } },
      {
        events: { onHover: { enable: true, mode: "destroy" } },
        modes: { destroy: { distance: 50 } },
      },
    );

    try {
      particleAt(container, 0, 100, 100);
      particleAt(container, 1, 400, 400);

      const manager = managerOf(container);

      manager.interactivityData.mouse.inside = true;
      manager.interactivityData.mouse.position = { x: 100, y: 100 };
      manager.interactivityData.status = "pointermove";

      container.particles.update(testDelta);

      expect(container.particles.count).to.equal(1);
    } finally {
      container.destroy(false);
    }
  });

  it("external drag moves the grabbed particle to the pointer position [exact]", async () => {
    const container = await loadContainer(
      { number: { value: 1 } },
      {
        events: { onClick: { enable: true, mode: "drag" } },
        modes: { drag: {} },
      },
    );

    try {
      const particle = particleAt(container, 0, 100, 100),
        manager = managerOf(container),
        mouse = manager.interactivityData.mouse;

      mouse.inside = true;
      mouse.clicking = true;
      mouse.downPosition = { x: 100, y: 100 };
      mouse.position = { x: 100, y: 100 };

      manager.externalInteract(testDelta);

      mouse.position = { x: 150, y: 120 };

      manager.externalInteract(testDelta);

      expect(particle.position.x).to.be.closeTo(150, 1e-9);
      expect(particle.position.y).to.be.closeTo(120, 1e-9);
    } finally {
      container.destroy(false);
    }
  });

  it("external grab enables on cursor hover within its maximum distance [structural]", async () => {
    const container = await loadContainer(
      { number: { value: 1 } },
      {
        events: { onHover: { enable: true, mode: "grab" } },
        modes: { grab: { distance: 100 } },
      },
    );

    try {
      particleAt(container, 0, 150, 100);

      const manager = managerOf(container),
        interactor = interactorByDistance(manager, 100);

      manager.interactivityData.mouse.inside = true;
      manager.interactivityData.mouse.position = { x: 150, y: 100 };

      expect(interactor.isEnabled(manager.interactivityData)).to.be.true;

      manager.interactivityData.mouse.position = undefined;

      expect(interactor.isEnabled(manager.interactivityData)).to.be.false;
    } finally {
      container.destroy(false);
    }
  });

  it("external parallax offsets the particle by the eased cursor distance from the canvas center [exact]", async () => {
    const container = await loadContainer(
      { number: { value: 1 } },
      {
        events: { onHover: { enable: true, mode: "parallax" } },
        modes: { parallax: { force: 5, smooth: 5 } },
      },
    );

    try {
      const particle = particleAt(container, 0, 100, 100) as unknown as { offset: { x: number; y: number } },
        manager = managerOf(container);

      manager.interactivityData.mouse.inside = true;
      manager.interactivityData.mouse.position = { x: 450, y: 300 };

      container.particles.update(testDelta);

      expect(particle.offset.x).to.be.closeTo(10, 1e-9);
      expect(particle.offset.y).to.be.closeTo(0, 1e-9);
    } finally {
      container.destroy(false);
    }
  });

  it("external particle spawns one follower particle at the cursor position [exact]", async () => {
    const container = await loadContainer(
      { number: { value: 0 } },
      {
        events: { onHover: { enable: true, mode: "particle" } },
        modes: { particle: { options: { move: { enable: false } } } },
      },
    );

    try {
      const manager = managerOf(container);

      manager.interactivityData.mouse.inside = true;
      manager.interactivityData.mouse.position = { x: 123, y: 45 };

      manager.externalInteract(testDelta);

      expect(container.particles.count).to.equal(1);

      const created = container.particles.get(0);

      expect(created?.position.x).to.be.closeTo(123, 1e-9);
      expect(created?.position.y).to.be.closeTo(45, 1e-9);
    } finally {
      container.destroy(false);
    }
  });

  it("external pause is the only container-level interactor enabled by its click mode [structural]", async () => {
    const container = await loadContainer(
      { number: { value: 1 } },
      { events: { onClick: { enable: true, mode: "pause" } } },
    );

    try {
      const manager = managerOf(container),
        enabled = manager.interactors.filter(
          i => i.type === InteractorType.external && i.isEnabled(manager.interactivityData),
        );

      expect(enabled.length).to.equal(1);
      expect(typeof enabled[0]?.handleClickMode).to.equal("function");
    } finally {
      container.destroy(false);
    }
  });

  it("external pop destroys the particle under the click position [exact]", async () => {
    const container = await loadContainer(
      { number: { value: 1 } },
      { events: { onClick: { enable: true, mode: "pop" } } },
    );

    try {
      particleAt(container, 0, 100, 100);

      const manager = managerOf(container);

      container.particles.update(testDelta);

      manager.interactivityData.mouse.inside = true;
      manager.interactivityData.mouse.clickPosition = { x: 100, y: 100 };

      manager.handleClickMode("pop");

      container.particles.update(testDelta);

      expect(container.particles.count).to.equal(0);
    } finally {
      container.destroy(false);
    }
  });

  it("external push adds the configured quantity at the cursor position [exact]", async () => {
    const container = await loadContainer(
      { number: { value: 0 } },
      {
        events: { onClick: { enable: true, mode: "push" } },
        modes: { push: { quantity: 5 } },
      },
    );

    try {
      const manager = managerOf(container);

      manager.interactivityData.mouse.inside = true;
      manager.interactivityData.mouse.position = { x: 300, y: 200 };

      manager.handleClickMode("push");

      expect(container.particles.count).to.equal(5);
    } finally {
      container.destroy(false);
    }
  });

  it("external remove destroys the configured quantity on click [exact]", async () => {
    const container = await loadContainer(
      { number: { value: 3 } },
      {
        events: { onClick: { enable: true, mode: "remove" } },
        modes: { remove: { quantity: 2 } },
      },
    );

    try {
      const manager = managerOf(container);

      manager.handleClickMode("remove");

      container.particles.update(testDelta);

      expect(container.particles.count).to.equal(1);
    } finally {
      container.destroy(false);
    }
  });

  it("external repulse pushes a particle away from the cursor [exact]", async () => {
    const container = await loadContainer(
      { number: { value: 1 } },
      {
        events: { onHover: { enable: true, mode: "repulse" } },
        modes: { repulse: { distance: 100, speed: 1, factor: 1, maxSpeed: 50, easing: "ease-out-quad" } },
      },
    );

    try {
      const particle = particleAt(container, 0, 100, 100),
        manager = managerOf(container);

      manager.interactivityData.mouse.inside = true;
      manager.interactivityData.mouse.position = { x: 150, y: 100 };
      manager.interactivityData.status = "pointermove";

      container.particles.update(testDelta);

      expect(particle.position.x).to.be.closeTo(99.25, 1e-9);
      expect(particle.position.y).to.be.closeTo(100, 1e-9);
    } finally {
      container.destroy(false);
    }
  });

  it("external slow applies a distance dependent speed factor modifier [exact]", async () => {
    const container = await loadContainer(
      { number: { value: 1 } },
      {
        events: { onHover: { enable: true, mode: "slow" } },
        modes: { slow: { radius: 100, factor: 2 } },
      },
    );

    try {
      const particle = particleAt(container, 0, 100, 100),
        manager = managerOf(container);

      manager.interactivityData.mouse.inside = true;
      manager.interactivityData.mouse.position = { x: 150, y: 100 };

      container.particles.update(testDelta);

      const mod = particle.getModifier("slow");

      expect(mod).to.not.be.undefined;
      expect(mod?.enabled).to.be.true;
      expect(mod?.speedFactor).to.be.closeTo(0.25, 1e-9);
    } finally {
      container.destroy(false);
    }
  });

  it("external trail emits the configured quantity at the cursor position [exact]", async () => {
    const container = await loadContainer(
      { number: { value: 0 } },
      {
        events: { onHover: { enable: true, mode: "trail" } },
        modes: { trail: { delay: 0, quantity: 1, pauseOnStop: false } },
      },
    );

    try {
      const manager = managerOf(container);

      manager.interactivityData.mouse.inside = true;
      manager.interactivityData.mouse.position = { x: 200, y: 150 };

      manager.externalInteract(testDelta);

      expect(container.particles.count).to.equal(1);
    } finally {
      container.destroy(false);
    }
  });

  it("particles attract accelerates both particles along the separation axis [exact]", async () => {
    const container = await loadContainer({
      number: { value: 2 },
      attract: { enable: true, distance: 200, rotate: { x: 1, y: 1 } },
    });

    try {
      const p1 = particleAt(container, 0, 100, 100),
        p2 = particleAt(container, 1, 200, 100),
        manager = managerOf(container);

      container.particles.grid.insert(p1);
      container.particles.grid.insert(p2);

      manager.particlesInteract(p1, testDelta);

      expect(p1.velocity.x).to.be.closeTo(0.1, 1e-9);
      expect(p2.velocity.x).to.be.closeTo(-0.1, 1e-9);
    } finally {
      container.destroy(false);
    }
  });

  it("particles links connect two particles with a distance faded opacity [exact]", async () => {
    const container = await loadContainer({
      number: { value: 2 },
      links: { enable: true, distance: 100, opacity: 1, color: "#ffffff" },
    });

    try {
      const p1 = particleAt(container, 0, 100, 100),
        p2 = particleAt(container, 1, 150, 100),
        manager = managerOf(container);

      container.particles.grid.insert(p1);
      container.particles.grid.insert(p2);

      manager.particlesInteract(p1, testDelta);

      expect(p1.links).to.not.be.undefined;
      expect(p1.links?.length).to.equal(1);
      expect(p1.links?.[0]?.destination).to.equal(p2);
      expect(p1.links?.[0]?.opacity).to.be.closeTo(0.5, 1e-9);
    } finally {
      container.destroy(false);
    }
  });

  it("particles repulse displaces the neighbor away along the separation axis [exact]", async () => {
    const container = await loadContainer({
      number: { value: 2 },
      repulse: { enabled: true, distance: 100, speed: 1, factor: 1 },
    });

    try {
      const p1 = particleAt(container, 0, 100, 100),
        p2 = particleAt(container, 1, 150, 100),
        manager = managerOf(container);

      container.particles.grid.insert(p1);
      container.particles.grid.insert(p2);

      manager.particlesInteract(p1, testDelta);

      expect(p2.position.x).to.be.closeTo(150.75, 1e-9);
      expect(p2.position.y).to.be.closeTo(100, 1e-9);
    } finally {
      container.destroy(false);
    }
  });
});
