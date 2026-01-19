import { EmitterShapeBase, type IRandomPositionData } from "@tsparticles/plugin-emitters";
import {
    type ICoordinates,
    type IDimension,
    type IRgba,
    getRandom,
    half,
    isFunction,
    isNull,
    isString,
    safeDocument,
} from "@tsparticles/engine";
import { getCanvasImageData, getImageData, getTextData } from "./utils.js";
import type { CanvasPixelData } from "./types.js";
import type { EmittersCanvasShapeOptions } from "./Options/Classes/EmittersCanvasShapeOptions.js";

const maxRetries = 100;

export class EmittersCanvasShape extends EmitterShapeBase<EmittersCanvasShapeOptions> {
    filter: (pixel: IRgba) => boolean;
    pixelData: CanvasPixelData;
    scale: number;

    constructor(position: ICoordinates, size: IDimension, fill: boolean, options: EmittersCanvasShapeOptions) {
        super(position, size, fill, options);

        const filter = options.filter,
            minAlpha = 0;

        let filterFunc: (pixel: IRgba) => boolean = (pixel): boolean => pixel.a > minAlpha;

        if (isString(filter)) {
            if (Object.hasOwn(globalThis, filter)) {
                const wndFilter = (globalThis as unknown as Record<string, (pixel: IRgba) => boolean>)[filter];

                if (isFunction(wndFilter)) {
                    filterFunc = wndFilter;
                }
            }
        } else {
            filterFunc = filter;
        }

        this.filter = filterFunc;

        this.scale = options.scale;

        this.pixelData = {
            pixels: [],
            height: 0,
            width: 0,
        };
    }

    async init(): Promise<void> {
        let pixelData: CanvasPixelData | undefined;

        const options = this.options,
            selector = options.selector,
            pixels = options.pixels,
            image = options.image,
            element = options.element,
            text = options.text,
            offset = pixels.offset;

        if (image) {
            const url = image.src;

            if (!url) {
                return;
            }

            pixelData = await getImageData(url, offset);
        } else if (element ?? selector) {
            const canvas = element ?? (selector && safeDocument().querySelector<HTMLCanvasElement>(selector));

            if (!canvas) {
                return;
            }

            const context = canvas.getContext("2d");

            if (!context) {
                return;
            }

            pixelData = getCanvasImageData(context, canvas, offset);
        } else {
            const data = getTextData(text, offset, this.fill);

            if (isNull(data)) {
                return;
            }

            pixelData = data;
        }

        this.pixelData = pixelData;
    }

    randomPosition(): IRandomPositionData | null {
        const { height, width } = this.pixelData,
            data = this.pixelData,
            position = this.position,
            scale = this.scale,
            positionOffset = {
                x: position.x - width * scale * half,
                y: position.y - height * scale * half,
            };

        for (let i = 0; i < maxRetries; i++) {
            const nextIndex = Math.floor(getRandom() * width * height),
                pixelPos = {
                    x: nextIndex % width,
                    y: Math.floor(nextIndex / width),
                },
                row = data.pixels[pixelPos.y];

            if (!row) {
                continue;
            }

            const pixel = row[pixelPos.x];

            if (!pixel) {
                continue;
            }

            const shouldCreateParticle = this.filter(pixel);

            if (!shouldCreateParticle) {
                continue;
            }

            return {
                position: {
                    x: pixelPos.x * scale + positionOffset.x,
                    y: pixelPos.y * scale + positionOffset.y,
                },
                color: { ...pixel },
                opacity: pixel.a,
            };
        }

        return null;
    }

    override resize(position: ICoordinates, size: IDimension): void {
        super.resize(position, size);
    }
}
