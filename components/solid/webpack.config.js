const CleanWebpackPlugin = require('clean-webpack-plugin').CleanWebpackPlugin;
const pkg = require("./package.json");

module.exports = {
	mode: "none",
	entry: "./src/index.ts", // Point to main file
	externals: [...Object.keys(pkg.dependencies), "solid-js", "solid-js/dom", "solid-js/web"],
	output: {
		path: __dirname + "/dist",
		filename: "particles.js",
		libraryTarget: "umd"
	},
	resolve: {
		extensions: ['.js', '.jsx', '.ts', '.tsx']
	},
	performance: {
		hints: false
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx|tsx|ts)$/,   // All ts and tsx files will be process by
				loader: 'babel-loader',			// first babel-loader, then ts-loader
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
