import type { ICoordinates, ICoordinatesWithMode } from "../Core/Interfaces/ICoordinates.js";
import type { IDimension, IDimensionWithMode } from "../Core/Interfaces/IDimension.js";
import {
  clamp,
  collisionVelocity,
  getDistances,
  getRandom,
  getRangeMax,
  getRangeMin,
  getRangeValue,
  randomInRangeValue,
} from "./MathUtils.js";
import { half, millisecondsToSeconds, percentDenominator } from "../Core/Utils/Constants.js";
import { isArray, isBoolean, isNull, isObject } from "./TypeUtils.js";
import { AnimationMode } from "../Enums/Modes/AnimationMode.js";
import { AnimationStatus } from "../Enums/AnimationStatus.js";
import type { Container } from "../Core/Container.js";
import { DestroyType } from "../Enums/Types/DestroyType.js";
import type { GenericInitializer } from "../Types/EngineInitializers.js";
import type { IBounds } from "../Core/Interfaces/IBounds.js";
import type { ICircleBouncer } from "../Core/Interfaces/ICircleBouncer.js";
import type { IDelta } from "../Core/Interfaces/IDelta.js";
import type { IParticleNumericValueAnimation } from "../Core/Interfaces/IParticleValueAnimation.js";
import { OutModeDirection } from "../Enums/Directions/OutModeDirection.js";
import type { Particle } from "../Core/Particle.js";
import { PixelMode } from "../Enums/Modes/PixelMode.js";
import type { RangedAnimationValueWithRandom } from "../Options/Classes/ValueWithRandom.js";
import type { SingleOrMultiple } from "../Types/SingleOrMultiple.js";
import { StartValueType } from "../Enums/Types/StartValueType.js";
import { Vector } from "../Core/Utils/Vectors.js";

const minRadius = 0,
  minMemoizeSize = 0;

/**
 * Memoize function options
 */
export interface MemoizeOptions<TArgs> {
  /** Custom key function for cache lookups */
  keyFn?: (args: TArgs) => string;
  /** Maximum cache size */
  maxSize?: number;
  /** Time-to-live in milliseconds */
  ttlMs?: number;
}

/**
 * Memoize a function's results with optional bounded size and TTL.
 *
 * Backward compatible: callers using `memoize(fn)` keep the same semantics.
 * Options: \{ maxSize?: number, ttlMs?: number, keyFn?: (args) =\> string \}
 * Default keyer uses a stable serialization of the arguments (sorted keys)
 * which makes equal-shaped objects produce the same cache key.
 *
 * See: .planning/research/PITFALLS.md for tradeoffs of keying/eviction strategies.
 * @param fn -
 * @param options -
 * @returns the memoized function
 */
export function memoize<TArgs extends unknown[], Result>(
  fn: (...args: TArgs) => Result,
  options?: MemoizeOptions<TArgs>,
): (...args: TArgs) => Result {
  const cache = new Map<string, { ts: number; value: Result }>(),
    maxSize = options?.maxSize,
    ttlMs = options?.ttlMs,
    keyFn = options?.keyFn,
    stableStringify = (obj: unknown, seen = new WeakSet()): string => {
      if (obj === null) {
        return "null";
      }

      const t = typeof obj;

      if (t === "undefined") {
        return "undefined";
      }

      if (t === "number" || t === "boolean" || t === "string") {
        return JSON.stringify(obj);
      }

      if (t === "function") {
        try {
          const fn = obj as unknown as (...args: unknown[]) => unknown;

          return fn.toString();
        } catch {
          return '"[Function]"';
        }
      }

      if (t === "symbol") {
        try {
          return (obj as symbol).toString();
        } catch {
          // Avoid default object stringification which yields "[object Object]".
          return '"[Symbol]"';
        }
      }

      if (Array.isArray(obj)) {
        return `[${(obj as unknown[]).map(i => stableStringify(i, seen)).join(",")}]`;
      }

      // object
      if (seen.has(obj as object)) {
        return '"[Circular]"';
      }

      seen.add(obj as object);

      const keys = Object.keys(obj as Record<string, unknown>).sort();

      return `{${keys.map(k => `${JSON.stringify(k)}:${stableStringify((obj as Record<string, unknown>)[k], seen)}`).join(",")}}`;
    },
    defaultKeyer = (args: TArgs): string => stableStringify(args),
    makeKey = (args: TArgs): string => (keyFn ? keyFn(args) : defaultKeyer(args)),
    ensureBounds = (): void => {
      if (typeof maxSize === "number" && maxSize >= minMemoizeSize) {
        while (cache.size > maxSize) {
          // evict oldest entry (Map preserves insertion order)
          const firstKey = cache.keys().next().value;

          if (firstKey === undefined) break;

          cache.delete(firstKey);
        }
      }
    };

  return (...args: TArgs): Result => {
    const key = makeKey(args),
      now = Date.now(),
      entry = cache.get(key);

    if (entry !== undefined) {
      if (ttlMs && now - entry.ts > ttlMs) {
        // expired
        cache.delete(key);
      } else {
        // refresh insertion order: delete then set to move to newest
        cache.delete(key);
        cache.set(key, { value: entry.value, ts: entry.ts });

        return entry.value;
      }
    }

    const result = fn(...args);

    cache.set(key, { value: result, ts: now });

    ensureBounds();

    return result;
  };
}

