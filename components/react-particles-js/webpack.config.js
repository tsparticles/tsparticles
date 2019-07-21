const webpack = require( 'webpack' );
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const production = process.env.NODE_ENV === "production";

const plugins = (production ? 
	[
		new webpack.optimize.OccurrenceOrderPlugin(),
		new webpack.DefinePlugin({
		    'process.env': {
		        'NODE_ENV': JSON.stringify( 'production' )
		    }
        })
	] :
	[]).concat([
        new BundleAnalyzerPlugin({
            openAnalyzer: false,
            analyzerMode: "static",
            reportFilename: "../report.html"
        })
    ]);

const typescriptLoader = {
    test: /\.tsx?$/,
    exclude: /node_modules/,
    use: [
        {
            loader: 'babel-loader',
            options: {
                presets: ['@babel/preset-env']
            }
        }, {
            loader: 'ts-loader'
        }
    ]
};

const jsonLoader = {
    test: /\.json$/,
    use: 'json-loader'
};

const rules = [
    typescriptLoader,
    jsonLoader
];

const config = {
    mode: production ? 'production' : 'development',
    context: __dirname,
    devtool: production ? false : "source-map-loader",
    resolve: {
        extensions: [ ".ts", ".tsx", ".js" ]
    },
    entry: "./src/index.ts",
    output: {
        path: __dirname + '/lib',
        filename: "particles.js",
        library: "Particles",
        libraryTarget: 'umd',
        pathinfo: false,
        globalObject: 'this'
    },
    target: 'web',
    module: {
        rules
    },
    externals: [
        {
            react: {
                commonjs: "react",
                commonjs2: "react",
                amd: "react",
                root: "React"
            }
        }
        
    ],
    plugins
};

module.exports = config;