import type { CanvasPixelData, TextLineData } from "./types.js";
import { type ICoordinates, type IDimension, type IRgba, isNumber, safeDocument } from "@tsparticles/engine";
import type { TextOptions } from "./Options/Classes/TextOptions.js";

const origin: ICoordinates = {
    x: 0,
    y: 0,
  },
  minWidth = 0,
  defaultRgbValue = 0,
  defaultAlphaValue = 1;

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

    pixels[pos.y] ??= [];

    const indexesOffset = {
        r: 0,
        g: 1,
        b: 2,
        a: 3,
      },
      alphaFactor = 255,
      row = pixels[pos.y];

    if (!row) {
      continue;
    }

    row[pos.x] = {
      r: imageData[i + indexesOffset.r] ?? defaultRgbValue,
      g: imageData[i + indexesOffset.g] ?? defaultRgbValue,
      b: imageData[i + indexesOffset.b] ?? defaultRgbValue,
      a: (imageData[i + indexesOffset.a] ?? defaultAlphaValue) / alphaFactor,
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
      const canvas = safeDocument().createElement("canvas");

      canvas.width = image.width;
      canvas.height = image.height;

      const context = canvas.getContext("2d");

      if (!context) {
        reject(new Error("Could not get canvas context"));
        return;
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
  const canvas = safeDocument().createElement("canvas"),
    context = canvas.getContext("2d"),
    { font, text, lines: linesOptions, color } = textOptions;

  if (!text || !context) {
    return;
  }

  const lines = text.split(linesOptions.separator),
    fontSize = isNumber(font.size) ? `${font.size.toString()}px` : font.size,
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
