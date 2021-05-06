import type { IValueWithRandom } from "../Options/Interfaces/IValueWithRandom";
import type { ICoordinates } from "../Core/Interfaces/ICoordinates";
import { EasingType, MoveDirection, MoveDirectionAlt } from "../Enums";
import type { IVelocity } from "../Core/Interfaces/IVelocity";
import { RangeValue } from "../Types";
import { Vector } from "../Core/Particle/Vector";

export class NumberUtils {
    /**
     * Clamps a number between a minimum and maximum value
     * @param num the source number
     * @param min the minimum value
     * @param max the maximum value
     */
    static clamp(num: number, min: number, max: number): number {
        return Math.min(Math.max(num, min), max);
    }

    /**
     *
     * @param comp1
     * @param comp2
     * @param weight1
     * @param weight2
     */
    static mix(comp1: number, comp2: number, weight1: number, weight2: number): number {
        return Math.floor((comp1 * weight1 + comp2 * weight2) / (weight1 + weight2));
    }

    static randomInRange(r: RangeValue): number {
        const max = NumberUtils.getRangeMax(r);
        let min = NumberUtils.getRangeMin(r);

        if (max === min) {
            min = 0;
        }

        return Math.random() * (max - min) + min;
    }

    static getRangeValue(value: RangeValue): number {
        return typeof value === "number" ? value : NumberUtils.randomInRange(value);
    }

    static getRangeMin(value: RangeValue): number {
        return typeof value === "number" ? value : value.min;
    }

    static getRangeMax(value: RangeValue): number {
        return typeof value === "number" ? value : value.max;
    }

    static setRangeValue(source: RangeValue, value?: number): RangeValue {
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

    static getValue(options: IValueWithRandom): number {
        const random = options.random;
        const { enable, minimumValue } = typeof random === "boolean" ? { enable: random, minimumValue: 0 } : random;

        return enable
            ? NumberUtils.getRangeValue(NumberUtils.setRangeValue(options.value, minimumValue))
            : NumberUtils.getRangeValue(options.value);
    }

    /**
     * Gets the distance between two coordinates
     * @param pointA the first coordinate
     * @param pointB the second coordinate
     */
    static getDistances(pointA: ICoordinates, pointB: ICoordinates): { dx: number; dy: number; distance: number } {
        const dx = pointA.x - pointB.x;
        const dy = pointA.y - pointB.y;
        return { dx: dx, dy: dy, distance: Math.sqrt(dx * dx + dy * dy) };
    }

    /**
     * Gets the distance between two coordinates
     * @param pointA the first coordinate
     * @param pointB the second coordinate
     */
    static getDistance(pointA: ICoordinates, pointB: ICoordinates): number {
        return NumberUtils.getDistances(pointA, pointB).distance;
    }

    /**
     * Get Particle base velocity
     * @param direction the direction to use for calculating the velocity
     */
    static getParticleBaseVelocity(direction: MoveDirection | keyof typeof MoveDirection | MoveDirectionAlt): Vector {
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

    static rotateVelocity(velocity: IVelocity, angle: number): IVelocity {
        return {
            horizontal: velocity.horizontal * Math.cos(angle) - velocity.vertical * Math.sin(angle),
            vertical: velocity.horizontal * Math.sin(angle) + velocity.vertical * Math.cos(angle),
        };
    }

    static collisionVelocity(v1: Vector, v2: Vector, m1: number, m2: number): Vector {
        return Vector.create((v1.x * (m1 - m2)) / (m1 + m2) + (v2.x * 2 * m2) / (m1 + m2), v1.y);
    }

    static calcEasing(value: number, type: EasingType): number {
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
}
