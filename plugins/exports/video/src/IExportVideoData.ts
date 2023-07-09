import type { IExportPluginData } from "tsparticles-engine";

export interface IExportVideoData extends IExportPluginData {
    duration?: number;
    fps?: number;
    mimeType?: string;
}
