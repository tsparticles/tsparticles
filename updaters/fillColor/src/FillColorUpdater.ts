import {
  type Container,
  type Engine,
  type IDelta,
  type IParticleUpdater,
  type Particle,
  getHslAnimationFromHsl,
  getRangeValue,
  itemFromSingleOrMultiple,
  rangeColorToHsl,
  updateColor,
} from "@tsparticles/engine";
import type { FillParticle } from "./Types.js";

export class FillColorUpdater implements IParticleUpdater {
  private readonly _container;
  private readonly _engine;

  constructor(engine: Engine, container: Container) {
    this._container = container;
    this._engine = engine;
  }

  init(particle: FillParticle): void {
    const container = this._container,
      options = particle.options,
      /* fillColor */
      fill = itemFromSingleOrMultiple(options.fill, particle.id, options.reduceDuplicates);

    if (!fill) {
      return;
    }

    particle.fillEnabled = fill.enable;
    particle.fillOpacity = getRangeValue(fill.opacity);
    particle.fillAnimation = fill.color.animation;

    const fillHslColor = rangeColorToHsl(this._engine, fill.color);

    if (fillHslColor) {
      particle.fillColor = getHslAnimationFromHsl(fillHslColor, particle.fillAnimation, container.retina.reduceFactor);
    }
  }

  isEnabled(particle: FillParticle): boolean {
    const color = particle.fillAnimation,
      { fillColor } = particle;

    return (
      !particle.destroyed &&
      !particle.spawning &&
      !!color &&
      ((fillColor?.h.value !== undefined && fillColor.h.enable) ||
        (fillColor?.s.value !== undefined && fillColor.s.enable) ||
        (fillColor?.l.value !== undefined && fillColor.l.enable))
    );
  }

  update(particle: Particle, delta: IDelta): void {
    if (!this.isEnabled(particle)) {
      return;
    }

    updateColor(particle.fillColor, delta);
  }
}
