const {getEntry} = require("../../common/getEntry");

const getInteractionParticlesEntry = (name, bundle) => {
    return getEntry("interaction.particles", name, bundle);
}

module.exports = {
    getInteractionParticlesEntry
};
