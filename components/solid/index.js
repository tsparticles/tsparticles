const InfernoParticles = require("./dist/particles");

for (let key in InfernoParticles) {
	InfernoParticles.default[key] = InfernoParticles[key];
}

module.exports = InfernoParticles.default;
