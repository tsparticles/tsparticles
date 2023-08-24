import { type Container, type IMovePathGenerator, Vector, getRandom, isFunction, isString } from "@tsparticles/engine";
import { CurvesPathGen } from "./Curves";
import type { CurvesPathParticle } from "./CurvesPathParticle";
import type { ICurvesOptions } from "./ICurvesOptions";

declare global {
    interface Window {
        [key: string]: unknown;
    }
}

export class CurvesPathGenerator implements IMovePathGenerator {
    readonly options: ICurvesOptions;

    constructor() {
        this.options = {
            rndFunc: null,
            period: 100,
            nbHarmonics: 2,
            attenHarmonics: 0.8,
            lowValue: -0.03,
            highValue: 0.03,
        };
    }

    generate(p: CurvesPathParticle): Vector {
        if (!p.pathGen) {
            const options = this.options;

            p.pathGen = CurvesPathGen(
                options.rndFunc,
                options.period,
                options.nbHarmonics,
                options.attenHarmonics,
                options.lowValue,
                options.highValue,
            );
        }

        if (!p.curveVelocity) {
            p.curveVelocity = Vector.origin;

            p.curveVelocity.length = getRandom() * 0.6 + 0.8;
            p.curveVelocity.angle = getRandom() * Math.PI * 2;
        } else {
            p.curveVelocity.length += 0.01;
            p.curveVelocity.angle = (p.curveVelocity.angle + p.pathGen()) % (Math.PI * 2);
        }

        p.velocity.x = 0;
        p.velocity.y = 0;

        return p.curveVelocity;
    }

    init(container: Container): void {
        const sourceOptions = container.actualOptions.particles.move.path.options,
            { options } = this;

        if (isFunction(sourceOptions.rndFunc)) {
            options.rndFunc = sourceOptions.rndFunc as () => number;
        } else if (isString(sourceOptions.rndFunc)) {
            options.rndFunc =
                (window[sourceOptions.rndFunc] as (() => number) | null | undefined) || this.options.rndFunc;
        }

        options.period = (sourceOptions.period as number) ?? options.period;
        options.nbHarmonics = (sourceOptions.nbHarmonics as number) ?? options.nbHarmonics;
        options.attenHarmonics = (sourceOptions.attenHarmonics as number) ?? options.attenHarmonics;
        options.lowValue = (sourceOptions.lowValue as number) ?? options.lowValue;
        options.highValue = (sourceOptions.highValue as number) ?? options.highValue;
    }

    reset(particle: CurvesPathParticle): void {
        delete particle.pathGen;
        delete particle.curveVelocity;
    }

    update(): void {
        // do nothing
    }
}
