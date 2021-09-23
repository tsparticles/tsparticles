const getExternals = (bundle) => {
    if (bundle) {
        return [];
    }

    return [
        {
            "tsparticles-engine/Updaters/Color": {
                commonjs: "tsparticles-engine/Updaters/Color",
                commonjs2: "tsparticles-engine/Updaters/Color",
                amd: "tsparticles-engine/Updaters/Color",
                root: "window"
            }
        },
        {
            "tsparticles-engine/Plugins/Emitters/plugin": {
                commonjs: "tsparticles-engine/Plugins/Emitters/plugin",
                commonjs2: "tsparticles-engine/Plugins/Emitters/plugin",
                amd: "tsparticles-engine/Plugins/Emitters/plugin",
                root: "window"
            }
        },
        {
            "tsparticles-engine/Shapes/Circle": {
                commonjs: "tsparticles-engine/Shapes/Circle",
                commonjs2: "tsparticles-engine/Shapes/Circle",
                amd: "tsparticles-engine/Shapes/Circle",
                root: "window"
            }
        },
        {
            "tsparticles-engine/Updaters/Size": {
                commonjs: "tsparticles-engine/Updaters/Size",
                commonjs2: "tsparticles-engine/Updaters/Size",
                amd: "tsparticles-engine/Updaters/Size",
                root: "window"
            }
        },
        {
            "tsparticles-engine/Updaters/Opacity": {
                commonjs: "tsparticles-engine/Updaters/Opacity",
                commonjs2: "tsparticles-engine/Updaters/Opacity",
                amd: "tsparticles-engine/Updaters/Opacity",
                root: "window"
            }
        },
        {
            "tsparticles-engine/Updaters/OutModes": {
                commonjs: "tsparticles-engine/Updaters/OutModes",
                commonjs2: "tsparticles-engine/Updaters/OutModes",
                amd: "tsparticles-engine/Updaters/OutModes",
                root: "window"
            }
        },
        {
            "tsparticles-engine/Updaters/Size": {
                commonjs: "tsparticles-engine/Updaters/Size",
                commonjs2: "tsparticles-engine/Updaters/Size",
                amd: "tsparticles-engine/Updaters/Size",
                root: "window"
            }
        },
        {
            "tsparticles-engine/Updaters/Wobble": {
                commonjs: "tsparticles-engine/Updaters/Wobble",
                commonjs2: "tsparticles-engine/Updaters/Wobble",
                amd: "tsparticles-engine/Updaters/Wobble",
                root: "window"
            }
        },
        {
            "tsparticles-engine/Updaters/Roll": {
                commonjs: "tsparticles-engine/Updaters/Roll",
                commonjs2: "tsparticles-engine/Updaters/Roll",
                amd: "tsparticles-engine/Updaters/Roll",
                root: "window"
            }
        },
        {
            "tsparticles-engine/Updaters/Angle": {
                commonjs: "tsparticles-engine/Updaters/Angle",
                commonjs2: "tsparticles-engine/Updaters/Angle",
                amd: "tsparticles-engine/Updaters/Angle",
                root: "window"
            }
        },
        {
            "tsparticles-engine/Updaters/Tilt": {
                commonjs: "tsparticles-engine/Updaters/Tilt",
                commonjs2: "tsparticles-engine/Updaters/Tilt",
                amd: "tsparticles-engine/Updaters/Tilt",
                root: "window"
            }
        },
        {
            "tsparticles-engine/Shapes/Square": {
                commonjs: "tsparticles-engine/Shapes/Square",
                commonjs2: "tsparticles-engine/Shapes/Square",
                amd: "tsparticles-engine/Shapes/Square",
                root: "window"
            }
        },
        {
            "tsparticles-engine/Updaters/Life": {
                commonjs: "tsparticles-engine/Updaters/Life",
                commonjs2: "tsparticles-engine/Updaters/Life",
                amd: "tsparticles-engine/Updaters/Life",
                root: "window"
            }
        },
        {
            "tsparticles": {
                commonjs: "tsparticles",
                commonjs2: "tsparticles",
                amd: "tsparticles",
                root: "window"
            }
        },
        {
            "tsparticles-slim": {
                commonjs: "tsparticles-slim",
                commonjs2: "tsparticles-slim",
                amd: "tsparticles-slim",
                root: "window"
            }
        },
        {
            "tsparticles-engine": {
                commonjs: "tsparticles-engine",
                commonjs2: "tsparticles-engine",
                amd: "tsparticles-engine",
                root: "window"
            }
        }
    ];
};

module.exports = {
    getExternals
};
