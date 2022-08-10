const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
const webpack = require("webpack");
const version = require("./package.json").version;
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

const banner = `tsParticles Engine v${version}
Author: Matteo Bruni
MIT license: https://opensource.org/licenses/MIT
Website: https://particles.js.org/
Confetti Website: https://confetti.js.org
GitHub: https://www.github.com/matteobruni/tsparticles
How to use?: Check the GitHub README
------------------------------------------------------`;

const minBanner = `tsParticles Engine v${version} by Matteo Bruni`;

const getConfig = (entry) => {
    return {
        entry: entry,
        mode: "production",
        output: {
            path: path.resolve(__dirname, "dist"),
            filename: "[name].js",
            libraryTarget: "umd",
            globalObject: "window",
            chunkFilename: '[name].js',
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
        plugins: [
            new webpack.BannerPlugin({
                banner,
                exclude: /\.min\.js$/
            }),
            new webpack.BannerPlugin({
                banner: minBanner,
                include: /\.min\.js$/
            }),
            new webpack.ProgressPlugin(),
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
                }),
                new TerserPlugin({
                    exclude: /\.min\.js$/,
                    terserOptions: {
                        compress: false,
                        format: {
                            beautify: true,
                            indent_level: 2,
                            semicolons: false,
                            comments: banner
                        },
                        mangle: false,
                        keep_classnames: true,
                        keep_fnames: true,
                    },
                    extractComments: false
                })
            ]
        }
    };
};

module.exports = [
    getConfig({
        "tsparticles.engine": "./dist/browser/bundle.js",
        "tsparticles.engine.min": "./dist/browser/bundle.js"
    })
];
