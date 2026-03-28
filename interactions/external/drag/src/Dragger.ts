import type { DragContainer, DragMode, IDragMode } from "./Types.js";
import {
  ExternalInteractorBase,
  type IInteractivityData,
  type IModes,
  type InteractivityParticle,
  type Modes,
} from "@tsparticles/plugin-interactivity";
import {
  type IDelta,
  type Particle,
  type RecursivePartial,
  defaultFps,
  getDistance,
  isInArray,
  millisecondsToSeconds,
} from "@tsparticles/engine";
import { Drag } from "./Options/Classes/Drag.js";

const clickReleaseDelayMs = 50,
  defaultMomentumFactor = 0.03,
  dragMode = "drag",
  firstSampleIndex = 0,
  lastSampleOffset = 1,
  maxMomentumSamples = 5,
  minSamplesForMomentum = 2,
  momentumToVelocityFactor = millisecondsToSeconds / defaultFps,
  zeroValue = 0;

interface MomentumSample {
  t: number;
  x: number;
  y: number;
}

/**
 * External drag-and-drop interactor.
 * Allows the user to click and drag particles across the canvas.
 * Relies on pointer state provided by the interactivity plugin.
 *
 * Options (under `interactivity.modes.drag`):
 * - `preserveMomentum` — if `true`, the particle retains the velocity of the drag gesture on release.
 * - `momentumFactor` — scaling factor for the computed drag velocity (default `0.03`).
 */
export class Dragger extends ExternalInteractorBase<DragContainer> {
  readonly maxDistance = 0;

  private _dragStartClickTime?: number;
  private _dragStartClickingFalseTime?: number;
  private _draggedParticle?: Particle;
  private _grabOffset?: { x: number; y: number };
  private _lastMousePosition?: { x: number; y: number };
  private _momentumSamples: MomentumSample[] = [];
  private _mouseDownHandled = false;
  private _savedVelocity?: { x: number; y: number };

  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(container: DragContainer) {
    super(container);
  }

  clear(_particle: InteractivityParticle, _delta: IDelta): void {
    // do nothing
  }

  init(): void {
    // do nothing
  }

  interact(interactivityData: IInteractivityData, _delta: IDelta): void {
    const mouse = interactivityData.mouse,
      mousePos = mouse.position;

    // Keep the last known pointer position from interactivity plugin events
    if (mousePos) {
      this._lastMousePosition = mousePos;
    }

    // Move the already-grabbed particle
    if (this._draggedParticle) {
      const now = performance.now();

      if (!mouse.clicking) {
        this._dragStartClickingFalseTime ??= now;
      } else {
        this._dragStartClickingFalseTime = undefined;
      }

      // Fallback for environments where the first interaction can miss clickTime updates.
      const hasStableClickEndWithoutClickTime =
        this._dragStartClickTime === undefined &&
        this._dragStartClickingFalseTime !== undefined &&
        now - this._dragStartClickingFalseTime >= clickReleaseDelayMs;

      if (!mouse.inside || this._hasClickEnded(mouse) || hasStableClickEndWithoutClickTime) {
        this._releaseDragged();
        this._mouseDownHandled = false;

        return;
      }

      const pointerPos = mousePos ?? this._lastMousePosition;

      if (!pointerPos) {
        return;
      }

      // Track pointer positions for momentum calculation

      this._momentumSamples.push({ x: pointerPos.x, y: pointerPos.y, t: now });

      if (this._momentumSamples.length > maxMomentumSamples) {
        this._momentumSamples.shift();
      }

      const targetX = pointerPos.x + (this._grabOffset?.x ?? zeroValue),
        targetY = pointerPos.y + (this._grabOffset?.y ?? zeroValue);

      this._draggedParticle.position.x = targetX - this._draggedParticle.offset.x;
      this._draggedParticle.position.y = targetY - this._draggedParticle.offset.y;
      this._draggedParticle.velocity.x = zeroValue;
      this._draggedParticle.velocity.y = zeroValue;
      this._draggedParticle.initialPosition.x = this._draggedParticle.position.x;
      this._draggedParticle.initialPosition.y = this._draggedParticle.position.y;
      this._draggedParticle.misplaced = false;

      return;
    }

    if (!mouse.clicking) {
      this._releaseDragged();
      this._mouseDownHandled = false;

      return;
    }

    // Start drag only once per mousedown
    if (this._mouseDownHandled) {
      return;
    }

    this._mouseDownHandled = true;

    const downPos = mouse.downPosition ?? mousePos ?? this._lastMousePosition,
      closest = this._findParticleUnderCursor(interactivityData, downPos);

    if (!closest || !mousePos) {
      if (!closest) {
        this._mouseDownHandled = false;
      }

      return;
    }

    const renderedPos = closest.getPosition();

    this._draggedParticle = closest;
    this._dragStartClickTime = mouse.clickTime;
    this._grabOffset = {
      x: renderedPos.x - mousePos.x,
      y: renderedPos.y - mousePos.y,
    };
    this._savedVelocity = { x: closest.velocity.x, y: closest.velocity.y };
    this._dragStartClickingFalseTime = undefined;
    this._momentumSamples = [{ x: mousePos.x, y: mousePos.y, t: performance.now() }];

    closest.velocity.x = zeroValue;
    closest.velocity.y = zeroValue;
    closest.position.x = renderedPos.x - closest.offset.x;
    closest.position.y = renderedPos.y - closest.offset.y;
    closest.initialPosition.x = closest.position.x;
    closest.initialPosition.y = closest.position.y;
    closest.misplaced = false;
  }

