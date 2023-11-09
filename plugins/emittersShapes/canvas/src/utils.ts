import type { CanvasPixelData, TextLineData } from "./types.js";
import type { IDimension, IRgba } from "@tsparticles/engine";
import { errorPrefix, isNumber } from "@tsparticles/engine";
import type { TextOptions } from "./Options/Classes/TextOptions.js";

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
 * @param fill -
 * @returns the canvas pixel data
 */
export function getTextData(textOptions: TextOptions, offset: number, fill: boolean): CanvasPixelData | undefined {
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

        if (fill) {
            context.fillStyle = color;
            context.fillText(line.text, 0, currentHeight + line.measure.actualBoundingBoxAscent);
        } else {
            context.strokeStyle = color;
            context.strokeText(line.text, 0, currentHeight + line.measure.actualBoundingBoxAscent);
        }

        currentHeight += line.height + linesOptions.spacing;
    }

    return getCanvasImageData(context, canvas, offset);
}
