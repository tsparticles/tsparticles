const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
const webpack = require("webpack");
const version = require("./package.json").version;
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

const banner = `Author : Matteo Bruni
MIT license: https://opensource.org/licenses/MIT
Demo / Generator : https://particles.js.org/
GitHub : https://www.github.com/matteobruni/tsparticles
How to use? : Check the GitHub README
v${version}`;

const minBanner = `tsParticles Editor v${version} by Matteo Bruni`;

const getJsConfig = (entry) => {
    const reportFileName = "report";

    return {
        entry: entry,
        output: {
            path: path.resolve(__dirname, "dist"),
            filename: "[name].js",
            libraryTarget: "umd",
            globalObject: "this"
        },
        resolve: {
            extensions: [ ".js", ".json" ]
        },
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
        externals: [
            {
                tsparticles: {
                    commonjs: "tsparticles",
                    commonjs2: "tsparticles",
                    amd: "tsparticles",
                    root: "window"
                },
                "tsparticles/Plugins/Absorbers": {
                    commonjs: "tsparticles/Plugins/Absorbers",
                    commonjs2: "tsparticles/Plugins/Absorbers",
                    amd: "tsparticles/Plugins/Absorbers",
                    root: "window"
                },
                "tsparticles/Plugins/Emitters": {
                    commonjs: "tsparticles/Plugins/Emitters",
                    commonjs2: "tsparticles/Plugins/Emitters",
                    amd: "tsparticles/Plugins/Emitters",
                    root: "window"
                },
                "object-gui": {
                    commonjs: "object-gui",
                    commonjs2: "object-gui",
                    amd: "object-gui",
                    root: "window"
                }
            }
        ],
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
                reportFilename: `${reportFileName}.html`
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

module.exports = [
    getJsConfig({
        "tsparticles.editor": "./dist/browser/index.js",
        "tsparticles.editor.min": "./dist/browser/index.js"
    })
];