  isEnabled(interactivityData: IInteractivityData, particle?: InteractivityParticle): boolean {
    const container = this.container,
      mouse = interactivityData.mouse,
      events = (particle?.interactivity ?? container.actualOptions.interactivity)?.events;

    if (this._draggedParticle || this._mouseDownHandled) {
      return true;
    }

    return !!events?.onClick.enable && mouse.clicking && !!mouse.position && isInArray(dragMode, events.onClick.mode);
  }

  loadModeOptions(options: Modes & DragMode, ...sources: RecursivePartial<(IModes & IDragMode) | undefined>[]): void {
    options.drag ??= new Drag();

    for (const source of sources) {
      options.drag.load(source?.drag);
    }
  }

  reset(_interactivityData: IInteractivityData, _particle: InteractivityParticle): void {
    // do nothing - release logic is handled in interact()
  }

  private _findParticleUnderCursor(
    interactivityData: IInteractivityData,
    mousePos?: { x: number; y: number },
  ): Particle | undefined {
    if (!mousePos) {
      return;
    }

    const { container } = this,
      candidates = container.particles.grid.queryCircle(mousePos, container.retina.pixelRatio, p =>
        this.isEnabled(interactivityData, p),
      );

    let closest: Particle | undefined,
      closestDist = Infinity;

    for (const candidate of candidates) {
      const dist = getDistance(candidate.getPosition(), mousePos),
        radius = candidate.getRadius();

      if (!Number.isFinite(dist) || !Number.isFinite(radius) || dist > radius || dist >= closestDist) {
        continue;
      }

      closest = candidate;
      closestDist = dist;
    }

    return closest;
  }

  private _hasClickEnded(mouse: IInteractivityData["mouse"]): boolean {
    return (
      this._dragStartClickTime !== undefined &&
      mouse.clickTime !== undefined &&
      mouse.clickTime !== this._dragStartClickTime
    );
  }

  private _releaseDragged(): void {
    if (this._draggedParticle) {
      const dragOptions = this.container.actualOptions.interactivity?.modes.drag,
        preserveMomentum = dragOptions?.preserveMomentum ?? false;

      if (preserveMomentum && this._momentumSamples.length >= minSamplesForMomentum) {
        const first = this._momentumSamples[firstSampleIndex],
          last = this._momentumSamples[this._momentumSamples.length - lastSampleOffset];

        if (first && last) {
          const dt = last.t - first.t;

          if (dt > zeroValue) {
            const factor = dragOptions?.momentumFactor ?? defaultMomentumFactor;

            // Convert pointer speed (px/ms) to engine velocity unit used by move updater.
            this._draggedParticle.velocity.x = ((last.x - first.x) / dt) * momentumToVelocityFactor * factor;
            this._draggedParticle.velocity.y = ((last.y - first.y) / dt) * momentumToVelocityFactor * factor;
          } else if (this._savedVelocity) {
            this._draggedParticle.velocity.x = this._savedVelocity.x;
            this._draggedParticle.velocity.y = this._savedVelocity.y;
          }
        } else if (this._savedVelocity) {
          this._draggedParticle.velocity.x = this._savedVelocity.x;
          this._draggedParticle.velocity.y = this._savedVelocity.y;
        }
      } else if (this._savedVelocity) {
        this._draggedParticle.velocity.x = this._savedVelocity.x;
        this._draggedParticle.velocity.y = this._savedVelocity.y;
      }
    }

    this._draggedParticle = undefined;
    this._dragStartClickTime = undefined;
    this._dragStartClickingFalseTime = undefined;
    this._grabOffset = undefined;
    this._lastMousePosition = undefined;
    this._momentumSamples = [];
    this._savedVelocity = undefined;
  }
}
