import type { IValueWithRandom } from "../Options/Interfaces/IValueWithRandom";
import type { ICoordinates } from "../Core/Interfaces/ICoordinates";
import type { IParticle } from "../Core/Interfaces/IParticle";
import { MoveDirection } from "../Enums/Directions";

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

    public static randomInRange(r1: number, r2: number): number {
        const max = Math.max(r1, r2),
            min = Math.min(r1, r2);

        return Math.random() * (max - min) + min;
    }

    public static getValue(options: IValueWithRandom): number {
        const random = options.random;
        const { enable, minimumValue } = typeof random === "boolean" ? { enable: random, minimumValue: 0 } : random;

        return enable ? NumberUtils.randomInRange(minimumValue, options.value) : options.value;
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
}
