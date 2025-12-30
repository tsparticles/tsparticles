/* eslint-disable @typescript-eslint/no-magic-numbers */
/* eslint-disable @typescript-eslint/no-non-null-assertion */

import {
    type Container,
    type IMovePathGenerator,
    type Particle,
    Vector,
    deepExtend,
    getRandom,
} from "@tsparticles/engine";
import { FractalNoise } from "@tsparticles/fractal-noise";
import type { IFractalOptions } from "./IFractalOptions.js";
import type { IOffsetValues } from "./IOffsetValues.js";

const defaultOptions: IFractalOptions = {
    size: 20,
    increment: 0.004,
    columns: 0,
    rows: 0,
    layers: 0,
    width: 0,
    height: 0,
    offset: {
        x: 40000,
        y: 40000,
        z: 40000,
    },
};

export class FractalNoiseGenerator implements IMovePathGenerator {
    container?: Container;
    field: Vector[][][];
    noiseW: number;
    readonly options: IFractalOptions;

    private readonly _fractal;

    constructor() {
        this._fractal = new FractalNoise();
        this.field = [];
        this.noiseW = 0;
        this.options = deepExtend({}, defaultOptions) as IFractalOptions;
    }

    generate(particle: Particle): Vector {
        const pos = particle.getPosition(),
            point = {
                x: Math.max(Math.floor(pos.x / this.options.size), 0),
                y: Math.max(Math.floor(pos.y / this.options.size), 0),
                z: Math.max(Math.floor(pos.z / this.options.size), 0),
            },
            v = Vector.origin;

        if (!this.field[point.x]![point.y]![point.z]) {
            return v;
        }

        v.setTo(this.field[point.x]![point.y]![point.z]!);

        return v;
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

        this.noiseW += this.options.increment;
    }

    private _calculateField(): void {
        const options = this.options;

        for (let x = 0; x < options.columns; x++) {
            for (let y = 0; y < options.rows; y++) {
                for (let z = 0; z < options.layers; z++) {
                    this.field[x]![y]![z]!.angle =
                        this._fractal.noise4d(x / 50, y / 50, z / 50, this.noiseW) * Math.PI * 2;
                    this.field[x]![y]![z]!.length = this._fractal.noise4d(
                        x / 100 + options.offset.x,
                        y / 100 + options.offset.y,
                        z / 100 + options.offset.z,
                        this.noiseW,
                    );
                }
            }
        }
    }

    private _initField(): void {
        this.field = new Array<Vector[][]>(this.options.columns);

        for (let x = 0; x < this.options.columns; x++) {
            this.field[x] = new Array<Vector[]>(this.options.rows);

            for (let y = 0; y < this.options.rows; y++) {
                this.field[x]![y] = new Array<Vector>(this.options.layers);

                for (let z = 0; z < this.options.layers; z++) {
                    this.field[x]![y]![z] = Vector.origin;
                }
            }
        }
    }

    private _resetField(): void {
        const container = this.container;

        if (!container) {
            return;
        }

        const sourceOptions = container.actualOptions.particles.move.path.options;

        this.options.size =
            (sourceOptions["size"] as number) > 0 ? (sourceOptions["size"] as number) : defaultOptions.size;
        this.options.increment =
            (sourceOptions["increment"] as number) > 0
                ? (sourceOptions["increment"] as number)
                : defaultOptions.increment;
        this.options.width = container.canvas.size.width;
        this.options.height = container.canvas.size.height;

        const offset = sourceOptions["offset"] as IOffsetValues | undefined;

        this.options.offset.x = offset?.x ?? defaultOptions.offset.x;
        this.options.offset.y = offset?.y ?? defaultOptions.offset.y;
        this.options.offset.z = offset?.z ?? defaultOptions.offset.z;

        this.options.seed = sourceOptions["seed"] as number | undefined;

        this._fractal.seed(this.options.seed ?? getRandom());

        this.options.columns = Math.floor(this.options.width / this.options.size) + 1;
        this.options.rows = Math.floor(this.options.height / this.options.size) + 1;
        this.options.layers = Math.floor(container.zLayers / this.options.size) + 1;

        this._initField();
    }

    private _setup(): void {
        this.noiseW = 0;

        this._resetField();

        addEventListener("resize", () => {
            this._resetField();
        });
    }
}
