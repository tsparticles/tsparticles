const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
const webpack = require("webpack");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const version = require("./package.json").version;

const getEntry = (name, bundle) => {
  const obj = {};
  const fileName = bundle ? "bundle" : "index";

  obj[`tsparticles.preset.${name}`] = `./dist/${fileName}.js`;
  obj[`tsparticles.preset.${name}.min`] = `./dist/${fileName}.js`;

  return obj;
};

const getExternals = (bundle) => {
  if (bundle) {
    return [];
  }

  return [
    {
      tsparticles: {
        commonjs: "tsparticles",
        commonjs2: "tsparticles",
        amd: "tsparticles",
        root: "window"
      },
      "tsparticles-engine": {
        commonjs: "tsparticles-engine",
        commonjs2: "tsparticles-engine",
        amd: "tsparticles-engine",
        root: "window"
      },
      "tsparticles-slim": {
        commonjs: "tsparticles-slim",
        commonjs2: "tsparticles-slim",
        amd: "tsparticles-slim",
        root: "window"
      },
      "tsparticles-interaction-particles-move": {
        commonjs: "tsparticles-interaction-particles-move",
        commonjs2: "tsparticles-interaction-particles-move",
        amd: "tsparticles-interaction-particles-move",
        root: "window"
      },
      "tsparticles-shape-circle": {
        commonjs: "tsparticles-shape-circle",
        commonjs2: "tsparticles-shape-circle",
        amd: "tsparticles-shape-circle",
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
      extensions: [ ".js", ".json" ]
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
        reportFilename: `report.html`
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

const minBanner = `tsParticles Snow Preset v${version} by Matteo Bruni`;

module.exports = [
  getConfig(getEntry("snow", false), banner, minBanner, __dirname, false),
  getConfig(getEntry("snow.bundle", true), banner, minBanner, __dirname, true)
];
