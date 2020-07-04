const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
const webpack = require("webpack");
const version = require("./package.json").version;
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

const banner = `Author : Matteo Bruni - https://www.matteobruni.it
MIT license: https://opensource.org/licenses/MIT
Demo / Generator : https://particles.matteobruni.it/
GitHub : https://www.github.com/matteobruni/tsparticles
How to use? : Check the GitHub README
v${version}`;

const minBanner = `tsParticles Heart Shape v${version} by Matteo Bruni`;

const getConfig = (entry) => {
    const isSlim = Object.keys(entry).find((t) => t.indexOf("slim") >= 0);
    const reportFileName = isSlim ? "report.slim" : "report";

    return {
        entry: entry,
        output: {
            path: path.resolve(__dirname, "dist"),
            filename: "[name].js",
            libraryTarget: "window",
            library: ""
        },
        resolve: {
            extensions: [ ".js", ".json" ]
        },
        externals: [
            {
                "tsparticles": "window"
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
                reportFilename: `${reportFileName}.html`
            })
        ],
        optimization: {
            minimize: true,
            minimizer: [
                new TerserPlugin({
                    include: /\.min\.js$/,
                    sourceMap: false,
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
    getConfig({
        "tsparticles.shape.heart": "./dist/shape.js",
        "tsparticles.shape.heart.min": "./dist/shape.js"
    })
];
