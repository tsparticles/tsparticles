/**
 * The zoom mode options
 * [[include:Options/Plugins/Zoom.md]]
 */
export interface IZoom {
  /**
   * Enables or disables zoom interactions.
   */
  enable: boolean;

  /**
   * Maximum zoom level.
   */
  max: number;

  /**
   * Minimum zoom level.
   */
  min: number;
}
