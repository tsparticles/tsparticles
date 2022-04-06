const {getPluginEntry} = require("./getPluginEntry");
const {getConfig} = require("../common/getConfig");

function loadParticlesPlugin(moduleName, pluginName, version, dir) {
    const banner = `Author : Matteo Bruni
MIT license: https://opensource.org/licenses/MIT
Demo / Generator : https://particles.js.org/
GitHub : https://www.github.com/matteobruni/tsparticles
How to use? : Check the GitHub README
v${version}`, minBanner = `tsParticles ${pluginName} Plugin v${version} by Matteo Bruni`;

    return [
        getConfig(getPluginEntry(moduleName, false), banner, minBanner, dir, false)
    ];
}

module.exports = {loadParticlesPlugin};
