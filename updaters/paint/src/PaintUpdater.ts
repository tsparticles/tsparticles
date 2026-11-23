import {
  AnimatableColor,
  type Container,
  type IDelta,
  type IParticleUpdater,
  type Paint,
  type Particle,
  type PluginManager,
  getOklchAnimationFromOklch,
  getRangeValue,
  itemFromSingleOrMultiple,
  rangeColorToOklch,
  updateColor,
} from "@tsparticles/engine";
import type { PaintParticle } from "./Types.js";

const defaultOpacity = 1;

/** Paint updater plugin */
export class PaintUpdater implements IParticleUpdater {
  /** The particles container */
  readonly #container;
  /** The plugin manager */
  readonly #pluginManager;

  /**
   * PaintUpdater constructor
   * @param pluginManager - The plugin manager
   * @param container - The container to handle
   */
  constructor(pluginManager: PluginManager, container: Container) {
    this.#container = container;
    this.#pluginManager = pluginManager;
  }

  /**
   * Initializes paint-related particle properties
   * @param particle - The particle to process
   */
  init(particle: PaintParticle): void {
    const container = this.#container,
      options = particle.options,
      paint = itemFromSingleOrMultiple(
        options.paint,
        particle.id,
        options.reduceDuplicates,
        this.#container.engine.getRandomFn(),
      );

    this.#initFill(paint, particle, container);
    this.#initStroke(paint, particle, container);
  }

  /**
   * Checks if paint animation is enabled
   * @param particle - The particle to process
   * @returns The boolean value
   */
  isEnabled(particle: PaintParticle): boolean {
    const { fillAnimation, fillColor, strokeAnimation, strokeColor } = particle,
      fillEnabled =
        !!fillAnimation &&
        ((fillColor?.h.value !== undefined && fillColor.h.enable) ||
          (fillColor?.c.value !== undefined && fillColor.c.enable) ||
          (fillColor?.l.value !== undefined && fillColor.l.enable)),
      strokeEnabled =
        !!strokeAnimation &&
        ((strokeColor?.h.value !== undefined && strokeColor.h.enable) ||
          (strokeColor?.c.value !== undefined && strokeColor.c.enable) ||
          (strokeColor?.l.value !== undefined && strokeColor.l.enable));

    return !particle.destroyed && !particle.spawning && (fillEnabled || strokeEnabled);
  }

  /**
   * Updates the particle paint colors
   * @param particle - The particle to process
   * @param delta - The delta time
   */
  update(particle: Particle, delta: IDelta): void {
    if (!this.isEnabled(particle)) {
      return;
    }

    updateColor(particle.fillColor, delta, this.#container.hdr, this.#container.engine.getRandomFn());
    updateColor(particle.strokeColor, delta, this.#container.hdr, this.#container.engine.getRandomFn());
  }

  #initFill(paint: Paint | undefined, particle: PaintParticle, container: Container): void {
    const fill = paint?.fill,
      color = (paint as { color?: unknown } | undefined)?.color,
      paintColor = color ?? undefined;

    if (!fill) {
      particle.fillEnabled = false;
      particle.fillAnimation = undefined;
      particle.fillColor = undefined;
      particle.fillOpacity = defaultOpacity;

      return;
    }

    const fillColor = AnimatableColor.create(
      paintColor === undefined ? undefined : AnimatableColor.create(undefined, paintColor),
      fill.color,
    );

    particle.fillEnabled = fill.enable;
    particle.fillOpacity = getRangeValue(fill.opacity, this.#container.engine.getRandomFn());
    particle.fillAnimation = fillColor.animation;

    const fillOklchColor = rangeColorToOklch(this.#pluginManager, fillColor);

    if (!fillOklchColor) {
      return;
    }

    particle.fillColor = getOklchAnimationFromOklch(
      fillOklchColor,
      particle.fillAnimation,
      container.retina.reduceFactor,
    );
  }

  #initStroke(paint: Paint | undefined, particle: PaintParticle, container: Container): void {
    const stroke = paint?.stroke,
      color = (paint as { color?: unknown } | undefined)?.color,
      paintColor = color ?? undefined;

    if (!stroke) {
      particle.strokeAnimation = undefined;
      particle.strokeColor = undefined;
      particle.strokeOpacity = defaultOpacity;
      particle.strokeWidth = 0;

      return;
    }

    const strokeColor = AnimatableColor.create(
      paintColor === undefined ? undefined : AnimatableColor.create(undefined, paintColor),
      stroke.color,
    );

    particle.strokeWidth =
      getRangeValue(stroke.width, this.#container.engine.getRandomFn()) * container.retina.pixelRatio;
    particle.strokeOpacity = getRangeValue(stroke.opacity ?? defaultOpacity, this.#container.engine.getRandomFn());
    particle.strokeAnimation = strokeColor.animation;

    const strokeOklchColor = rangeColorToOklch(this.#pluginManager, strokeColor) ?? particle.getFillColor();

    if (!strokeOklchColor) {
      return;
    }

    particle.strokeColor = getOklchAnimationFromOklch(
      strokeOklchColor,
      particle.strokeAnimation,
      container.retina.reduceFactor,
    );
  }
}
