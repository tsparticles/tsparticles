import type { CannonContainer, CannonMode, ICannonMode } from "./Types.js";
import {
  ExternalInteractorBase,
  type IInteractivityData,
  type IModes,
  type InteractivityParticle,
  type Modes,
} from "@tsparticles/plugin-interactivity";
import {
  type ICoordinates,
  type IDelta,
  type RecursivePartial,
  Vector,
  degToRad,
  double,
  doublePI,
  getDistance,
  getRandomInRange,
  identity,
  loadOptionProperty,
  none,
} from "@tsparticles/engine";
import { Cannon } from "./Options/Classes/Cannon.js";

enum CannonState {
  idle,
  aiming,
  fired,
}

const cannonMode = "cannon",
  minAngle = 0,
  powerRadiusMin = 4,
  powerRadiusMaxDenominator = 20,
  powerRadiusMaxFactor = identity / powerRadiusMaxDenominator,
  minTapsLength = 2,
  piDeg = 180,
  quarter = 0.25,
  minDistance = 0;

/**
 * Computes the angle in radians between two points.
 * @param x0 -
 * @param y0 -
 * @param x1 -
 * @param y1 -
 * @returns -
 */
function angleRad(x0: number, y0: number, x1: number, y1: number): number {
  return Math.atan2(y1 - y0, x1 - x0);
}

/** Cannon mode internal data */
interface CannonData {
  /** Whether to draw the aiming vector line */
  drawVector: boolean;

  /** Maximum drag distance in pixels */
  maxDragDistance: number;

  /** Maximum number of particles to spawn */
  maxParticles: number;

  /** Minimum number of particles to spawn */
  minParticles: number;

  /** Particles per pixel of drag distance */
  particleFactor: number;

  /** Spread half-angle in radians */
  spread: number;

  /** CSS color for the aiming line */
  vectorColor: string;

  /** Velocity multiplier from drag distance */
  velocityFactor: number;
}

interface CannonGesture {
  /** Whether the pointer is currently held down. */
  active: boolean;
  /** Current drag endpoint (updated on mousemove). */
  current: ICoordinates;
  /** Canvas-space origin of the drag (mousedown position). */
  origin: ICoordinates;
}

/**
 * Cannon interactor for tsParticles.
 *
 * The user presses and drags away from the desired launch origin.
 * On release the drag vector is reversed (slingshot / confetti-cannon style)
 * and a burst of particles is fired in that direction.
 *
 * The number of particles and their velocity scale with the drag length.
 *
 * Options live under `interactivity.modes.cannon`:
 * - `spread` — half-angle spread in degrees around the launch angle (default 30)
 * - `velocityFactor` — multiplier applied to drag length to obtain particle speed (default 10)
 * - `particleFactor` — how many particles per pixel of drag (default 0.2)
 * - `minParticles` — minimum burst size regardless of drag length (default 5)
 * - `maxParticles` — cap for burst size (default 200)
 * - `drawVector` — whether to render the aiming line while dragging (default true)
 * - `vectorColor` — CSS color for the aiming line (default "#ffffff80")
 */
export class Cannoner extends ExternalInteractorBase<CannonContainer> {
  /** {@inheritDoc ExternalInteractorBase.maxDistance} */
  readonly maxDistance = 0;

