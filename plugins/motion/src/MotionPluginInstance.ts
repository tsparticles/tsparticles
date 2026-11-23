import { type IContainerPlugin, safeMatchMedia } from "@tsparticles/engine";
import type { MotionContainer } from "./types.js";

const defaultFactor = 1,
  defaultReduce = 1,
  disableReduce = 0,
  identity = 1;

export class MotionPluginInstance implements IContainerPlugin {
  /** The motion container */
  readonly #container;
  #generation = 0;
  #handleChange?: () => void;
  #mediaQuery?: MediaQueryList;

  /**
   * Creates a new MotionPluginInstance
   * @param container - the motion container
   */
  constructor(container: MotionContainer) {
    this.#container = container;
  }

  destroy(): void {
    this.stop();
  }

  async init(): Promise<void> {
    this.stop();

    const container = this.#container,
      options = container.actualOptions.motion,
      generation = this.#generation;

    if (!(options && (options.disable || options.reduce.value))) {
      container.retina.reduceFactor = 1;

      return;
    }

    const mediaQuery = safeMatchMedia("(prefers-reduced-motion: reduce)");

    if (!mediaQuery) {
      container.retina.reduceFactor = defaultFactor;

      return;
    }

    // Check if the media query matches or is not available.
    this.#handleMotionChange(mediaQuery);

    // Ads an event listener to check for changes in the media query's value.
    const handleChange = (): void => {
      if (generation !== this.#generation || container.destroyed) {
        return;
      }

      void (async (): Promise<void> => {
        this.#handleMotionChange(mediaQuery);

        if (generation !== this.#generation || container.destroyed) {
          return;
        }

        try {
          await container.refresh();
        } catch {
          // ignore
        }
      })();
    };

    this.#mediaQuery = mediaQuery;
    this.#handleChange = handleChange;
    mediaQuery.addEventListener("change", handleChange);

    await Promise.resolve();
  }

  stop(): void {
    this.#generation++;

    if (this.#mediaQuery && this.#handleChange) {
      this.#mediaQuery.removeEventListener("change", this.#handleChange);
    }

    this.#mediaQuery = undefined;
    this.#handleChange = undefined;
  }

  #handleMotionChange(mediaQuery: MediaQueryList): void {
    const container = this.#container,
      motion = container.actualOptions.motion;

    if (!motion) {
      return;
    }

    if (mediaQuery.matches) {
      if (motion.disable) {
        container.retina.reduceFactor = disableReduce;
      } else {
        container.retina.reduceFactor = motion.reduce.value ? identity / motion.reduce.factor : defaultFactor;
      }
    } else {
      container.retina.reduceFactor = defaultReduce;
    }
  }
}
