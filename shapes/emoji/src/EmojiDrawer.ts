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
import { drawEmoji } from "./Utils.js";

const defaultFont = '"Twemoji Mozilla", Apple Color Emoji, "Segoe UI Emoji", "Noto Color Emoji", "EmojiOne Color"',
    noPadding = 0;

export class EmojiDrawer implements IShapeDrawer<EmojiParticle> {
    readonly validTypes = ["emoji"] as const;

    private readonly _emojiShapeDict: Map<string, ImageBitmap | HTMLCanvasElement> = new Map<string, ImageBitmap>();

    destroy(): void {
        for (const [key, emojiData] of this._emojiShapeDict) {
            if (emojiData instanceof ImageBitmap) {
                emojiData?.close();
            }

            this._emojiShapeDict.delete(key);
        }
    }

    draw(data: IShapeDrawData<EmojiParticle>): void {
        const key = data.particle.emojiDataKey;

        if (!key) {
            return;
        }

        const emojiData = this._emojiShapeDict.get(key);

        if (!emojiData) {
            return;
        }

        drawEmoji(data, emojiData);
    }

    async init(container: Container): Promise<void> {
        const options = container.actualOptions,
            { validTypes } = this;

        if (!validTypes.find(t => isInArray(t, options.particles.shape.type))) {
            return;
        }

        const promises: Promise<void>[] = [loadFont(defaultFont)],
            shapeOptions = validTypes
                .map(t => options.particles.shape.options[t])
                .find(t => !!t) as SingleOrMultiple<IEmojiShape>;

        if (shapeOptions) {
            executeOnSingleOrMultiple(shapeOptions, shape => {
                if (shape.font) {
                    promises.push(loadFont(shape.font));
                }
            });
        }

        await Promise.all(promises);
    }

    particleDestroy(particle: EmojiParticle): void {
        delete particle.emojiDataKey;
    }

    particleInit(_container: Container, particle: EmojiParticle): void {
        const double = 2,
            shapeData = particle.shapeData as unknown as IEmojiShape;

        if (!shapeData?.value) {
            return;
        }

        const emoji = itemFromSingleOrMultiple(shapeData.value, particle.randomIndexData);

        if (!emoji) {
            return;
        }

        const emojiOptions =
                typeof emoji === "string"
                    ? {
                          font: shapeData.font ?? defaultFont,
                          padding: shapeData.padding ?? noPadding,
                          value: emoji,
                      }
                    : {
                          font: defaultFont,
                          padding: noPadding,
                          ...shapeData,
                          ...emoji,
                      },
            font = emojiOptions.font,
            value = emojiOptions.value;

        const key = `${value}_${font}`;

        if (this._emojiShapeDict.has(key)) {
            particle.emojiDataKey = key;

            return;
        }

        const padding = emojiOptions.padding * double,
            maxSize = getRangeMax(particle.size.value),
            fullSize = maxSize + padding,
            canvasSize = fullSize * double;

        let emojiData: ImageBitmap | HTMLCanvasElement;

        if (typeof OffscreenCanvas !== "undefined") {
            const canvas = new OffscreenCanvas(canvasSize, canvasSize),
                context = canvas.getContext("2d");

            if (!context) {
                return;
            }

            context.font = `400 ${maxSize * double}px ${font}`;
            context.textBaseline = "middle";
            context.textAlign = "center";

            context.fillText(value, fullSize, fullSize);

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

            context.fillText(value, fullSize, fullSize);

            emojiData = canvas;
        }

        this._emojiShapeDict.set(key, emojiData);

        particle.emojiDataKey = key;
    }
}
