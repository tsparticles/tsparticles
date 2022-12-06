import type { Container, IMovePathGenerator, Particle } from "tsparticles-engine";
import { Vector, getRandom } from "tsparticles-engine";
import type { IPerlinOptions } from "./IPerlinOptions";
import { PerlinNoise } from "./PerlinNoise";

export class PerlinNoiseGenerator implements IMovePathGenerator {
    container?: Container;
    field: number[][][];
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
            point = {
                x: Math.max(Math.floor(pos.x / this.options.size), 0),
                y: Math.max(Math.floor(pos.y / this.options.size), 0),
            },
            v = Vector.origin;

        if (!this.field || !this.field[point.x] || !this.field[point.x][point.y]) {
            return v;
        }

        v.length = this.field[point.x][point.y][1];
        v.angle = this.field[point.x][point.y][0];

        return v;
    }

    init(container: Container): void {
        this.container = container;

        this.setup(container);
    }

    reset(): void {
        // nothing to do
    }

    update(): void {
        if (!this.container) {
            return;
        }

        this.calculateField();

        this.noiseZ += this.options.increment;

        if (this.options.draw) {
            this.container.canvas.draw((ctx) => this.drawField(ctx));
        }
    }

    private calculateField(): void {
        for (let x = 0; x < this.options.columns; x++) {
            for (let y = 0; y < this.options.rows; y++) {
                const angle = this.noiseGen.noise(x / 50, y / 50, this.noiseZ) * Math.PI * 2;
                const length = this.noiseGen.noise(x / 100 + 40000, y / 100 + 40000, this.noiseZ);

                this.field[x][y][0] = angle;
                this.field[x][y][1] = length;
            }
        }
    }

    private drawField(ctx: CanvasRenderingContext2D): void {
        for (let x = 0; x < this.options.columns; x++) {
            for (let y = 0; y < this.options.rows; y++) {
                const angle = this.field[x][y][0];
                const length = this.field[x][y][1];

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
    }

    private initField(): void {
        this.field = new Array(this.options.columns);

        for (let x = 0; x < this.options.columns; x++) {
            this.field[x] = new Array(this.options.rows);

            for (let y = 0; y < this.options.rows; y++) {
                this.field[x][y] = [0, 0];
            }
        }
    }

    private resetField(container: Container): void {
        const sourceOptions = container.actualOptions.particles.move.path.options;

        this.options.size = (sourceOptions.size as number) > 0 ? (sourceOptions.size as number) : 20;
        this.options.increment = (sourceOptions.increment as number) > 0 ? (sourceOptions.increment as number) : 0.004;
        this.options.draw = !!sourceOptions.draw;
        this.options.width = container.canvas.size.width;
        this.options.height = container.canvas.size.height;

        this.noiseGen.seed((sourceOptions.seed as number) ?? getRandom());

        this.options.columns = Math.floor(this.options.width / this.options.size) + 1;
        this.options.rows = Math.floor(this.options.height / this.options.size) + 1;

        this.initField();
    }

    private setup(container: Container): void {
        this.noiseZ = 0;

        this.resetField(container);

        window.addEventListener("resize", () => this.resetField(container));
    }
}
