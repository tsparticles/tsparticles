const ReactParticles = require('./cjs/particles');
for (const key in ReactParticles) {
    ReactParticles.default[key] = ReactParticles[key];
}
module.exports = ReactParticles.default;