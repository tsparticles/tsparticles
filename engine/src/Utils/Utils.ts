import type { ICoordinates, ICoordinatesWithMode } from "../Core/Interfaces/ICoordinates.js";
import type { IDimension, IDimensionWithMode } from "../Core/Interfaces/IDimension.js";
import { collisionVelocity, getDistances, getRandom, getRangeValue } from "./MathUtils.js";
import { isArray, isBoolean, isNull, isObject } from "./TypeUtils.js";
import type { Container } from "../Core/Container.js";
import type { GenericInitializer } from "../Types/EngineInitializers.js";
import type { IBounds } from "../Core/Interfaces/IBounds.js";
import type { ICircleBouncer } from "../Core/Interfaces/ICircleBouncer.js";
import { OutModeDirection } from "../Enums/Directions/OutModeDirection.js";
import type { Particle } from "../Core/Particle.js";
import { PixelMode } from "../Enums/Modes/PixelMode.js";
import type { SingleOrMultiple } from "../Types/SingleOrMultiple.js";
import { Vector } from "../Core/Utils/Vectors.js";
import { percentDenominator } from "../Core/Utils/Constants.js";

const minRadius = 0;

/**
 * @returns true if the environment supports matchMedia feature
 */
function hasMatchMedia(): boolean {
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
 * Returns a random object from the given array
 * @param array - the array to get the object from
 * @param index - the index to get the object from
 * @param useIndex - if true, the index will be used instead of a random index
 * @returns the item found
 */
export function itemFromArray<T>(array: T[], index?: number, useIndex = true): T | undefined {
  return array[index !== undefined && useIndex ? index % array.length : Math.floor(getRandom() * array.length)];
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
 * @param obj - The object
 * @param callback - The callback
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
 * @param obj - The object
 * @param index - The index
 * @param useIndex - The useIndex
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
 * @param positionOrSize - The positionOrSize
 * @param canvasSize - The canvasSize
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
 * @param position - The position
 * @param canvasSize - The canvasSize
 * @returns the calculated position
 */
export function getPosition(position: ICoordinatesWithMode, canvasSize: IDimension): ICoordinates {
  return getPositionOrSize(position, canvasSize) as ICoordinates;
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

let _cachedZIndex: number | undefined, _cachedStyle: CSSStyleDeclaration | undefined;

/**
 * Full-screen canvas style builder with inline cache.
 * @param zIndex - The z-index value.
 * @returns Full-screen CSS style declaration.
 */
export function getFullScreenStyle(zIndex: number): CSSStyleDeclaration {
  if (_cachedZIndex !== zIndex || !_cachedStyle) {
    _cachedZIndex = zIndex;

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

    _cachedStyle = fullScreenStyle;
  }

  return _cachedStyle;
}

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
 * @param container - The container to handle
 * @param map - The map
 * @param initializers - The initializers
 * @param force - The force
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
 * @param container - The container to handle
 * @param map - The map
 * @param initializers - The initializers
 * @param force - The force
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
