import { type IShapeDrawData, half } from "@tsparticles/engine";
import type { EmojiParticle } from "./EmojiParticle.js";

/**
 *
 * @param data -
 * @param image -
 */
export function drawEmoji(data: IShapeDrawData<EmojiParticle>, image: ImageBitmap | HTMLCanvasElement): void {
  const { context, opacity } = data,
    previousAlpha = context.globalAlpha,
    diameter = image.width,
    radius = diameter * half;

  context.globalAlpha = opacity;

  context.drawImage(image, -radius, -radius, diameter, diameter);

  context.globalAlpha = previousAlpha;
}