/**
 * @returns true if the environment supports matchMedia feature
 */
export function hasMatchMedia(): boolean {
  return typeof matchMedia !== "undefined";
}

/**
 * @returns the document object
 */
export function safeDocument(): Document {
  return globalThis.document;
}

/**
 * Safely queries a media query string
 * @param query - the media query string
 * @returns the media query list, if supported
 */
export function safeMatchMedia(query: string): MediaQueryList | undefined {
  if (!hasMatchMedia()) {
    return;
  }

  return matchMedia(query);
}

/**
 * Safely creates an IntersectionObserver if supported
 * @param callback - the observer callback
 * @returns the intersection observer, if supported
 */
export function safeIntersectionObserver(
  callback: (records: IntersectionObserverEntry[]) => void,
): IntersectionObserver | undefined {
  if (typeof IntersectionObserver === "undefined") {
    return;
  }

  return new IntersectionObserver(callback);
}

/**
 * Safely creates a MutationObserver if supported
 * @param callback - the observer callback
 * @returns the mutation observer, if supported
 */
export function safeMutationObserver(callback: (records: MutationRecord[]) => void): MutationObserver | undefined {
  if (typeof MutationObserver === "undefined") {
    return;
  }

  return new MutationObserver(callback);
}

/**
 * Checks if a value is equal to the destination, if same type, or is in the provided array
 * @param value - the value to check
 * @param array - the data array or single value
 * @returns true if the value is equal to the destination, if same type, or is in the provided array
 */
export function isInArray<T>(value: T, array: SingleOrMultiple<T>): boolean {
  return value === array || (isArray(array) && array.includes(value));
}

/**
 * Returns a random array index
 * @param array - the array to get the index from
 * @returns a random array index
 */
export function arrayRandomIndex(array: unknown[]): number {
  return Math.floor(getRandom() * array.length);
}

/**
 * Returns a random object from the given array
 * @param array - the array to get the object from
 * @param index - the index to get the object from
 * @param useIndex - if true, the index will be used instead of a random index
 * @returns the item found
 */
export function itemFromArray<T>(array: T[], index?: number, useIndex = true): T | undefined {
  return array[index !== undefined && useIndex ? index % array.length : arrayRandomIndex(array)];
}

/**
 * Checks if the given point is inside the given rectangle
 * @param point - the point to check
 * @param size - the rectangle size
 * @param offset - position offset
 * @param radius - the point radius
 * @param direction - the point direction
 * @returns true if the point is inside the rectangle
 */
export function isPointInside(
  point: ICoordinates,
  size: IDimension,
  offset: ICoordinates,
  radius?: number,
  direction?: OutModeDirection,
): boolean {
  return areBoundsInside(calculateBounds(point, radius ?? minRadius), size, offset, direction);
}

/**
 * Checks if the given shape bounds are inside the given rectangle
 * @param bounds - the shape bounds to check
 * @param size - the rectangle size
 * @param offset - position offset
 * @param direction - the shape direction
 * @returns true if the given bounds are inside the given area, false if not
 */
