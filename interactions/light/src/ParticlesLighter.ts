import { type Engine, isInArray, rangeColorToRgb } from "@tsparticles/engine";
import { type IInteractivityData, ParticlesInteractorBase } from "@tsparticles/plugin-interactivity";
import type { LightContainer, LightParticle } from "./Types.js";
import { drawParticleShadow, lightMode } from "./Utils.js";

export class ParticlesLighter extends ParticlesInteractorBase<LightContainer> {
  readonly maxDistance;

  private readonly _engine;

  constructor(container: LightContainer, engine: Engine) {
    super(container);

    this._engine = engine;
    this.maxDistance = 0;
  }

  clear(): void {
    // do nothing
  }

  init(): void {
    // do nothing
  }

  interact(particle: LightParticle, interactivityData: IInteractivityData): void {
    const container = this.container,
      options = container.actualOptions;

    if (!options.interactivity?.events.onHover.enable || interactivityData.status !== "pointermove") {
      return;
    }

    const mousePos = interactivityData.mouse.position;

    if (!mousePos) {
      return;
    }

    container.canvas.draw(ctx => {
      drawParticleShadow(container, ctx, particle, mousePos);
    });
  }

  isEnabled(particle: LightParticle, interactivityData: IInteractivityData): boolean {
    const interactivity = particle.interactivity,
      mouse = interactivityData.mouse,
      events = interactivity.events;

    if (!(events.onHover.enable && mouse.position)) {
      return false;
    }

    const res = isInArray(lightMode, events.onHover.mode);

    if (res && interactivity.modes.light) {
      const shadowOptions = interactivity.modes.light.shadow;

      particle.lightShadow = rangeColorToRgb(this._engine, shadowOptions.color);
    }

    return res;
  }

  reset(): void {
    // do nothing
  }
}
