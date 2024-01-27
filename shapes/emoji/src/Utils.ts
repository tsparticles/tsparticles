import type { EmojiParticle } from "./EmojiParticle.js";
import type { IShapeDrawData } from "@tsparticles/engine";

/**
 *
 * @param data -
 */
export function drawEmoji(data: IShapeDrawData<EmojiParticle>): void {
    const { context, particle, radius, opacity } = data,
        emojiData = particle.emojiData,
        double = 2,
        diameter = radius * double,
        previousAlpha = context.globalAlpha;

    if (!emojiData) {
        return;
    }

    context.globalAlpha = opacity;

    context.drawImage(emojiData, -radius, -radius, diameter, diameter);

    context.globalAlpha = previousAlpha;
}
