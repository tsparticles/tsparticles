const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
const webpack = require("webpack");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const version = require("./package.json").version;

const getEntry = () => {
  const obj = {};

  obj["tsparticles"] = "./dist/index.js";
  obj["tsparticles.min"] = "./dist/index.js";

  return obj;
};

const getConfig = (entry, banner, minBanner, dir) => {
  return {
    entry: entry,
    output: {
      path: path.resolve(dir, "dist"),
      filename: "[name].js",
      libraryTarget: "umd",
      globalObject: "this"
    },
    resolve: {
      extensions: [ ".js", ".json" ]
    },
    externals: [
      {
        "tsparticles-slim": {
          commonjs: "tsparticles-slim",
          commonjs2: "tsparticles-slim",
          amd: "tsparticles-slim",
          root: "window"
        }
      },
      {
        "tsparticles-core": {
          commonjs: "tsparticles-core",
          commonjs2: "tsparticles-core",
          amd: "tsparticles-core",
          root: "window"
        }
      }, {
        "tsparticles-plugin-absorbers": {
          commonjs: "tsparticles-plugin-absorbers",
          commonjs2: "tsparticles-plugin-absorbers",
          amd: "tsparticles-plugin-absorbers",
          root: "window"
        }
      }, {
        "tsparticles-plugin-emitters": {
          commonjs: "tsparticles-plugin-emitters",
          commonjs2: "tsparticles-plugin-emitters",
          amd: "tsparticles-plugin-emitters",
          root: "window"
        }
      }, {
        "tsparticles-plugin-polygon-mask": {
          commonjs: "tsparticles-plugin-polygon-mask",
          commonjs2: "tsparticles-plugin-polygon-mask",
          amd: "tsparticles-plugin-polygon-mask",
          root: "window"
        }
      }
    ],
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
        banner: banner,
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
              comments: minBanner
            }
          },
          extractComments: false
        })
      ]
    }
  };
};

const banner = `Author : Matteo Bruni - https://www.matteobruni.it
MIT license: https://opensource.org/licenses/MIT
Demo / Generator : https://particles.matteobruni.it/
GitHub : https://www.github.com/matteobruni/tsparticles
How to use? : Check the GitHub README
v${version}`;

const minBanner = `tsParticles v${version} by Matteo Bruni`;

module.exports = [
  getConfig(getEntry(), banner, minBanner, __dirname)
];
