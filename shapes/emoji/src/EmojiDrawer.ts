import type { Container, IShapeDrawData, IShapeDrawer, SingleOrMultiple } from "@tsparticles/engine";
import type { EmojiParticle } from "./EmojiParticle.js";
import type { IEmojiShape } from "./IEmojiShape.js";

export const validTypes = ["emoji"];
const defaultFont = '"Twemoji Mozilla", Apple Color Emoji, "Segoe UI Emoji", "Noto Color Emoji", "EmojiOne Color"';

export class EmojiDrawer implements IShapeDrawer<EmojiParticle> {
    private readonly _emojiShapeDict: Map<string, ImageBitmap | HTMLCanvasElement> = new Map<string, ImageBitmap>();

    destroy(): void {
        for (const [key, emojiData] of this._emojiShapeDict) {
            if (emojiData instanceof ImageBitmap) {
                emojiData?.close();

                this._emojiShapeDict.delete(key);
            }
        }
    }

    draw(data: IShapeDrawData<EmojiParticle>): void {
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

    async init(container: Container): Promise<void> {
        const options = container.actualOptions,
            { isInArray } = await import("@tsparticles/engine");

        if (validTypes.find((t) => isInArray(t, options.particles.shape.type))) {
            const { loadFont } = await import("@tsparticles/engine"),
                promises: Promise<void>[] = [loadFont(defaultFont)],
                shapeOptions = validTypes
                    .map((t) => options.particles.shape.options[t])
                    .find((t) => !!t) as SingleOrMultiple<IEmojiShape>;

            if (shapeOptions) {
                const { executeOnSingleOrMultiple } = await import("@tsparticles/engine");

                executeOnSingleOrMultiple(shapeOptions, (shape) => {
                    if (shape.font) {
                        promises.push(loadFont(shape.font));
                    }
                });
            }

            await Promise.all(promises);
        }
    }

    particleDestroy(particle: EmojiParticle): void {
        delete particle.emojiData;
    }

    async particleInit(container: Container, particle: EmojiParticle): Promise<void> {
        const double = 2,
            shapeData = particle.shapeData as unknown as IEmojiShape;

        if (!shapeData?.value) {
            return;
        }

        const { itemFromSingleOrMultiple } = await import("@tsparticles/engine"),
            emoji = itemFromSingleOrMultiple(shapeData.value, particle.randomIndexData),
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

        const { getRangeMax } = await import("@tsparticles/engine"),
            canvasSize = getRangeMax(particle.size.value) * double;

        let emojiData: ImageBitmap | HTMLCanvasElement;

        const maxSize = getRangeMax(particle.size.value);

        if (typeof OffscreenCanvas !== "undefined") {
            const canvas = new OffscreenCanvas(canvasSize, canvasSize),
                context = canvas.getContext("2d");

            if (!context) {
                return;
            }

            context.font = `400 ${maxSize * double}px ${font}`;
            context.textBaseline = "middle";
            context.textAlign = "center";

            context.fillText(emoji, maxSize, maxSize);

            emojiData = canvas.transferToImageBitmap();
        } else {
            const canvas = document.createElement("canvas");

            canvas.width = canvasSize;
            canvas.height = canvasSize;

            const context = canvas.getContext("2d");

            if (!context) {
                return;
            }

            context.font = `400 ${maxSize * double}px ${font}`;
            context.textBaseline = "middle";
            context.textAlign = "center";

            context.fillText(emoji, maxSize, maxSize);

            emojiData = canvas;
        }

        this._emojiShapeDict.set(key, emojiData);

        particle.emojiData = emojiData;
    }
}
