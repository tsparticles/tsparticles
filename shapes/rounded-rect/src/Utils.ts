import type { RadiusInfo } from "./RadiusInfo.js";
import type { RectInfo } from "./RectInfo.js";

/**
 *
 * @param ctx -
 * @param fixedRadius -
 * @param fixedDiameter -
 * @param borderRadius -
 */
export function drawRoundedRect(
  ctx: CanvasRenderingContext2D,
  fixedRadius: number,
  fixedDiameter: number,
  borderRadius: number,
): void {
  const info: RectInfo = {
      x: -fixedRadius,
      y: -fixedRadius,
      height: fixedDiameter,
      width: fixedDiameter,
    },
    radius: RadiusInfo = {
      topLeft: borderRadius,
      topRight: borderRadius,
      bottomLeft: borderRadius,
      bottomRight: borderRadius,
    },
    { x, y, width, height } = info,
    r = x + width,
    b = y + height;

  ctx.moveTo(x + radius.topLeft, y);
  ctx.lineTo(r - radius.topRight, y);
  ctx.quadraticCurveTo(r, y, r, y + radius.topRight);
  ctx.lineTo(r, y + height - radius.bottomRight);
  ctx.quadraticCurveTo(r, b, r - radius.bottomRight, b);
  ctx.lineTo(x + radius.bottomLeft, b);
  ctx.quadraticCurveTo(x, b, x, b - radius.bottomLeft);
  ctx.lineTo(x, y + radius.topLeft);
  ctx.quadraticCurveTo(x, y, x + radius.topLeft, y);
}
