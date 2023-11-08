import { type ICoordinates, type IDimension, errorPrefix } from "@tsparticles/engine";
import { generateRandomPointOnPathPerimeter, generateRandomPointWithinPath } from "./utils.js";
import { EmitterShapeBase } from "@tsparticles/plugin-emitters";
import type { EmittersPathShapeOptions } from "./Options/Classes/EmittersPathShapeOptions.js";

export class EmittersPathShape extends EmitterShapeBase<EmittersPathShapeOptions> {
    checkContext: CanvasRenderingContext2D;
    path: Path2D;
    points: ICoordinates[];

    constructor(position: ICoordinates, size: IDimension, fill: boolean, options: EmittersPathShapeOptions) {
        super(position, size, fill, options);

        const ctx = document.createElement("canvas").getContext("2d");

        if (!ctx) {
            throw new Error(`${errorPrefix} No 2d context available`);
        }

        this.checkContext = ctx;

        this.points = options.points;

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

    async randomPosition(): Promise<ICoordinates | null> {
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
