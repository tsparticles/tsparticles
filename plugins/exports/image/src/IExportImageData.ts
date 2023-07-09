import type { IExportPluginData } from "tsparticles-engine";

export interface IExportImageData extends IExportPluginData {
    quality?: number;
    type?: string;
}
