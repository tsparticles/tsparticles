import type {
  ColorTransitionsParticle,
  ColorTransitionsParticlesOptions,
  IColorTransitionChannelState,
  IColorTransitionStopState,
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
  millisecondsToSeconds,
  rangeColorToHsl,
} from "@tsparticles/engine";
import { applyProgressOffset, getLifeProgress, interpolateStops } from "./Utils.js";
import type { ColorTransitionStop } from "./Options/Classes/ColorTransitionStop.js";
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
   * Gets the color styles for the current transition colors
   * @param particle - The particle to process
   * @param _context - The rendering context
   * @param _radius - The radius
   * @param opacity - The opacity value
   * @returns The color styles for the current transition colors
   */
  getColorStyles(
    particle: ColorTransitionsParticle,
    _context: OffscreenCanvasRenderingContext2D,
    _radius: number,
    opacity: number,
  ): IParticleColorStyle {
    const state = particle.colorTransitions?.lifetime;

    if (!state) {
      return {};
    }

    const container = this.#container,
      styles: IParticleColorStyle = {};

    if (state.fill?.current) {
      styles.fill = getStyleFromHsl(state.fill.current, container.hdr, opacity, container.peakNits, container.hdrMode);
    }

    if (state.stroke?.current) {
      styles.stroke = getStyleFromHsl(
        state.stroke.current,
        container.hdr,
        opacity,
        container.peakNits,
        container.hdrMode,
      );
    }

    return styles;
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

    if (!lifetime.enable) {
      return;
    }

    const pluginManager = this.#pluginManager,
      reduceDuplicates = particle.options.reduceDuplicates,
      resolveStops = (stops: ColorTransitionStop[]): IColorTransitionStopState[] => {
        const resolved: IColorTransitionStopState[] = [];

        for (const stop of stops) {
          const color = rangeColorToHsl(pluginManager, stop.value, particle.id, reduceDuplicates);

          if (!color) {
            continue;
          }

          resolved.push({ color, offset: stop.offset });
        }

        resolved.sort((a, b) => a.offset - b.offset);

        return resolved;
      },
      // The shared stops resolve exactly once: random stop colors must match between the fill and
      // stroke channels, the same way a single paint color applies to both.
      sharedStops = resolveStops(lifetime.stops),
      resolveChannel = (stops: ColorTransitionStop[] | undefined): IColorTransitionChannelState | undefined => {
        const resolved = stops?.length ? resolveStops(stops) : sharedStops;

        if (!resolved.length) {
          return undefined;
        }

        return { result: { h: 0, l: 0, s: 0 }, stops: resolved };
      },
      fill = resolveChannel(lifetime.fill?.stops),
      stroke = resolveChannel(lifetime.stroke?.stops);

    if (!fill && !stroke) {
      return;
    }

    particle.colorTransitions = {
      lifetime: {
        // The options duration is in seconds, matching the life options; the life clock runs in
        // milliseconds, so the override is converted here, like the life updater does.
        duration: lifetime.duration === undefined ? undefined : lifetime.duration * millisecondsToSeconds,
        enable: true,
        fill,
        offset: lifetime.sync ? syncOffset : getRandom(),
        stroke,
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
   * Updates the particle transition colors
   * @param particle - The particle to process
   * @param _delta - The delta time
   */
  update(particle: ColorTransitionsParticle, _delta: IDelta): void {
    const state = particle.colorTransitions?.lifetime;

    if (!state?.enable) {
      return;
    }

    const progress = getLifeProgress(particle.life, state.duration);

    if (state.fill) {
      this.#updateChannel(state.fill, progress, state.offset);
    }

    if (state.stroke) {
      this.#updateChannel(state.stroke, progress, state.offset);
    }
  }

  /**
   * Updates a single paint channel, writing the interior interpolation into its reused result object
   * @param channel - The channel state to update
   * @param progress - The transition progress, or undefined when the particle has no finite advancing life clock
   * @param offset - The per-particle progress offset
   */
  #updateChannel(channel: IColorTransitionChannelState, progress: number | undefined, offset: number): void {
    channel.current =
      progress === undefined
        ? undefined
        : interpolateStops(channel.stops, applyProgressOffset(progress, offset), channel.result);
  }
}
