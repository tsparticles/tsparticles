import type { Container, ExportResult, IContainerPlugin } from "@tsparticles/engine";
import type { IExportImageData } from "./IExportImageData.js";

export class ExportImageInstance implements IContainerPlugin {
    private readonly _container: Container;

    constructor(container: Container) {
        this._container = container;
    }

    async export(type: string, data: Record<string, unknown>): Promise<ExportResult> {
        const res: ExportResult = {
            supported: false,
        };

        switch (type) {
            case "image":
                res.supported = true;
                res.blob = await this._exportImage(data);

                break;
        }

        return res;
    }

    private readonly _exportImage: (data: IExportImageData) => Promise<Blob | undefined> = async data => {
        const element = this._container.canvas.element;

        if (!element) {
            return;
        }

        return new Promise<Blob | undefined>(resolve => {
            element.toBlob(
                blob => {
                    if (!blob) {
                        resolve(undefined);

                        return;
                    }

                    resolve(blob);
                },
                data.type ?? "image/png",
                data.quality,
            );
        });
    };
}
