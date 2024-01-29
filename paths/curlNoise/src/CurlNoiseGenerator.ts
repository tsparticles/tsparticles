import {
    type Container,
    type IMovePathGenerator,
    type Particle,
    Vector,
    deepExtend,
    getRandom,
} from "@tsparticles/engine";
import type { ICurlOptions } from "./ICurlOptions.js";
import { SimplexNoise } from "@tsparticles/simplex-noise";

const defaultOptions: ICurlOptions = {
        speed: 0.2,
        step: 250,
    },
    double = 2;

export class CurlNoiseGenerator implements IMovePathGenerator {
    readonly options: ICurlOptions;

    private readonly _simplex;

    constructor() {
        const simplex = new SimplexNoise();

        this._simplex = simplex.noise2d;
        this.options = deepExtend({}, defaultOptions) as ICurlOptions;
    }

    generate(particle: Particle): Promise<Vector> {
        const pos = particle.getPosition(),
            { speed, step } = this.options,
            x = pos.x / step,
            y = pos.y / step,
            eps = 0.001,
            n1a = this._simplex.noise(x, y + eps),
            n2a = this._simplex.noise(x, y - eps),
            a = (n1a - n2a) / (double * eps),
            n1b = this._simplex.noise(x + eps, y),
            n2b = this._simplex.noise(x - eps, y),
            b = (n1b - n2b) / (double * eps);

        particle.velocity.x = 0;
        particle.velocity.y = 0;

        return Promise.resolve(Vector.create(speed * a, speed * -b));
    }

    async init(container: Container): Promise<void> {
        const sourceOptions = container.actualOptions.particles.move.path.options;

        this.options.seed = sourceOptions?.seed as number | undefined;
        this.options.speed =
            ((sourceOptions?.speed as number | undefined) ?? defaultOptions.speed) * container.retina.pixelRatio;
        this.options.step = (sourceOptions?.step as number | undefined) ?? defaultOptions.step;

        this._simplex.seed(this.options.seed ?? getRandom());

        await Promise.resolve();
    }

    reset(): void {
        // nothing to do
    }

    update(): void {
        // nothing to do
    }
}
