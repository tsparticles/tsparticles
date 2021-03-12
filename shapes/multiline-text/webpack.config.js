const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
const webpack = require("webpack");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const version = require("./package.json").version;

function getEntry(name) {
    const obj = {};

    obj[`tsparticles.shape.${name}`] = "./dist/index.js";
    obj[`tsparticles.shape.${name}.min`] = "./dist/index.js";

    return obj;
}

function getConfig(entry, banner, minBanner, dir) {
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

const minBanner = `tsParticles Multiline Text Shape v${version} by Matteo Bruni`;

module.exports = [
    getConfig(getEntry("multiline-text"), banner, minBanner, __dirname)
];
