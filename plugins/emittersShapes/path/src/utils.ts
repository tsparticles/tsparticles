import { type ICoordinates, type IDimension, getRandom, half } from "@tsparticles/engine";

const maxAttempts = 100;

/**
 *
 * @param ctx -
 * @param path -
 * @param center -
 * @param size -
 * @returns the random point within the path
 */
export function generateRandomPointWithinPath(
    ctx: CanvasRenderingContext2D,
    path: Path2D,
    center: ICoordinates,
    size: IDimension,
): ICoordinates | null {
    let randomPoint: ICoordinates | null = null;

    for (let attempts = 0; attempts < maxAttempts; attempts++) {
        const tmpPoint: ICoordinates = {
            x: center.x + getRandom() * size.width - size.width * half,
            y: center.y + getRandom() * size.height - size.height * half,
        };

        if (ctx.isPointInPath(path, tmpPoint.x, tmpPoint.y)) {
            randomPoint = tmpPoint;

            break;
        }
    }

    return randomPoint;
}

/**
 *
 * @param ctx -
 * @param path -
 * @param center -
 * @param size -
 * @returns the random point on the perimeter of the path
 */
export function generateRandomPointOnPathPerimeter(
    ctx: CanvasRenderingContext2D,
    path: Path2D,
    center: ICoordinates,
    size: IDimension,
): ICoordinates | null {
    let randomPoint: ICoordinates | null = null;

    for (let attempts = 0; attempts < maxAttempts; attempts++) {
        const tmpPoint: ICoordinates = {
            x: center.x + getRandom() * size.width - size.width * half,
            y: center.y + getRandom() * size.height - size.height * half,
        };

        if (ctx.isPointInStroke(path, tmpPoint.x, tmpPoint.y)) {
            randomPoint = tmpPoint;

            break;
        }
    }

    return randomPoint;
}
