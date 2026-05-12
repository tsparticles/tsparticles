/** Video export data options */
export interface IExportVideoData {
  /** Video duration in seconds */
  duration?: number;
  /** Frames per second */
  fps?: number;
  /** MIME type for the exported video */
  mimeType?: string;
}
