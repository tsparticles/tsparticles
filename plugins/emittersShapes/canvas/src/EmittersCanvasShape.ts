import {
    type ICoordinates,
    type IDimension,
    type IRgba,
    arrayRange,
    errorPrefix,
    isFunction,
    isNumber,
    isString,
    shuffleArray,
} from "@tsparticles/engine";
import { EmitterShapeBase } from "@tsparticles/plugin-emitters";

export type CanvasPixelData = {
    height: number;
    pixels: IRgba[][];
    width: number;
};

type TextLineData = {
    height: number;
    measure: TextMetrics;
    text: string;
    width: number;
};

type TextOptions = {
    color: string;
    font: {
        family: string;
        size: string | number;
        style: string;
        variant: string;
        weight: string;
    };
    lines: { separator: string; spacing: number };
    text: string;
};

/**
 * @param ctx -
 * @param size -
 * @param offset -
 * @param clear -
 * @returns the canvas pixel data
 */
export function getCanvasImageData(
    ctx: CanvasRenderingContext2D,
    size: IDimension,
    offset: number,
    clear = true,
): CanvasPixelData {
    const imageData = ctx.getImageData(0, 0, size.width, size.height).data;

    if (clear) {
        ctx.clearRect(0, 0, size.width, size.height);
    }

    const pixels: IRgba[][] = [];

    for (let i = 0; i < imageData.length; i += offset) {
        const idx = i / offset,
            pos = {
                x: idx % size.width,
                y: Math.floor(idx / size.width),
            };

        if (!pixels[pos.y]) {
            pixels[pos.y] = [];
        }

        pixels[pos.y][pos.x] = {
            r: imageData[i],
            g: imageData[i + 1],
            b: imageData[i + 2],
            a: imageData[i + 3] / 255,
        };
    }

    return {
        pixels,
        width: Math.min(...pixels.map((row) => row.length)),
        height: pixels.length,
    };
}

/**
 * @param src -
 * @param offset -
 * @returns the canvas pixel data
 */
export function getImageData(src: string, offset: number): Promise<CanvasPixelData> {
    const image = new Image();

    image.crossOrigin = "Anonymous";

    const p = new Promise<CanvasPixelData>((resolve, reject) => {
        image.onerror = reject;
        image.onload = (): void => {
            const canvas = document.createElement("canvas");

            canvas.width = image.width;
            canvas.height = image.height;

            const context = canvas.getContext("2d");

            if (!context) {
                return reject(new Error(`${errorPrefix} Could not get canvas context`));
            }

            context.drawImage(image, 0, 0, image.width, image.height, 0, 0, canvas.width, canvas.height);

            resolve(getCanvasImageData(context, canvas, offset));
        };
    });

    image.src = src;

    return p;
}

/**
 * @param textOptions -
 * @param offset -
 * @returns the canvas pixel data
 */
export function getTextData(textOptions: TextOptions, offset: number): CanvasPixelData | undefined {
    const canvas = document.createElement("canvas"),
        context = canvas.getContext("2d"),
        { font, text, lines: linesOptions, color } = textOptions;

    if (!text || !context) {
        return;
    }

    const lines = text.split(linesOptions.separator),
        fontSize = isNumber(font.size) ? `${font.size}px` : font.size,
        linesData: TextLineData[] = [];

    let maxWidth = 0,
        totalHeight = 0;

    for (const line of lines) {
        context.font = `${font.style || ""} ${font.variant || ""} ${font.weight || ""} ${fontSize} ${font.family}`;

        const measure = context.measureText(line),
            lineData = {
                measure,
                text: line,
                height: measure.actualBoundingBoxAscent + measure.actualBoundingBoxDescent,
                width: measure.width,
            };

        maxWidth = Math.max(maxWidth || 0, lineData.width);
        totalHeight += lineData.height + linesOptions.spacing;

        linesData.push(lineData);
    }

    canvas.width = maxWidth;
    canvas.height = totalHeight;

    let currentHeight = 0;

    for (const line of linesData) {
        context.font = `${font.style || ""} ${font.variant || ""} ${font.weight || ""} ${fontSize} ${font.family}`;
        context.fillStyle = color;
        context.fillText(line.text, 0, currentHeight + line.measure.actualBoundingBoxAscent);

        currentHeight += line.height + linesOptions.spacing;
    }

    return getCanvasImageData(context, canvas, offset);
}

export class EmittersCanvasShape extends EmitterShapeBase {
    filter: (pixel: IRgba) => boolean;
    indexArray: number[];
    pixelData: CanvasPixelData;
    scale: number;

    constructor(position: ICoordinates, size: IDimension, fill: boolean, options: Record<string, unknown>) {
        super(position, size, fill, options);

        const selector = <string>options.selector,
            pixels = <{ offset: number }>options.pixels,
            image = <HTMLImageElement>options.image,
            element = <HTMLCanvasElement>options.element,
            text = <TextOptions>options.text,
            offset = pixels.offset,
            filter = <string | ((pixel: IRgba) => boolean)>options.filter;

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
        this.indexArray = [];

        this.scale = <number>options.scale;

        this.pixelData = {
            pixels: [],
            height: 0,
            width: 0,
        };

        (async (): Promise<void> => {
            let pixelData: CanvasPixelData | undefined;

            if (image) {
                const url = image.src;

                if (!url) {
                    return;
                }

                pixelData = await getImageData(url, offset);
            } else if (text) {
                const data = getTextData(text, offset);

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

            const { height, width } = this.pixelData,
                numPixels = height * width;

            this.indexArray = shuffleArray(arrayRange(numPixels));
        })();
    }

    randomPosition(): ICoordinates | null {
        const { height, width } = this.pixelData,
            data = this.pixelData,
            position = this.position,
            scale = this.scale,
            indexArray = this.indexArray;

        const positionOffset = {
            x: position.x - (width * scale) / 2,
            y: position.y - (height * scale) / 2,
        };

        while (indexArray.length) {
            const nextIndex = indexArray.pop() || 0,
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
