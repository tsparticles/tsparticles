import { type Container, type IMovePathGenerator, type Particle, Vector, getRandom } from "@tsparticles/engine";
import type { IPerlinOptions } from "./IPerlinOptions";
import { PerlinNoise } from "./PerlinNoise";

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
        this.options = {
            draw: false,
            size: 20,
            increment: 0.004,
            columns: 0,
            rows: 0,
            width: 0,
            height: 0,
        };
    }

    generate(particle: Particle): Vector {
        const pos = particle.getPosition(),
            { size } = this.options,
            point = {
                x: Math.max(Math.floor(pos.x / size), 0),
                y: Math.max(Math.floor(pos.y / size), 0),
            },
            { field } = this;

        return !field || !field[point.x] || !field[point.x][point.y] ? Vector.origin : field[point.x][point.y].copy();
    }

    init(container: Container): void {
        this.container = container;

        this._setup(container);
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
            this.container.canvas.draw((ctx) => this._drawField(ctx));
        }
    }

    private readonly _calculateField: () => void = () => {
        const { field, noiseGen, options } = this;

        for (let x = 0; x < options.columns; x++) {
            const column = field[x];

            for (let y = 0; y < options.rows; y++) {
                const cell = column[y];

                cell.length = noiseGen.noise(x / 100 + 40000, y / 100 + 40000, this.noiseZ);
                cell.angle = noiseGen.noise(x / 50, y / 50, this.noiseZ) * Math.PI * 2;
            }
        }
    };

    private readonly _drawField: (ctx: CanvasRenderingContext2D) => void = (ctx) => {
        const { field, options } = this;

        for (let x = 0; x < options.columns; x++) {
            const column = field[x];

            for (let y = 0; y < options.rows; y++) {
                const cell = column[y],
                    { angle, length } = cell;

                //ctx.save();
                ctx.setTransform(1, 0, 0, 1, x * this.options.size, y * this.options.size);
                ctx.rotate(angle);
                ctx.strokeStyle = "white";
                ctx.beginPath();
                ctx.moveTo(0, 0);
                ctx.lineTo(0, this.options.size * length);
                ctx.stroke();
                ctx.setTransform(1, 0, 0, 1, 0, 0);
                //ctx.restore();
            }
        }
    };

    private readonly _initField: () => void = () => {
        const { columns, rows } = this.options;
        this.field = new Array(columns);

        for (let x = 0; x < columns; x++) {
            this.field[x] = new Array(rows);

            for (let y = 0; y < rows; y++) {
                this.field[x][y] = Vector.origin;
            }
        }
    };

    private readonly _resetField: (container: Container) => void = (container) => {
        const sourceOptions = container.actualOptions.particles.move.path.options,
            { options } = this;

        options.size = (sourceOptions.size as number) > 0 ? (sourceOptions.size as number) : 20;
        options.increment = (sourceOptions.increment as number) > 0 ? (sourceOptions.increment as number) : 0.004;
        options.draw = !!sourceOptions.draw;
        options.width = container.canvas.size.width;
        options.height = container.canvas.size.height;

        this.noiseGen.seed((sourceOptions.seed as number) ?? getRandom());

        options.columns = Math.floor(this.options.width / this.options.size) + 1;
        options.rows = Math.floor(this.options.height / this.options.size) + 1;

        this._initField();
    };

    private readonly _setup: (container: Container) => void = (container) => {
        this.noiseZ = 0;

        this._resetField(container);

        window.addEventListener("resize", () => this._resetField(container));
    };
}
