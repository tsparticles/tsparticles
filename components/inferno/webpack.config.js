const CleanWebpackPlugin = require("clean-webpack-plugin").CleanWebpackPlugin;

module.exports = {
	mode: "none",
	entry: "./src/index.ts", // Point to main file
	externals: [
		"fast-deep-equal",
		{
			inferno: {
				commonjs: "inferno",
				commonjs2: "inferno",
				amd: "inferno",
				root: "Inferno"
			},
			"tsparticles-core": {
				"tsparticles-core": {
					commonjs: "tsparticles-core",
					commonjs2: "tsparticles-core",
					amd: "tsparticles-core",
					root: "window"
				}
			}
		}
	],
	output: {
		path: __dirname + "/dist",
		filename: "particles.js",
		libraryTarget: "commonjs"
	},
	resolve: {
		extensions: [ ".js", ".jsx", ".ts", ".tsx" ]
	},
	performance: {
		hints: false
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx|tsx|ts)$/,   // All ts and tsx files will be process by
				loader: "babel-loader",			// first babel-loader, then ts-loader
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
