import type { DragContainer, DragMode, IDragMode } from "./Types.js";
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
  /** @inheritDoc */
  readonly maxDistance = 0;

  #dragStartClickTime?: number;
  #dragStartClickingFalseTime?: number;
  #draggedParticle?: Particle;
  #grabOffset?: ICoordinates;
  #lastMousePosition?: ICoordinates;
  #momentumSamples: MomentumSample[] = [];
  #mouseDownHandled = false;
  #savedVelocity?: ICoordinates;

  /** @inheritDoc */
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(container: DragContainer) {
    super(container);
  }

  /** @inheritDoc */
  clear(_particle: InteractivityParticle, _delta: IDelta): void {
    // do nothing
  }

  /** @inheritDoc */
  init(): void {
    // do nothing
  }

  /** @inheritDoc */
  interact(interactivityData: IInteractivityData, _delta: IDelta): void {
    const mouse = interactivityData.mouse,
      mousePos = mouse.position;

    // Keep the last known pointer position from interactivity plugin events
    if (mousePos) {
      this.#lastMousePosition = mousePos;
    }

    // Move the already-grabbed particle
    if (this.#draggedParticle) {
      const now = performance.now();

      if (!mouse.clicking) {
        this.#dragStartClickingFalseTime ??= now;
      } else {
        this.#dragStartClickingFalseTime = undefined;
      }

      // Fallback for environments where the first interaction can miss clickTime updates.
      const hasStableClickEndWithoutClickTime =
        this.#dragStartClickTime === undefined &&
        this.#dragStartClickingFalseTime !== undefined &&
        now - this.#dragStartClickingFalseTime >= clickReleaseDelayMs;

      if (!mouse.inside || this.#hasClickEnded(mouse) || hasStableClickEndWithoutClickTime) {
        this.#releaseDragged();
        this.#mouseDownHandled = false;

        return;
      }

      const pointerPos = mousePos ?? this.#lastMousePosition;

      if (!pointerPos) {
        return;
      }

      // Track pointer positions for momentum calculation

      this.#momentumSamples.push({ x: pointerPos.x, y: pointerPos.y, t: now });

      if (this.#momentumSamples.length > maxMomentumSamples) {
        this.#momentumSamples.shift();
      }

      const targetX = pointerPos.x + (this.#grabOffset?.x ?? zeroValue),
        targetY = pointerPos.y + (this.#grabOffset?.y ?? zeroValue);

      this.#draggedParticle.position.x = targetX - this.#draggedParticle.offset.x;
      this.#draggedParticle.position.y = targetY - this.#draggedParticle.offset.y;
      this.#draggedParticle.velocity.x = zeroValue;
      this.#draggedParticle.velocity.y = zeroValue;
      this.#draggedParticle.initialPosition.x = this.#draggedParticle.position.x;
      this.#draggedParticle.initialPosition.y = this.#draggedParticle.position.y;
      this.#draggedParticle.misplaced = false;

      return;
    }

    if (!mouse.clicking) {
      this.#releaseDragged();
      this.#mouseDownHandled = false;

      return;
    }

    // Start drag only once per mousedown
    if (this.#mouseDownHandled) {
      return;
    }

    this.#mouseDownHandled = true;

    const downPos = mouse.downPosition ?? mousePos ?? this.#lastMousePosition,
      closest = this.#findParticleUnderCursor(interactivityData, downPos);

    if (!closest || !mousePos) {
      if (!closest) {
        this.#mouseDownHandled = false;
      }

      return;
    }

    const renderedPos = closest.getPosition();

    this.#draggedParticle = closest;
    this.#dragStartClickTime = mouse.clickTime;
    this.#grabOffset = {
      x: renderedPos.x - mousePos.x,
      y: renderedPos.y - mousePos.y,
    };
    this.#savedVelocity = { x: closest.velocity.x, y: closest.velocity.y };
    this.#dragStartClickingFalseTime = undefined;
    this.#momentumSamples = [{ x: mousePos.x, y: mousePos.y, t: performance.now() }];

    closest.velocity.x = zeroValue;
    closest.velocity.y = zeroValue;
    closest.position.x = renderedPos.x - closest.offset.x;
    closest.position.y = renderedPos.y - closest.offset.y;
    closest.initialPosition.x = closest.position.x;
    closest.initialPosition.y = closest.position.y;
    closest.misplaced = false;
  }

  /** @inheritDoc */
  isEnabled(interactivityData: IInteractivityData, particle?: InteractivityParticle): boolean {
    const container = this.container,
      mouse = interactivityData.mouse,
      events = (particle?.interactivity ?? container.actualOptions.interactivity)?.events;

    if (this.#draggedParticle || this.#mouseDownHandled) {
      return true;
    }

    return !!events?.onClick.enable && mouse.clicking && !!mouse.position && isInArray(dragMode, events.onClick.mode);
  }

  /** @inheritDoc */
  loadModeOptions(options: Modes & DragMode, ...sources: RecursivePartial<(IModes & IDragMode) | undefined>[]): void {
    options.drag ??= new Drag();

    for (const source of sources) {
      options.drag.load(source?.drag);
    }
  }

  /** @inheritDoc */
  reset(_interactivityData: IInteractivityData, _particle: InteractivityParticle): void {
    // do nothing - release logic is handled in interact()
  }

  /**
   * Finds the closest particle under the cursor within its radius
   * @param interactivityData -
   * @param mousePos -
   * @param mousePos.x
   * @param mousePos.y
   * @returns -
   */
  #findParticleUnderCursor(
    interactivityData: IInteractivityData,
    mousePos?: { x: number; y: number },
  ): Particle | undefined {
    if (!mousePos) {
      return;
    }

    const candidates = this.container.particles.filter(p => this.isEnabled(interactivityData, p));

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

  /**
   * Checks whether a new click cycle has begun since drag started
   * @param mouse
   */
  #hasClickEnded(mouse: IInteractivityData["mouse"]): boolean {
    return (
      this.#dragStartClickTime !== undefined &&
      mouse.clickTime !== undefined &&
      mouse.clickTime !== this.#dragStartClickTime
    );
  }

  /** Releases the dragged particle, optionally applying momentum */
  #releaseDragged(): void {
    if (this.#draggedParticle) {
      const dragOptions = this.container.actualOptions.interactivity?.modes.drag,
        preserveMomentum = dragOptions?.preserveMomentum ?? false;

      if (preserveMomentum && this.#momentumSamples.length >= minSamplesForMomentum) {
        const first = this.#momentumSamples[firstSampleIndex],
          last = this.#momentumSamples[this.#momentumSamples.length - lastSampleOffset];

        if (first && last) {
          const dt = last.t - first.t;

          if (dt > zeroValue) {
            const factor = dragOptions?.momentumFactor ?? defaultMomentumFactor;

            // Convert pointer speed (px/ms) to engine velocity unit used by move updater.
            this.#draggedParticle.velocity.x = ((last.x - first.x) / dt) * momentumToVelocityFactor * factor;
            this.#draggedParticle.velocity.y = ((last.y - first.y) / dt) * momentumToVelocityFactor * factor;
          } else if (this.#savedVelocity) {
            this.#draggedParticle.velocity.x = this.#savedVelocity.x;
            this.#draggedParticle.velocity.y = this.#savedVelocity.y;
          }
        } else if (this.#savedVelocity) {
          this.#draggedParticle.velocity.x = this.#savedVelocity.x;
          this.#draggedParticle.velocity.y = this.#savedVelocity.y;
        }
      } else if (this.#savedVelocity) {
        this.#draggedParticle.velocity.x = this.#savedVelocity.x;
        this.#draggedParticle.velocity.y = this.#savedVelocity.y;
      }
    }

    this.#draggedParticle = undefined;
    this.#dragStartClickTime = undefined;
    this.#dragStartClickingFalseTime = undefined;
    this.#grabOffset = undefined;
    this.#lastMousePosition = undefined;
    this.#momentumSamples = [];
    this.#savedVelocity = undefined;
  }
}
