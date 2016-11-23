const externals = require( 'webpack-node-externals' );

const plugins = process.env.NODE_ENV == "production" ? 
	[
		new webpack.optimize.DedupePlugin(),
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.optimize.UglifyJsPlugin({
		    debug: false,
		    minimize: true,
		    sourceMap: false,
		    output: {
		        comments: false
		    },
		    compressor: {
		        warnings: false
		    },
		    mangle: false
		}),
		new webpack.DefinePlugin({
		    'process.env': {
		        'NODE_ENV': JSON.stringify( 'production' )
		    }
		})
	] :
	[];

const typescriptLoader = {
    test: /\.ts$/,
    exclude: /node_modules/,
    loader: 'babel-loader!ts-loader'
};

const jsonLoader = {
    test: /\.json$/,
    loader: 'json-loader'
};

const loaders = [
    typescriptLoader,
    jsonLoader
];

const config = {
    context: __dirname,
    devtool: "eval",
    resolve: {
        extensions: [ "", ".ts", ".tsx", ".js" ]
    },
    entry: {
        index: "./src/index.ts"
    },
    output: {
        path: 'lib',
        filename: "[name].js",
        libraryTarget: 'umd'
    },
    target: 'node',
    module: {
        loaders
    },
    externals: [ externals() ],
    plugins,
    node:{
        __filename: true,
        __dirname: true
    }
};

module.exports = config;