import type { IColorTransitionStopState } from "./Types.js";
import type { IHsl } from "@tsparticles/engine";

const minProgress = 0,
  maxProgress = 1,
  firstIndex = 0,
  fullHue = 360,
  halfHue = 180;

/**
 * Linear interpolation between two values
 * @param a - The start value
 * @param b - The end value
 * @param t - The interpolation factor, between 0 and 1
 * @returns The interpolated value
 */
function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

/**
 * Interpolates two hues along the shortest path on the color wheel
 * @param a - The start hue
 * @param b - The end hue
 * @param t - The interpolation factor, between 0 and 1
 * @returns The interpolated hue, normalized to the 0-360 range
 */
function lerpHue(a: number, b: number, t: number): number {
  const delta = ((b - a + halfHue + fullHue) % fullHue) - halfHue;

  return (a + delta * t + fullHue) % fullHue;
}

/**
 * Interpolates the transition color for the given progress
 * @param stops - The transition stops, sorted by offset
 * @param progress - The transition progress, between 0 and 1
 * @returns The interpolated color, or undefined when there are no stops
 */
export function interpolateStops(stops: IColorTransitionStopState[], progress: number): IHsl | undefined {
  const first = stops[firstIndex],
    last = stops[stops.length - 1];

  if (!first || !last) {
    return undefined;
  }

  if (stops.length === 1 || progress <= first.offset) {
    return first.color;
  }

  if (progress >= last.offset) {
    return last.color;
  }

  for (let i = 0; i < stops.length - 1; i++) {
    const a = stops[i],
      b = stops[i + 1];

    if (!a || !b || progress > b.offset) {
      continue;
    }

    const span = b.offset - a.offset,
      t = span > 0 ? (progress - a.offset) / span : 0;

    return {
      h: lerpHue(a.color.h, b.color.h, t),
      l: lerp(a.color.l, b.color.l, t),
      s: lerp(a.color.s, b.color.s, t),
    };
  }

  return last.color;
}

/**
 * Reads the life progress of a particle
 * @param life - The particle life state, when the life updater created one
 * @returns The life progress between 0 and 1, or undefined when the particle has no finite lifetime
 */
export function getLifeProgress(life?: { duration: number; time: number }): number | undefined {
  if (!life || life.duration <= 0) {
    return undefined;
  }

  return Math.min(maxProgress, Math.max(minProgress, life.time / life.duration));
}

/**
 * Combines the life progress with the per-particle offset
 * @param progress - The life progress
 * @param offset - The per-particle progress offset
 * @returns The transition progress, wrapped in the 0-1 range
 */
export function applyProgressOffset(progress: number, offset: number): number {
  return offset === minProgress ? progress : (progress + offset) % maxProgress;
}
