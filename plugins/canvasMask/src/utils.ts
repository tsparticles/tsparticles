import type { Container, IDimension, IParticlesOptions, IRgba, RecursivePartial } from "tsparticles-engine";
import type { ICanvasMaskOverride } from "./Options/Interfaces/ICanvasMaskOverride";

export type CanvasPixelData = {
    height: number;
    pixels: IRgba[][];
    width: number;
};

export function shuffle<T>(array: T[]): T[] {
    for (let currentIndex = array.length - 1; currentIndex >= 0; currentIndex--) {
        const randomIndex = Math.floor(Math.random() * currentIndex);

        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }

    return array;
}

export function addParticlesFromCanvasPixels(
    container: Container,
    data: CanvasPixelData,
    scale: number,
    override: ICanvasMaskOverride,
    filter: (pixel: IRgba) => boolean
): void {
    const height = data.height,
        width = data.width,
        numPixels = height * width,
        indexArray = shuffle(range(numPixels)),
        maxParticles = Math.min(numPixels, container.actualOptions.particles.number.value);

    let selectedPixels = 0;

    while (selectedPixels < maxParticles && indexArray.length) {
        const nextIndex = indexArray.pop() || 0,
            pixelPos = {
                x: nextIndex % width,
                y: Math.floor(nextIndex / width),
            },
            pixel = data.pixels[pixelPos.y][pixelPos.x],
            shouldCreateParticle = filter(pixel),
            canvasSize = container.canvas.size;

        if (shouldCreateParticle) {
            const pos = {
                x: pixelPos.x * scale + canvasSize.width / 2 - (width * scale) / 2,
                y: pixelPos.y * scale + canvasSize.height / 2 - (height * scale) / 2,
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

export function getTextData(text: string, offset: number): CanvasPixelData {
    const canvas = document.createElement("canvas"),
        context = canvas.getContext("2d");

    canvas.width = 1000;
    canvas.height = 1000;

    if (!context) {
        throw new Error("Could not get canvas context");
    }

    context.fillStyle = "#f00";
    context.font = "100px sans-serif";
    context.fillText(text, canvas.width / 2, canvas.height / 2);

    return getCanvasImageData(context, canvas, offset);
}

export const range = (n: number): Array<number> => [...Array(n).keys()];
