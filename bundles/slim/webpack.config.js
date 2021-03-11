const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
const webpack = require("webpack");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const version = require("./package.json").version;

const getEntry = (name) => {
  const obj = {};

  obj[`tsparticles.${name}`] = "./dist/index.js";
  obj[`tsparticles.${name}.min`] = "./dist/index.js";

  return obj;
};

const getExternals = (bundle) => {
  if (bundle) {
    return [];
  }

  return [
    {
      "tsparticles-engine": {
        commonjs: "tsparticles-engine",
        commonjs2: "tsparticles-engine",
        amd: "tsparticles-engine",
        root: "window"
      }
    },
    {
      "tsparticles-interaction-external-attract": {
        commonjs: "tsparticles-interaction-external-attract",
        commonjs2: "tsparticles-interaction-external-attract",
        amd: "tsparticles-interaction-external-attract",
        root: "window"
      }
    },
    {
      "tsparticles-interaction-external-repulse": {
        commonjs: "tsparticles-interaction-external-repulse",
        commonjs2: "tsparticles-interaction-external-repulse",
        amd: "tsparticles-interaction-external-repulse",
        root: "window"
      }
    },
    {
      "tsparticles-interaction-particles-attract": {
        commonjs: "tsparticles-interaction-particles-attract",
        commonjs2: "tsparticles-interaction-particles-attract",
        amd: "tsparticles-interaction-particles-attract",
        root: "window"
      }
    },
    {
      "tsparticles-interaction-particles-move": {
        commonjs: "tsparticles-interaction-particles-move",
        commonjs2: "tsparticles-interaction-particles-move",
        amd: "tsparticles-interaction-particles-move",
        root: "window"
      }
    },
    {
      "tsparticles-interaction-particles-parallax": {
        commonjs: "tsparticles-interaction-particles-parallax",
        commonjs2: "tsparticles-interaction-particles-parallax",
        amd: "tsparticles-interaction-particles-parallax",
        root: "window"
      }
    },
    {
      "tsparticles-interaction-particles-repulse": {
        commonjs: "tsparticles-interaction-particles-repulse",
        commonjs2: "tsparticles-interaction-particles-repulse",
        amd: "tsparticles-interaction-particles-repulse",
        root: "window"
      }
    },
    {
      "tsparticles-shape-circle": {
        commonjs: "tsparticles-shape-circle",
        commonjs2: "tsparticles-shape-circle",
        amd: "tsparticles-shape-circle",
        root: "window"
      }
    },
    {
      "tsparticles-shape-image": {
        commonjs: "tsparticles-shape-image",
        commonjs2: "tsparticles-shape-image",
        amd: "tsparticles-shape-image",
        root: "window"
      }
    },
    {
      "tsparticles-shape-line": {
        commonjs: "tsparticles-shape-line",
        commonjs2: "tsparticles-shape-line",
        amd: "tsparticles-shape-line",
        root: "window"
      }
    },
    {
      "tsparticles-shape-polygon": {
        commonjs: "tsparticles-shape-polygon",
        commonjs2: "tsparticles-shape-polygon",
        amd: "tsparticles-shape-polygon",
        root: "window"
      }
    },
    {
      "tsparticles-shape-square": {
        commonjs: "tsparticles-shape-square",
        commonjs2: "tsparticles-shape-square",
        amd: "tsparticles-shape-square",
        root: "window"
      }
    },
    {
      "tsparticles-shape-star": {
        commonjs: "tsparticles-shape-star",
        commonjs2: "tsparticles-shape-star",
        amd: "tsparticles-shape-star",
        root: "window"
      }
    },
    {
      "tsparticles-shape-text": {
        commonjs: "tsparticles-shape-text",
        commonjs2: "tsparticles-shape-text",
        amd: "tsparticles-shape-text",
        root: "window"
      }
    },
    {
      "tsparticles-interaction-external-bouncer": {
        commonjs: "tsparticles-interaction-external-bouncer",
        commonjs2: "tsparticles-interaction-external-bouncer",
        amd: "tsparticles-interaction-external-bouncer",
        root: "window"
      }
    },
    {
      "tsparticles-interaction-external-bubble": {
        commonjs: "tsparticles-interaction-external-bubble",
        commonjs2: "tsparticles-interaction-external-bubble",
        amd: "tsparticles-interaction-external-bubble",
        root: "window"
      }
    },
    {
      "tsparticles-interaction-external-connect": {
        commonjs: "tsparticles-interaction-external-connect",
        commonjs2: "tsparticles-interaction-external-connect",
        amd: "tsparticles-interaction-external-connect",
        root: "window"
      }
    },
    {
      "tsparticles-interaction-external-grab": {
        commonjs: "tsparticles-interaction-external-grab",
        commonjs2: "tsparticles-interaction-external-grab",
        amd: "tsparticles-interaction-external-grab",
        root: "window"
      }
    },
    {
      "tsparticles-interaction-particles-collisions": {
        commonjs: "tsparticles-interaction-external-collisions",
        commonjs2: "tsparticles-interaction-external-collisions",
        amd: "tsparticles-interaction-external-collisions",
        root: "window"
      }
    },
    {
      "tsparticles-interaction-particles-links": {
        commonjs: "tsparticles-interaction-external-links",
        commonjs2: "tsparticles-interaction-external-links",
        amd: "tsparticles-interaction-external-links",
        root: "window"
      }
    },
    {
      "tsparticles-updater-angle": {
        commonjs: "tsparticles-updater-angle",
        commonjs2: "tsparticles-updater-angle",
        amd: "tsparticles-updater-angle",
        root: "window"
      }
    },
    {
      "tsparticles-updater-color": {
        commonjs: "tsparticles-updater-color",
        commonjs2: "tsparticles-updater-color",
        amd: "tsparticles-updater-color",
        root: "window"
      }
    },
    {
      "tsparticles-updater-life": {
        commonjs: "tsparticles-updater-life",
        commonjs2: "tsparticles-updater-life",
        amd: "tsparticles-updater-life",
        root: "window"
      }
    },
    {
      "tsparticles-updater-opacity": {
        commonjs: "tsparticles-updater-opacity",
        commonjs2: "tsparticles-updater-opacity",
        amd: "tsparticles-updater-life",
        root: "window"
      }
    },
    {
      "tsparticles-updater-out-modes": {
        commonjs: "tsparticles-updater-out-modes",
        commonjs2: "tsparticles-updater-out-modes",
        amd: "tsparticles-updater-out-modes",
        root: "window"
      }
    },
    {
      "tsparticles-updater-size": {
        commonjs: "tsparticles-updater-size",
        commonjs2: "tsparticles-updater-size",
        amd: "tsparticles-updater-size",
        root: "window"
      }
    },
    {
      "tsparticles-updater-stroke-color": {
        commonjs: "tsparticles-updater-stroke-color",
        commonjs2: "tsparticles-updater-stroke-color",
        amd: "tsparticles-updater-stroke-color",
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

const minBanner = `tsParticles Slim v${version} by Matteo Bruni`;

module.exports = [
  getConfig(getEntry("slim"), banner, minBanner, __dirname, false),
  getConfig(getEntry("slim.bundle"), banner, minBanner, __dirname, true)
];
