import type { BackgroundDrawContext, IDelta, IOptionsColor } from "@tsparticles/engine";

/**
 * The background cover customization
 */
export interface IBackgroundMaskCover {
  /**
   * The background color hiding all elements behind, string or {@link IOptionsColor} value.
   */
  color?: string | IOptionsColor;

  /**
   * Custom draw callback for dynamic mask, executed every frame during canvasPaint().
   * Receives the main canvas context and a delta (faked to `{ value: 0, factor: 1 }` currently).
   */
  draw?: (context: BackgroundDrawContext, delta: IDelta) => void;

  /**
   * External element or CSS selector for dynamic mask source.
   * Auto-drawn via ctx.drawImage() every frame before composite mode is applied.
   */
  element?: string | HTMLCanvasElement | OffscreenCanvas | HTMLVideoElement | HTMLImageElement;

  /**
   * The background image hiding all elements behind
   */
  image?: string;

  /**
   * The opacity of the background
   */
  opacity: number;
}
