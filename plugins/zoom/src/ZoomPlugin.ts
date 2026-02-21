import type { Container, IContainerPlugin, IPlugin, RecursivePartial } from "@tsparticles/engine";
import type { IZoomOptions, ZoomOptions } from "./types.js";
import { Zoom } from "./Options/Classes/Zoom.js";

/**
 */
export class ZoomPlugin implements IPlugin {
  readonly id = "zoom";

  async getPlugin(container: Container): Promise<IContainerPlugin> {
    const { ZoomPluginInstance } = await import("./ZoomPluginInstance.js");

    return new ZoomPluginInstance(container);
  }

  loadOptions(_container: Container, options: ZoomOptions, source?: RecursivePartial<IZoomOptions>): void {
    if (!this.needsPlugin()) {
      return;
    }

    let zoomOptions = options.zoom;

    if (!zoomOptions) {
      zoomOptions = new Zoom();

      options.zoom = zoomOptions;
    }

    zoomOptions.load(source?.zoom);
  }

  needsPlugin(): boolean {
    return true;
  }
}
