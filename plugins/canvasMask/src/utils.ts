import {
  type Container,
  type ICoordinates,
  type IParticlesOptions,
  type IRgba,
  type RecursivePartial,
  getRandom,
  half,
  minIndex,
  percentDenominator,
} from "@tsparticles/engine";
import type { CanvasPixelData } from "@tsparticles/canvas-utils";
import type { ICanvasMaskOverride } from "./Options/Interfaces/ICanvasMaskOverride.js";

/**
 * @param container - The container to handle
 * @param data - The data to handle
 * @param position - The position
 * @param scale - The scale
 * @param override - The override
 * @param filter - The filter
 */
export function addParticlesFromCanvasPixels(
  container: Container,
  data: CanvasPixelData,
  position: ICoordinates,
  scale: number,
  override: ICanvasMaskOverride,
  filter: (pixel: IRgba, colorSpace?: "display-p3" | "srgb") => boolean,
): void {
  const { height, width } = data,
    numPixels = height * width,
    indexArray = shuffle(range(numPixels), container.engine.getRandomFn()),
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

    const colorSpace = data.colorSpace ?? "srgb",
      shouldCreateParticle = filter(pixel, colorSpace);

    if (!shouldCreateParticle) {
      continue;
    }

    const pos = {
        x: pixelPos.x * scale + positionOffset.x,
        y: pixelPos.y * scale + positionOffset.y,
      },
      pOptions: RecursivePartial<IParticlesOptions> = {};

    if (override.color) {
      pOptions.paint = {
        fill: {
          color: {
            value: { ...pixel, a: override.opacity ? 1 : pixel.a, colorSpace },
          },
          enable: true,
        },
      };
    }

    if (override.opacity) {
      pOptions["opacity"] = {
        value: pixel.a,
      };
    }

    container.particles.addParticle(pos, pOptions);

    selectedPixels++;
  }
}

/**
 * @param array - The array
 * @returns the shuffled array
 */
function shuffle<T>(array: T[], random: () => number): T[] {
  for (let currentIndex = array.length - 1; currentIndex > minIndex; currentIndex--) {
    const randomIndex = Math.floor(getRandom(random) * (currentIndex + 1)),
      currentItem = array[currentIndex],
      randomItem = array[randomIndex];

    if (randomItem === undefined || currentItem === undefined) {
      continue;
    }

    array[currentIndex] = randomItem;
    array[randomIndex] = currentItem;
  }

  return array;
}

const range = (n: number): number[] => [...Array(n).keys()];
