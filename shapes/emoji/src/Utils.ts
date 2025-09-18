import type { EmojiParticle } from "./EmojiParticle.js";
import type { IShapeDrawData } from "@tsparticles/engine";

/**
 *
 * @param data -
 * @param image -
 */
export function drawEmoji(data: IShapeDrawData<EmojiParticle>, image: ImageBitmap | HTMLCanvasElement): void {
    const { context, opacity } = data,
        half = 0.5,
        previousAlpha = context.globalAlpha,
        diameter = image.width,
        radius = diameter * half;

    context.globalAlpha = opacity;

    context.drawImage(image, -radius, -radius, diameter, diameter);

    context.globalAlpha = previousAlpha;
}
