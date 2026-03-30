import {
  type BaseRange,
  Circle,
  type ICoordinates,
  type PluginManager,
  Rectangle,
  type RecursivePartial,
  Vector,
  clamp,
  getDistances,
  half,
  isInArray,
  millisecondsToSeconds,
  safeDocument,
} from "@tsparticles/engine";
import {
  type DivEvent,
  DivType,
  ExternalInteractorBase,
  type IInteractivityData,
  type IModes,
  type InteractivityParticle,
  type Modes,
  divMode,
  divModeExecute,
  isDivModeEnabled,
  mouseMoveEvent,
} from "@tsparticles/plugin-interactivity";
import type { IRepulseMode, RepulseContainer, RepulseMode } from "./Types.js";
import { Repulse } from "./Options/Classes/Repulse.js";
import type { RepulseDiv } from "./Options/Classes/RepulseDiv.js";

const repulseMode = "repulse",
  minDistance = 0,
  repulseRadiusFactor = 6,
  repulseRadiusPower = 3,
  squarePower = 2,
  minRadius = 0,
  minSpeed = 0,
  easingOffset = 1;

/**
 * Particle repulse manager
 */
export class Repulser extends ExternalInteractorBase<RepulseContainer> {
  handleClickMode: (mode: string, interactivityData: IInteractivityData) => void;

  private readonly _clickVec: Vector;
  private _maxDistance;
  private readonly _normVec: Vector;
  private readonly _pluginManager;

