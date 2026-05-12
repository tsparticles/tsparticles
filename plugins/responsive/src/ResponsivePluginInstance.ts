import { type IContainerPlugin } from "@tsparticles/engine";
import type { ResponsiveContainer } from "./types.js";

export class ResponsivePluginInstance implements IContainerPlugin {
  /** The responsive container */
  private readonly _container;

  /**
   * Creates a new ResponsivePluginInstance
   * @param container - the responsive container
   */
  constructor(container: ResponsiveContainer) {
    this._container = container;
  }

  updateActualOptions(): boolean {
    const container = this._container;

    container.actualOptions.responsive = [];

    const newMaxWidth = container.actualOptions.setResponsive?.(
      container.canvas.size.width,
      container.retina.pixelRatio,
      container.options,
    );

    if (container.responsiveMaxWidth === newMaxWidth) {
      return false;
    }

    container.responsiveMaxWidth = newMaxWidth;

    return true;
  }
}
