import type {
    Container,
    ICoordinates,
    IDimension,
    IParticlesOptions,
    IRgba,
    RecursivePartial,
} from "tsparticles-engine";
import type { ICanvasMaskOverride } from "./Options/Interfaces/ICanvasMaskOverride";
import type { TextMask } from "./Options/Classes/TextMask";
import { getRandom } from "tsparticles-engine";

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

export function shuffle<T>(array: T[]): T[] {
    for (let currentIndex = array.length - 1; currentIndex >= 0; currentIndex--) {
        const randomIndex = Math.floor(getRandom() * currentIndex);

        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }

    return array;
}

export function addParticlesFromCanvasPixels(
    container: Container,
    data: CanvasPixelData,
    position: ICoordinates,
    scale: number,
    override: ICanvasMaskOverride,
    filter: (pixel: IRgba) => boolean
): void {
    const { height, width } = data,
        numPixels = height * width,
        indexArray = shuffle(range(numPixels)),
        maxParticles = Math.min(numPixels, container.actualOptions.particles.number.value),
        canvasSize = container.canvas.size;

    let selectedPixels = 0;

    const positionOffset = {
        x: (canvasSize.width * position.x) / 100 - (width * scale) / 2,
        y: (canvasSize.height * position.y) / 100 - (height * scale) / 2,
    };

    while (selectedPixels < maxParticles && indexArray.length) {
        const nextIndex = indexArray.pop() || 0,
            pixelPos = {
                x: nextIndex % width,
                y: Math.floor(nextIndex / width),
            },
            pixel = data.pixels[pixelPos.y][pixelPos.x],
            shouldCreateParticle = filter(pixel);

        if (shouldCreateParticle) {
            const pos = {
                x: pixelPos.x * scale + positionOffset.x,
                y: pixelPos.y * scale + positionOffset.y,
            };

            const pOptions: RecursivePartial<IParticlesOptions> = {};

            if (override.color) {
                pOptions.color = {
                    value: pixel,
                };
            }

            if (override.opacity) {
                pOptions.opacity = {
                    value: pixel.a,
                };
            }

            container.particles.addParticle(pos, pOptions);

            selectedPixels++;
        }
    }
}

export function getCanvasImageData(
    ctx: CanvasRenderingContext2D,
    size: IDimension,
    offset: number,
    clear = true
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
                return reject(new Error("Could not get canvas context"));
            }

            context.drawImage(image, 0, 0, image.width, image.height, 0, 0, canvas.width, canvas.height);

            resolve(getCanvasImageData(context, canvas, offset));
        };
    });

    image.src = src;

    return p;
}

export function getTextData(textOptions: TextMask, offset: number): CanvasPixelData | undefined {
    const canvas = document.createElement("canvas"),
        context = canvas.getContext("2d"),
        { font, text, lines: linesOptions, color } = textOptions;

    if (!text || !context) {
        return;
    }

    const lines = text.split(linesOptions.separator),
        fontSize = typeof font.size === "number" ? `${font.size}px` : font.size,
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

export const range = (n: number): Array<number> => [...Array(n).keys()];