export function areBoundsInside(
  bounds: IBounds,
  size: IDimension,
  offset: ICoordinates,
  direction?: OutModeDirection,
): boolean {
  let inside = true;

  if (!direction || direction === OutModeDirection.bottom) {
    inside = bounds.top < size.height + offset.x;
  }

  if (inside && (!direction || direction === OutModeDirection.left)) {
    inside = bounds.right > offset.x;
  }

  if (inside && (!direction || direction === OutModeDirection.right)) {
    inside = bounds.left < size.width + offset.y;
  }

  if (inside && (!direction || direction === OutModeDirection.top)) {
    inside = bounds.bottom > offset.y;
  }

  return inside;
}

/**
 * Calculates the bounds of the given point
 * @param point - the point to calculate the bounds from
 * @param radius - the point radius
 * @returns the bounds of the given point
 */
export function calculateBounds(point: ICoordinates, radius: number): IBounds {
  return {
    bottom: point.y + radius,
    left: point.x - radius,
    right: point.x + radius,
    top: point.y - radius,
  };
}

/**
 * Merges the whole source objects into the destination object
 * @param destination - the destination object
 * @param sources - the source objects
 * @returns the merged destination object
 */
export function deepExtend(destination: unknown, ...sources: unknown[]): unknown {
  for (const source of sources) {
    if (isNull(source)) {
      continue;
    }

    if (!isObject(source)) {
      destination = source;

      continue;
    }

    if (Array.isArray(source)) {
      if (!Array.isArray(destination)) {
        destination = [];
      }
    } else if (!isObject(destination) || Array.isArray(destination)) {
      destination = {};
    }

    // Micro-optimization + safety: if the source is a shallow object (no nested objects/arrays),
    // perform a fast shallow copy for common-case merges. Also explicitly ignore dangerous
    // prototype/constructor keys to avoid prototype pollution. See .planning/research/PITFALLS.md
    // for rationale.
    const sourceKeys = Object.keys(source),
      dangerousKeys = new Set(["__proto__", "constructor", "prototype"]),
      // Detect if the source contains nested structures that need full deep merging
      hasNested = sourceKeys.some(k => {
        const v = (source as Record<string, unknown>)[k];

        return isObject(v) || Array.isArray(v);
      });

    if (!hasNested) {
      // shallow fast-path
      const sourceDict = source as Record<string, unknown>,
        destDict = destination as Record<string, unknown>;

      for (const key of sourceKeys) {
        if (dangerousKeys.has(key)) {
          continue;
        }

        // Avoid assigning undefined keys and preserve type-safety
        if (key in sourceDict) {
          const v = sourceDict[key];

          if (v !== undefined) {
            destDict[key] = v;
          }
        }
      }

      continue;
    }

    for (const key of sourceKeys) {
      if (dangerousKeys.has(key)) {
        continue;
      }

      const sourceDict = source as Record<string, unknown>,
        destDict = destination as Record<string, unknown>,
        value = sourceDict[key];

      destDict[key] = Array.isArray(value)
        ? value.map(v => deepExtend(undefined, v))
        : deepExtend(destDict[key], value);
    }
  }

  return destination;
}

/**
 * Returns circle bounce data for the given particle
 * @param p - the particle to get the circle bounds data for
 * @returns the circle bounce data for the given particle
 */
export function circleBounceDataFromParticle(p: Particle): ICircleBouncer {
  return {
    position: p.getPosition(),
    radius: p.getRadius(),
    mass: p.getMass(),
    velocity: p.velocity,
    factor: Vector.create(
      getRangeValue(p.options.bounce.horizontal.value),
      getRangeValue(p.options.bounce.vertical.value),
    ),
  };
}

/**
 * Executes the circle bounce between two particles
 * @param p1 - the first particle
 * @param p2 - the second particle
 */
