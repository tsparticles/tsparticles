import type { Container, Engine, IContainerPlugin, IExportPluginData } from "tsparticles-engine";
import type { IExportImageData } from "./IExportImageData";

export class ExportImageInstance implements IContainerPlugin {
    private readonly _container: Container;
    private readonly _engine: Engine;

    constructor(container: Container, engine: Engine) {
        this._container = container;
        this._engine = engine;
    }

    async export(type: string, data: IExportPluginData): Promise<boolean> {
        switch (type) {
            case "image":
                this._exportImage(data);

                return true;
        }

        return false;
    }

    private _exportImage(data: IExportImageData): void {
        const element = this._container.canvas.element;

        if (!element) {
            return;
        }

        element.toBlob((blob) => data.callback(blob), data.type ?? "image/png", data.quality);
    }
}
