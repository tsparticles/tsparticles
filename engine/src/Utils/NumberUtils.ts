import type {
    IPositionFromSizeParams,
    IRangedPositionFromSizeParams,
} from "../Core/Interfaces/IPositionFromSizeParams";
import { EasingType } from "../Enums/Types/EasingType";
import type { EasingTypeAlt } from "../Enums/Types/EasingType";
import type { ICoordinates } from "../Core/Interfaces/ICoordinates";
import type { IValueWithRandom } from "../Options/Interfaces/IValueWithRandom";
import { MoveDirection } from "../Enums/Directions/MoveDirection";
import type { MoveDirectionAlt } from "../Enums/Directions/MoveDirection";
import type { RangeValue } from "../Types/RangeValue";
import { Vector } from "../Core/Utils/Vector";

let _random = Math.random;

/**
 * Replaces the library random function with a custom one.
 * @param rnd A random function that returns a number between 0 and 1.
 */
export function setRandom(rnd: () => number = Math.random): void {
    _random = rnd;
}

/**
 * Returns a random number between 0 and 1 using the library random function.
 */
export function getRandom(): number {
    return clamp(_random(), 0, 1 - 1e-16);
}

/**
 * Clamps a number between a minimum and maximum value
 * @param num the source number
 * @param min the minimum value
 * @param max the maximum value
 */
export function clamp(num: number, min: number, max: number): number {
    return Math.min(Math.max(num, min), max);
}

/**
 *
 * @param comp1
 * @param comp2
 * @param weight1
 * @param weight2
 */
export function mix(comp1: number, comp2: number, weight1: number, weight2: number): number {
    return Math.floor((comp1 * weight1 + comp2 * weight2) / (weight1 + weight2));
}

export function randomInRange(r: RangeValue): number {
    const max = getRangeMax(r);
    let min = getRangeMin(r);

    if (max === min) {
        min = 0;
    }

    return getRandom() * (max - min) + min;
}

export function getRangeValue(value: RangeValue): number {
    return typeof value === "number" ? value : randomInRange(value);
}

export function getRangeMin(value: RangeValue): number {
    return typeof value === "number" ? value : value.min;
}

export function getRangeMax(value: RangeValue): number {
    return typeof value === "number" ? value : value.max;
}

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
 * @param pointA the first coordinate
 * @param pointB the second coordinate
 */
export function getDistances(pointA: ICoordinates, pointB: ICoordinates): { distance: number; dx: number; dy: number } {
    const dx = pointA.x - pointB.x,
        dy = pointA.y - pointB.y;

    return { dx: dx, dy: dy, distance: Math.sqrt(dx * dx + dy * dy) };
}

/**
 * Gets the distance between two coordinates
 * @param pointA the first coordinate
 * @param pointB the second coordinate
 */
export function getDistance(pointA: ICoordinates, pointB: ICoordinates): number {
    return getDistances(pointA, pointB).distance;
}

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
            case MoveDirection.none:
            default:
                return getRandom() * Math.PI * 2;
        }
    }
}

/**
 * Get Particle base velocity
 * @param direction the direction to use for calculating the velocity
 */
export function getParticleBaseVelocity(direction: number): Vector {
    const baseVelocity = Vector.origin;

    baseVelocity.length = 1;
    baseVelocity.angle = direction;

    return baseVelocity;
}

export function collisionVelocity(v1: Vector, v2: Vector, m1: number, m2: number): Vector {
    return Vector.create((v1.x * (m1 - m2)) / (m1 + m2) + (v2.x * 2 * m2) / (m1 + m2), v1.y);
}

