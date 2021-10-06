const {getShapeEntry} = require("./getShapeEntry");
const {getConfig} = require("../common/getConfig");

function loadParticlesShape(moduleName, shapeName, version, dir) {
    const banner = `Author : Matteo Bruni
MIT license: https://opensource.org/licenses/MIT
Demo / Generator : https://particles.js.org/
GitHub : https://www.github.com/matteobruni/tsparticles
How to use? : Check the GitHub README
v${version}`, minBanner = `tsParticles ${shapeName} Shape v${version} by Matteo Bruni`;

    return [
        getConfig(getShapeEntry(moduleName, false), banner, minBanner, dir, false)
    ];
}

module.exports = {loadParticlesShape};
