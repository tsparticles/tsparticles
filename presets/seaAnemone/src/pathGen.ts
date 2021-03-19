import { IParticle, Vector } from "tsparticles";
import type { IMovePathGenerator } from "tsparticles/dist/Core/Interfaces/IMovePathGenerator";

type SeaPathParticle = IParticle & {
    pathGen?: () => number;
    seaVelocity?: Vector;
};

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

const seaPathGenerator: IMovePathGenerator = {
    init: () => {
        // do nothing
    },
    update: () => {
        // do nothing
    },
    generate: (p: SeaPathParticle) => {
        if (p.pathGen === undefined) {
            p.pathGen = pathGen(null, 100, 2, 0.8, -0.03, 0.03);
        }

        if (p.seaVelocity === undefined) {
            p.seaVelocity = Vector.create(0, 0);

            p.seaVelocity.length = Math.random() * 0.6 + 0.8;
            p.seaVelocity.angle = Math.random() * Math.PI * 2;
        } else {
            p.seaVelocity.length += 0.01;
            p.seaVelocity.angle = (p.seaVelocity.angle + p.pathGen()) % (Math.PI * 2);
        }

        p.velocity.horizontal = 0;
        p.velocity.vertical = 0;

        return p.seaVelocity;
    },
};

export { seaPathGenerator };
