const ReactParticles = require("./cjs/particles");

for (let key in ReactParticles) {
    ReactParticles.default[key] = ReactParticles[key];
}

module.exports = ReactParticles.default;
