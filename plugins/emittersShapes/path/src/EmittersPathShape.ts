import { EmitterShapeBase, type IRandomPositionData } from "@tsparticles/plugin-emitters";
import { type ICoordinates, type IDimension, percentDenominator, safeDocument } from "@tsparticles/engine";
import { generateRandomPointOnPathPerimeter, generateRandomPointWithinPath } from "./utils.js";
import type { EmittersPathShapeOptions } from "./Options/Classes/EmittersPathShapeOptions.js";

const half = 0.5;

export class EmittersPathShape extends EmitterShapeBase<EmittersPathShapeOptions> {
    checkContext: CanvasRenderingContext2D;
    path: Path2D;
    points: ICoordinates[];

    constructor(position: ICoordinates, size: IDimension, fill: boolean, options: EmittersPathShapeOptions) {
        super(position, size, fill, options);

        const ctx = safeDocument().createElement("canvas").getContext("2d");

        if (!ctx) {
            throw new Error(`No 2d context available`);
        }

        this.checkContext = ctx;

        this.points = options.points;

        const pathData = this.points,
            path = new Path2D(),
            offset = {
                x: position.x - size.width * half,
                y: position.y - size.height * half,
            };

        for (const [index, point] of pathData.entries()) {
            const coords = {
                x: offset.x + (point.x * size.width) / percentDenominator,
                y: offset.y + (point.y * size.height) / percentDenominator,
            };

            if (!index) {
                path.moveTo(coords.x, coords.y);
            } else {
                path.lineTo(coords.x, coords.y);
            }
        }

        const firstIndex = 0,
            firstPathData = pathData[firstIndex];

        if (!firstPathData) {
            throw new Error(`No path data available`);
        }

        const coords = {
            x: offset.x + (firstPathData.x * size.width) / percentDenominator,
            y: offset.y + (firstPathData.y * size.height) / percentDenominator,
        };

        path.lineTo(coords.x, coords.y);

        this.path = path;
    }

    async init(): Promise<void> {
        // nothing to do
    }

    randomPosition(): IRandomPositionData | null {
        const ctx = this.checkContext,
            position = this.position,
            size = this.size,
            fill = this.fill,
            path = this.path,
            res = fill
                ? generateRandomPointWithinPath(ctx, path, position, size)
                : generateRandomPointOnPathPerimeter(ctx, path, position, size);

        return res ? { position: res } : null;
    }

    override resize(position: ICoordinates, size: IDimension): void {
        super.resize(position, size);

        const pathData = this.points,
            path = new Path2D(),
            offset = {
                x: position.x - size.width * half,
                y: position.y - size.height * half,
            };

        for (const [index, point] of pathData.entries()) {
            const coords = {
                x: offset.x + (point.x * size.width) / percentDenominator,
                y: offset.y + (point.y * size.height) / percentDenominator,
            };

            if (!index) {
                path.moveTo(coords.x, coords.y);
            } else {
                path.lineTo(coords.x, coords.y);
            }
        }

        const firstIndex = 0,
            firstPathData = pathData[firstIndex];

        if (!firstPathData) {
            throw new Error(`No path data available`);
        }

        const coords = {
            x: offset.x + (firstPathData.x * size.width) / percentDenominator,
            y: offset.y + (firstPathData.y * size.height) / percentDenominator,
        };

        path.lineTo(coords.x, coords.y);

        this.path = path;
    }
}
