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

    return getParticleExternals("tsparticles-shape-bubble",
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
        "tsparticles-engine/Updaters/Color",
        "tsparticles-engine/Updaters/Size",
        "tsparticles-engine/Updaters/Opacity",
        "tsparticles-engine/Updaters/OutModes",
        "tsparticles-engine/Updaters/Size",
        "tsparticles-engine/Updaters/Wobble",
        "tsparticles-engine/Updaters/Roll",
        "tsparticles-engine/Updaters/Angle",
        "tsparticles-engine/Updaters/Tilt",
        "tsparticles-engine/Updaters/Life",
        "tsparticles",
        "tsparticles-slim",
        "tsparticles-engine",
        "tsparticles-plugin-absorbers",
        "tsparticles-plugin-emitters",
        "tsparticles-plugin-infection",
        "tsparticles-plugin-polygon-mask"
    )
        ;
};

module.exports = {
    getExternals
};
