const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
const webpack = require("webpack");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const version = require("./package.json").version;

const getEntry = (bundle) => {
  const obj = {};

  obj[`tsparticles${bundle ? ".bundle" : ""}`] = "./dist/index.js";
  obj[`tsparticles${bundle ? ".bundle" : ""}.min`] = "./dist/index.js";

  return obj;
};

const getExternals = (bundle) => {
  if (bundle) {
    return [];
  }

  return [
    {
      "tsparticles-slim": {
        commonjs: "tsparticles-slim",
        commonjs2: "tsparticles-slim",
        amd: "tsparticles-slim",
        root: "window"
      }
    },
    {
      "tsparticles-engine": {
        commonjs: "tsparticles-engine",
        commonjs2: "tsparticles-engine",
        amd: "tsparticles-engine",
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
    },
    {
      "tsparticles-plugin-infection": {
        commonjs: "tsparticles-plugin-infection",
        commonjs2: "tsparticles-plugin-infection",
        amd: "tsparticles-plugin-infection",
        root: "window"
      }
    }, {
      "tsparticles-plugin-polygon-mask": {
        commonjs: "tsparticles-plugin-polygon-mask",
        commonjs2: "tsparticles-plugin-polygon-mask",
        amd: "tsparticles-plugin-polygon-mask",
        root: "window"
      }
    },
    {
      "tsparticles-interaction-external-trail": {
        commonjs: "tsparticles-interaction-external-trail",
        commonjs2: "tsparticles-interaction-external-trail",
        amd: "tsparticles-interaction-external-trail",
        root: "window"
      }
    },
    {
      "tsparticles-interaction-light": {
        commonjs: "tsparticles-interaction-light",
        commonjs2: "tsparticles-interaction-light",
        amd: "tsparticles-interaction-light",
        root: "window"
      }
    },
    {
      "tsparticles-updater-orbit": {
        commonjs: "tsparticles-updater-orbit",
        commonjs2: "tsparticles-updater-orbit",
        amd: "tsparticles-updater-orbit",
        root: "window"
      }
    }
  ];
};

const getConfig = (entry, banner, minBanner, dir, bundle) => {
  return {
    entry: entry,
    output: {
      path: path.resolve(dir, "dist"),
      filename: "[name].js",
      libraryTarget: "umd",
      globalObject: "this"
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
Demo / Generator : https://particles.js.org/
GitHub : https://www.github.com/matteobruni/tsparticles
How to use? : Check the GitHub README
v${version}`;

const minBanner = `tsParticles v${version} by Matteo Bruni`;

module.exports = [
  getConfig(getEntry(false), banner, minBanner, __dirname, false),
  getConfig(getEntry(true), banner, minBanner, __dirname, true)
];
