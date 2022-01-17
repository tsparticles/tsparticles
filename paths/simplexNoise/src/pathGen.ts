import type { Container, IMovePathGenerator, Particle } from "tsparticles-engine";
import { Noise4D, makeNoise4D } from "./simplex";
import { Vector } from "tsparticles-engine";

let noiseW: number;
let field: number[][][][];
let noiseFunc: Noise4D;

const options: {
    size: number;
    increment: number;
    columns: number;
    rows: number;
    layers: number;
    width: number;
    height: number;
} = {
    size: 20,
    increment: 0.004,
    columns: 0,
    rows: 0,
    layers: 0,
    width: 0,
    height: 0,
};

function setup(container: Container) {
    noiseW = 0;

    reset(container);

    addEventListener("resize", () => reset(container));
}

function initField(): void {
    field = new Array(options.columns);

    for (let x = 0; x < options.columns; x++) {
        field[x] = new Array(options.rows);

        for (let y = 0; y < options.rows; y++) {
            field[x][y] = new Array(options.layers);

            for (let z = 0; z < options.layers; z++) {
                field[x][y][z] = [0, 0];
            }
        }
    }
}

function calculateField(): void {
    for (let x = 0; x < options.columns; x++) {
        for (let y = 0; y < options.rows; y++) {
            for (let z = 0; z < options.layers; z++) {
                const angle = noiseFunc(x / 50, y / 50, z / 50, noiseW) * Math.PI * 2;
                const length = noiseFunc(x / 100 + 40000, y / 100 + 40000, z / 100 + 40000, noiseW);

                field[x][y][z][0] = angle;
                field[x][y][z][1] = length;
            }
        }
    }
}

function reset(container: Container): void {
    const sourceOptions = container.actualOptions.particles.move.path.options;

    options.size = (sourceOptions.size as number) || 20;
    options.increment = (sourceOptions.increment as number) || 0.004;
    options.width = container.canvas.size.width;
    options.height = container.canvas.size.height;

    noiseFunc = makeNoise4D(Math.random());

    options.columns = Math.floor(options.width / options.size) + 1;
    options.rows = Math.floor(options.height / options.size) + 1;
    options.layers = Math.floor(container.zLayers / options.size) + 1;

    initField();
}

class SimplexNoiseGenerator implements IMovePathGenerator {
    container?: Container;

    init(container: Container): void {
        this.container = container;

        setup(this.container);
    }

    update() {
        if (!this.container) {
            return;
        }

        calculateField();

        noiseW += options.increment;
    }

    generate(p: Particle): Vector {
        const pos = p.getPosition();

        const px = Math.max(Math.floor(pos.x / options.size), 0);
        const py = Math.max(Math.floor(pos.y / options.size), 0);
        const pz = Math.max(Math.floor(pos.z / options.size), 0);

        const v = Vector.origin;

        if (!field || !field[px] || !field[px][py] || !field[px][py][pz]) {
            return v;
        }

        v.length = field[px][py][pz][1];
        v.angle = field[px][py][pz][0];

        return v;
    }
}

export const simplexNoiseGenerator = new SimplexNoiseGenerator();
