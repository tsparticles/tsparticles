import { CurvesPathParticle } from "./CurvesPathParticle";
import type { IMovePathGenerator } from "tsparticles-engine";
import { Vector } from "tsparticles-engine";

function pathGen(
    rndFunc: (() => number) | null,
    period: number,
    nbHarmonics: number,
    attenHarmonics: number,
    lowValue = 0,
    highValue = 1
): () => number {
    const arP0: number[] = [], // 'preceding value' for each harmonic
        arP1: number[] = [], // 'succeeding value'
        amplitudes: number[] = [], // amplitudes oh harmonics
        increments: number[] = [], // n / period, which will be added to phases for every point
        phases: number[] = [],
        randomFunc = rndFunc ?? Math.random;

    let globAmplitude = 0;

    if (nbHarmonics < 1) nbHarmonics = 1;

    for (let kh = 1; kh <= nbHarmonics; ++kh) {
        arP0[kh] = randomFunc();
        arP1[kh] = randomFunc();
        amplitudes[kh] = kh === 1 ? 1 : amplitudes[kh - 1] * attenHarmonics;
        globAmplitude += amplitudes[kh];
        increments[kh] = kh / period;
        phases[kh] = randomFunc();
    } // for kh

    /* normalize amplitudes */
    amplitudes.forEach((value, kh) => (amplitudes[kh] = (value / globAmplitude) * (highValue - lowValue)));

    /* returned function here */
    return () => {
        let pf: number,
            pfl: number,
            signal = 0;

        for (let kh = nbHarmonics; kh >= 1; --kh) {
            pf = phases[kh] += increments[kh];

            if (phases[kh] >= 1) {
                pf = phases[kh] -= 1;
                arP0[kh] = arP1[kh];
                arP1[kh] = randomFunc();
            } // if full period reached

            pfl = pf ** 2 * (3 - 2 * pf); // always 0..1, but smoother
            signal += (arP0[kh] * (1 - pfl) + arP1[kh] * pfl) * amplitudes[kh];
        } // for kh

        return signal + lowValue;
    }; // returned function
} // PathGen

export const curvesPathGenerator: IMovePathGenerator = {
    generate: (p: CurvesPathParticle) => {
        if (p.pathGen === undefined) {
            p.pathGen = pathGen(null, 100, 2, 0.8, -0.03, 0.03);
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
    },
    init: () => {
        // do nothing
    },
    update: () => {
        // do nothing
    },
};
