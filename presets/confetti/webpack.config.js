const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
const webpack = require("webpack");
const {BundleAnalyzerPlugin} = require("webpack-bundle-analyzer");

const getEntry = (name, bundle) => {
    const obj = {};
    const fileName = bundle ? "bundle" : "index";

    obj[`tsparticles.preset.${name}`] = `./dist/${fileName}.js`;
    obj[`tsparticles.preset.${name}.min`] = `./dist/${fileName}.js`;

    return obj;
}

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

const getConfig = (entry, bannerInput, minBannerInput, dir, bundle) => {
    return {
        entry: entry,
        output: {
            path: path.resolve(dir, "dist"),
            filename: "[name].js",
            libraryTarget: "umd",
            globalObject: "this"
        },
        resolve: {
            extensions: [".js", ".json"]
        },
        externals: getExternals(bundle),
        module: {
            rules: [
                {
                    // Include ts, tsx, js, and jsx files.
                    test: /\.js$/,
                    exclude: /node_modules/,
                    loader: "babel-loader"
                }
            ]
        },
        plugins: [
            new webpack.BannerPlugin({
                banner: bannerInput,
                exclude: /\.min\.js$/
            }),
            new webpack.BannerPlugin({
                banner: minBannerInput,
                include: /\.min\.js$/
            }),
            new BundleAnalyzerPlugin({
                openAnalyzer: false,
                analyzerMode: "static",
                exclude: /\.min\.js$/,
                reportFilename: "report.html"
            })
        ],
        optimization: {
            minimize: true,
            minimizer: [
                new TerserPlugin({
                    include: /\.min\.js$/,
                    terserOptions: {
                        output: {
                            comments: minBanner
                        }
                    },
                    extractComments: false
                })
            ]
        }
    };
};

const version = require("./package.json").version;

const banner = `Author : Matteo Bruni
MIT license: https://opensource.org/licenses/MIT
Demo / Generator : https://particles.js.org/
GitHub : https://www.github.com/matteobruni/tsparticles
How to use? : Check the GitHub README
v${version}`;

const minBanner = `tsParticles Confetti Preset v${version} by Matteo Bruni`;

module.exports = [
    getConfig(getEntry("confetti", false), banner, minBanner, __dirname, false),
    getConfig(getEntry("confetti.bundle", true), banner, minBanner, __dirname, true)
];
