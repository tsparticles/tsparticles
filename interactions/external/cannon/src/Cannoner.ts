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

interface CannonData {
  drawVector: boolean;
  maxDragDistance: number;
  maxParticles: number;
  minParticles: number;
  particleFactor: number;
  spread: number;
  vectorColor: string;
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
 * - `spread`         — half-angle spread in degrees around the launch angle (default 30)
 * - `velocityFactor` — multiplier applied to drag length to obtain particle speed (default 10)
 * - `particleFactor` — how many particles per pixel of drag (default 0.2)
 * - `minParticles`   — minimum burst size regardless of drag length (default 5)
 * - `maxParticles`   — cap for burst size (default 200)
 * - `drawVector`     — whether to render the aiming line while dragging (default true)
 * - `vectorColor`    — CSS color for the aiming line (default "#ffffff80")
 */
export class Cannoner extends ExternalInteractorBase<CannonContainer> {
  readonly maxDistance = 0;

  private _gesture: CannonGesture = {
    origin: Vector.origin,
    current: Vector.origin,
    active: false,
  };

  private _lastDownPosition: ICoordinates | undefined = undefined;
  private _state: CannonState = CannonState.idle;

  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(container: CannonContainer) {
    super(container);
  }

  clear(_particle: InteractivityParticle, _delta: IDelta): void {
    // nothing to clear per-particle
  }

  init(): void {
    // nothing to initialize
  }

  interact(interactivityData: IInteractivityData, _delta: IDelta): void {
    const mouse = interactivityData.mouse,
      mousePos = mouse.position,
      clicking = mouse.clicking,
      downPos = mouse.downPosition;

    // ── DOWN transition: new downPosition that we haven't processed yet
    if (clicking && downPos && downPos !== this._lastDownPosition && this._state === CannonState.idle) {
      this._lastDownPosition = downPos;
      this._gesture = {
        origin: { x: downPos.x, y: downPos.y },
        current: { x: downPos.x, y: downPos.y },
        active: true,
      };
      this._state = CannonState.aiming;
    }

    // ── Update endpoint during drag
    if (this._state === CannonState.aiming && mousePos) {
      this._gesture.current = { x: mousePos.x, y: mousePos.y };
      this._drawVector();
    }

    // ── UP transition: clicking false while we were aiming
    if (!clicking && this._state === CannonState.aiming) {
      this._gesture.active = false;
      this._fire();
      this._state = CannonState.idle;
    }
  }

  isEnabled(interactivityData: IInteractivityData): boolean {
    const { container } = this,
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
    return this._state !== CannonState.idle || interactivityData.mouse.clicking;
  }

  loadModeOptions(
    options: Modes & CannonMode,
    ...sources: RecursivePartial<(IModes & ICannonMode) | undefined>[]
  ): void {
    options.cannon ??= new Cannon();

    for (const source of sources) {
      options.cannon.load(source?.cannon);
    }
  }

  reset(_interactivityData: IInteractivityData, _particle: InteractivityParticle): void {
    // nothing to reset
  }

  // ── Private helpers ────────────────────────────────────────────────────────
  /**
   * Resolves cannon options with defaults.
   * @returns -
   */
  private _cannonOptions(): CannonData {
    const raw = (this.container.actualOptions.interactivity?.modes as CannonMode | undefined)?.cannon ?? new Cannon();

    return {
      spread: degToRad(raw.spread),
      maxDragDistance: raw.maxDragDistance * this.container.retina.pixelRatio,
      velocityFactor: raw.velocityFactor,
      particleFactor: raw.particleFactor,
      minParticles: raw.minParticles,
      maxParticles: raw.maxParticles,
      drawVector: raw.drawVector,
      vectorColor: raw.vectorColor,
    };
  }

  /**
   * Draws the aiming line and power circle on the canvas.
   * Rendered directly on the container canvas context.
   */
  private _drawVector(): void {
    this.container.canvas.render.draw(ctx => {
      const opts = this._cannonOptions(),
        { origin, current } = this._gesture,
        pxRatio = this.container.retina.pixelRatio,
        dragDist = getDistance(origin, current),
        // Clamp to maxDragDistance so visual feedback matches actual force
        clampedDist = Math.min(dragDist, opts.maxDragDistance),
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
  private _fire(): void {
    const opts = this._cannonOptions(),
      { origin, current } = this._gesture,
      dragLength = Math.min(getDistance(origin, current), opts.maxDragDistance);

    if (dragLength < minTapsLength) {
      // Ignore accidental taps
      return;
    }

    const pxRatio = this.container.retina.pixelRatio,
      pxRatioFactor = identity / pxRatio,
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
