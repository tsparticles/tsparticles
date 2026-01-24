import {
  ExternalInteractorBase,
  type IInteractivityData,
  type IModes,
  type InteractivityParticle,
  type Modes,
} from "@tsparticles/plugin-interactivity";
import { type IDelta, type Particle, type RecursivePartial, getDistance, isInArray } from "@tsparticles/engine";
import type { ISlowMode, SlowContainer, SlowMode } from "./Types.js";
import { Slow } from "./Options/Classes/Slow.js";

const slowMode = "slow",
  minRadius = 0;

/**
 * Particle slow manager
 */
export class Slower extends ExternalInteractorBase<SlowContainer> {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(container: SlowContainer) {
    super(container);
  }

  clear(particle: Particle, _delta: IDelta, force?: boolean): void {
    if (particle.slow.inRange && !force) {
      return;
    }

    particle.slow.factor = 1;
  }

  init(): void {
    const container = this.container,
      slow = container.actualOptions.interactivity?.modes.slow;

    if (!slow) {
      return;
    }

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
    options.slow ??= new Slow();

    for (const source of sources) {
      options.slow.load(source?.slow);
    }
  }

  reset(interactivityData: IInteractivityData, particle: Particle): void {
    particle.slow.inRange = false;

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
      slowFactor = slowOptions.factor,
      { slow } = particle;
    if (dist > radius) {
      return;
    }

    slow.inRange = true;
    slow.factor = proximityFactor / slowFactor;
  }
}
