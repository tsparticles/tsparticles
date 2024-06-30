import type { EasingType, EasingTypeAlt } from "../Enums/Types/EasingType.js";
import type {
    IPositionFromSizeParams,
    IRangedPositionFromSizeParams,
} from "../Core/Interfaces/IPositionFromSizeParams.js";
import { MoveDirection, type MoveDirectionAlt } from "../Enums/Directions/MoveDirection.js";
import type { ICoordinates } from "../Core/Interfaces/ICoordinates.js";
import type { RangeValue } from "../Types/RangeValue.js";
import { Vector } from "../Core/Utils/Vectors.js";
import { isNumber } from "./TypeUtils.js";
import { percentDenominator } from "../Core/Utils/Constants.js";

interface AnimationLoop {
    cancel: (handle: number) => void;
    nextFrame: (callback: FrameRequestCallback) => number;
}

type EasingFunction = (value: number) => number;

let _random = Math.random;
const _animationLoop: AnimationLoop = {
    nextFrame: (cb: FrameRequestCallback): number => requestAnimationFrame(cb),
    cancel: (idx: number): void => cancelAnimationFrame(idx),
};

const easings = new Map<EasingType | EasingTypeAlt, EasingFunction>(),
    double = 2,
    doublePI = Math.PI * double;

/**
 * @param name -
 * @param easing -
 */
export function addEasing(name: EasingType | EasingTypeAlt, easing: EasingFunction): void {
    if (easings.get(name)) {
        return;
    }

    easings.set(name, easing);
}

/**
 * @param name -
 * @returns the easing function
 */
export function getEasing(name: EasingType | EasingTypeAlt): EasingFunction {
    return easings.get(name) ?? ((value: number): number => value);
}

/**
 * Replaces the library random function with a custom one.
 * @param rnd - A random function that returns a number between 0 and 1.
 */
export function setRandom(rnd: () => number = Math.random): void {
    _random = rnd;
}

/**
 * Returns a random number between 0 and 1 using the library random function.
 * @returns a random number between 0 and 1
 */
export function getRandom(): number {
    const min = 0,
        max = 1;

    return clamp(_random(), min, max - Number.EPSILON);
}

/**
 * Replaces the library animation functions with custom ones.
 * @param nextFrame - A function that will be called with a callback to be executed in the next frame.
 * @param cancel - A function that will be called with the handle of the frame to be canceled.
 */
export function setAnimationFunctions(
    nextFrame: (callback: FrameRequestCallback) => number,
    cancel: (handle: number) => void,
): void {
    _animationLoop.nextFrame = (callback: FrameRequestCallback): number => nextFrame(callback);
    _animationLoop.cancel = (handle: number): void => cancel(handle);
}

/**
 * Calls the next frame with the given callback.
 * @param fn - The callback to be executed in the next frame.
 * @returns the handle of the frame.
 */
export function animate(fn: FrameRequestCallback): number {
    return _animationLoop.nextFrame(fn);
}

/**
 * Cancels the frame with the given handle.
 * @param handle - The handle of the frame to be canceled.
 */
