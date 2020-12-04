import type { IValueWithRandom } from "../Options/Interfaces/IValueWithRandom";
import type { ICoordinates } from "../Core/Interfaces/ICoordinates";
import { MoveDirection, MoveDirectionAlt } from "../Enums/Directions";
import type { IVelocity } from "../Core/Interfaces/IVelocity";
import { Velocity } from "../Core/Particle/Velocity";

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

export function getValue(options: IValueWithRandom): number {
    const random = options.random;
    const { enable, minimumValue } = typeof random === "boolean" ? { enable: random, minimumValue: 0 } : random;

    return enable ? randomInRange(minimumValue, options.value) : options.value;
}

/**
 * Gets the distance between two coordinates
 * @param pointA the first coordinate
 * @param pointB the second coordinate
 */
export function getDistances(pointA: ICoordinates, pointB: ICoordinates): { dx: number; dy: number; distance: number } {
    const dx = pointA.x - pointB.x;
    const dy = pointA.y - pointB.y;
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

/**
 * Get Particle base velocity
 * @param direction the direction to use for calculating the velocity
 */
export function getParticleBaseVelocity(direction: MoveDirection | keyof typeof MoveDirection | MoveDirectionAlt): Velocity {
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
            baseVelocity.length = 0;
            break;
    }

    return baseVelocity;
}

export function rotateVelocity(velocity: IVelocity, angle: number): IVelocity {
    return {
        horizontal: velocity.horizontal * Math.cos(angle) - velocity.vertical * Math.sin(angle),
        vertical: velocity.horizontal * Math.sin(angle) + velocity.vertical * Math.cos(angle),
    };
}

export function collisionVelocity(v1: IVelocity, v2: IVelocity, m1: number, m2: number): IVelocity {
    return {
        horizontal: (v1.horizontal * (m1 - m2)) / (m1 + m2) + (v2.horizontal * 2 * m2) / (m1 + m2),
        vertical: v1.vertical,
    };
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

    public static getValue(options: IValueWithRandom): number {
        return getValue(options);
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
    public static getParticleBaseVelocity(direction: MoveDirection | keyof typeof MoveDirection | MoveDirectionAlt): Velocity {
        return getParticleBaseVelocity(direction);
    }

    public static rotateVelocity(velocity: IVelocity, angle: number): IVelocity {
        return rotateVelocity(velocity, angle);
    }

    public static collisionVelocity(v1: IVelocity, v2: IVelocity, m1: number, m2: number): IVelocity {
        return collisionVelocity(v1, v2, m1, m2);
    }
}