export function circleBounce(p1: ICircleBouncer, p2: ICircleBouncer): void {
  const { x: xVelocityDiff, y: yVelocityDiff } = p1.velocity.sub(p2.velocity),
    [pos1, pos2] = [p1.position, p2.position],
    { dx: xDist, dy: yDist } = getDistances(pos2, pos1),
    minimumDistance = 0;

  // Prevent accidental overlap of particles
  if (xVelocityDiff * xDist + yVelocityDiff * yDist < minimumDistance) {
    return;
  }

  const angle = -Math.atan2(yDist, xDist),
    m1 = p1.mass,
    m2 = p2.mass,
    u1 = p1.velocity.rotate(angle),
    u2 = p2.velocity.rotate(angle),
    v1 = collisionVelocity(u1, u2, m1, m2),
    v2 = collisionVelocity(u2, u1, m1, m2),
    vFinal1 = v1.rotate(-angle),
    vFinal2 = v2.rotate(-angle);

  p1.velocity.x = vFinal1.x * p1.factor.x;
  p1.velocity.y = vFinal1.y * p1.factor.y;
  p2.velocity.x = vFinal2.x * p2.factor.x;
  p2.velocity.y = vFinal2.y * p2.factor.y;
}

/**
 * @param obj -
 * @param callback -
 * @returns the transformed SingleOrMultiple data
 */
export function executeOnSingleOrMultiple<T, U = void>(
  obj: SingleOrMultiple<T>,
  callback: (obj: T, index: number) => U,
): SingleOrMultiple<U> {
  const defaultIndex = 0;

  return isArray(obj) ? obj.map((item, index) => callback(item, index)) : callback(obj, defaultIndex);
}

/**
 * @param obj -
 * @param index -
 * @param useIndex -
 * @returns the selected item
 */
export function itemFromSingleOrMultiple<T>(
  obj: SingleOrMultiple<T>,
  index?: number,
  useIndex?: boolean,
): T | undefined {
  return isArray(obj) ? itemFromArray(obj, index, useIndex) : obj;
}

/**
 * @param obj -
 * @param callback -
 * @returns the item found, if present
 */
export function findItemFromSingleOrMultiple<T>(
  obj: SingleOrMultiple<T>,
  callback: (obj: T, index: number) => boolean,
): T | undefined {
  if (isArray(obj)) {
    return obj.find((t, index) => callback(t, index));
  }

  const defaultIndex = 0;

  return callback(obj, defaultIndex) ? obj : undefined;
}

/**
 * @param options -
 * @param pxRatio -
 * @returns the animation init object
 */
export function initParticleNumericAnimationValue(
  options: RangedAnimationValueWithRandom,
  pxRatio: number,
): IParticleNumericValueAnimation {
  const valueRange = options.value,
    animationOptions = options.animation,
    res: IParticleNumericValueAnimation = {
      delayTime: getRangeValue(animationOptions.delay) * millisecondsToSeconds,
      enable: animationOptions.enable,
      value: getRangeValue(options.value) * pxRatio,
      max: getRangeMax(valueRange) * pxRatio,
      min: getRangeMin(valueRange) * pxRatio,
      loops: 0,
      maxLoops: getRangeValue(animationOptions.count),
      time: 0,
    },
    decayOffset = 1;

  if (animationOptions.enable) {
    res.decay = decayOffset - getRangeValue(animationOptions.decay);

    switch (animationOptions.mode) {
      case AnimationMode.increase:
        res.status = AnimationStatus.increasing;

        break;
      case AnimationMode.decrease:
        res.status = AnimationStatus.decreasing;

        break;

      case AnimationMode.random:
        res.status = getRandom() >= half ? AnimationStatus.increasing : AnimationStatus.decreasing;

        break;
      default:
        // no-op
        break;
    }

    const autoStatus = animationOptions.mode === AnimationMode.auto;

    switch (animationOptions.startValue) {
      case StartValueType.min:
        res.value = res.min;

        if (autoStatus) {
          res.status = AnimationStatus.increasing;
        }

        break;

      case StartValueType.max:
        res.value = res.max;

        if (autoStatus) {
          res.status = AnimationStatus.decreasing;
        }

        break;

      case StartValueType.random:
      default:
        res.value = randomInRangeValue(res);

        if (autoStatus) {
          res.status = getRandom() >= half ? AnimationStatus.increasing : AnimationStatus.decreasing;
        }

        break;
    }
  }

  res.initialValue = res.value;

  return res;
}

/**
 * @param positionOrSize -
 * @param canvasSize -
 * @returns the calculated position or size
 */
