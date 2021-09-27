const getParticleExternal = (name) => {
    const res = {};

    res[name] = {
        commonjs: name,
        commonjs2: name,
        amd: name,
        root: "window"
    };

    return res;
}

const getParticleExternals = (...names) => {
    return names.map(name => getParticleExternal(name));
}

const getExternals = (bundle) => {
    if (bundle) {
        return [];
    }

    return getParticleExternals("tsparticles",
        "tsparticles-slim",
        "tsparticles-engine",
        "tsparticles-interaction-external-attract",
        "tsparticles-interaction-external-bounce",
        "tsparticles-interaction-external-bubble",
        "tsparticles-interaction-external-connect",
        "tsparticles-interaction-external-grab",
        "tsparticles-interaction-external-pause",
        "tsparticles-interaction-external-push",
        "tsparticles-interaction-external-remove",
        "tsparticles-interaction-external-repulse",
        "tsparticles-interaction-external-trail",
        "tsparticles-interaction-light",
        "tsparticles-interaction-particles-attract",
        "tsparticles-interaction-particles-collisions",
        "tsparticles-interaction-particles-links",
        "tsparticles-interaction-particles-repulse",
        "tsparticles-plugin-absorbers",
        "tsparticles-plugin-emitters",
        "tsparticles-plugin-infection",
        "tsparticles-plugin-polygon-mask",
        "tsparticles-shape-bubble",
        "tsparticles-shape-circle",
        "tsparticles-shape-heart",
        "tsparticles-shape-image",
        "tsparticles-shape-line",
        "tsparticles-shape-multiline-text",
        "tsparticles-shape-polygon",
        "tsparticles-shape-rounded-rect",
        "tsparticles-shape-spiral",
        "tsparticles-shape-square",
        "tsparticles-shape-star",
        "tsparticles-shape-text",
        "tsparticles-updater-color",
        "tsparticles-updater-size",
        "tsparticles-updater-opacity",
        "tsparticles-updater-out-modes",
        "tsparticles-updater-size",
        "tsparticles-updater-wobble",
        "tsparticles-updater-roll",
        "tsparticles-updater-angle",
        "tsparticles-updater-tilt",
        "tsparticles-updater-life");
};

module.exports = {
    getExternals
};
