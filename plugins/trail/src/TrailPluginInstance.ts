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

interface ITrailFillData {
  color?: IRgb;
  image?: HTMLImageElement;
  opacity: number;
}

export class TrailPluginInstance implements IContainerPlugin {
  private readonly _container;
  private readonly _pluginManager;
  private _trailFill?: ITrailFillData;

  constructor(pluginManager: PluginManager, container: TrailContainer) {
    this._container = container;
    this._pluginManager = pluginManager;
  }

  canvasClear(): boolean {
    const container = this._container,
      trail = container.actualOptions.trail,
      trailFill = this._trailFill;

    if (!trail?.enable || !trailFill || trail.length <= minimumLength) {
      return false;
    }

    let handled = false;

    const canvas = container.canvas;

    if (trailFill.color) {
      canvas.paintBase(getStyleFromRgb(trailFill.color, container.hdr, trailFill.opacity));

      handled = true;
    } else if (trailFill.image) {
      canvas.paintImage(trailFill.image, trailFill.opacity);

      handled = true;
    }

    return handled;
  }

  async init(): Promise<void> {
    try {
      await this._initTrail();
    } catch (e) {
      getLogger().error(e);
    }
  }

  private readonly _initTrail: () => Promise<void> = async () => {
    const options = this._container.actualOptions,
      trail = options.trail;

    if (!trail?.enable) {
      return;
    }

    const trailFill = trail.fill,
      opacity = inverseFactorNumerator / trail.length;

    if (trailFill.color) {
      const fillColor = rangeColorToRgb(this._pluginManager, trailFill.color);

      if (!fillColor) {
        return;
      }

      this._trailFill = {
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
          this._trailFill = {
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
  };
}
