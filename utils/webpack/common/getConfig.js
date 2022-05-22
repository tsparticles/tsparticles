const path = require("path");
const webpack = require("webpack");
const TerserPlugin = require("terser-webpack-plugin");
const {BundleAnalyzerPlugin} = require("webpack-bundle-analyzer");
const {getExternals} = require("./getExternals");

const getConfig = (entry, bannerInput, minBannerInput, dir, bundle) => {
    return {
        entry: entry,
        output: {
            path: path.resolve(dir, "dist"),
            filename: "[name].js",
            libraryTarget: "umd",
            globalObject: "this",
            chunkFilename: '[name].js',
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
                            comments: minBannerInput
                        }
                    },
                    extractComments: false
                })
            ]
        }
    };
};

module.exports = {
    getConfig
};
