import {
  type Container,
  type IDelta,
  type IParticleUpdater,
  type Particle,
  type PluginManager,
  getHslAnimationFromHsl,
  getRangeValue,
  itemFromSingleOrMultiple,
  rangeColorToHsl,
  updateColor,
} from "@tsparticles/engine";
import type { StrokeParticle } from "./Types.js";

const defaultOpacity = 1;

export class StrokeColorUpdater implements IParticleUpdater {
  private readonly _container;
  private readonly _pluginManager;

  constructor(pluginManager: PluginManager, container: Container) {
    this._container = container;
    this._pluginManager = pluginManager;
  }

  init(particle: StrokeParticle): void {
    const container = this._container,
      options = particle.options,
      /* strokeColor */
      stroke = itemFromSingleOrMultiple(options.stroke, particle.id, options.reduceDuplicates);

    if (!stroke) {
      return;
    }

    particle.strokeWidth = getRangeValue(stroke.width) * container.retina.pixelRatio;
    particle.strokeOpacity = getRangeValue(stroke.opacity ?? defaultOpacity);
    particle.strokeAnimation = stroke.color?.animation;

    const strokeHslColor = rangeColorToHsl(this._pluginManager, stroke.color) ?? particle.getFillColor();

    if (strokeHslColor) {
      particle.strokeColor = getHslAnimationFromHsl(
        strokeHslColor,
        particle.strokeAnimation,
        container.retina.reduceFactor,
      );
    }
  }

  isEnabled(particle: StrokeParticle): boolean {
    const color = particle.strokeAnimation,
      { strokeColor } = particle;

    return (
      !particle.destroyed &&
      !particle.spawning &&
      !!color &&
      ((strokeColor?.h.value !== undefined && strokeColor.h.enable) ||
        (strokeColor?.s.value !== undefined && strokeColor.s.enable) ||
        (strokeColor?.l.value !== undefined && strokeColor.l.enable))
    );
  }

  update(particle: Particle, delta: IDelta): void {
    if (!this.isEnabled(particle)) {
      return;
    }

    updateColor(particle.strokeColor, delta);
  }
}
