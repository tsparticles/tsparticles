const { getEngineEntry } = require("./getEngineEntry");
const { getConfig } = require("../common/getConfig");

function loadParticlesEngine(version, dir) {
    const banner = `tsParticles Engine v${version}
Author: Matteo Bruni
MIT license: https://opensource.org/licenses/MIT
Website: https://particles.js.org/
Confetti Website: https://confetti.js.org
GitHub: https://www.github.com/matteobruni/tsparticles
How to use?: Check the GitHub README
------------------------------------------------------`;

    const minBanner = `tsParticles Engine v${version} by Matteo Bruni`;

    return [
        getConfig(getEngineEntry(), banner, minBanner, dir, false)
    ];
}

module.exports = { loadParticlesEngine };
