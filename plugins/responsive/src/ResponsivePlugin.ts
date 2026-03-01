import {
  type Container,
  type IContainerPlugin,
  type IPlugin,
  type ISourceOptions,
  type RecursivePartial,
} from "@tsparticles/engine";
import type { IResponsiveOptions, ResponsiveContainer, ResponsiveOptions } from "./types.js";
import { Responsive } from "./Options/Classes/Responsive.js";
import { ResponsiveMode } from "./ResponsiveMode.js";

/**
 */
export class ResponsivePlugin implements IPlugin {
  readonly id = "responsive";

  async getPlugin(container: ResponsiveContainer): Promise<IContainerPlugin> {
    const { ResponsivePluginInstance } = await import("./ResponsivePluginInstance.js");

    return new ResponsivePluginInstance(container);
  }

  loadOptions(_container: Container, options: ResponsiveOptions, source?: RecursivePartial<IResponsiveOptions>): void {
    if (!this.needsPlugin(options) && !this.needsPlugin(source)) {
      return;
    }

    const setResponsive: (width: number, pxRatio: number, defaultOptions: ISourceOptions) => number | undefined = (
      width,
      pxRatio,
      defaultOptions,
    ) => {
      options.load(defaultOptions);

      const logicalWidth = width / pxRatio,
        widthMap: Record<ResponsiveMode, number> = {
          [ResponsiveMode.screen]: screen.availWidth,
          [ResponsiveMode.window]: innerWidth,
          [ResponsiveMode.canvas]: logicalWidth,
        },
        responsiveOptions = options.responsive?.find(t => t.maxWidth > widthMap[t.mode]);

      options.load(responsiveOptions?.options);

      return responsiveOptions?.maxWidth;
    };

    options.setResponsive = setResponsive;
    options.responsive ??= [];

    if (source?.responsive !== undefined) {
      for (const responsive of source.responsive) {
        const optResponsive = new Responsive();

        if (responsive) {
          optResponsive.load(responsive);
        }

        options.responsive.push(optResponsive);
      }
    }

    options.responsive.sort((a, b) => a.maxWidth - b.maxWidth);
  }

  needsPlugin(options?: RecursivePartial<IResponsiveOptions>): boolean {
    return !!options?.responsive?.length;
  }
}
