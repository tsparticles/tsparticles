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
        "tsparticles-path-curves",
        "tsparticles-path-perlin-noise",
        "tsparticles-path-polygon",
        "tsparticles-path-simplex-noise",
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
        "tsparticles-updater-angle",
        "tsparticles-updater-color",
        "tsparticles-updater-gradient",
        "tsparticles-updater-life",
        "tsparticles-updater-opacity",
        "tsparticles-updater-orbit",
        "tsparticles-updater-out-modes",
        "tsparticles-updater-roll",
        "tsparticles-updater-size",
        "tsparticles-updater-tilt",
        "tsparticles-updater-wobble");
};

module.exports = {
    getExternals
};
