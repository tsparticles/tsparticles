const {getBundleEntry} = require("./getBundleEntry");
const {getConfig} = require("../common/getConfig");

function loadParticlesBundle(moduleName, bundleName, version, dir) {
    const fixBundleName = bundleName ? `${bundleName} ` : "";
    const banner = `Author : Matteo Bruni
MIT license: https://opensource.org/licenses/MIT
Demo / Generator : https://particles.js.org/
GitHub : https://www.github.com/matteobruni/tsparticles
How to use? : Check the GitHub README
v${version}`, minBanner = `tsParticles ${fixBundleName}v${version} by Matteo Bruni`;

    return [
        getConfig(getBundleEntry(moduleName, false), banner, minBanner, dir, false),
        getConfig(getBundleEntry(`${moduleName}.bundle`, true), banner, minBanner, dir, true)
    ];
}

module.exports = {loadParticlesBundle};
