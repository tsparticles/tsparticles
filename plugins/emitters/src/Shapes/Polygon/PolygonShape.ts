import { type ICoordinates, type IDimension, getRandom } from "@tsparticles/engine";
import type { IEmitterShape } from "../../IEmitterShape.js";

/**
 *
 * @param position -
 * @param sides -
 * @param radius -
 * @param rotationAngle -
 * @returns the polygon coordinates
 */
function generateRandomPolygon(
    position: ICoordinates,
    sides: number,
    radius: number,
    rotationAngle = 0,
): ICoordinates[] {
    const polygon = [],
        angle = (Math.PI * 2) / sides;

    for (let i = 0; i < sides; i++) {
        const currentAngle = angle * i + rotationAngle;

        polygon.push({
            x: position.x + radius * Math.cos(currentAngle),
            y: position.y + radius * Math.sin(currentAngle),
        });
    }

    return polygon;
}

/**
 *
 * @param polygon -
 * @returns a random point within the polygon
 */
function generateRandomPointWithinPolygon(polygon: ICoordinates[]): ICoordinates | null {
    const min = { ...polygon[0] },
        max = { ...polygon[0] };

    for (const point of polygon) {
        if (point.x < min.x) {
            min.x = point.x;
        }

        if (point.x > max.x) {
            max.x = point.x;
        }

        if (point.y < min.y) {
            min.y = point.y;
        }

        if (point.y > max.y) {
            max.y = point.y;
        }
    }

    let randomPoint: ICoordinates | null = null;

    for (let attempts = 0; attempts < 100; attempts++) {
        const tmpPoint: ICoordinates = {
            x: min.x + getRandom() * (max.x - min.x),
            y: min.y + getRandom() * (max.y - min.y),
        };

        if (isPointInPolygon(tmpPoint, polygon)) {
            randomPoint = tmpPoint;

            break;
        }
    }

    return randomPoint;
}

/**
 *
 * @param polygon -
 * @returns a random point on the perimeter of the polygon
 */
function generateRandomPointOnPolygonPerimeter(polygon: ICoordinates[]): ICoordinates {
    const sideIndex = Math.floor(getRandom() * polygon.length),
        startPoint = polygon[sideIndex],
        endPoint = polygon[(sideIndex + 1) % polygon.length],
        t = getRandom();

    return { x: startPoint.x + (endPoint.x - startPoint.x) * t, y: startPoint.y + (endPoint.y - startPoint.y) * t };
}

/**
 *
 * @param point -
 * @param polygon -
 * @returns whether the point is within the polygon
 */
function isPointInPolygon(point: ICoordinates, polygon: ICoordinates[]): boolean {
    let inside = false;

    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
        const pi = polygon[i],
            pj = polygon[j];

        const intersect =
            pi.y > point.y !== pj.y > point.y && point.x < ((pj.x - pi.x) * (point.y - pi.y)) / (pj.y - pi.y) + pi.x;

        if (intersect) {
            inside = !inside;
        }
    }

    return inside;
}

export class PolygonShape implements IEmitterShape {
    randomPosition(
        position: ICoordinates,
        size: IDimension,
        fill: boolean,
        options: Record<string, unknown>,
    ): ICoordinates | null {
        const sides = <number>options.sides ?? 5,
            angle = ((<number>options.angle ?? 0) * Math.PI) / 180,
            polygon = generateRandomPolygon(position, sides, size.width / 2, angle);

        return fill ? generateRandomPointWithinPolygon(polygon) : generateRandomPointOnPolygonPerimeter(polygon);
    }
}
