import {
  type Container,
  type Engine,
  type IDelta,
  type IParticleUpdater,
  type Particle,
  getHslAnimationFromHsl,
  rangeColorToHsl,
  updateColor,
} from "@tsparticles/engine";

export class ColorUpdater implements IParticleUpdater {
  private readonly _container;
  private readonly _engine;

  constructor(engine: Engine, container: Container) {
    this._container = container;
    this._engine = engine;
  }

  init(particle: Particle): void {
    /* color */
    const hslColor = rangeColorToHsl(
      this._engine,
      particle.options.color,
      particle.id,
      particle.options.reduceDuplicates,
    );

    if (hslColor) {
      particle.color = getHslAnimationFromHsl(
        hslColor,
        particle.options.color.animation,
        this._container.retina.reduceFactor,
      );
    }
  }

  isEnabled(particle: Particle): boolean {
    const { h: hAnimation, s: sAnimation, l: lAnimation } = particle.options.color.animation,
      { color } = particle;

    return (
      !particle.destroyed &&
      !particle.spawning &&
      ((color?.h.value !== undefined && hAnimation.enable) ||
        (color?.s.value !== undefined && sAnimation.enable) ||
        (color?.l.value !== undefined && lAnimation.enable))
    );
  }

  update(particle: Particle, delta: IDelta): void {
    updateColor(particle.color, delta);
  }
}
