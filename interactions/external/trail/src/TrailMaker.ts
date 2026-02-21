import {
  ExternalInteractorBase,
  type IInteractivityData,
  type IModes,
  type InteractivityEngine,
  type InteractivityParticle,
  type Modes,
} from "@tsparticles/plugin-interactivity";
import {
  type IAnimatableColor,
  type ICoordinates,
  type IDelta,
  type IParticlesOptions,
  type RangeValue,
  type RecursivePartial,
  deepExtend,
  getRangeMax,
  getRangeMin,
  hMax,
  isInArray,
  lMax,
  millisecondsToSeconds,
  rangeColorToHsl,
  sMax,
} from "@tsparticles/engine";
import type { ITrailMode, TrailContainer, TrailMode } from "./Types.js";
import type { ITrailColorComponent } from "./Options/Interfaces/ITrailColorComponent.js";
import { Trail } from "./Options/Classes/Trail.js";

const trailMode = "trail",
  defaultMin = 0,
  defaultWeight = 0;

export class TrailMaker extends ExternalInteractorBase<TrailContainer> {
  readonly maxDistance = 0;

  private _delay: number;
  private readonly _engine;
  private _lastPosition?: ICoordinates;

  constructor(engine: InteractivityEngine, container: TrailContainer) {
    super(container);
    this._engine = engine;
    this._delay = 0;
  }

  clear(): void {
    // do nothing
  }

  init(): void {
    // do nothing
  }

  interact(interactivityData: IInteractivityData, delta: IDelta): void {
    const container = this.container;

    if (!container.retina.reduceFactor) return;

    const options = container.actualOptions,
      trailOptions = options.interactivity?.modes.trail;

    if (!trailOptions) return;

    const optDelay = (trailOptions.delay * millisecondsToSeconds) / this.container.retina.reduceFactor;

    if (this._delay < optDelay) {
      this._delay += delta.value;
    }

    if (this._delay < optDelay) return;

    const mousePos = interactivityData.mouse.position,
      canEmit = !(
        trailOptions.pauseOnStop &&
        (mousePos === this._lastPosition ||
          (mousePos?.x === this._lastPosition?.x && mousePos?.y === this._lastPosition?.y))
      );

    if (mousePos) {
      this._lastPosition = { ...mousePos };
    } else {
      delete this._lastPosition;
    }

    if (canEmit && mousePos) {
      let particleOptions = trailOptions.particles;
      const colorCoords = trailOptions.colorCoords;

      if (colorCoords) {
        const { width, height } = container.canvas.size,
          norm = {
            x: mousePos.x / width,
            y: mousePos.y / height,
          },
          hasWeights = (comp?: ITrailColorComponent): boolean => {
            return !!(comp?.weights?.x ?? comp?.weights?.y);
          },
          calculateValue = (
            comp: ITrailColorComponent | undefined,
            originalValue: RangeValue | undefined,
            defaultMax: number,
          ): number | undefined => {
            if (!hasWeights(comp)) return undefined;

            const w = comp?.weights,
              factor = norm.x * (w?.x ?? defaultWeight) + norm.y * (w?.y ?? defaultWeight),
              rangeSource = comp?.value ?? originalValue,
              min = getRangeMin(rangeSource ?? defaultMin),
              max = getRangeMax(rangeSource ?? defaultMax),
              result = min + factor * (max - min);

            return Math.min(max, Math.max(min, result));
          },
          // Safe conversion of the particle color option to HSL structure
          // This handles strings, RGB, and existing HSL objects correctly
          baseHsl = rangeColorToHsl(this._engine, trailOptions.particles?.color as IAnimatableColor),
          h = calculateValue(colorCoords.h, baseHsl?.h, hMax),
          s = calculateValue(colorCoords.s, baseHsl?.s, sMax),
          l = calculateValue(colorCoords.l, baseHsl?.l, lMax);

        if (h !== undefined || s !== undefined || l !== undefined) {
          particleOptions = deepExtend({}, trailOptions.particles, {
            color: {
              value: {
                h: h ?? baseHsl?.h,
                s: s ?? baseHsl?.s,
                l: l ?? baseHsl?.l,
              },
            },
          }) as RecursivePartial<IParticlesOptions>;
        }
      }

      container.particles.push(trailOptions.quantity, mousePos, particleOptions);
    }

    this._delay -= optDelay;
  }

  isEnabled(interactivityData: IInteractivityData, particle?: InteractivityParticle): boolean {
    const container = this.container,
      options = container.actualOptions,
      mouse = interactivityData.mouse,
      events = (particle?.interactivity ?? options.interactivity)?.events;

    return (
      !!events &&
      ((mouse.clicking && mouse.inside && !!mouse.position && isInArray(trailMode, events.onClick.mode)) ||
        (mouse.inside && !!mouse.position && isInArray(trailMode, events.onHover.mode)))
    );
  }

  loadModeOptions(options: Modes & TrailMode, ...sources: RecursivePartial<(IModes & ITrailMode) | undefined>[]): void {
    options.trail ??= new Trail();
    for (const source of sources) {
      options.trail.load(source?.trail);
    }
  }

  reset(): void {
    // do nothing
  }
}
