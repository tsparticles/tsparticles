import type { Container, ExportResult, IContainerPlugin } from "@tsparticles/engine";
import type { IExportImageData } from "./IExportImageData.js";

/** Image export plugin instance */
export class ExportImagePluginInstance implements IContainerPlugin {
  readonly #container: Container;

  constructor(container: Container) {
    this.#container = container;
  }

  async export(type: string, data: Record<string, unknown>): Promise<ExportResult> {
    const res: ExportResult = {
      supported: false,
    };

    switch (type) {
      case "image":
        res.supported = true;
        res.blob = await this.#exportImage(data);

        break;
    }

    return res;
  }

  readonly #exportImage: (data: IExportImageData) => Promise<Blob | undefined> = async data => {
    const element = this.#container.canvas.domElement;

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
