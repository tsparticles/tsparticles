import type { IValueWithRandom } from "../Options/Interfaces/IValueWithRandom";
import type { ICoordinates } from "../Core/Interfaces/ICoordinates";
import type { IParticle } from "../Core/Interfaces/IParticle";
import { MoveDirection } from "../Enums/Directions";
import type { IVelocity } from "../Core/Interfaces/IVelocity";
import { RangeValue } from "../Types/RangeValue";

export class NumberUtils {
    /**
     * Clamps a number between a minimum and maximum value
     * @param num the source number
     * @param min the minimum value
     * @param max the maximum value
     */
    public static clamp(num: number, min: number, max: number): number {
        return Math.min(Math.max(num, min), max);
    }

    /**
     *
     * @param comp1
     * @param comp2
     * @param weight1
     * @param weight2
     */
    public static mix(comp1: number, comp2: number, weight1: number, weight2: number): number {
        return Math.floor((comp1 * weight1 + comp2 * weight2) / (weight1 + weight2));
    }

    public static randomInRange(r: RangeValue): number {
        const max = NumberUtils.getRangeMax(r);
        let min = NumberUtils.getRangeMin(r);

        if (max === min) {
            min = 0;
        }

        return Math.random() * (max - min) + min;
    }

    public static getRangeValue(value: RangeValue): number {
        return typeof value === "number" ? value : NumberUtils.randomInRange(value);
    }

    public static getRangeMin(value: RangeValue): number {
        return typeof value === "number" ? value : value.min;
    }

    public static getRangeMax(value: RangeValue): number {
        return typeof value === "number" ? value : value.max;
    }

    public static setRangeValue(source: RangeValue, value?: number): RangeValue {
        if (source === value || (value === undefined && typeof source === "number")) {
            return source;
        }

        const min = NumberUtils.getRangeMin(source),
            max = NumberUtils.getRangeMax(source);

        return value !== undefined
            ? {
                  min: Math.min(min, value),
                  max: Math.max(max, value),
              }
            : NumberUtils.setRangeValue(min, max);
    }

    public static getValue(options: IValueWithRandom): number {
        const random = options.random;
        const { enable, minimumValue } = typeof random === "boolean" ? { enable: random, minimumValue: 0 } : random;

        return enable ? NumberUtils.randomInRange({ min: minimumValue, max: options.value }) : options.value;
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
        const dx = pointA.x - pointB.x;
        const dy = pointA.y - pointB.y;
        return { dx: dx, dy: dy, distance: Math.sqrt(dx * dx + dy * dy) };
    }

    /**
     * Gets the distance between two coordinates
     * @param pointA the first coordinate
     * @param pointB the second coordinate
     */
    public static getDistance(pointA: ICoordinates, pointB: ICoordinates): number {
        return NumberUtils.getDistances(pointA, pointB).distance;
    }

    /**
     * Get Particle base velocity
     * @param particle the particle to use for calculating the velocity
     */
    public static getParticleBaseVelocity(particle: IParticle): ICoordinates {
        let velocityBase: ICoordinates;

        switch (particle.direction) {
            case MoveDirection.top:
                velocityBase = { x: 0, y: -1 };
                break;
            case MoveDirection.topRight:
                velocityBase = { x: 0.5, y: -0.5 };
                break;
            case MoveDirection.right:
                velocityBase = { x: 1, y: -0 };
                break;
            case MoveDirection.bottomRight:
                velocityBase = { x: 0.5, y: 0.5 };
                break;
            case MoveDirection.bottom:
                velocityBase = { x: 0, y: 1 };
                break;
            case MoveDirection.bottomLeft:
                velocityBase = { x: -0.5, y: 1 };
                break;
            case MoveDirection.left:
                velocityBase = { x: -1, y: 0 };
                break;
            case MoveDirection.topLeft:
                velocityBase = { x: -0.5, y: -0.5 };
                break;
            default:
                velocityBase = { x: 0, y: 0 };
                break;
        }

        return velocityBase;
    }

    public static rotateVelocity(velocity: IVelocity, angle: number): IVelocity {
        return {
            horizontal: velocity.horizontal * Math.cos(angle) - velocity.vertical * Math.sin(angle),
            vertical: velocity.horizontal * Math.sin(angle) + velocity.vertical * Math.cos(angle),
        };
    }

    public static collisionVelocity(v1: IVelocity, v2: IVelocity, m1: number, m2: number): IVelocity {
        return {
            horizontal: (v1.horizontal * (m1 - m2)) / (m1 + m2) + (v2.horizontal * 2 * m2) / (m1 + m2),
            vertical: v1.vertical,
        };
    }
}
