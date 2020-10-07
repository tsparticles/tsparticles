const ReactParticles = require("./cjs/particles");

for (let key in ReactParticles) {
    console.log(key);

    ReactParticles.default[key] = ReactParticles[key];
}

module.exports = ReactParticles.default;
