const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
const webpack = require("webpack");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const version = require("./package.json").version;

<<<<<<< HEAD:shapes/circle/webpack.config.js
function getEntry(name) {
=======
const getEntry = (name, bundle) => {
>>>>>>> main:presets/firefly/webpack.config.js
    const obj = {};
    const fileName = bundle ? "bundle" : "index";

<<<<<<< HEAD:shapes/circle/webpack.config.js
    obj[`tsparticles.shape.${name}`] = "./dist/index.js";
    obj[`tsparticles.shape.${name}.min`] = "./dist/index.js";
=======
    obj[`tsparticles.preset.${name}`] = `./dist/${fileName}.js`;
    obj[`tsparticles.preset.${name}.min`] = `./dist/${fileName}.js`;
>>>>>>> main:presets/firefly/webpack.config.js

    return obj;
}

<<<<<<< HEAD:shapes/circle/webpack.config.js
function getConfig(entry, banner, minBanner, dir) {
=======
const getExternals = (bundle) => {
    if (bundle) {
        return [];
    }

    return [
        {
            "tsparticles": {
                commonjs: "tsparticles",
                commonjs2: "tsparticles",
                amd: "tsparticles",
                root: "window"
            }
        }
    ];
};

const getConfig = (entry, bannerInput, minBannerInput, dir, bundle) => {
>>>>>>> main:presets/firefly/webpack.config.js
    return {
        entry: entry,
        output: {
            path: path.resolve(dir, "dist"),
            filename: "[name].js",
            libraryTarget: "umd",
            globalObject: "this"
        },
        resolve: {
            extensions: [ ".js", ".json" ]
        },
<<<<<<< HEAD:shapes/circle/webpack.config.js
        externals: [
            {
                tsparticles: {
                    commonjs: "tsparticles",
                    commonjs2: "tsparticles",
                    amd: "tsparticles",
                    root: "window"
                },
                "tsparticles-engine": {
                    commonjs: "tsparticles-engine",
                    commonjs2: "tsparticles-engine",
                    amd: "tsparticles-engine",
                    root: "window"
                },
                "tsparticles-slim": {
                    commonjs: "tsparticles-slim",
                    commonjs2: "tsparticles-slim",
                    amd: "tsparticles-slim",
                    root: "window"
                },
            }
        ],
=======
        externals: getExternals(bundle),
>>>>>>> main:presets/firefly/webpack.config.js
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
                banner,
                exclude: /\.min\.js$/
            }),
            new webpack.BannerPlugin({
                banner: minBanner,
                include: /\.min\.js$/
            }),
            new BundleAnalyzerPlugin({
                openAnalyzer: false,
                analyzerMode: "static",
                exclude: /\.min\.js$/,
                reportFilename: `report.html`
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
}

const banner = `Author : Matteo Bruni - https://www.matteobruni.it
MIT license: https://opensource.org/licenses/MIT
Demo / Generator : https://particles.js.org/
GitHub : https://www.github.com/matteobruni/tsparticles
How to use? : Check the GitHub README
v${version}`;

<<<<<<< HEAD:shapes/circle/webpack.config.js
const minBanner = `tsParticles Circle Shape v${version} by Matteo Bruni`;

module.exports = [
    getConfig(getEntry("circle"), banner, minBanner, __dirname)
=======
const minBanner = `tsParticles Firefly Preset v${version} by Matteo Bruni`;

module.exports = [
    getConfig(getEntry("firefly", false), banner, minBanner, __dirname, false),
    getConfig(getEntry("firefly.bundle", true), banner, minBanner, __dirname, true)
>>>>>>> main:presets/firefly/webpack.config.js
];

