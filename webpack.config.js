const path = require("path");
const TerserPlugin = require('terser-webpack-plugin');
const webpack = require('webpack');
const version = require('./package.json').version;
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const banner = `Author : Matteo Bruni - https://www.matteobruni.it
MIT license: https://opensource.org/licenses/MIT
Demo / Generator : https://particles.matteobruni.it/
GitHub : https://www.github.com/matteobruni/tsparticles
How to use? : Check the GitHub README
v${version}`;

const minBanner = `tsParticles v${version} by Matteo Bruni`;

module.exports = {
    // Change to your "entry-point".
    entry: {
        "tsparticles.slim": "./dist/index.slim.js",
        "tsparticles.slim.min": "./dist/index.slim.js",
        "tsparticles": "./dist/index.js",
        "tsparticles.min": "./dist/index.js"
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].js",
        libraryTarget: "window",
        library: ""
    },
    resolve: {
        extensions: [ ".js", ".json" ]
    },
    module: {
        rules: [ {
            // Include ts, tsx, js, and jsx files.
            test: /\.js$/,
            exclude: /node_modules/,
            loader: "babel-loader"
        } ],
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
            reportFilename: "../demo/public/report.html"
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