import { type ICoordinates, type IDimension, errorPrefix, getRandom } from "@tsparticles/engine";
import { EmitterShapeBase } from "@tsparticles/plugin-emitters";

/**
 *
 * @param ctx -
 * @param path -
 * @param center -
 * @param size -
 * @returns the random point within the path
 */
function generateRandomPointWithinPath(
    ctx: CanvasRenderingContext2D,
    path: Path2D,
    center: ICoordinates,
    size: IDimension,
): ICoordinates | null {
    let randomPoint: ICoordinates | null = null;

    for (let attempts = 0; attempts < 100; attempts++) {
        const tmpPoint: ICoordinates = {
            x: center.x + getRandom() * size.width - size.width / 2,
            y: center.y + getRandom() * size.height - size.height / 2,
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
function generateRandomPointOnPathPerimeter(
    ctx: CanvasRenderingContext2D,
    path: Path2D,
    center: ICoordinates,
    size: IDimension,
): ICoordinates | null {
    let randomPoint: ICoordinates | null = null;

    for (let attempts = 0; attempts < 100; attempts++) {
        const tmpPoint: ICoordinates = {
            x: center.x + getRandom() * size.width - size.width / 2,
            y: center.y + getRandom() * size.height - size.height / 2,
        };

        if (ctx.isPointInStroke(path, tmpPoint.x, tmpPoint.y)) {
            randomPoint = tmpPoint;

            break;
        }
    }

    return randomPoint;
}

export class EmittersPathShape extends EmitterShapeBase {
    checkContext: CanvasRenderingContext2D;
    path!: Path2D;
    pathData!: ICoordinates[];
    points!: ICoordinates[];

    constructor(position: ICoordinates, size: IDimension, fill: boolean, options: Record<string, unknown>) {
        super(position, size, fill, options);

        const ctx = document.createElement("canvas").getContext("2d");

        if (!ctx) {
            throw new Error(`${errorPrefix} No 2d context available`);
        }

        this.checkContext = ctx;

        this.points = <ICoordinates[]>options.points ?? [];

        const pathData = this.points,
            path = new Path2D(),
            offset = {
                x: position.x - size.width / 2,
                y: position.y - size.height / 2,
            };

        for (const [index, point] of pathData.entries()) {
            const coords = {
                x: offset.x + (point.x * size.width) / 100,
                y: offset.y + (point.y * size.height) / 100,
            };

            if (index === 0) {
                path.moveTo(coords.x, coords.y);
            } else {
                path.lineTo(coords.x, coords.y);
            }
        }

        if (pathData[0]) {
            const coords = {
                x: offset.x + (pathData[0].x * size.width) / 100,
                y: offset.y + (pathData[0].y * size.height) / 100,
            };

            path.lineTo(coords.x, coords.y);
        }

        this.path = path;
    }

    randomPosition(): ICoordinates | null {
        const ctx = this.checkContext,
            position = this.position,
            size = this.size,
            fill = this.fill,
            path = this.path;

        return fill
            ? generateRandomPointWithinPath(ctx, path, position, size)
            : generateRandomPointOnPathPerimeter(ctx, path, position, size);
    }

    resize(position: ICoordinates, size: IDimension): void {
        super.resize(position, size);

        const pathData = this.points,
            path = new Path2D(),
            offset = {
                x: position.x - size.width / 2,
                y: position.y - size.height / 2,
            };

        for (const [index, point] of pathData.entries()) {
            const coords = {
                x: offset.x + (point.x * size.width) / 100,
                y: offset.y + (point.y * size.height) / 100,
            };

            if (index === 0) {
                path.moveTo(coords.x, coords.y);
            } else {
                path.lineTo(coords.x, coords.y);
            }
        }

        if (pathData[0]) {
            const coords = {
                x: offset.x + (pathData[0].x * size.width) / 100,
                y: offset.y + (pathData[0].y * size.height) / 100,
            };

            path.lineTo(coords.x, coords.y);
        }

        this.path = path;
    }
}