function getPositionOrSize(
  positionOrSize: ICoordinatesWithMode | IDimensionWithMode,
  canvasSize: IDimension,
): ICoordinates | IDimension {
  const isPercent = positionOrSize.mode === PixelMode.percent;

  if (!isPercent) {
    const { mode: _, ...rest } = positionOrSize;

    return rest;
  }

  const isPosition = "x" in positionOrSize;

  if (isPosition) {
    return {
      x: (positionOrSize.x / percentDenominator) * canvasSize.width,
      y: (positionOrSize.y / percentDenominator) * canvasSize.height,
    };
  } else {
    return {
      width: (positionOrSize.width / percentDenominator) * canvasSize.width,
      height: (positionOrSize.height / percentDenominator) * canvasSize.height,
    };
  }
}

/**
 * @param position -
 * @param canvasSize -
 * @returns the calculated position
 */
export function getPosition(position: ICoordinatesWithMode, canvasSize: IDimension): ICoordinates {
  return getPositionOrSize(position, canvasSize) as ICoordinates;
}

/**
 * @param size -
 * @param canvasSize -
 * @returns the calculated size
 */
export function getSize(size: IDimensionWithMode, canvasSize: IDimension): IDimension {
  return getPositionOrSize(size, canvasSize) as IDimension;
}

/**
 * @param particle -
 * @param destroyType -
 * @param value -
 * @param minValue -
 * @param maxValue -
 */
function checkDestroy(
  particle: Particle,
  destroyType: DestroyType | keyof typeof DestroyType,
  value: number,
  minValue: number,
  maxValue: number,
): void {
  switch (destroyType) {
    case DestroyType.max:
      if (value >= maxValue) {
        particle.destroy();
      }

      break;
    case DestroyType.min:
      if (value <= minValue) {
        particle.destroy();
      }

      break;
    default:
      // no-op
      break;
  }
}

/**
 * Updates a numeric particle animation state.
 * @param particle - Particle owning the animated value.
 * @param data - Numeric animation state.
 * @param changeDirection - Whether the animation should ping-pong.
 * @param destroyType - Destroy behavior applied at bounds.
 * @param delta - Frame delta data.
 */
export function updateAnimation(
  particle: Particle,
  data: IParticleNumericValueAnimation,
  changeDirection: boolean,
  destroyType: DestroyType | keyof typeof DestroyType,
  delta: IDelta,
): void {
  const minLoops = 0,
    minDelay = 0,
    identity = 1,
    minVelocity = 0,
    minDecay = 1;

  if (
    particle.destroyed ||
    !data.enable ||
    ((data.maxLoops ?? minLoops) > minLoops && (data.loops ?? minLoops) > (data.maxLoops ?? minLoops))
  ) {
    return;
  }

  const velocity = (data.velocity ?? minVelocity) * delta.factor,
    minValue = data.min,
    maxValue = data.max,
    decay = data.decay ?? minDecay;

  data.time ??= 0;

  if ((data.delayTime ?? minDelay) > minDelay && data.time < (data.delayTime ?? minDelay)) {
    data.time += delta.value;
  }

  if ((data.delayTime ?? minDelay) > minDelay && data.time < (data.delayTime ?? minDelay)) {
    return;
  }

  // Update value based on current status
  switch (data.status) {
    case AnimationStatus.increasing:
      data.value += velocity;
      break;
    case AnimationStatus.decreasing:
      data.value -= velocity;
      break;
    default:
      // no-op
      break;
  }

  // Apply decay to velocity
  if (data.velocity && decay !== identity) {
    data.velocity *= decay;
  }

  // Handle animation state and manage loop count
  switch (data.status) {
    case AnimationStatus.increasing:
      if (data.value >= maxValue) {
        if (changeDirection) {
          data.status = AnimationStatus.decreasing;
        } else {
          data.value -= maxValue;
        }

        data.loops ??= minLoops;
        data.loops++;
      }
      break;
    case AnimationStatus.decreasing:
      if (data.value <= minValue) {
        if (changeDirection) {
          data.status = AnimationStatus.increasing;
        } else {
          data.value += maxValue;
        }

        data.loops ??= minLoops;
        data.loops++;
      }
      break;
    default:
      // no-op
      break;
  }

  // Check if particle should be destroyed based on destroyType (before clamping)
  checkDestroy(particle, destroyType, data.value, minValue, maxValue);

  // Clamp value only if particle is still alive
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (!particle.destroyed) {
    data.value = clamp(data.value, minValue, maxValue);
  }
}

