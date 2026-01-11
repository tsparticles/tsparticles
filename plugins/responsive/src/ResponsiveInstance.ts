import { type IContainerPlugin } from "@tsparticles/engine";
import type { ResponsiveContainer } from "./types.js";

export class ResponsiveInstance implements IContainerPlugin {
    private readonly _container;

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