  constructor(pluginManager: PluginManager, container: RepulseContainer) {
    super(container);

    this._pluginManager = pluginManager;
    this._maxDistance = 0;
    this._normVec = Vector.origin;
    this._clickVec = Vector.origin;

    container.repulse ??= { particles: [] };

    this.handleClickMode = (mode, interactivityData): void => {
      const options = this.container.actualOptions,
        repulseOpts = options.interactivity?.modes.repulse;

      if (!repulseOpts || mode !== repulseMode) {
        return;
      }

      container.repulse ??= { particles: [] };

      const repulse = container.repulse;

      repulse.clicking = true;
      repulse.count = 0;

      for (const particle of container.repulse.particles) {
        if (!this.isEnabled(interactivityData, particle)) {
          continue;
        }

        particle.velocity.setTo(particle.initialVelocity);
      }

      repulse.particles = [];
      repulse.finish = false;

      setTimeout(() => {
        if (container.destroyed) {
          return;
        }

        repulse.clicking = false;
      }, repulseOpts.duration * millisecondsToSeconds);
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
      repulse = container.actualOptions.interactivity?.modes.repulse;

    if (!repulse) {
      return;
    }

    this._maxDistance = repulse.distance;

    container.retina.repulseModeDistance = repulse.distance * container.retina.pixelRatio;
  }

  interact(interactivityData: IInteractivityData): void {
    const container = this.container,
      options = container.actualOptions,
      mouseMoveStatus = interactivityData.status === mouseMoveEvent,
      events = options.interactivity?.events;

    if (!events) {
      return;
    }

    const hover = events.onHover,
      hoverEnabled = hover.enable,
      hoverMode = hover.mode,
      click = events.onClick,
      clickEnabled = click.enable,
      clickMode = click.mode,
      divs = events.onDiv;

    if (mouseMoveStatus && hoverEnabled && isInArray(repulseMode, hoverMode)) {
      this._hoverRepulse(interactivityData);
    } else if (clickEnabled && isInArray(repulseMode, clickMode)) {
      this._clickRepulse(interactivityData);
    } else {
      divModeExecute(repulseMode, divs, (selector, div): void => {
        this._singleSelectorRepulse(interactivityData, selector, div);
      });
    }
  }

  isEnabled(interactivityData: IInteractivityData, particle?: InteractivityParticle): boolean {
    const container = this.container,
      options = container.actualOptions,
      mouse = interactivityData.mouse,
      events = (particle?.interactivity ?? options.interactivity)?.events;

    if (!events) {
      return false;
    }

    const divs = events.onDiv,
      hover = events.onHover,
      click = events.onClick,
      divRepulse = isDivModeEnabled(repulseMode, divs);

    if (!(divRepulse || (hover.enable && !!mouse.position) || (click.enable && mouse.clickPosition))) {
      return false;
    }

    const hoverMode = hover.mode,
      clickMode = click.mode;

    return isInArray(repulseMode, hoverMode) || isInArray(repulseMode, clickMode) || divRepulse;
  }

  loadModeOptions(
    options: Modes & RepulseMode,
    ...sources: RecursivePartial<(IModes & IRepulseMode) | undefined>[]
  ): void {
    options.repulse ??= new Repulse();

    for (const source of sources) {
      options.repulse.load(source?.repulse);
    }
  }

  reset(): void {
    // do nothing
  }

  private readonly _clickRepulse: (interactivityData: IInteractivityData) => void = interactivityData => {
    const container = this.container,
      repulseOptions = container.actualOptions.interactivity?.modes.repulse;

    if (!repulseOptions) {
      return;
    }

    const repulse = container.repulse ?? { particles: [] };

    if (!repulse.finish) {
      repulse.count ??= 0;
      repulse.count++;

      if (repulse.count === container.particles.count) {
        repulse.finish = true;
      }
    }

    if (repulse.clicking) {
      const repulseDistance = container.retina.repulseModeDistance;

      if (!repulseDistance || repulseDistance < minDistance) {
        return;
      }

      const repulseRadius = Math.pow(repulseDistance / repulseRadiusFactor, repulseRadiusPower),
        mouseClickPos = interactivityData.mouse.clickPosition;

      if (mouseClickPos === undefined) {
        return;
      }

      const range = new Circle(mouseClickPos.x, mouseClickPos.y, repulseRadius),
        query = container.particles.grid.query(range, p => this.isEnabled(interactivityData, p));

      for (const particle of query) {
        const { dx, dy, distance } = getDistances(mouseClickPos, particle.position),
          d = distance ** squarePower,
          velocity = repulseOptions.speed,
          force = (-repulseRadius * velocity) / d;

        if (d <= repulseRadius) {
          repulse.particles.push(particle);

          this._clickVec.x = dx;
          this._clickVec.y = dy;

          this._clickVec.length = force;

          particle.velocity.setTo(this._clickVec);
        }
      }
    } else if (repulse.clicking === false) {
      for (const particle of repulse.particles) {
        particle.velocity.setTo(particle.initialVelocity);
      }

      repulse.particles = [];
    }
  };

  private readonly _hoverRepulse: (interactivityData: IInteractivityData) => void = interactivityData => {
    const container = this.container,
      mousePos = interactivityData.mouse.position,
      repulseRadius = container.retina.repulseModeDistance;

    if (!repulseRadius || repulseRadius < minRadius || !mousePos) {
      return;
    }

    this._processRepulse(interactivityData, mousePos, repulseRadius, new Circle(mousePos.x, mousePos.y, repulseRadius));
  };

  private readonly _processRepulse: (
    interactivityData: IInteractivityData,
    position: ICoordinates,
    repulseRadius: number,
    area: BaseRange,
    divRepulse?: RepulseDiv,
  ) => void = (interactivityData, position, repulseRadius, area, divRepulse) => {
    const container = this.container,
      query = container.particles.grid.query(area, p => this.isEnabled(interactivityData, p)),
      repulseOptions = container.actualOptions.interactivity?.modes.repulse;

    if (!repulseOptions) {
      return;
    }

    const { easing, speed, factor, maxSpeed } = repulseOptions,
      easingFunc = this._pluginManager.getEasing(easing),
      velocity = (divRepulse?.speed ?? speed) * factor;

    for (const particle of query) {
      const { dx, dy, distance } = getDistances(particle.position, position),
        repulseFactor = clamp(easingFunc(easingOffset - distance / repulseRadius) * velocity, minSpeed, maxSpeed);

      this._normVec.x = !distance ? velocity : (dx / distance) * repulseFactor;
      this._normVec.y = !distance ? velocity : (dy / distance) * repulseFactor;

      particle.position.addTo(this._normVec);
    }
  };

  private readonly _singleSelectorRepulse: (
    interactivityData: IInteractivityData,
    selector: string,
    div: DivEvent,
  ) => void = (interactivityData, selector, div) => {
    const container = this.container,
      repulse = container.actualOptions.interactivity?.modes.repulse;

    if (!repulse) {
      return;
    }

    const query = safeDocument().querySelectorAll(selector);

    if (!query.length) {
      return;
    }

    query.forEach(item => {
      const elem = item as HTMLElement,
        pxRatio = container.retina.pixelRatio,
        pos = {
          x: (elem.offsetLeft + elem.offsetWidth * half) * pxRatio,
          y: (elem.offsetTop + elem.offsetHeight * half) * pxRatio,
        },
        repulseRadius = elem.offsetWidth * half * pxRatio,
        area =
          div.type === DivType.circle
            ? new Circle(pos.x, pos.y, repulseRadius)
            : new Rectangle(
                elem.offsetLeft * pxRatio,
                elem.offsetTop * pxRatio,
                elem.offsetWidth * pxRatio,
                elem.offsetHeight * pxRatio,
              ),
        divs = repulse.divs,
        divRepulse = divMode(divs, elem);

      this._processRepulse(interactivityData, pos, repulseRadius, area, divRepulse);
    });
  };
}
