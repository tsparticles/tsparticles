const {getConfig} = require("../common/getConfig");
const {getEntry} = require("../common/getEntry");

function loadParticlesConfigs(version, dir) {
    const banner = `Author : Matteo Bruni
MIT license: https://opensource.org/licenses/MIT
Demo / Generator : https://particles.js.org/
GitHub : https://www.github.com/matteobruni/tsparticles
How to use? : Check the GitHub README
v${version}`, minBanner = `tsParticles Demo Configs v${version} by Matteo Bruni`;

    return [
        getConfig(getEntry("", "configs", false), banner, minBanner, dir, false)
    ];
}

module.exports = {loadParticlesConfigs};
