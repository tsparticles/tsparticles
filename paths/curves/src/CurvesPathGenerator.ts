import type { Container, IMovePathGenerator } from "tsparticles-engine";
import { CurvesPathGen } from "./Curves";
import type { CurvesPathParticle } from "./CurvesPathParticle";
import { ICurvesOptions } from "./ICurvesOptions";
import { Vector } from "tsparticles-engine";

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
        if (p.pathGen === undefined) {
            const options = this.options;

            p.pathGen = CurvesPathGen(
                options.rndFunc,
                options.period,
                options.nbHarmonics,
                options.attenHarmonics,
                options.lowValue,
                options.highValue
            );
        }

        if (p.curveVelocity === undefined) {
            p.curveVelocity = Vector.origin;

            p.curveVelocity.length = Math.random() * 0.6 + 0.8;
            p.curveVelocity.angle = Math.random() * Math.PI * 2;
        } else {
            p.curveVelocity.length += 0.01;
            p.curveVelocity.angle = (p.curveVelocity.angle + p.pathGen()) % (Math.PI * 2);
        }

        p.velocity.x = 0;
        p.velocity.y = 0;

        return p.curveVelocity;
    }

    init(container: Container): void {
        const sourceOptions = container.actualOptions.particles.move.path.options;

        if (typeof sourceOptions.rndFunc === "function") {
            this.options.rndFunc = sourceOptions.rndFunc as () => number;
        } else if (typeof sourceOptions.rndFunc === "string") {
            this.options.rndFunc =
                (window[sourceOptions.rndFunc] as unknown as (() => number) | null | undefined) || this.options.rndFunc;
        }

        this.options.period = (sourceOptions.period as number) ?? this.options.period;
        this.options.nbHarmonics = (sourceOptions.nbHarmonics as number) ?? this.options.nbHarmonics;
        this.options.attenHarmonics = (sourceOptions.attenHarmonics as number) ?? this.options.attenHarmonics;
        this.options.lowValue = (sourceOptions.lowValue as number) ?? this.options.lowValue;
        this.options.highValue = (sourceOptions.highValue as number) ?? this.options.highValue;
    }

    update(): void {
        // do nothing
    }
}
