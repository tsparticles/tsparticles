import type { Container, IMovePathGenerator, Particle } from "tsparticles-engine";
import { Noise4D, makeNoise4D } from "./simplex";
import { ISimplexOptions } from "./ISimplexOptions";
import { Vector } from "tsparticles-engine";

export class SimplexNoiseGenerator implements IMovePathGenerator {
    container?: Container;

    noiseW: number;
    field: number[][][][];
    noiseFunc: Noise4D;

    readonly options: ISimplexOptions;

    constructor() {
        this.field = [];
        this.noiseFunc = makeNoise4D(Math.random());
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

    init(container: Container): void {
        this.container = container;

        this.setup(this.container);
    }

    update(): void {
        if (!this.container) {
            return;
        }

        this.calculateField();

        this.noiseW += this.options.increment;
    }

    generate(p: Particle): Vector {
        const pos = p.getPosition();

        const px = Math.max(Math.floor(pos.x / this.options.size), 0);
        const py = Math.max(Math.floor(pos.y / this.options.size), 0);
        const pz = Math.max(Math.floor(pos.z / this.options.size), 0);

        const v = Vector.origin;

        if (!this.field || !this.field[px] || !this.field[px][py] || !this.field[px][py][pz]) {
            return v;
        }

        v.length = this.field[px][py][pz][1];
        v.angle = this.field[px][py][pz][0];

        return v;
    }

    private setup(container: Container): void {
        this.noiseW = 0;

        this.reset(container);

        addEventListener("resize", () => this.reset(container));
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

    private calculateField(): void {
        for (let x = 0; x < this.options.columns; x++) {
            for (let y = 0; y < this.options.rows; y++) {
                for (let z = 0; z < this.options.layers; z++) {
                    const angle = this.noiseFunc(x / 50, y / 50, z / 50, this.noiseW) * Math.PI * 2;
                    const length = this.noiseFunc(x / 100 + 40000, y / 100 + 40000, z / 100 + 40000, this.noiseW);

                    this.field[x][y][z][0] = angle;
                    this.field[x][y][z][1] = length;
                }
            }
        }
    }

    private reset(container: Container): void {
        const sourceOptions = container.actualOptions.particles.move.path.options;

        this.options.size = (sourceOptions.size as number) > 0 ? (sourceOptions.size as number) : 20;
        this.options.increment = (sourceOptions.increment as number) > 0 ? (sourceOptions.increment as number) : 0.004;
        this.options.width = container.canvas.size.width;
        this.options.height = container.canvas.size.height;

        this.noiseFunc = makeNoise4D((sourceOptions.seed as number) ?? Math.random());

        this.options.columns = Math.floor(this.options.width / this.options.size) + 1;
        this.options.rows = Math.floor(this.options.height / this.options.size) + 1;
        this.options.layers = Math.floor(container.zLayers / this.options.size) + 1;

        this.initField();
    }
}
