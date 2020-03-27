const path = require("path");
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    // Change to your "entry-point".
    entry: {
        "tsparticles": "./dist/Main.js",
        "tsparticles.min": "./dist/Main.js"
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].js",
        // libraryTarget: "umd",
        // library: "particles"
    },
    resolve: {
        extensions: [".js", ".json"]
    },
    module: {
        rules: [{
            // Include ts, tsx, js, and jsx files.
            test: /\.js$/,
            exclude: /node_modules/,
            loader: "babel-loader"
        }],
    },
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                include: /\.min\.js$/,
                sourceMap: true
            })
        ]
    }
};