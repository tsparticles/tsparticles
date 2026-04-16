import {
  AnimatableColor,
  type Container,
  type IAnimatableColor,
  type IDelta,
  type IParticleUpdater,
  type Particle,
  type PluginManager,
  type RecursivePartial,
  type SingleOrMultiple,
  getHslAnimationFromHsl,
  getRangeValue,
  itemFromSingleOrMultiple,
  rangeColorToHsl,
  updateColor,
} from "@tsparticles/engine";
import type { PaintParticle } from "./Types.js";

const defaultOpacity = 1;

export class PaintUpdater implements IParticleUpdater {
  private readonly _container;
  private readonly _pluginManager;

  constructor(pluginManager: PluginManager, container: Container) {
    this._container = container;
    this._pluginManager = pluginManager;
  }

  init(particle: PaintParticle): void {
    const container = this._container,
      options = particle.options,
      paint = itemFromSingleOrMultiple(options.paint, particle.id, options.reduceDuplicates),
      color = (paint as { color?: unknown } | undefined)?.color,
      paintColor = (color ?? undefined) as SingleOrMultiple<string> | RecursivePartial<IAnimatableColor> | undefined,
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

  update(particle: Particle, delta: IDelta): void {
    if (!this.isEnabled(particle)) {
      return;
    }

    updateColor(particle.fillColor, delta);
    updateColor(particle.strokeColor, delta);
  }
}
