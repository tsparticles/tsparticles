/** Export operation result */
export interface ExportResult {
  /** The exported blob data, if successful */
  blob?: Blob;
  /** Error information if export failed */
  error?: Error;
  /** Whether the export format is supported */
  supported: boolean;
}
