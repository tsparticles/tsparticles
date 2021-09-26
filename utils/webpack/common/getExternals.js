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

    return getParticleExternals("tsparticles-engine/Updaters/Color",
        "tsparticles-engine/Shapes/Circle",
        "tsparticles-engine/Updaters/Size",
        "tsparticles-engine/Updaters/Opacity",
        "tsparticles-engine/Updaters/OutModes",
        "tsparticles-engine/Updaters/Size",
        "tsparticles-engine/Updaters/Wobble",
        "tsparticles-engine/Updaters/Roll",
        "tsparticles-engine/Updaters/Angle",
        "tsparticles-engine/Updaters/Tilt",
        "tsparticles-engine/Shapes/Square",
        "tsparticles-engine/Updaters/Life",
        "tsparticles",
        "tsparticles-slim",
        "tsparticles-engine",
        "tsparticles-plugin-absorbers",
        "tsparticles-plugin-emitters",
        "tsparticles-plugin-infection",
        "tsparticles-plugin-polygon-mask");
};

module.exports = {
    getExternals
};
