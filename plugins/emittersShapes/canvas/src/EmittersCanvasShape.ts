import { type ICoordinates, type IDimension, type IRgba, getRandom, isFunction, isString } from "@tsparticles/engine";
import { getCanvasImageData, getImageData, getTextData } from "./utils.js";
import type { CanvasPixelData } from "./types";
import { EmitterShapeBase } from "@tsparticles/plugin-emitters";
import type { EmittersCanvasShapeOptions } from "./Options/Classes/EmittersCanvasShapeOptions.js";

export class EmittersCanvasShape extends EmitterShapeBase<EmittersCanvasShapeOptions> {
    filter: (pixel: IRgba) => boolean;
    pixelData: CanvasPixelData;
    scale: number;

    constructor(position: ICoordinates, size: IDimension, fill: boolean, options: EmittersCanvasShapeOptions) {
        super(position, size, fill, options);

        const filter = options.filter;

        let filterFunc: (pixel: IRgba) => boolean = (pixel): boolean => pixel.a > 0;

        if (filter !== undefined) {
            if (isString(filter)) {
                if (Object.hasOwn(window, filter)) {
                    const wndFilter = (window as unknown as { [key: string]: (pixel: IRgba) => boolean })[filter];

                    if (isFunction(wndFilter)) {
                        filterFunc = wndFilter;
                    }
                }
            } else {
                filterFunc = filter;
            }
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
        } else if (text) {
            const data = getTextData(text, offset, this.fill);

            if (!data) {
                return;
            }

            pixelData = data;
        } else if (element || selector) {
            const canvas = element || (selector && document.querySelector<HTMLCanvasElement>(selector));

            if (!canvas) {
                return;
            }

            const context = canvas.getContext("2d");

            if (!context) {
                return;
            }

            pixelData = getCanvasImageData(context, canvas, offset);
        }

        if (!pixelData) {
            return;
        }

        this.pixelData = pixelData;
    }

    async randomPosition(): Promise<ICoordinates | null> {
        const { height, width } = this.pixelData,
            data = this.pixelData,
            position = this.position,
            scale = this.scale;

        const positionOffset = {
            x: position.x - (width * scale) / 2,
            y: position.y - (height * scale) / 2,
        };

        for (let i = 0; i < 100; i++) {
            const nextIndex = Math.floor(getRandom() * width * height),
                pixelPos = {
                    x: nextIndex % width,
                    y: Math.floor(nextIndex / width),
                },
                pixel = data.pixels[pixelPos.y][pixelPos.x],
                shouldCreateParticle = this.filter(pixel);

            if (!shouldCreateParticle) {
                continue;
            }

            return {
                x: pixelPos.x * scale + positionOffset.x,
                y: pixelPos.y * scale + positionOffset.y,
            };
        }

        return null;
    }

    resize(position: ICoordinates, size: IDimension): void {
        super.resize(position, size);
    }
}
