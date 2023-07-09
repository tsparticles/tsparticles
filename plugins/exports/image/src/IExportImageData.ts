import type { IExportPluginData } from "tsparticles-engine";

export interface IExportImageData extends IExportPluginData {
    callback: BlobCallback;
    quality?: number;
    type?: string;
}