/**
 * a function to clone a style object
 * @param style - the style to clone
 * @returns the cloned style
 */
export function cloneStyle(style: Partial<CSSStyleDeclaration>): CSSStyleDeclaration {
  const clonedStyle: CSSStyleDeclaration = safeDocument().createElement("div").style;

  for (const key in style) {
    const styleKey = style[key];

    if (!(key in style) || isNull(styleKey)) {
      continue;
    }

    const styleValue = style.getPropertyValue?.(styleKey);

    if (!styleValue) {
      continue;
    }

    const stylePriority = style.getPropertyPriority?.(styleKey);

    if (stylePriority) {
      clonedStyle.setProperty(styleKey, styleValue, stylePriority);
    } else {
      clonedStyle.setProperty(styleKey, styleValue);
    }
  }

  return clonedStyle;
}

/**
 * Computes full-screen canvas style for a given z-index.
 * @param zIndex - The z-index value.
 * @returns Full-screen CSS style declaration.
 */
function computeFullScreenStyle(zIndex: number): CSSStyleDeclaration {
  const fullScreenStyle = safeDocument().createElement("div").style,
    radix = 10,
    style: Record<string, string> = {
      width: "100%",
      height: "100%",
      margin: "0",
      padding: "0",
      borderWidth: "0",
      position: "fixed",
      zIndex: zIndex.toString(radix),
      "z-index": zIndex.toString(radix),
      top: "0",
      left: "0",
      "pointer-events": "none",
    };

  for (const key in style) {
    const value = style[key];

    if (value === undefined) {
      continue;
    }

    fullScreenStyle.setProperty(key, value);
  }

  return fullScreenStyle;
}

/**
 * Memoized full-screen style builder.
 */
export const getFullScreenStyle = memoize(computeFullScreenStyle);

/**
 * Manage the given event listeners
 * @param element - the event listener receiver
 * @param event - the event to listen
 * @param handler - the handler called once the event is triggered
 * @param add - flag for adding or removing the event listener
 * @param options - event listener options object
 */
export function manageListener(
  element: HTMLElement | Node | Window | MediaQueryList | typeof globalThis,
  event: string,
  handler: EventListenerOrEventListenerObject,
  add: boolean,
  options?: boolean | AddEventListenerOptions | EventListenerObject,
): void {
  if (add) {
    let addOptions: AddEventListenerOptions = { passive: true };

    if (isBoolean(options)) {
      addOptions.capture = options;
    } else if (options !== undefined) {
      addOptions = options as AddEventListenerOptions;
    }

    element.addEventListener(event, handler, addOptions);
  } else {
    const removeOptions = options as boolean | EventListenerOptions | undefined;

    element.removeEventListener(event, handler, removeOptions);
  }
}

/**
 * @param container -
 * @param map -
 * @param initializers -
 * @param force -
 * @returns the items from the given initializer
 */
export async function getItemsFromInitializer<TItem, TInitializer extends GenericInitializer<TItem>>(
  container: Container,
  map: Map<Container, TItem[]>,
  initializers: Map<string, TInitializer>,
  force = false,
): Promise<TItem[]> {
  let res = map.get(container);

  if (!res || force) {
    res = await Promise.all([...initializers.values()].map(t => t(container)));

    map.set(container, res);
  }

  return res;
}

/**
 * @param container -
 * @param map -
 * @param initializers -
 * @param force -
 * @returns the items from the given initializer
 */
export async function getItemMapFromInitializer<TItem, TInitializer extends GenericInitializer<TItem>>(
  container: Container,
  map: Map<Container, Map<string, TItem>>,
  initializers: Map<string, TInitializer>,
  force = false,
): Promise<Map<string, TItem>> {
  let res = map.get(container);

  if (!res || force) {
    const entries = await Promise.all(
      [...initializers.entries()].map(([key, initializer]) =>
        initializer(container).then(item => [key, item] as const),
      ),
    );

    res = new Map(entries);
    map.set(container, res);
  }

  return res;
}
