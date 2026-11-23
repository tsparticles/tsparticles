import {
  type IEffectDrawer,
  type IOklcha,
  type IShapeDrawData,
  defaultAngle,
  doublePI,
  getStyleFromOklch,
  percentDenominator,
} from "@tsparticles/engine";

const bubbleFactor = 3,
  // Alpha from the previous #RGBA highlight style, retained exactly.
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  bubbleHighlightAlpha = 0x99 / 0xff,
  bubbleHighlightColor: IOklcha = {
    a: bubbleHighlightAlpha,
    c: 0,
    h: 0,
    l: percentDenominator,
  };

/** Bubble effect drawer plugin */
export class BubbleDrawer implements IEffectDrawer {
  /**
   * Draws the bubble highlight after particle rendering
   * @param data - The data to handle
   */
  drawAfter(data: IShapeDrawData): void {
    const { context, radius } = data,
      { container } = data.particle,
      bubbleRadius = radius / bubbleFactor;

    context.beginPath();
    context.arc(bubbleRadius, -bubbleRadius, bubbleRadius, defaultAngle, doublePI, false);
    context.closePath();
    context.fillStyle = getStyleFromOklch(
      bubbleHighlightColor,
      container.hdr,
      1,
      container.peakNits,
      container.hdrMode,
      container.outputColorSpace,
    );
    context.fill();
  }
}
