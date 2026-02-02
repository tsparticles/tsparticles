import type { Container, IContainerPlugin, IPlugin, RecursivePartial } from "@tsparticles/engine";
import type { IPreloadOptions, PreloadOptions } from "./types.js";
import { Preload } from "./Options/Classes/Preload.js";

export class ImagePreloaderPlugin implements IPlugin {
  readonly id = "image-preloader";

  async getPlugin(): Promise<IContainerPlugin> {
    await Promise.resolve();

    return {};
  }

  loadOptions(_container: Container, options: PreloadOptions, source?: RecursivePartial<IPreloadOptions>): void {
    if (!source?.preload) {
      return;
    }

    options.preload ??= [];

    const preloadOptions = options.preload;

    for (const item of source.preload) {
      const existing = preloadOptions.find(t => t.name === item.name || t.src === item.src);

      if (existing) {
        existing.load(item);
      } else {
        const preload = new Preload();

        preload.load(item);

        preloadOptions.push(preload);
      }
    }
  }

  needsPlugin(): boolean {
    return true;
  }
}
