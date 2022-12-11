import type { Container, IMovePathGenerator, Particle } from "tsparticles-engine";
import type { ISimplexOptions } from "./ISimplexOptions";
import type { Noise4D } from "./simplex";
import { Vector } from "tsparticles-engine";
import { getRandom } from "tsparticles-engine";
import { makeNoise4D } from "./simplex";

export class SimplexNoiseGenerator implements IMovePathGenerator {
    container?: Container;

    field: number[][][][];
    noiseFunc: Noise4D;
    noiseW: number;

    readonly options: ISimplexOptions;

    constructor() {
        this.field = [];
        this.noiseFunc = makeNoise4D(getRandom());
        this.noiseW = 0;
        this.options = {
            size: 20,
            increment: 0.004,
            columns: 0,
            rows: 0,
            layers: 0,
            width: 0,
            height: 0,
        };
    }

    generate(particle: Particle): Vector {
        const pos = particle.getPosition(),
            point = {
                x: Math.max(Math.floor(pos.x / this.options.size), 0),
                y: Math.max(Math.floor(pos.y / this.options.size), 0),
                z: Math.max(Math.floor(pos.z / this.options.size), 0),
            },
            v = Vector.origin;

        if (
            !this.field ||
            !this.field[point.x] ||
            !this.field[point.x][point.y] ||
            !this.field[point.x][point.y][point.z]
        ) {
            return v;
        }

        v.length = this.field[point.x][point.y][point.z][1];
        v.angle = this.field[point.x][point.y][point.z][0];

        return v;
    }

    init(container: Container): void {
        this.container = container;

        this.setup(this.container);
    }

    reset(): void {
        // nothing to do
    }

    update(): void {
        if (!this.container) {
            return;
        }

        this.calculateField();

        this.noiseW += this.options.increment;
    }

    private calculateField(): void {
        for (let x = 0; x < this.options.columns; x++) {
            for (let y = 0; y < this.options.rows; y++) {
                for (let z = 0; z < this.options.layers; z++) {
                    const angle = this.noiseFunc(x / 50, y / 50, z / 50, this.noiseW) * Math.PI * 2,
                        length = this.noiseFunc(x / 100 + 40000, y / 100 + 40000, z / 100 + 40000, this.noiseW);

                    this.field[x][y][z][0] = angle;
                    this.field[x][y][z][1] = length;
                }
            }
        }
    }

    private initField(): void {
        this.field = new Array(this.options.columns);

        for (let x = 0; x < this.options.columns; x++) {
            this.field[x] = new Array(this.options.rows);

            for (let y = 0; y < this.options.rows; y++) {
                this.field[x][y] = new Array(this.options.layers);

                for (let z = 0; z < this.options.layers; z++) {
                    this.field[x][y][z] = [0, 0];
                }
            }
        }
    }

    private resetField(container: Container): void {
        const sourceOptions = container.actualOptions.particles.move.path.options;

        this.options.size = (sourceOptions.size as number) > 0 ? (sourceOptions.size as number) : 20;
        this.options.increment = (sourceOptions.increment as number) > 0 ? (sourceOptions.increment as number) : 0.004;
        this.options.width = container.canvas.size.width;
        this.options.height = container.canvas.size.height;

        this.noiseFunc = makeNoise4D((sourceOptions.seed as number) ?? getRandom());

        this.options.columns = Math.floor(this.options.width / this.options.size) + 1;
        this.options.rows = Math.floor(this.options.height / this.options.size) + 1;
        this.options.layers = Math.floor(container.zLayers / this.options.size) + 1;

        this.initField();
    }

    private setup(container: Container): void {
        this.noiseW = 0;

        this.resetField(container);

        addEventListener("resize", () => this.resetField(container));
    }
}
