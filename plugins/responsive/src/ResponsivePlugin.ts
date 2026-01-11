import type { Container, IPlugin, ISourceOptions, RecursivePartial } from "@tsparticles/engine";
import type { IResponsiveOptions, ResponsiveOptions } from "./types.js";
import { Responsive } from "./Options/Classes/Responsive.js";
import { ResponsiveInstance } from "./ResponsiveInstance.js";
import { ResponsiveMode } from "./ResponsiveMode.js";

/**
 */
export class ResponsivePlugin implements IPlugin {
    readonly id;

    constructor() {
        this.id = "responsive";
    }

    getPlugin(container: Container): Promise<ResponsiveInstance> {
        return Promise.resolve(new ResponsiveInstance(container));
    }

    loadOptions(options: ResponsiveOptions, source?: RecursivePartial<IResponsiveOptions>): void {
        if (!this.needsPlugin()) {
            return;
        }

        const setResponsive: (width: number, pxRatio: number, defaultOptions: ISourceOptions) => number | undefined = (
            width,
            pxRatio,
            defaultOptions,
        ) => {
            options.load(defaultOptions);

            const responsiveOptions = options.responsive?.find(t =>
                t.mode === ResponsiveMode.screen ? t.maxWidth > screen.availWidth : t.maxWidth * pxRatio > width,
            );

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

    needsPlugin(): boolean {
        return true;
    }
}
