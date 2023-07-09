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
                this._exportImage({ ...data, callback: data.callback as BlobCallback });

                return true;
        }

        return false;
    }

    private _exportImage(data: IExportImageData): void {
        const element = this._container.canvas.element;

        if (element) {
            element.toBlob(data.callback, data.type ?? "image/png", data.quality);
        }
    }
}
