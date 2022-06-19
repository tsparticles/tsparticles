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

const minBanner = `React tsParticles v${version} by Matteo Bruni`;

const getConfig = (entry) => {
    const reportFileName = "report";

    return {
        entry: entry,
        output: {
            path: path.resolve(__dirname, "dist"),
            filename: "[name].js",
            libraryTarget: "umd",
            library: "Particles",
            globalObject: "this",
            chunkFilename: '[name].js',
        },
        resolve: {
            extensions: [ ".js", ".json" ]
        },
        externals: [ {
            "tsparticles-engine": {
                commonjs: "tsparticles-engine",
                commonjs2: "tsparticles-engine",
                amd: "tsparticles-engine",
                root: "window"
            }
        } ],
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
        "particles": "./dist/browser/index.js",
        "particles.min": "./dist/browser/index.js"
    })
];
