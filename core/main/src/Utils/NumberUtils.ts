import type { ICoordinates } from "../Core/Interfaces/ICoordinates";
import { MoveDirection, MoveDirectionAlt } from "../Enums";
import { Velocity } from "../Core/Particle/Velocity";
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

export function randomInRange(r1: number, r2: number): number {
    const max = Math.max(r1, r2),
        min = Math.min(r1, r2);

    return Math.random() * (max - min) + min;
}

export function getValue(value: RangeValue): number {
    return typeof value === "number" ? value : randomInRange(value.min, value.max);
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
): Velocity {
    const baseVelocity = new Velocity(0, 0);

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

export function rotateVelocity(velocity: Velocity, angle: number): Velocity {
    const res = new Velocity(velocity.horizontal, velocity.vertical);

    res.rotate(angle);

    return res;
}

export function collisionVelocity(v1: Velocity, v2: Velocity, m1: number, m2: number): Velocity {
    return new Velocity((v1.horizontal * (m1 - m2)) / (m1 + m2) + (v2.horizontal * 2 * m2) / (m1 + m2), v1.vertical);
}

export function deg2rad(deg: number): number {
    return (deg * Math.PI) / 180;
}

export function rad2deg(rad: number): number {
    return (rad * 180) / Math.PI;
}

export class NumberUtils {
    /**
     * Clamps a number between a minimum and maximum value
     * @param num the source number
     * @param min the minimum value
     * @param max the maximum value
     */
    public static clamp(num: number, min: number, max: number): number {
        return clamp(num, min, max);
    }

    /**
     *
     * @param comp1
     * @param comp2
     * @param weight1
     * @param weight2
     */
    public static mix(comp1: number, comp2: number, weight1: number, weight2: number): number {
        return mix(comp1, comp2, weight1, weight2);
    }

    public static randomInRange(r1: number, r2: number): number {
        return randomInRange(r1, r2);
    }

    public static getValue(value: RangeValue): number {
        return getValue(value);
    }

    /**
     * Gets the distance between two coordinates
     * @param pointA the first coordinate
     * @param pointB the second coordinate
     */
    public static getDistances(
        pointA: ICoordinates,
        pointB: ICoordinates
    ): { dx: number; dy: number; distance: number } {
        return getDistances(pointA, pointB);
    }

    /**
     * Gets the distance between two coordinates
     * @param pointA the first coordinate
     * @param pointB the second coordinate
     */
    public static getDistance(pointA: ICoordinates, pointB: ICoordinates): number {
        return getDistance(pointA, pointB);
    }

    /**
     * Get Particle base velocity
     * @param direction the direction to use for calculating the velocity
     */
    public static getParticleBaseVelocity(
        direction: MoveDirection | keyof typeof MoveDirection | MoveDirectionAlt
    ): Velocity {
        return getParticleBaseVelocity(direction);
    }

    public static rotateVelocity(velocity: Velocity, angle: number): Velocity {
        return rotateVelocity(velocity, angle);
    }

    public static collisionVelocity(v1: Velocity, v2: Velocity, m1: number, m2: number): Velocity {
        return collisionVelocity(v1, v2, m1, m2);
    }
}
