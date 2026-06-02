import {
  type IContainerPlugin,
  type IRgb,
  type PluginManager,
  getLogger,
  getStyleFromRgb,
  inverseFactorNumerator,
  rangeColorToRgb,
  safeDocument,
} from "@tsparticles/engine";
import type { TrailContainer } from "./types.js";

const minimumLength = 0;

/** Trail fill data for rendering */
interface ITrailFillData {
  /** The trail fill color */
  color?: IRgb;
  /** The trail fill image */
  image?: HTMLImageElement;
  /** The trail fill opacity */
  opacity: number;
}

export class TrailPluginInstance implements IContainerPlugin {
  /** The particles container */
  readonly #container;
  /** The plugin manager */
  readonly #pluginManager;
  /** The trail fill data */
  #trailFill?: ITrailFillData;

  /**
   * Creates a new TrailPluginInstance
   * @param pluginManager - the plugin manager
   * @param container - the trail container
   */
  constructor(pluginManager: PluginManager, container: TrailContainer) {
    this.#container = container;
    this.#pluginManager = pluginManager;
  }

  canvasClear(): boolean {
    const container = this.#container,
      trail = container.actualOptions.trail,
      trailFill = this.#trailFill;

    if (!trail?.enable || !trailFill || trail.length <= minimumLength) {
      return false;
    }

    let handled = false;

    const canvas = container.canvas;

    if (trailFill.color) {
      canvas.render.paintBase(getStyleFromRgb(trailFill.color, container.hdr, trailFill.opacity));

      handled = true;
    } else if (trailFill.image) {
      canvas.render.paintImage(trailFill.image, trailFill.opacity);

      handled = true;
    }

    return handled;
  }

  async init(): Promise<void> {
    try {
      await this.#initTrail();
    } catch (e) {
      getLogger().error(e);
    }
  }

  async #initTrail(): Promise<void> {
    const options = this.#container.actualOptions,
      trail = options.trail;

    if (!trail?.enable) {
      return;
    }

    const trailFill = trail.fill,
      opacity = inverseFactorNumerator / trail.length;

    if (trailFill.color) {
      const fillColor = rangeColorToRgb(this.#pluginManager, trailFill.color);

      if (!fillColor) {
        return;
      }

      this.#trailFill = {
        color: {
          ...fillColor,
        },
        opacity,
      };
    } else {
      await new Promise<void>((resolve, reject) => {
        if (!trailFill.image) {
          return;
        }

        const img = safeDocument().createElement("img");

        img.addEventListener("load", () => {
          this.#trailFill = {
            image: img,
            opacity,
          };

          resolve();
        });

        img.addEventListener("error", evt => {
          getLogger().error(evt);

          reject(new Error("Error loading image"));
        });

        img.src = trailFill.image;
      });
    }
  }
}
