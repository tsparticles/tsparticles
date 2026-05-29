import type { AttractContainer, AttractMode, IAttractMode } from "./Types.js";
import {
  ExternalInteractorBase,
  type IInteractivityData,
  type IModes,
  type InteractivityParticle,
  type Modes,
  mouseMoveEvent,
} from "@tsparticles/plugin-interactivity";
import { type PluginManager, type RecursivePartial, isInArray, millisecondsToSeconds } from "@tsparticles/engine";
import { clickAttract, hoverAttract } from "./Utils.js";
import { Attract } from "./Options/Classes/Attract.js";

const attractMode = "attract",
  minVelocityLengthSq = 0,
  minRestoreSpeed = 0.001,
  maxRestoreSpeed = 1,
  restoreEpsilon = 0.5;

interface IAttractRestoreData {
  lastInteractionTime: number;
  target: InteractivityParticle["position"];
}

/**
 * Particle external attract manager
 */
export class Attractor extends ExternalInteractorBase<AttractContainer> {
  /** @inheritDoc */
  handleClickMode: (mode: string, interactivityData: IInteractivityData) => void;

  readonly #interactedThisFrame;
  #maxDistance;
  readonly #pluginManager;
  readonly #restoreData;

  constructor(pluginManager: PluginManager, container: AttractContainer) {
    super(container);

    this.#pluginManager = pluginManager;
    this.#maxDistance = 0;
    this.#interactedThisFrame = new Set<InteractivityParticle>();
    this.#restoreData = new Map<InteractivityParticle, IAttractRestoreData>();

    container.attract ??= { particles: [] };

    this.handleClickMode = (mode, interactivityData): void => {
      const options = this.container.actualOptions,
        attract = options.interactivity?.modes.attract;

      if (!attract || mode !== attractMode) {
        return;
      }

      container.attract ??= { particles: [] };

      container.attract.clicking = true;
      container.attract.count = 0;

      for (const particle of container.attract.particles) {
        if (!this.isEnabled(interactivityData, particle)) {
          continue;
        }

        particle.velocity.setTo(particle.initialVelocity);
      }

      container.attract.particles = [];
      container.attract.finish = false;

      setTimeout(() => {
        if (container.destroyed) {
          return;
        }

        container.attract ??= { particles: [] };

        container.attract.clicking = false;
      }, attract.duration * millisecondsToSeconds);
    };
  }

  /** @inheritDoc */
  get maxDistance(): number {
    return this.#maxDistance;
  }

  /** @inheritDoc */
  clear(): void {
    // do nothing
  }

  /** @inheritDoc */
  init(): void {
    const container = this.container,
      attract = container.actualOptions.interactivity?.modes.attract;

    if (!attract) {
      return;
    }

    this.#maxDistance = attract.distance;

    container.retina.attractModeDistance = attract.distance * container.retina.pixelRatio;
  }

  /** @inheritDoc */
  interact(interactivityData: IInteractivityData): void {
    this.#interactedThisFrame.clear();

    const container = this.container,
      options = container.actualOptions,
      mouseMoveStatus = interactivityData.status === mouseMoveEvent,
      events = options.interactivity?.events;

    if (!events) {
      return;
    }

    const { enable: hoverEnabled, mode: hoverMode } = events.onHover,
      { enable: clickEnabled, mode: clickMode } = events.onClick;

    if (mouseMoveStatus && hoverEnabled && isInArray(attractMode, hoverMode)) {
      hoverAttract(
        this.#pluginManager,
        this.container,
        interactivityData,
        p => this.isEnabled(interactivityData, p),
        p => {
          this.#trackInteractedParticle(p);
        },
      );
    } else if (clickEnabled && isInArray(attractMode, clickMode)) {
      clickAttract(
        this.#pluginManager,
        this.container,
        interactivityData,
        p => this.isEnabled(interactivityData, p),
        p => {
          this.#trackInteractedParticle(p);
        },
      );
    }

    this.#restoreParticles();
  }

  /**
   * {@inheritDoc}
   * @param interactivityData
   * @param particle
   */
  isEnabled(interactivityData: IInteractivityData, particle?: InteractivityParticle): boolean {
    const container = this.container,
      options = container.actualOptions,
      mouse = interactivityData.mouse,
      events = (particle?.interactivity ?? options.interactivity)?.events;

    if ((!mouse.position || !events?.onHover.enable) && (!mouse.clickPosition || !events?.onClick.enable)) {
      return false;
    }

    const hoverMode = events.onHover.mode,
      clickMode = events.onClick.mode;

    return isInArray(attractMode, hoverMode) || isInArray(attractMode, clickMode);
  }

  /**
   * {@inheritDoc}
   * @param options
   * @param sources
   */
  loadModeOptions(
    options: Modes & AttractMode,
    ...sources: RecursivePartial<(IModes & IAttractMode) | undefined>[]
  ): void {
    options.attract ??= new Attract();

    for (const source of sources) {
      options.attract.load(source?.attract);
    }
  }

  /** @inheritDoc */
  reset(): void {
    // do nothing
  }

  #restoreParticles(): void {
    const restore = this.container.actualOptions.interactivity?.modes.attract?.restore;

    if (!restore?.enable || !this.#restoreData.size) {
      return;
    }

    const now = Date.now(),
      restoreDelay = restore.delay * millisecondsToSeconds,
      restoreSpeed = Math.max(minRestoreSpeed, Math.min(maxRestoreSpeed, restore.speed));

    for (const [particle, restoreData] of this.#restoreData) {
      if (this.#interactedThisFrame.has(particle)) {
        continue;
      }

      if (particle.destroyed) {
        this.#restoreData.delete(particle);

        continue;
      }

      const target = restoreData.target;

      if (now - restoreData.lastInteractionTime < restoreDelay) {
        continue;
      }

      let dx = target.x - particle.position.x,
        dy = target.y - particle.position.y,
        dz = target.z - particle.position.z;

      if (restore.follow && particle.options.move.enable) {
        const { x: vx, y: vy, z: vz } = particle.velocity,
          velocityLengthSq = vx * vx + vy * vy + vz * vz;

        if (velocityLengthSq > minVelocityLengthSq) {
          const parallelScale = (dx * vx + dy * vy + dz * vz) / velocityLengthSq;

          dx -= vx * parallelScale;
          dy -= vy * parallelScale;
          dz -= vz * parallelScale;
        }
      }

      particle.position.x += dx * restoreSpeed;
      particle.position.y += dy * restoreSpeed;
      particle.position.z += dz * restoreSpeed;

      if (Math.abs(dx) <= restoreEpsilon && Math.abs(dy) <= restoreEpsilon) {
        particle.position.x = target.x;
        particle.position.y = target.y;
        particle.position.z = target.z;

        this.#restoreData.delete(particle);

        continue;
      }
    }
  }

  #trackInteractedParticle(particle: InteractivityParticle): void {
    this.#interactedThisFrame.add(particle);

    const restore = this.container.actualOptions.interactivity?.modes.attract?.restore;

    if (!restore?.enable) {
      return;
    }

    const now = Date.now();
    let restoreData = this.#restoreData.get(particle);

    if (!restoreData) {
      restoreData = {
        target: particle.position.copy(),
        lastInteractionTime: now,
      };

      this.#restoreData.set(particle, restoreData);
    }

    restoreData.lastInteractionTime = now;
  }
}
