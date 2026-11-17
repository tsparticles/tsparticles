import type {
  ColorTransitionsParticle,
  ColorTransitionsParticlesOptions,
  IColorTransitionsParticlesOptions,
} from "./Types.js";
import {
  type Container,
  type IDelta,
  type IParticleColorStyle,
  type IParticleUpdater,
  type PluginManager,
  type RecursivePartial,
  getRandom,
  getStyleFromHsl,
  rangeColorToHsl,
} from "@tsparticles/engine";
import { applyProgressOffset, getLifeProgress, interpolateStops } from "./Utils.js";
import { ColorTransitions } from "./Options/Classes/ColorTransitions.js";

const syncOffset = 0;

/** Color transitions updater plugin */
export class ColorTransitionsUpdater implements IParticleUpdater {
  /** The particles container */
  readonly #container;
  /** The plugin manager */
  readonly #pluginManager;

  /**
   * ColorTransitionsUpdater constructor
   * @param pluginManager - The plugin manager
   * @param container - The container to handle
   */
  constructor(pluginManager: PluginManager, container: Container) {
    this.#pluginManager = pluginManager;
    this.#container = container;
  }

  /**
   * Gets the color styles for the current transition color
   * @param particle - The particle to process
   * @param _context - The rendering context
   * @param _radius - The radius
   * @param opacity - The opacity value
   * @returns The color styles for the current transition color
   */
  getColorStyles(
    particle: ColorTransitionsParticle,
    _context: OffscreenCanvasRenderingContext2D,
    _radius: number,
    opacity: number,
  ): IParticleColorStyle {
    const current = particle.colorTransitions?.lifetime.current;

    if (!current) {
      return {};
    }

    const container = this.#container;

    return { fill: getStyleFromHsl(current, container.hdr, opacity, container.peakNits, container.hdrMode) };
  }

  /**
   * Initializes the particle color transitions
   * @param particle - The particle to process
   */
  init(particle: ColorTransitionsParticle): void {
    // Particles are pooled and reused: always clear state from a previous life,
    // even when the new options disable or omit the feature.
    particle.colorTransitions = undefined;

    const transitions = particle.options.colorTransitions;

    if (!transitions) {
      return;
    }

    const { lifetime } = transitions;

    if (!lifetime.enable || !lifetime.stops.length) {
      return;
    }

    const reduceDuplicates = particle.options.reduceDuplicates,
      stops = [];

    for (const stop of lifetime.stops) {
      const color = rangeColorToHsl(this.#pluginManager, stop.value, particle.id, reduceDuplicates);

      if (!color) {
        continue;
      }

      stops.push({ color, offset: stop.offset });
    }

    if (!stops.length) {
      return;
    }

    stops.sort((a, b) => a.offset - b.offset);

    particle.colorTransitions = {
      lifetime: {
        enable: true,
        offset: lifetime.sync ? syncOffset : getRandom(),
        stops,
      },
    };
  }

  /**
   * Checks if color transitions are enabled
   * @param particle - The particle to process
   * @returns The boolean value
   */
  isEnabled(particle: ColorTransitionsParticle): boolean {
    return !particle.destroyed && !particle.spawning && !!particle.colorTransitions?.lifetime.enable;
  }

  /**
   * Loads the color transitions options
   * @param options - The options to handle
   * @param sources - The sources
   */
  loadOptions(
    options: ColorTransitionsParticlesOptions,
    ...sources: (RecursivePartial<IColorTransitionsParticlesOptions> | undefined)[]
  ): void {
    for (const source of sources) {
      if (!source?.colorTransitions) {
        continue;
      }

      options.colorTransitions ??= new ColorTransitions();

      options.colorTransitions.load(source.colorTransitions);
    }
  }

  /**
   * Updates the particle transition color
   * @param particle - The particle to process
   * @param _delta - The delta time
   */
  update(particle: ColorTransitionsParticle, _delta: IDelta): void {
    const state = particle.colorTransitions?.lifetime;

    if (!state?.enable) {
      return;
    }

    const progress = getLifeProgress(particle.life);

    state.current =
      progress === undefined ? undefined : interpolateStops(state.stops, applyProgressOffset(progress, state.offset));
  }
}
