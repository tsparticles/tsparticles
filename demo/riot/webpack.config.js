const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path')

module.exports = {
    entry: {
        app: './src/index.js',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js',
        clean: true
    },
    devtool: 'source-map',
    resolve: {
        // Ensure webpack looks up node_modules from the demo package first so
        // dependencies declared in demo/riot/package.json (eg. @riotjs/hot-reload)
        // are resolvable when modules are imported from the wrappers/ directory.
        modules: [path.resolve(__dirname, 'node_modules'), 'node_modules'],
        alias: {
            // Resolve @tsparticles/riot to the source .riot file for consistency
            // with the direct import in index.js — avoids duplicate module instances.
            "@tsparticles/riot$": path.resolve(__dirname, "../../wrappers/riot/src/riot-particles.riot"),
        },
    },
    optimization: {
        runtimeChunk: {
            name: 'runtime',
        },
        splitChunks: {
            chunks: 'async',
            minSize: 20000,
            minRemainingSize: 0,
            minChunks: 1,
            maxAsyncRequests: 30,
            maxInitialRequests: 30,
            enforceSizeThreshold: 50000,
            cacheGroups: {
                defaultVendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,
                    reuseExistingChunk: true,
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true,
                },
            },
        },
    },
    devServer: {
        hot: true,
        open: true,
        historyApiFallback: {
            index: 'index.html'
        }
    },
    module: {
        rules: [
            {
                test: /\.riot$/,
                exclude: /node_modules/,
                use: [ {
                    loader: '@riotjs/webpack-loader',
                    options: {
                        hot: true
                    }
                } ]
            },
            {
                test: /\.css$/i,
                use: [ MiniCssExtractPlugin.loader, 'css-loader' ],
            },
        ]
    },
    plugins: [
        new MiniCssExtractPlugin(),
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        }),
    ]
}
