import type { EmojiParticle } from "./EmojiParticle.js";
import type { IShapeDrawData } from "@tsparticles/engine";

/**
 *
 * @param data -
 * @param emojiData -
 */
export function drawEmoji(data: IShapeDrawData<EmojiParticle>, emojiData: ImageBitmap | HTMLCanvasElement): void {
    const { context, opacity } = data,
        half = 0.5,
        previousAlpha = context.globalAlpha;

    if (!emojiData) {
        return;
    }

    const diameter = emojiData.width,
        radius = diameter * half;

    context.globalAlpha = opacity;

    context.drawImage(emojiData, -radius, -radius, diameter, diameter);

    context.globalAlpha = previousAlpha;
}
