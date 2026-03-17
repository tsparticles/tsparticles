import {
  ExternalInteractorBase,
  type IInteractivityData,
  type InteractivityContainer,
  type InteractivityParticle,
} from "@tsparticles/plugin-interactivity";
import { type IDelta, type Particle, getDistance, isInArray } from "@tsparticles/engine";

const dragMode = "drag",
  zeroValue = 0;

/**
 * External drag-and-drop interactor.
 * Allows the user to click and drag particles across the canvas.
 * Relies on pointer state provided by the interactivity plugin.
 */
export class Dragger extends ExternalInteractorBase {
  readonly maxDistance = 0;

  private _dragStartClickTime?: number;
  private _draggedParticle?: Particle;
  private _grabOffset?: { x: number; y: number };
  private _lastMousePosition?: { x: number; y: number };
  private _mouseDownHandled = false;
  private _savedVelocity?: { x: number; y: number };

  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(container: InteractivityContainer) {
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
      if (!mouse.inside || this._hasClickEnded(mouse)) {
        this._releaseDragged();
        this._mouseDownHandled = false;

        return;
      }

      const pointerPos = mousePos ?? this._lastMousePosition;

      if (!pointerPos) {
        return;
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

  private _hasClickEnded(mouse: IInteractivityData["mouse"]): boolean {
    return (
      this._dragStartClickTime !== undefined &&
      mouse.clickTime !== undefined &&
      mouse.clickTime !== this._dragStartClickTime
    );
  }

  private _releaseDragged(): void {
    if (this._draggedParticle && this._savedVelocity) {
      this._draggedParticle.velocity.x = this._savedVelocity.x;
      this._draggedParticle.velocity.y = this._savedVelocity.y;
    }

    this._draggedParticle = undefined;
    this._dragStartClickTime = undefined;
    this._grabOffset = undefined;
    this._lastMousePosition = undefined;
    this._savedVelocity = undefined;
  }
}
