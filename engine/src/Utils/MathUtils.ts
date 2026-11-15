import type {
  IPositionFromSizeParams,
  IRangedPositionFromSizeParams,
} from "../Core/Interfaces/IPositionFromSizeParams.js";
import { MoveDirection, type MoveDirectionAlt } from "../Enums/Directions/MoveDirection.js";
import {
  defaultAlpha,
  double,
  doublePI,
  empty,
  half,
  percentDenominator,
  quarter,
  threeQuarter,
} from "../Core/Utils/Constants.js";
import type { ICoordinates } from "../Core/Interfaces/ICoordinates.js";
import type { RangeValue } from "../Types/RangeValue.js";
import { Vector } from "../Core/Utils/Vectors.js";
import { isNumber } from "./TypeUtils.js";

const piDeg = 180,
  degToRadFactor = Math.PI / piDeg;

/**
 * Returns a random number between 0 and 1 using the supplied random function.
 * @returns a random number between 0 and 1
 * @param random - A random function returning a finite value; non-finite results map to 0.
 */
export function getRandom(random: () => number = Math.random): number {
  const min = 0,
    max = 1,
    value = random();

  return Number.isFinite(value) ? clamp(value, min, max - Number.EPSILON) : min;
}

/**
 * Returns a random number between the given range using the library random function.
 * @param min - The minimum value of the range.
 * @param max - The maximum value of the range.
 * @returns a random number between the given range
 */
export function getRandomInRange(min: number, max: number, random?: () => number): number {
  return getRandom(random) * (max - min) + min;
}

/**
 * Clamps a number between a minimum and maximum value
 * @param num - the source number
 * @param min - the minimum value
 * @param max - the maximum value
 * @returns the clamped number
 */
export function clamp(num: number, min: number, max: number): number {
  return Math.min(Math.max(num, min), max);
}

/**
 * @param comp1 - The comp1
 * @param comp2 - The comp2
 * @param weight1 - The weight1
 * @param weight2 - The weight2
 * @returns the mixed value
 */
export function mix(comp1: number, comp2: number, weight1: number, weight2: number): number {
  return Math.floor((comp1 * weight1 + comp2 * weight2) / (weight1 + weight2));
}

/**
 * @param r - The red component
 * @returns the random value in the given range
 */
export function randomInRangeValue(r: RangeValue, random?: () => number): number {
  const max = getRangeMax(r),
    minOffset = 0;

  let min = getRangeMin(r);

  if (max === min) {
    min = minOffset;
  }

  return getRandomInRange(min, max, random);
}

/**
 * @param value - The value
 * @returns gets a value in the given range, if the range is a number, the source is returned, if the range is an object, a random value is returned
 */
export function getRangeValue(value: RangeValue, random?: () => number): number {
  return isNumber(value) ? value : randomInRangeValue(value, random);
}

/**
 * @param value - The value
 * @returns the minimum value of the range
 */
export function getRangeMin(value: RangeValue): number {
  return isNumber(value) ? value : value.min;
}

/**
 * @param value - The value
 * @returns the maximum value of the range
 */
export function getRangeMax(value: RangeValue): number {
  return isNumber(value) ? value : value.max;
}

/**
 * @param source - The source
 * @param value - The value
 * @returns the range value with the new value
 */
export function setRangeValue(source: RangeValue, value?: number): RangeValue {
  if (source === value || (value === undefined && isNumber(source))) {
    return source;
  }

  const min = getRangeMin(source),
    max = getRangeMax(source);

  return value !== undefined
    ? {
        min: Math.min(min, value),
        max: Math.max(max, value),
      }
    : setRangeValue(min, max);
}

/**
 * Calculates the length of a two-dimensional vector with canvas-scale components.
 * @param x - The horizontal component
 * @param y - The vertical component
 * @returns the vector length
 */
export function hypot(x: number, y: number): number {
  return Math.sqrt(x * x + y * y);
}

/**
 * Gets the signed deltas and Euclidean distance between two coordinates.
 * Use {@link getDistanceSq} for squared distance comparisons.
 * @param pointA - the first coordinate
 * @param pointB - the second coordinate
 * @returns the signed deltas and distance between the two coordinates
 */
export function getDistances(pointA: ICoordinates, pointB: ICoordinates): { distance: number; dx: number; dy: number } {
  const dx = pointA.x - pointB.x,
    dy = pointA.y - pointB.y;

  return { dx, dy, distance: Math.hypot(dx, dy) };
}

/**
 * Gets the distance squared between two coordinates
 * @param pointA - the first coordinate
 * @param pointB - the second coordinate
 * @returns the distance squared between the two coordinates
 */
export function getDistanceSq(pointA: ICoordinates, pointB: ICoordinates): number {
  const dx = pointA.x - pointB.x,
    dy = pointA.y - pointB.y;

  return dx * dx + dy * dy;
}

/**
 * Gets the distance between two coordinates
 * @param pointA - the first coordinate
 * @param pointB - the second coordinate
 * @returns the distance between the two coordinates
 */
