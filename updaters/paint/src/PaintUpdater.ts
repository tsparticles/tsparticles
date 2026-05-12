import {
  AnimatableColor,
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
import type { PaintParticle } from "./Types.js";

const defaultOpacity = 1;

/** Paint updater plugin */
export class PaintUpdater implements IParticleUpdater {
  /** The particles container */
  private readonly _container;
  /** The plugin manager */
  private readonly _pluginManager;

  /**
   * PaintUpdater constructor
   * @param pluginManager
   * @param container
   */
  constructor(pluginManager: PluginManager, container: Container) {
    this._container = container;
    this._pluginManager = pluginManager;
  }

  /**
   * Initializes paint-related particle properties
   * @param particle
   */
  init(particle: PaintParticle): void {
    const container = this._container,
      options = particle.options,
      paint = itemFromSingleOrMultiple(options.paint, particle.id, options.reduceDuplicates),
      color = (paint as { color?: unknown } | undefined)?.color,
      paintColor = color ?? undefined,
      fill = paint?.fill,
      stroke = paint?.stroke;

    if (fill) {
      const fillColor = AnimatableColor.create(
        paintColor === undefined ? undefined : AnimatableColor.create(undefined, paintColor),
        fill.color,
      );

      particle.fillEnabled = fill.enable;
      particle.fillOpacity = getRangeValue(fill.opacity);
      particle.fillAnimation = fillColor.animation;

      const fillHslColor = rangeColorToHsl(this._pluginManager, fillColor);

      if (fillHslColor) {
        particle.fillColor = getHslAnimationFromHsl(
          fillHslColor,
          particle.fillAnimation,
          container.retina.reduceFactor,
        );
      }
    } else {
      particle.fillEnabled = false;
      particle.fillAnimation = undefined;
      particle.fillColor = undefined;
      particle.fillOpacity = defaultOpacity;
    }

    if (stroke) {
      const strokeColor = AnimatableColor.create(
        paintColor === undefined ? undefined : AnimatableColor.create(undefined, paintColor),
        stroke.color,
      );

      particle.strokeWidth = getRangeValue(stroke.width) * container.retina.pixelRatio;
      particle.strokeOpacity = getRangeValue(stroke.opacity ?? defaultOpacity);
      particle.strokeAnimation = strokeColor.animation;

      const strokeHslColor = rangeColorToHsl(this._pluginManager, strokeColor) ?? particle.getFillColor();

      if (strokeHslColor) {
        particle.strokeColor = getHslAnimationFromHsl(
          strokeHslColor,
          particle.strokeAnimation,
          container.retina.reduceFactor,
        );
      }
    } else {
      particle.strokeAnimation = undefined;
      particle.strokeColor = undefined;
      particle.strokeOpacity = defaultOpacity;
      particle.strokeWidth = 0;
    }
  }

  /**
   * Checks if paint animation is enabled
   * @param particle
   */
  isEnabled(particle: PaintParticle): boolean {
    const { fillAnimation, fillColor, strokeAnimation, strokeColor } = particle,
      fillEnabled =
        !!fillAnimation &&
        ((fillColor?.h.value !== undefined && fillColor.h.enable) ||
          (fillColor?.s.value !== undefined && fillColor.s.enable) ||
          (fillColor?.l.value !== undefined && fillColor.l.enable)),
      strokeEnabled =
        !!strokeAnimation &&
        ((strokeColor?.h.value !== undefined && strokeColor.h.enable) ||
          (strokeColor?.s.value !== undefined && strokeColor.s.enable) ||
          (strokeColor?.l.value !== undefined && strokeColor.l.enable));

    return !particle.destroyed && !particle.spawning && (fillEnabled || strokeEnabled);
  }

  /**
   * Updates the particle paint colors
   * @param particle
   * @param delta
   */
  update(particle: Particle, delta: IDelta): void {
    if (!this.isEnabled(particle)) {
      return;
    }

    updateColor(particle.fillColor, delta);
    updateColor(particle.strokeColor, delta);
  }
}
