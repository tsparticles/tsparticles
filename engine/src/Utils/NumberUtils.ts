import type { EasingType, EasingTypeAlt } from "../Enums/Types/EasingType";
import type {
    IPositionFromSizeParams,
    IRangedPositionFromSizeParams,
} from "../Core/Interfaces/IPositionFromSizeParams";
import type { ICoordinates } from "../Core/Interfaces/ICoordinates";
import type { IValueWithRandom } from "../Options/Interfaces/IValueWithRandom";
import { MoveDirection } from "../Enums/Directions/MoveDirection";
import type { MoveDirectionAlt } from "../Enums/Directions/MoveDirection";
import type { RangeValue } from "../Types/RangeValue";
import { Vector } from "../Core/Utils/Vector";

type EasingFunction = (value: number) => number;

let _random = Math.random;

const easings = new Map<EasingType | EasingTypeAlt, EasingFunction>();

/**
 *
 * @param name -
 * @param easing -
 */
export function addEasing(name: EasingType | EasingTypeAlt, easing: EasingFunction): void {
    if (!easings.get(name)) {
        easings.set(name, easing);
    }
}

/**
 *
 * @param name -
 * @returns the easing function
 */
export function getEasing(name: EasingType | EasingTypeAlt): EasingFunction {
    return easings.get(name) || ((value: number): number => value);
}

/**
 * Replaces the library random function with a custom one.
 *
 * @param rnd - A random function that returns a number between 0 and 1.
 */
export function setRandom(rnd: () => number = Math.random): void {
    _random = rnd;
}

/**
 * Returns a random number between 0 and 1 using the library random function.
 *
 * @returns a random number between 0 and 1
 */
export function getRandom(): number {
    return clamp(_random(), 0, 1 - 1e-16);
}

/**
 * Clamps a number between a minimum and maximum value
 *
 * @param num - the source number
 * @param min - the minimum value
 * @param max - the maximum value
 * @returns the clamped number
 */
export function clamp(num: number, min: number, max: number): number {
    return Math.min(Math.max(num, min), max);
}

/**
 *
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
 *
 * @param r -
 * @returns the random value in the given range
 */
export function randomInRange(r: RangeValue): number {
    const max = getRangeMax(r);
    let min = getRangeMin(r);

    if (max === min) {
        min = 0;
    }

    return getRandom() * (max - min) + min;
}

/**
 *
 * @param value -
 * @returns gets a value in the given range, if the range is a number, the source is returned, if the range is an object, a random value is returned
 */
export function getRangeValue(value: RangeValue): number {
    return typeof value === "number" ? value : randomInRange(value);
}

/**
 *
 * @param value -
 * @returns the minimum value of the range
 */
export function getRangeMin(value: RangeValue): number {
    return typeof value === "number" ? value : value.min;
}

/**
 *
 * @param value -
 * @returns the maximum value of the range
 */
export function getRangeMax(value: RangeValue): number {
    return typeof value === "number" ? value : value.max;
}

/**
 *
 * @param source -
 * @param value -
 * @returns the range value with the new value
 */
export function setRangeValue(source: RangeValue, value?: number): RangeValue {
    if (source === value || (value === undefined && typeof source === "number")) {
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
 *
 * @param options -
 * @returns the same as {@link getRangeValue}, since it calls that function, converting the parameters to a range value
 */
export function getValue(options: IValueWithRandom): number {
    const random = options.random,
        { enable, minimumValue } =
            typeof random === "boolean"
                ? {
                      enable: random,
                      minimumValue: 0,
                  }
                : random;

    return enable ? getRangeValue(setRangeValue(options.value, minimumValue)) : getRangeValue(options.value);
}

/**
 * Gets the distance between two coordinates
 *
 * @param pointA - the first coordinate
 * @param pointB - the second coordinate
 * @returns the all the distance values between the two coordinates
 */
export function getDistances(pointA: ICoordinates, pointB: ICoordinates): { distance: number; dx: number; dy: number } {
    const dx = pointA.x - pointB.x,
        dy = pointA.y - pointB.y;

    return { dx: dx, dy: dy, distance: Math.sqrt(dx ** 2 + dy ** 2) };
}

/**
 * Gets the distance between two coordinates
 *
 * @param pointA - the first coordinate
 * @param pointB - the second coordinate
 * @returns the distance between the two coordinates
 */
export function getDistance(pointA: ICoordinates, pointB: ICoordinates): number {
    return getDistances(pointA, pointB).distance;
}

/**
 *
 * @param direction -
 * @param position -
 * @param center -
 * @returns the angle of the direction
 */
export function getParticleDirectionAngle(
    direction: MoveDirection | keyof typeof MoveDirection | MoveDirectionAlt | number,
    position: ICoordinates,
    center: ICoordinates
): number {
    if (typeof direction === "number") {
        return (direction * Math.PI) / 180;
    } else {
        switch (direction) {
            case MoveDirection.top:
                return -Math.PI / 2;
            case MoveDirection.topRight:
                return -Math.PI / 4;
            case MoveDirection.right:
                return 0;
            case MoveDirection.bottomRight:
                return Math.PI / 4;
            case MoveDirection.bottom:
                return Math.PI / 2;
            case MoveDirection.bottomLeft:
                return (3 * Math.PI) / 4;
            case MoveDirection.left:
                return Math.PI;
            case MoveDirection.topLeft:
                return (-3 * Math.PI) / 4;
            case MoveDirection.inside:
                return Math.atan2(center.y - position.y, center.x - position.x);
            case MoveDirection.outside:
                return Math.atan2(position.y - center.y, position.x - center.x);
            default:
                return getRandom() * Math.PI * 2;
        }
    }
}

/**
 * Get Particle base velocity
 *
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
 *
 * @param v1 -
 * @param v2 -
 * @param m1 -
 * @param m2 -
 * @returns the velocity after collision
 */
export function collisionVelocity(v1: Vector, v2: Vector, m1: number, m2: number): Vector {
    return Vector.create((v1.x * (m1 - m2)) / (m1 + m2) + (v2.x * 2 * m2) / (m1 + m2), v1.y);
}

/**
 * Gets exact position from percent position based on the given size
 *
 * @param data - the data to use for calculating the position
 * @returns the exact position
 */
export function calcPositionFromSize(data: IPositionFromSizeParams): ICoordinates | undefined {
    return data.position && data.position.x !== undefined && data.position.y !== undefined
        ? {
              x: (data.position.x * data.size.width) / 100,
              y: (data.position.y * data.size.height) / 100,
          }
        : undefined;
}

/**
 * Gets exact position from percent position, or a random one if not specified, based on the given size
 *
 * @param data - the data to use for calculating the position
 * @returns the exact position
 */
export function calcPositionOrRandomFromSize(data: IPositionFromSizeParams): ICoordinates {
    return {
        x: ((data.position?.x ?? getRandom() * 100) * data.size.width) / 100,
        y: ((data.position?.y ?? getRandom() * 100) * data.size.height) / 100,
    };
}

/**
 * Gets exact position from percent position, or a random one if not specified, based on the given size
 *
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
 *
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
 *
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
 *
 * @param input -
 * @returns the parsed color
 */
export function parseAlpha(input?: string): number {
    return input ? (input.endsWith("%") ? parseFloat(input) / 100 : parseFloat(input)) : 1;
}
