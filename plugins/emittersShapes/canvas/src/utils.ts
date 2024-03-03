import type { CanvasPixelData, TextLineData } from "./types.js";
import { type ICoordinates, type IDimension, type IRgba, errorPrefix, isNumber } from "@tsparticles/engine";
import type { TextOptions } from "./Options/Classes/TextOptions.js";

const origin: ICoordinates = {
        x: 0,
        y: 0,
    },
    minWidth = 0;

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
    const imageData = ctx.getImageData(origin.x, origin.y, size.width, size.height).data;

    if (clear) {
        ctx.clearRect(origin.x, origin.y, size.width, size.height);
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

        const indexesOffset = {
                r: 0,
                g: 1,
                b: 2,
                a: 3,
            },
            alphaFactor = 255;

        pixels[pos.y][pos.x] = {
            r: imageData[i + indexesOffset.r],
            g: imageData[i + indexesOffset.g],
            b: imageData[i + indexesOffset.b],
            a: imageData[i + indexesOffset.a] / alphaFactor,
        };
    }

    return {
        pixels,
        width: Math.min(...pixels.map(row => row.length)),
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

            context.drawImage(
                image,
                origin.x,
                origin.y,
                image.width,
                image.height,
                origin.x,
                origin.y,
                canvas.width,
                canvas.height,
            );

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

        maxWidth = Math.max(maxWidth || minWidth, lineData.width);
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
            context.fillText(line.text, origin.x, currentHeight + line.measure.actualBoundingBoxAscent);
        } else {
            context.strokeStyle = color;
            context.strokeText(line.text, origin.x, currentHeight + line.measure.actualBoundingBoxAscent);
        }

        currentHeight += line.height + linesOptions.spacing;
    }

    return getCanvasImageData(context, canvas, offset);
}
