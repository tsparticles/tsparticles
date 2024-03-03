/* eslint-disable @typescript-eslint/no-magic-numbers */

import {
    type Container,
    type IMovePathGenerator,
    type Particle,
    Vector,
    deepExtend,
    getRandom,
} from "@tsparticles/engine";
import type { IFactorValues, IOffsetValues } from "./IFactorOffsetValues.js";
import type { IPerlinOptions } from "./IPerlinOptions.js";
import { PerlinNoise } from "@tsparticles/perlin-noise";

const double = 2,
    doublePI = Math.PI * double,
    defaultOptions: IPerlinOptions = {
        draw: false,
        size: 20,
        increment: 0.004,
        columns: 0,
        rows: 0,
        width: 0,
        height: 0,
        factor: {
            angle: 0.02,
            length: 0.01,
        },
        offset: {
            x: 40000,
            y: 40000,
        },
    };

export class PerlinNoiseGenerator implements IMovePathGenerator {
    container?: Container;
    field: Vector[][];
    readonly noiseGen: PerlinNoise;
    noiseZ: number;
    readonly options: IPerlinOptions;

    constructor() {
        this.noiseGen = new PerlinNoise();
        this.field = [];
        this.noiseZ = 0;
        this.options = deepExtend({}, defaultOptions) as IPerlinOptions;
    }

    generate(particle: Particle): Vector {
        const pos = particle.getPosition(),
            { size } = this.options,
            point = {
                x: Math.max(Math.floor(pos.x / size), 0),
                y: Math.max(Math.floor(pos.y / size), 0),
            },
            { field } = this;

        return !field?.[point.x]?.[point.y] ? Vector.origin : field[point.x][point.y].copy();
    }

    init(container: Container): void {
        this.container = container;

        this._setup();
    }

    reset(): void {
        // nothing to do
    }

    update(): void {
        if (!this.container) {
            return;
        }

        this._calculateField();

        this.noiseZ += this.options.increment;

        if (this.options.draw) {
            this.container.canvas.draw(ctx => this._drawField(ctx));
        }
    }

    private readonly _calculateField: () => void = () => {
        const { field, noiseGen, options } = this,
            lengthFactor = options.factor.length,
            angleFactor = options.factor.angle;

        for (let x = 0; x < options.columns; x++) {
            const column = field[x];

            for (let y = 0; y < options.rows; y++) {
                const cell = column[y];

                cell.length = noiseGen.noise3d(
                    x * lengthFactor + options.offset.x,
                    y * lengthFactor + options.offset.y,
                    this.noiseZ,
                );
                cell.angle = noiseGen.noise3d(x * angleFactor, y * angleFactor, this.noiseZ) * doublePI;
            }
        }
    };

    private readonly _drawField: (ctx: CanvasRenderingContext2D) => void = ctx => {
        const { field, options } = this;

        for (let x = 0; x < options.columns; x++) {
            const column = field[x];

            for (let y = 0; y < options.rows; y++) {
                const cell = column[y],
                    { angle, length } = cell;

                // ctx.save();
                ctx.setTransform(1, 0, 0, 1, x * this.options.size, y * this.options.size);
                ctx.rotate(angle);
                ctx.strokeStyle = "white";
                ctx.beginPath();
                ctx.moveTo(0, 0);
                ctx.lineTo(0, this.options.size * length);
                ctx.stroke();
                ctx.setTransform(1, 0, 0, 1, 0, 0);
                // ctx.restore();
            }
        }
    };

    private readonly _initField: () => void = () => {
        const { columns, rows } = this.options;
        this.field = new Array<Vector[]>(columns);

        for (let x = 0; x < columns; x++) {
            this.field[x] = new Array<Vector>(rows);

            for (let y = 0; y < rows; y++) {
                this.field[x][y] = Vector.origin;
            }
        }
    };

    private _resetField(): void {
        const container = this.container;

        if (!container) {
            return;
        }

        const sourceOptions = container.actualOptions.particles.move.path.options,
            { options } = this;

        options.size = (sourceOptions.size as number) > 0 ? (sourceOptions.size as number) : defaultOptions.size;
        options.increment =
            (sourceOptions.increment as number) > 0 ? (sourceOptions.increment as number) : defaultOptions.increment;
        options.draw = !!sourceOptions.draw;

        const offset = sourceOptions.offset as IOffsetValues | undefined;

        options.offset.x = offset?.x ?? defaultOptions.offset.x;
        options.offset.y = offset?.y ?? defaultOptions.offset.y;

        const factor = sourceOptions.factor as IFactorValues | undefined;

        options.factor.angle = factor?.angle ?? defaultOptions.factor.angle;
        options.factor.length = factor?.length ?? defaultOptions.factor.length;

        options.width = container.canvas.size.width;
        options.height = container.canvas.size.height;

        this.options.seed = sourceOptions.seed as number | undefined;

        this.noiseGen.seed(this.options.seed ?? getRandom());

        options.columns = Math.floor(this.options.width / this.options.size) + 1;
        options.rows = Math.floor(this.options.height / this.options.size) + 1;

        this._initField();
    }

    private _setup(): void {
        this.noiseZ = 0;

        this._resetField();

        window.addEventListener("resize", () => this._resetField());
    }
}