export function getDistance(pointA: ICoordinates, pointB: ICoordinates): number {
  return Math.sqrt(getDistanceSq(pointA, pointB));
}

/**
 * Checks if the distance between two coordinates is less than the given distance
 * @param pointA - the first coordinate
 * @param pointB - the second coordinate
 * @param distance - the distance to check
 * @returns true if the distance between the two coordinates is less than the given distance, false otherwise
 */
export function checkDistance(pointA: ICoordinates, pointB: ICoordinates, distance: number): boolean {
  return getDistanceSq(pointA, pointB) <= distance * distance;
}
/**
 * Converts the given degrees to radians
 * @param degrees - the degrees value to convert
 * @returns the radians value of the given degrees
 */
export function degToRad(degrees: number): number {
  return degrees * degToRadFactor;
}

/**
 * @param direction - The direction
 * @param position - The position
 * @param center - The center point
 * @returns the angle of the direction
 */
export function getParticleDirectionAngle(
  direction: MoveDirection | keyof typeof MoveDirection | MoveDirectionAlt | number,
  position: ICoordinates,
  center: ICoordinates,
  random?: () => number,
): number {
  if (isNumber(direction)) {
    return degToRad(direction);
  }

  switch (direction) {
    case MoveDirection.top:
      return -Math.PI * half;
    case MoveDirection.topRight:
      return -Math.PI * quarter;
    case MoveDirection.right:
      return empty;
    case MoveDirection.bottomRight:
      return Math.PI * quarter;
    case MoveDirection.bottom:
      return Math.PI * half;
    case MoveDirection.bottomLeft:
      return Math.PI * threeQuarter;
    case MoveDirection.left:
      return Math.PI;
    case MoveDirection.topLeft:
      return -Math.PI * threeQuarter;
    case MoveDirection.inside:
      return Math.atan2(center.y - position.y, center.x - position.x);
    case MoveDirection.outside:
      return Math.atan2(position.y - center.y, position.x - center.x);
    default:
      return getRandom(random) * doublePI;
  }
}

/**
 * Get Particle base velocity
 * @param direction - the direction to use for calculating the velocity
 * @returns the base velocity
 */
export function getParticleBaseVelocity(direction: number): Vector {
  const baseVelocity = Vector.origin;

  baseVelocity.length = 1;
  baseVelocity.angle = direction;

  return baseVelocity;
}

/**
 * @param v1 - The v1
 * @param v2 - The v2
 * @param m1 - The m1
 * @param m2 - The m2
 * @returns the velocity after collision
 */
export function collisionVelocity(v1: Vector, v2: Vector, m1: number, m2: number): Vector {
  return Vector.create((v1.x * (m1 - m2)) / (m1 + m2) + (v2.x * double * m2) / (m1 + m2), v1.y);
}

/**
 * Gets exact position from percent position based on the given size
 * @param data - the data to use for calculating the position
 * @returns the exact position
 */
export function calcPositionFromSize(data: IPositionFromSizeParams): ICoordinates | undefined {
  return data.position?.x !== undefined && data.position.y !== undefined
    ? {
        x: (data.position.x * data.size.width) / percentDenominator,
        y: (data.position.y * data.size.height) / percentDenominator,
      }
    : undefined;
}

/**
 * Gets exact position from percent position, or a random one if not specified, based on the given size
 * @param data - the data to use for calculating the position
 * @returns the exact position
 */
export function calcPositionOrRandomFromSize(data: IPositionFromSizeParams, random?: () => number): ICoordinates {
  return {
    x: ((data.position?.x ?? getRandom(random) * percentDenominator) * data.size.width) / percentDenominator,
    y: ((data.position?.y ?? getRandom(random) * percentDenominator) * data.size.height) / percentDenominator,
  };
}

/**
 * Gets exact position from percent position, or a random one if not specified, based on the given size
 * @param data - the data to use for calculating the position
 * @returns the exact position
 */
export function calcPositionOrRandomFromSizeRanged(
  data: IRangedPositionFromSizeParams,
  random?: () => number,
): ICoordinates {
  const position = {
    x: data.position?.x !== undefined ? getRangeValue(data.position.x, random) : undefined,
    y: data.position?.y !== undefined ? getRangeValue(data.position.y, random) : undefined,
  };

  return calcPositionOrRandomFromSize({ size: data.size, position }, random);
}

/**
 * Gets exact position from exact position, or a random one if not specified, based on the given size
 * @param data - the data to use for calculating the position
 * @returns the exact position
 */
export function calcExactPositionOrRandomFromSize(data: IPositionFromSizeParams, random?: () => number): ICoordinates {
  const { position, size } = data;

  return {
    x: position?.x ?? getRandom(random) * size.width,
    y: position?.y ?? getRandom(random) * size.height,
  };
}

/**
 * @param input - The input value
 * @returns the parsed color
 */
export function parseAlpha(input?: string): number {
  if (!input) {
    return defaultAlpha;
  }

  return input.endsWith("%") ? Number.parseFloat(input) / percentDenominator : Number.parseFloat(input);
}
