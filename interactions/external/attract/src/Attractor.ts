import type { AttractContainer, AttractMode, IAttractMode } from "./Types.js";
import { type Engine, type RecursivePartial, isInArray, millisecondsToSeconds } from "@tsparticles/engine";
import {
  ExternalInteractorBase,
  type IInteractivityData,
  type IModes,
  type InteractivityParticle,
  type Modes,
  mouseMoveEvent,
} from "@tsparticles/plugin-interactivity";
import { clickAttract, hoverAttract } from "./Utils.js";
import { Attract } from "./Options/Classes/Attract.js";

const attractMode = "attract";

/**
 * Particle external attract manager
 */
export class Attractor extends ExternalInteractorBase<AttractContainer> {
  handleClickMode: (mode: string, interactivityData: IInteractivityData) => void;

  private readonly _engine;
  private _maxDistance;

  constructor(engine: Engine, container: AttractContainer) {
    super(container);

    this._engine = engine;
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

  get maxDistance(): number {
    return this._maxDistance;
  }

  clear(): void {
    // do nothing
  }

  init(): void {
    const container = this.container,
      attract = container.actualOptions.interactivity?.modes.attract;

    if (!attract) {
      return;
    }

    this._maxDistance = attract.distance;

    container.retina.attractModeDistance = attract.distance * container.retina.pixelRatio;
  }

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
      hoverAttract(this._engine, this.container, interactivityData, p => this.isEnabled(interactivityData, p));
    } else if (clickEnabled && isInArray(attractMode, clickMode)) {
      clickAttract(this._engine, this.container, interactivityData, p => this.isEnabled(interactivityData, p));
    }
  }

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

  loadModeOptions(
    options: Modes & AttractMode,
    ...sources: RecursivePartial<(IModes & IAttractMode) | undefined>[]
  ): void {
    options.attract ??= new Attract();

    for (const source of sources) {
      options.attract.load(source?.attract);
    }
  }

  reset(): void {
    // do nothing
  }
}