export function calcEasing(value: number, type: EasingType | EasingTypeAlt): number {
    switch (type) {
        case EasingType.easeInQuad:
            return value ** 2;
        case EasingType.easeOutQuad:
            return 1 - (1 - value) ** 2;
        case EasingType.easeInOutQuad:
            return value < 0.5 ? 2 * value ** 2 : 1 - (-2 * value + 2) ** 2 / 2;
        case EasingType.easeInCubic:
            return value ** 3;
        case EasingType.easeOutCubic:
            return 1 - (1 - value) ** 3;
        case EasingType.easeInOutCubic:
            return value < 0.5 ? 4 * value ** 3 : 1 - (-2 * value + 2) ** 3 / 2;
        case EasingType.easeInQuart:
            return value ** 4;
        case EasingType.easeOutQuart:
            return 1 - (1 - value) ** 4;
        case EasingType.easeInOutQuart:
            return value < 0.5 ? 8 * value ** 4 : 1 - (-2 * value + 2) ** 4 / 2;
        case EasingType.easeInQuint:
            return value ** 5;
        case EasingType.easeOutQuint:
            return 1 - (1 - value) ** 5;
        case EasingType.easeInOutQuint:
            return value < 0.5 ? 16 * value ** 5 : 1 - (-2 * value + 2) ** 5 / 2;
        case EasingType.easeInExpo:
            return !value ? 0 : 2 ** (10 * value - 10);
        case EasingType.easeOutExpo:
            return value === 1 ? 1 : 1 - Math.pow(2, -10 * value);
        case EasingType.easeInOutExpo:
            return !value
                ? 0
                : value === 1
                ? 1
                : value < 0.5
                ? 2 ** (20 * value - 10) / 2
                : (2 - 2 ** (-20 * value + 10)) / 2;
        case EasingType.easeInSine:
            return 1 - Math.cos((value * Math.PI) / 2);
        case EasingType.easeOutSine:
            return Math.sin((value * Math.PI) / 2);
        case EasingType.easeInOutSine:
            return -(Math.cos(Math.PI * value) - 1) / 2;
        case EasingType.easeInBack: {
            const c1 = 1.70158,
                c3 = c1 + 1;

            return c3 * value ** 3 - c1 * value ** 2;
        }
        case EasingType.easeOutBack: {
            const c1 = 1.70158,
                c3 = c1 + 1;

            return 1 + c3 * Math.pow(value - 1, 3) + c1 * Math.pow(value - 1, 2);
        }
        case EasingType.easeInOutBack: {
            const c1 = 1.70158,
                c2 = c1 * 1.525;

            return value < 0.5
                ? ((2 * value) ** 2 * ((c2 + 1) * 2 * value - c2)) / 2
                : ((2 * value - 2) ** 2 * ((c2 + 1) * (value * 2 - 2) + c2) + 2) / 2;
        }
        case EasingType.easeInCirc:
            return 1 - Math.sqrt(1 - value ** 2);
        case EasingType.easeOutCirc:
            return Math.sqrt(1 - (value - 1) ** 2);
        case EasingType.easeInOutCirc:
            return value < 0.5
                ? (1 - Math.sqrt(1 - (2 * value) ** 2)) / 2
                : (Math.sqrt(1 - (-2 * value + 2) ** 2) + 1) / 2;
        default:
            return value;
    }
}

/**
 * Gets exact position from percent position based on the given size
 * @param data the data to use for calculating the position
 * @returns the exact position
 */
export function calcPositionFromSize(data: IPositionFromSizeParams): ICoordinates | undefined {
    return data.position?.x !== undefined && data.position?.y !== undefined
        ? {
              x: (data.position.x * data.size.width) / 100,
              y: (data.position.y * data.size.height) / 100,
          }
        : undefined;
}

/**
 * Gets exact position from percent position, or a random one if not specified, based on the given size
 * @param data the data to use for calculating the position
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
 * @param data the data to use for calculating the position
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
 * @param data the data to use for calculating the position
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
 * @param data the data to use for calculating the position
 * @returns the exact position
 */
export function calcExactPositionOrRandomFromSizeRanged(data: IRangedPositionFromSizeParams): ICoordinates {
    const position = {
        x: data.position?.x !== undefined ? getRangeValue(data.position.x) : undefined,
        y: data.position?.y !== undefined ? getRangeValue(data.position.y) : undefined,
    };

    return calcExactPositionOrRandomFromSize({ size: data.size, position });
}

export function parseAlpha(input: string): number {
    return input.endsWith("%") ? parseFloat(input) / 100 : parseFloat(input);
}
