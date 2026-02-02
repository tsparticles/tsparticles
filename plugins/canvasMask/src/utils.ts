import {
  type Container,
  type ICoordinates,
  type IParticlesOptions,
  type IRgba,
  type RecursivePartial,
  getRandom,
  half,
  percentDenominator,
} from "@tsparticles/engine";
import type { CanvasPixelData } from "@tsparticles/canvas-utils";
import type { ICanvasMaskOverride } from "./Options/Interfaces/ICanvasMaskOverride.js";

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
