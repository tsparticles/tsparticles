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
  getDistance,
  isInArray,
  loadOptionProperty,
} from "@tsparticles/engine";
import type { ISlowMode, SlowContainer, SlowMode } from "./Types.js";
import { Slow } from "./Options/Classes/Slow.js";
import { SlowModifier } from "./SlowModifier.js";

const slowMode = "slow",
  minRadius = 0;

/**
 * Particle slow manager
 */
export class Slower extends ExternalInteractorBase<SlowContainer> {
  #maxDistance;
  readonly #modifiers = new WeakMap<Particle, SlowModifier>();

  constructor(container: SlowContainer) {
    super(container);

    this.#maxDistance = 0;
  }

  get maxDistance(): number {
    return this.#maxDistance;
  }

  clear(particle: Particle, _delta: IDelta, force?: boolean): void {
    const mod = this.#modifiers.get(particle);

    if (mod?.enabled && !force) {
      return;
    }

    particle.removeModifier(slowMode);

    this.#modifiers.delete(particle);
  }

  getOrCreateModifier(particle: Particle): SlowModifier {
    let mod = this.#modifiers.get(particle);

    if (!mod) {
      mod = new SlowModifier();

      this.#modifiers.set(particle, mod);

      particle.addModifier(mod);
    }

    return mod;
  }

  init(): void {
    const container = this.container,
      slow = container.actualOptions.interactivity?.modes.slow;

    if (!slow) {
      return;
    }

    this.#maxDistance = slow.radius;

    container.retina.slowModeRadius = slow.radius * container.retina.pixelRatio;
  }

  interact(): void {
    // nothing to do
  }

  isEnabled(interactivityData: IInteractivityData, particle?: InteractivityParticle): boolean {
    const container = this.container,
      mouse = interactivityData.mouse,
      events = (particle?.interactivity ?? container.actualOptions.interactivity)?.events;

    return !!events?.onHover.enable && !!mouse.position && isInArray(slowMode, events.onHover.mode);
  }

  loadModeOptions(options: Modes & SlowMode, ...sources: RecursivePartial<(IModes & ISlowMode) | undefined>[]): void {
    loadOptionProperty(options, "slow", Slow, ...sources);
  }

  reset(interactivityData: IInteractivityData, particle: Particle): void {
    const mod = this.#modifiers.get(particle);

    if (mod) {
      mod.enabled = false;
    }

    const container = this.container,
      options = container.actualOptions,
      mousePos = interactivityData.mouse.position,
      radius = container.retina.slowModeRadius,
      slowOptions = options.interactivity?.modes.slow;

    if (!slowOptions || !radius || radius < minRadius || !mousePos) {
      return;
    }

    const particlePos = particle.getPosition(),
      dist = getDistance(mousePos, particlePos),
      proximityFactor = dist / radius,
      slowFactor = slowOptions.factor;

    if (dist > radius) {
      return;
    }

    const activeMod = this.getOrCreateModifier(particle);

    activeMod.enabled = true;
    activeMod.speedFactor = proximityFactor / slowFactor;
  }
}