export function cancelAnimation(handle: number): void {
    _animationLoop.cancel(handle);
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
 * @param comp1 -
 * @param comp2 -
 * @param weight1 -
 * @param weight2 -
 * @returns the mixed value
 */
export function mix(comp1: number, comp2: number, weight1: number, weight2: number): number {
    return Math.floor((comp1 * weight1 + comp2 * weight2) / (weight1 + weight2));
}

/**
 * @param r -
 * @returns the random value in the given range
 */
export function randomInRange(r: RangeValue): number {
    const max = getRangeMax(r),
        minOffset = 0;
    let min = getRangeMin(r);

    if (max === min) {
        min = minOffset;
    }

    return getRandom() * (max - min) + min;
}

/**
 * @param value -
 * @returns gets a value in the given range, if the range is a number, the source is returned, if the range is an object, a random value is returned
 */
export function getRangeValue(value: RangeValue): number {
    return isNumber(value) ? value : randomInRange(value);
}

/**
 * @param value -
 * @returns the minimum value of the range
 */
export function getRangeMin(value: RangeValue): number {
    return isNumber(value) ? value : value.min;
}

/**
 * @param value -
 * @returns the maximum value of the range
 */
export function getRangeMax(value: RangeValue): number {
    return isNumber(value) ? value : value.max;
}

/**
 * @param source -
 * @param value -
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
 * Gets the distance between two coordinates
 * @param pointA - the first coordinate
 * @param pointB - the second coordinate
 * @returns the all the distance values between the two coordinates
 */
export function getDistances(pointA: ICoordinates, pointB: ICoordinates): { distance: number; dx: number; dy: number } {
    const dx = pointA.x - pointB.x,
        dy = pointA.y - pointB.y,
        squareExp = 2;

    return { dx: dx, dy: dy, distance: Math.sqrt(dx ** squareExp + dy ** squareExp) };
}

/**
 * Gets the distance between two coordinates
 * @param pointA - the first coordinate
 * @param pointB - the second coordinate
 * @returns the distance between the two coordinates
 */
export function getDistance(pointA: ICoordinates, pointB: ICoordinates): number {
    return getDistances(pointA, pointB).distance;
}

/**
 * Converts the given degrees to radians
 * @param degrees - the degrees value to convert
 * @returns the radians value of the given degrees
 */
export function degToRad(degrees: number): number {
    const PIDeg = 180;

    return (degrees * Math.PI) / PIDeg;
}

/**
 * @param direction -
 * @param position -
 * @param center -
 * @returns the angle of the direction
 */
export function getParticleDirectionAngle(
    direction: MoveDirection | keyof typeof MoveDirection | MoveDirectionAlt | number,
    position: ICoordinates,
    center: ICoordinates,
): number {
    if (isNumber(direction)) {
        return degToRad(direction);
    }

    const empty = 0,
        half = 0.5,
        quarter = 0.25,
        threeQuarter = half + quarter;

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
            return getRandom() * doublePI;
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
 * @param v1 -
 * @param v2 -
 * @param m1 -
 * @param m2 -
 * @returns the velocity after collision
 */
export function collisionVelocity(v1: Vector, v2: Vector, m1: number, m2: number): Vector {
    const double = 2;

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
export function calcPositionOrRandomFromSize(data: IPositionFromSizeParams): ICoordinates {
    return {
        x: ((data.position?.x ?? getRandom() * percentDenominator) * data.size.width) / percentDenominator,
        y: ((data.position?.y ?? getRandom() * percentDenominator) * data.size.height) / percentDenominator,
    };
}

/**
 * Gets exact position from percent position, or a random one if not specified, based on the given size
 * @param data - the data to use for calculating the position
 * @returns the exact position
 */
export function calcPositionOrRandomFromSizeRanged(data: IRangedPositionFromSizeParams): ICoordinates {
    const position = {
        x: data.position?.x !== undefined ? getRangeValue(data.position.x) : undefined,
        y: data.position?.y !== undefined ? getRangeValue(data.position.y) : undefined,
    };

    return calcPositionOrRandomFromSize({ size: data.size, position });
}

/**
 * Gets exact position from exact position, or a random one if not specified, based on the given size
 * @param data - the data to use for calculating the position
 * @returns the exact position
 */
export function calcExactPositionOrRandomFromSize(data: IPositionFromSizeParams): ICoordinates {
    return {
        x: data.position?.x ?? getRandom() * data.size.width,
        y: data.position?.y ?? getRandom() * data.size.height,
    };
}

/**
 * Gets exact position from exact position, or a random one if not specified, based on the given size
 * @param data - the data to use for calculating the position
 * @returns the exact position
 */
export function calcExactPositionOrRandomFromSizeRanged(data: IRangedPositionFromSizeParams): ICoordinates {
    const position = {
        x: data.position?.x !== undefined ? getRangeValue(data.position.x) : undefined,
        y: data.position?.y !== undefined ? getRangeValue(data.position.y) : undefined,
    };

    return calcExactPositionOrRandomFromSize({ size: data.size, position });
}

/**
 * @param input -
 * @returns the parsed color
 */
export function parseAlpha(input?: string): number {
    const defaultAlpha = 1;

    if (!input) {
        return defaultAlpha;
    }

    return input.endsWith("%") ? parseFloat(input) / percentDenominator : parseFloat(input);
}
