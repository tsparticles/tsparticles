const CleanWebpackPlugin = require('clean-webpack-plugin').CleanWebpackPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	mode: "none",
	entry: "./src/index.ts", // Point to main file
	externals: [
		/ts[Pp]articles/,
		"lodash",
		{
			inferno: {
				commonjs: "inferno",
				commonjs2: "inferno",
				amd: "inferno",
				root: "Inferno"
			}
		}
	],
	output: {
		path: __dirname + "/dist",
		filename: "particles.js",
		libraryTarget: "commonjs"
	},
	resolve: {
		extensions: [ '.js', '.jsx', '.ts', '.tsx' ]
	},
	performance: {
		hints: false
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx|tsx|ts)$/,   // All ts and tsx files will be process by
				loaders: 'babel-loader',			// first babel-loader, then ts-loader
				exclude: /node_modules/				// ignore node_modules
			}
		]
	},
	devServer: {
		contentBase: "src/",
		historyApiFallback: true
	},
	plugins: [
		new CleanWebpackPlugin({
			verbose: true
		})
	]
};
