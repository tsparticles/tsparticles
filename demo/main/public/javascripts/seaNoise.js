function NoiseGen(rndFunc, period, nbHarmonics, attenHarmonics, lowValue = 0, highValue = 1) {
    let arP0 = [];  // 'preceeding value' for each harmonic
    let arP1 = [];  // 'succeding value'
    let amplitudes = []; // amplitudes oh harmonics
    let increments = []; // n / period, wich will be added to phases for every point
    let phases = [];
    let globAmplitude = 0;

    if (!rndFunc) rndFunc = Math.random; // default value for rndFunc
    if (nbHarmonics < 1) nbHarmonics = 1;

    for (let kh = 1; kh <= nbHarmonics; ++kh) {
        arP0[kh] = rndFunc();
        arP1[kh] = rndFunc();
        amplitudes[kh] = (kh === 1) ? 1 : (amplitudes[kh - 1] * attenHarmonics);
        globAmplitude += amplitudes[kh];
        increments[kh] = kh / period;
        phases[kh] = rndFunc();
    } // for kh

    /* normalize amplitudes */
    amplitudes.forEach((value, kh) => amplitudes[kh] = value / globAmplitude * (highValue - lowValue))

    /* returned function here */
    return function () {
        let pf, pfl;
        let signal = 0;
        for (let kh = nbHarmonics; kh >= 1; --kh) {
            pf = phases[kh] += increments[kh];
            if (phases[kh] >= 1) {
                pf = phases[kh] -= 1;
                arP0[kh] = arP1[kh];
                arP1[kh] = rndFunc();
            } // if full period reached
            pfl = pf * pf * (3 - 2 * pf); // always 0..1, but smoother
            signal += (arP0[kh] * (1 - pfl) + arP1[kh] * pfl) * amplitudes[kh];
        } // for kh
        return signal + lowValue;
    } // returned function
} // NoiseGen

window.seaNoiseGenerator = {
    init: function () {
    },
    update: function () {
    },
    generate: function (p) {
        if (p.noiseGen === undefined) {
            p.noiseGen = NoiseGen(null, 100, 2, 0.8, -0.03, 0.03);
        }

        if (p.seaDir === undefined) {
            p.seaDir = Math.random() * Math.PI * 2;
        } else {
            p.seaDir = (p.seaDir + p.noiseGen()) % (Math.PI * 2);
        }

        if (p.seaSpeed === undefined) {
            p.seaSpeed = Math.random() * 0.6 + 0.8;
        } else {
            p.seaSpeed += 0.01;
        }

        p.velocity.horizontal = 0;
        p.velocity.vertical = 0;

        return {
            angle: p.seaDir,
            length: p.seaSpeed
        };
    }
};
