import type { IExportPluginData } from "tsparticles-engine";

export interface IExportVideoData extends IExportPluginData {
    fps?: number;
    mimeType?: string;
}
