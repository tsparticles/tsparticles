import {
    type Container,
    type IShapeDrawData,
    type IShapeDrawer,
    type SingleOrMultiple,
    executeOnSingleOrMultiple,
    getRangeMax,
    isInArray,
    itemFromSingleOrMultiple,
    loadFont,
} from "@tsparticles/engine";
import type { EmojiParticle } from "./EmojiParticle.js";
import type { IEmojiShape } from "./IEmojiShape.js";

export const validTypes = ["emoji"];
const defaultFont = '"Twemoji Mozilla", Apple Color Emoji, "Segoe UI Emoji", "Noto Color Emoji", "EmojiOne Color"';

export class EmojiDrawer implements IShapeDrawer<EmojiParticle> {
    private readonly _emojiShapeDict: Map<string, ImageBitmap> = new Map<string, ImageBitmap>();

    destroy(): void {
        for (const [, emojiData] of this._emojiShapeDict) {
            emojiData?.close();
        }
    }

    draw(data: IShapeDrawData<EmojiParticle>): void {
        const { context, particle, radius, opacity } = data,
            emojiData = particle.emojiData;

        if (!emojiData) {
            return;
        }

        context.globalAlpha = opacity;

        context.drawImage(emojiData, -radius, -radius, radius * 2, radius * 2);

        context.globalAlpha = 1;
    }

    async init(container: Container): Promise<void> {
        const options = container.actualOptions;

        if (validTypes.find((t) => isInArray(t, options.particles.shape.type))) {
            const promises: Promise<void>[] = [loadFont(defaultFont)],
                shapeOptions = validTypes
                    .map((t) => options.particles.shape.options[t])
                    .find((t) => !!t) as SingleOrMultiple<IEmojiShape>;

            if (shapeOptions) {
                executeOnSingleOrMultiple(shapeOptions, (shape) => {
                    shape.font && promises.push(loadFont(shape.font));
                });
            }

            await Promise.all(promises);
        }
    }

    particleDestroy(particle: EmojiParticle): void {
        delete particle.emojiData;
    }

    particleInit(container: Container, particle: EmojiParticle): void {
        if (!particle.emojiData) {
            const shapeData = particle.shapeData as unknown as IEmojiShape;

            if (!shapeData?.value) {
                return;
            }

            const emoji = itemFromSingleOrMultiple(shapeData.value, particle.randomIndexData),
                font = shapeData.font ?? defaultFont;

            if (!emoji) {
                return;
            }

            const key = `${emoji}_${font}`,
                existingData = this._emojiShapeDict.get(key);

            if (existingData) {
                particle.emojiData = existingData;

                return;
            }

            const canvasSize = getRangeMax(particle.size.value) * 2,
                canvas = new OffscreenCanvas(canvasSize, canvasSize);

            const context = canvas.getContext("2d");

            if (!context) {
                return;
            }

            context.font = `400 ${getRangeMax(particle.size.value) * 2}px ${font}`;

            context.textBaseline = "middle";
            context.textAlign = "center";
            context.fillText(emoji, getRangeMax(particle.size.value), getRangeMax(particle.size.value));

            const emojiData = canvas.transferToImageBitmap();

            this._emojiShapeDict.set(key, emojiData);

            particle.emojiData = emojiData;
        }
    }
}
