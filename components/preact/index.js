const PreactParticles = require("./cjs/particles");

for (let key in PreactParticles) {
    PreactParticles.default[key] = PreactParticles[key];
}

module.exports = PreactParticles.default;
