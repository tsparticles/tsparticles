import {
  type Container,
  type ICoordinates,
  type IDimension,
  type IParticlesOptions,
  type IRgba,
  type RecursivePartial,
  defaultAlpha,
  defaultRgbMin,
  getRandom,
  half,
  isNumber,
  originPoint,
  percentDenominator,
  safeDocument,
} from "@tsparticles/engine";
import type { ICanvasMaskOverride } from "./Options/Interfaces/ICanvasMaskOverride.js";
import type { TextMask } from "./Options/Classes/TextMask.js";

const defaultWidth = 0;

export interface CanvasPixelData {
  height: number;
  pixels: IRgba[][];
  width: number;
}

interface TextLineData {
  height: number;
  measure: TextMetrics;
  text: string;
  width: number;
}

/**
 * @param container -
 * @param data -
 * @param position -
 * @param scale -
 * @param override -
 * @param filter -
 */
export function addParticlesFromCanvasPixels(
  container: Container,
  data: CanvasPixelData,
  position: ICoordinates,
  scale: number,
  override: ICanvasMaskOverride,
  filter: (pixel: IRgba) => boolean,
): void {
  const { height, width } = data,
    numPixels = height * width,
    indexArray = shuffle(range(numPixels)),
    maxParticles = Math.min(numPixels, container.actualOptions.particles.number.value),
    canvasSize = container.canvas.size;

  let selectedPixels = 0;

  const positionOffset = {
    x: (canvasSize.width * position.x) / percentDenominator - width * scale * half,
    y: (canvasSize.height * position.y) / percentDenominator - height * scale * half,
  };

  while (selectedPixels < maxParticles && indexArray.length) {
    const defaultIndex = 0,
      nextIndex = indexArray.pop() ?? defaultIndex,
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

    const shouldCreateParticle = filter(pixel);

    if (!shouldCreateParticle) {
      continue;
    }

    const pos = {
        x: pixelPos.x * scale + positionOffset.x,
        y: pixelPos.y * scale + positionOffset.y,
      },
      pOptions: RecursivePartial<IParticlesOptions> = {};

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
 * @param canvasSettings -
 * @returns the canvas pixel data
 */
export function getTextData(
  textOptions: TextMask,
  offset: number,
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
    context.fillStyle = color;
    context.fillText(line.text, originPoint.x, currentHeight + line.measure.actualBoundingBoxAscent);

    currentHeight += line.height + linesOptions.spacing;
  }

  return getCanvasImageData(context, canvas, offset);
}

/**
 * @param array -
 * @returns the shuffled array
 */
function shuffle<T>(array: T[]): T[] {
  const lengthOffset = 1,
    minIndex = 0;

  for (let currentIndex = array.length - lengthOffset; currentIndex >= minIndex; currentIndex--) {
    const randomIndex = Math.floor(getRandom() * currentIndex),
      currentItem = array[currentIndex],
      randomItem = array[randomIndex];

    if (randomItem === currentItem) {
      continue;
    }

    if (randomItem === undefined || currentItem === undefined) {
      continue;
    }

    array[currentIndex] = randomItem;
    array[randomIndex] = currentItem;
  }

  return array;
}

const range = (n: number): number[] => [...Array(n).keys()];
