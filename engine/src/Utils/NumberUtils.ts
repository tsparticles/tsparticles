import type { ICoordinates } from "../Core/Interfaces";
import { EasingType, MoveDirection, MoveDirectionAlt } from "../Enums";
import { Vector } from "../Core/Particle/Vector";
import { RangeValue } from "../Types";

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

    return Math.random() * (max - min) + min;
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
            max: Math.max(max, value)
        }
        : setRangeValue(min, max);
}

/**
 * Gets the distance between two coordinates
 * @param p1 the first coordinate
 * @param p2 the second coordinate
 */
export function getDistances(p1: ICoordinates, p2: ICoordinates): { dx: number; dy: number; distance: number } {
    const dx = p1.x - p2.x;
    const dy = p1.y - p2.y;
    return { dx: dx, dy: dy, distance: Math.sqrt(dx ** 2 + dy ** 2) };
}

/**
 * Gets the distance between two coordinates
 * @param pointA the first coordinate
 * @param pointB the second coordinate
 */
export function getDistance(pointA: ICoordinates, pointB: ICoordinates): number {
    return getDistances(pointA, pointB).distance;
}

/**
 * Get Particle base velocity
 * @param direction the direction to use for calculating the velocity
 */
export function getParticleBaseVelocity(
    direction: MoveDirection | keyof typeof MoveDirection | MoveDirectionAlt
): Vector {
    const baseVelocity = Vector.origin;

    baseVelocity.length = 1;

    switch (direction) {
        case MoveDirection.top:
            baseVelocity.angle = -Math.PI / 2;
            break;
        case MoveDirection.topRight:
            baseVelocity.angle = -Math.PI / 4;
            break;
        case MoveDirection.right:
            baseVelocity.angle = 0;
            break;
        case MoveDirection.bottomRight:
            baseVelocity.angle = Math.PI / 4;
            break;
        case MoveDirection.bottom:
            baseVelocity.angle = Math.PI / 2;
            break;
        case MoveDirection.bottomLeft:
            baseVelocity.angle = (3 * Math.PI) / 4;
            break;
        case MoveDirection.left:
            baseVelocity.angle = Math.PI;
            break;
        case MoveDirection.topLeft:
            baseVelocity.angle = (-3 * Math.PI) / 4;
            break;
        case MoveDirection.none:
        default:
            baseVelocity.angle = Math.random() * Math.PI * 2;
            break;
    }

    return baseVelocity;
}

export function collisionVelocity(v1: Vector, v2: Vector, m1: number, m2: number): Vector {
    return Vector.create((v1.x * (m1 - m2)) / (m1 + m2) + (v2.x * 2 * m2) / (m1 + m2), v1.y);
}

export function deg2rad(deg: number): number {
    return (deg * Math.PI) / 180;
}

export function rad2deg(rad: number): number {
    return (rad * 180) / Math.PI;
}

export function calcEasing(value: number, type: EasingType): number {
    switch (type) {
        case EasingType.easeOutQuad:
            return 1 - (1 - value) ** 2;
        case EasingType.easeOutCubic:
            return 1 - (1 - value) ** 3;
        case EasingType.easeOutQuart:
            return 1 - (1 - value) ** 4;
        case EasingType.easeOutQuint:
            return 1 - (1 - value) ** 5;
        case EasingType.easeOutExpo:
            return value === 1 ? 1 : 1 - Math.pow(2, -10 * value);
        case EasingType.easeOutSine:
            return Math.sin((value * Math.PI) / 2);
        case EasingType.easeOutBack: {
            const c1 = 1.70158;
            const c3 = c1 + 1;

            return 1 + c3 * Math.pow(value - 1, 3) + c1 * Math.pow(value - 1, 2);
        }
        case EasingType.easeOutCirc:
            return Math.sqrt(1 - Math.pow(value - 1, 2));
        default:
            return value;
    }
}
