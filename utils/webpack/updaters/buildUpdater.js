const {getUpdaterEntry} = require("./getUpdaterEntry");
const {getConfig} = require("../common/getConfig");

function loadParticlesUpdater(moduleName, updaterName, version, dir) {
    const banner = `Author : Matteo Bruni
MIT license: https://opensource.org/licenses/MIT
Demo / Generator : https://particles.js.org/
GitHub : https://www.github.com/matteobruni/tsparticles
How to use? : Check the GitHub README
v${version}`, minBanner = `tsParticles ${updaterName} Updater v${version} by Matteo Bruni`;

    return [
        getConfig(getUpdaterEntry(moduleName, false), banner, minBanner, dir, false)
    ];
}

module.exports = {loadParticlesUpdater};
