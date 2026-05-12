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

const attractMode = "attract";

/**
 * Particle external attract manager
 */
export class Attractor extends ExternalInteractorBase<AttractContainer> {
  /** @inheritDoc */
  handleClickMode: (mode: string, interactivityData: IInteractivityData) => void;

  private _maxDistance;
  private readonly _pluginManager;

  constructor(pluginManager: PluginManager, container: AttractContainer) {
    super(container);

    this._pluginManager = pluginManager;
    this._maxDistance = 0;

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
    return this._maxDistance;
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

    this._maxDistance = attract.distance;

    container.retina.attractModeDistance = attract.distance * container.retina.pixelRatio;
  }

  /** @inheritDoc */
  interact(interactivityData: IInteractivityData): void {
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
      hoverAttract(this._pluginManager, this.container, interactivityData, p => this.isEnabled(interactivityData, p));
    } else if (clickEnabled && isInArray(attractMode, clickMode)) {
      clickAttract(this._pluginManager, this.container, interactivityData, p => this.isEnabled(interactivityData, p));
    }
  }

  /** @inheritDoc */
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

  /** @inheritDoc */
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
}
