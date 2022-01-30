import type { Container, IMovePathGenerator, Particle } from "tsparticles-engine";
import { Vector } from "tsparticles-engine";
import { noiseGen } from "./perlin";

let noiseZ: number;
let field: number[][][];

const options: {
    draw: boolean;
    size: number;
    increment: number;
    columns: number;
    rows: number;
    width: number;
    height: number;
} = {
    draw: false,
    size: 20,
    increment: 0.004,
    columns: 0,
    rows: 0,
    width: 0,
    height: 0,
};

function setup(container: Container) {
    noiseZ = 0;

    reset(container);

    window.addEventListener("resize", () => reset(container));
}

function initField() {
    field = new Array(options.columns);

    for (let x = 0; x < options.columns; x++) {
        field[x] = new Array(options.rows);

        for (let y = 0; y < options.rows; y++) {
            field[x][y] = [0, 0];
        }
    }
}

function calculateField() {
    for (let x = 0; x < options.columns; x++) {
        for (let y = 0; y < options.rows; y++) {
            const angle = noiseGen.noise(x / 50, y / 50, noiseZ) * Math.PI * 2;
            const length = noiseGen.noise(x / 100 + 40000, y / 100 + 40000, noiseZ);

            field[x][y][0] = angle;
            field[x][y][1] = length;
        }
    }
}

function reset(container: Container) {
    const sourceOptions = container.actualOptions.particles.move.path.options;

    options.size = (sourceOptions.size as number) || 20;
    options.increment = (sourceOptions.increment as number) || 0.004;
    options.draw = !!sourceOptions.draw;
    options.width = container.canvas.size.width;
    options.height = container.canvas.size.height;

    noiseGen.seed(Math.random());

    options.columns = Math.floor(options.width / options.size) + 1;
    options.rows = Math.floor(options.height / options.size) + 1;

    initField();
}

function drawField(ctx: CanvasRenderingContext2D) {
    for (let x = 0; x < options.columns; x++) {
        for (let y = 0; y < options.rows; y++) {
            const angle = field[x][y][0];
            const length = field[x][y][1];

            ctx.save();
            ctx.translate(x * options.size, y * options.size);
            ctx.rotate(angle);
            ctx.strokeStyle = "white";
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(0, options.size * length);
            ctx.stroke();
            ctx.restore();
        }
    }
}

class PerlinNoiseGenerator implements IMovePathGenerator {
    container?: Container;

    init(container: Container): void {
        this.container = container;

        setup(container);
    }

    update(): void {
        if (!this.container) {
            return;
        }

        calculateField();

        noiseZ += options.increment;

        if (options.draw) {
            this.container.canvas.draw((ctx) => drawField(ctx));
        }
    }

    generate(p: Particle): Vector {
        const pos = p.getPosition();

        const px = Math.max(Math.floor(pos.x / options.size), 0);
        const py = Math.max(Math.floor(pos.y / options.size), 0);

        const v = Vector.origin;

        if (!field || !field[px] || !field[px][py]) {
            return v;
        }

        v.length = field[px][py][1];
        v.angle = field[px][py][0];

        return v;
    }
}

export const perlinNoiseGenerator = new PerlinNoiseGenerator();
