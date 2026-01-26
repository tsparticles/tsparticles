import type { CanvasPixelData, TextLineData } from "./types.js";
import {
  type IDimension,
  type IRgba,
  defaultAlpha,
  defaultRgbMin,
  isNumber,
  originPoint,
  safeDocument,
} from "@tsparticles/engine";
import type { TextOptions } from "./Options/Classes/TextOptions.js";

const defaultWidth = 0;

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
  const imageData = ctx.getImageData(originPoint.x, originPoint.y, size.width, size.height).data;

  if (clear) {
    ctx.clearRect(originPoint.x, originPoint.y, size.width, size.height);
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
      r: imageData[i + indexesOffset.r] ?? defaultRgbMin,
      g: imageData[i + indexesOffset.g] ?? defaultRgbMin,
      b: imageData[i + indexesOffset.b] ?? defaultRgbMin,
      a: (imageData[i + indexesOffset.a] ?? defaultAlpha) / alphaFactor,
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
 * @param canvasSettings -
 * @returns the canvas pixel data
 */
export function getImageData(
  src: string,
  offset: number,
  canvasSettings?: CanvasRenderingContext2DSettings,
): Promise<CanvasPixelData> {
  const image = new Image();

  image.crossOrigin = "Anonymous";

  const p = new Promise<CanvasPixelData>((resolve, reject) => {
    image.onerror = reject;
    image.onload = (): void => {
      const canvas = safeDocument().createElement("canvas");

      canvas.width = image.width;
      canvas.height = image.height;

      const context = canvas.getContext("2d", canvasSettings);

      if (!context) {
        reject(new Error("Could not get canvas context"));
        return;
      }

      context.drawImage(
        image,
        originPoint.x,
        originPoint.y,
        image.width,
        image.height,
        originPoint.x,
        originPoint.y,
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
 * @param canvasSettings -
 * @returns the canvas pixel data
 */
export function getTextData(
  textOptions: TextOptions,
  offset: number,
  fill: boolean,
  canvasSettings?: CanvasRenderingContext2DSettings,
): CanvasPixelData | undefined {
  const canvas = safeDocument().createElement("canvas"),
    context = canvas.getContext("2d", canvasSettings),
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

    maxWidth = Math.max(maxWidth || defaultWidth, lineData.width);
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
      context.fillText(line.text, originPoint.x, currentHeight + line.measure.actualBoundingBoxAscent);
    } else {
      context.strokeStyle = color;
      context.strokeText(line.text, originPoint.x, currentHeight + line.measure.actualBoundingBoxAscent);
    }

    currentHeight += line.height + linesOptions.spacing;
  }

  return getCanvasImageData(context, canvas, offset);
}