  #data?: CannonData;
  #gesture: CannonGesture = {
    origin: Vector.origin,
    current: Vector.origin,
    active: false,
  };

  #lastDownPosition: ICoordinates | undefined = undefined;
  #state: CannonState = CannonState.idle;

  /**
   * {@inheritDoc ExternalInteractorBase}
   * @param container -
   */
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(container: CannonContainer) {
    super(container);
  }

  /**
   * {@inheritDoc ExternalInteractorBase.clear}
   * @param _particle -
   * @param _delta -
   */
  clear(_particle: InteractivityParticle, _delta: IDelta): void {
    // nothing to clear per-particle
  }

  /** {@inheritDoc ExternalInteractorBase.init} */
  init(): void {
    const options = this.container.actualOptions.interactivity?.modes.cannon ?? new Cannon();

    this.#data = {
      spread: degToRad(options.spread),
      maxDragDistance: options.maxDragDistance,
      velocityFactor: options.velocityFactor,
      particleFactor: options.particleFactor,
      minParticles: options.minParticles,
      maxParticles: options.maxParticles,
      drawVector: options.drawVector,
      vectorColor: options.vectorColor,
    };
  }

  /**
   * {@inheritDoc ExternalInteractorBase.interact}
   * @param interactivityData -
   * @param _delta -
   */
  interact(interactivityData: IInteractivityData, _delta: IDelta): void {
    const mouse = interactivityData.mouse,
      mousePos = mouse.position,
      clicking = mouse.clicking,
      downPos = mouse.downPosition;

    // ── DOWN transition: new downPosition that we haven't processed yet
    if (clicking && downPos && downPos !== this.#lastDownPosition && this.#state === CannonState.idle) {
      this.#lastDownPosition = downPos;
      this.#gesture = {
        origin: { x: downPos.x, y: downPos.y },
        current: { x: downPos.x, y: downPos.y },
        active: true,
      };
      this.#state = CannonState.aiming;
    }

    // ── Update endpoint during drag
    if (this.#state === CannonState.aiming && mousePos) {
      this.#gesture.current = { x: mousePos.x, y: mousePos.y };
      this.#drawVector();
    }

    // ── UP transition: clicking false while we were aiming
    if (!clicking && this.#state === CannonState.aiming) {
      this.#gesture.active = false;
      this.#fire();
      this.#state = CannonState.idle;
    }
  }

  /**
   * {@inheritDoc ExternalInteractorBase.isEnabled}
   * @param interactivityData -
   * @returns -
   */
  isEnabled(interactivityData: IInteractivityData): boolean {
    const container = this.container,
      events = container.actualOptions.interactivity?.events;

    if (!events?.onClick.enable) {
      return false;
    }

    const modes = events.onClick.mode,
      modeEnabled = Array.isArray(modes) ? modes.includes(cannonMode) : modes === cannonMode;

    if (!modeEnabled) {
      return false;
    }

    // Enabled if the gesture is active OR if the mouse is pressed —
    // the second case covers frame zero before _state switches to "aiming"
    return this.#state !== CannonState.idle || interactivityData.mouse.clicking;
  }

  /**
   * {@inheritDoc ExternalInteractorBase.loadModeOptions}
   * @param options -
   * @param sources -
   */
  loadModeOptions(
    options: Modes & CannonMode,
    ...sources: RecursivePartial<(IModes & ICannonMode) | undefined>[]
  ): void {
    loadOptionProperty(options, "cannon", Cannon, ...sources);
  }

  /**
   * {@inheritDoc ExternalInteractorBase.reset}
   * @param _interactivityData -
   * @param _particle -
   */
  reset(_interactivityData: IInteractivityData, _particle: InteractivityParticle): void {
    // nothing to reset
  }

  // ── Private helpers ────────────────────────────────────────────────────────
  /**
   * Draws the aiming line and power circle on the canvas.
   * Rendered directly on the container canvas context.
   */
  #drawVector(): void {
    this.container.canvas.render.draw(ctx => {
      const opts = this.#data;

      if (!opts) {
        return;
      }

      const { origin, current } = this.#gesture,
        pxRatio = this.container.retina.pixelRatio,
        dragDist = getDistance(origin, current),
        // Clamp to maxDragDistance so visual feedback matches actual force
        clampedDist = opts.maxDragDistance > none ? Math.min(dragDist, opts.maxDragDistance * pxRatio) : dragDist,
        clampRatio = dragDist > minDistance ? clampedDist / dragDist : minDistance,
        clampedX = origin.x + (current.x - origin.x) * clampRatio,
        clampedY = origin.y + (current.y - origin.y) * clampRatio;

      ctx.save();
      ctx.strokeStyle = opts.vectorColor;
      ctx.lineWidth = double * pxRatio;
      ctx.beginPath();
      ctx.moveTo(origin.x, origin.y);
      ctx.lineTo(clampedX, clampedY);
      ctx.stroke();

      // Power circle at origin — radius reflects clamped force
      const radius = Math.max(powerRadiusMin, clampedDist * powerRadiusMaxFactor) * pxRatio;

      ctx.beginPath();
      ctx.arc(origin.x, origin.y, radius, minAngle, doublePI);
      ctx.strokeStyle = opts.vectorColor;
      ctx.lineWidth = double * pxRatio;
      ctx.stroke();
      ctx.restore();
    });
  }

  /**
   * Fires a burst of particles based on the completed drag gesture.
   */
  #fire(): void {
    const opts = this.#data;

    if (!opts) {
      return;
    }

    const { origin, current } = this.#gesture,
      pxRatio = this.container.retina.pixelRatio,
      dist = getDistance(origin, current),
      dragLength = opts.maxDragDistance > none ? Math.min(dist, opts.maxDragDistance * pxRatio) : dist;

    if (dragLength < minTapsLength) {
      // Ignore accidental taps
      return;
    }

    const pxRatioFactor = identity / pxRatio,
      // Reverse the drag vector to get launch angle (already in radians)
      launchAngle = angleRad(current.x, current.y, origin.x, origin.y),
      velocity = dragLength * pxRatioFactor * opts.velocityFactor,
      count = Math.min(opts.maxParticles, Math.max(opts.minParticles, Math.round(dragLength * opts.particleFactor))),
      toDeg = piDeg / Math.PI;

    for (let i = 0; i < count; i++) {
      const spreadAngle = launchAngle + getRandomInRange(-opts.spread, opts.spread),
        speed = getRandomInRange(velocity * quarter, velocity);

      // addParticle expects logical (non-retina) coords
      // direction is in degrees, convert once per particle from the cached radian value
      this.container.particles.addParticle(origin, {
        move: {
          enable: true,
          speed,
          direction: spreadAngle * toDeg,
        },
      });
    }
  }
}
