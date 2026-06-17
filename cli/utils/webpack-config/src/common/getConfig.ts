import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import type { ExternalData } from "./ExternalData.js";
import TerserPlugin from "terser-webpack-plugin";
import { getEntry } from "./getEntry.js";
import { getExternals } from "./getExternals.js";
import path from "node:path";
import webpack from "webpack";

interface ConfigParams {
  additionalExternals?: ExternalData[];
  banner: string;
  bundle?: boolean;
  dir: string;
  entry: {
    bundle: boolean;
    format: string;
    name?: string;
  };
  minBanner: string;
  progress: boolean;
  version: string;
}

/**
 *
 * @param params - The parameters
 * @param min - The minimum value
 * @param lazy - The lazy
 * @returns the webpack configuration
 */
function getSingleConfig(params: ConfigParams, min: boolean, lazy: boolean): unknown {
  const { additionalExternals, banner, bundle, dir, entry, minBanner, version } = params;

  return {
    entry: getEntry({ ...entry, min, lazy }),
    target: "web",
    mode: min ? "production" : "development",
    output: {
      path: path.resolve(dir, "dist"),
      filename: "[name].js",
      library: {
        type: "umd2",
      },
      globalObject: "this",
      chunkFilename: min ? "[name].min.js" : "[name].js",
    },
    resolve: {
      extensions: [".cjs", ".mjs", ".js", ".json"],
    },
    externals: getExternals({ bundle, additionalExternals }),
    module: {
      rules: [
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: "swc-loader",
            options: {
              jsc: {
                parser: {
                  syntax: "ecmascript",
                },
                target: "es2022",
              },
              module: {
                type: "es6",
              },
            },
          },
        },
      ],
    },
    plugins: [
      new webpack.DefinePlugin({
        __VERSION__: JSON.stringify(version),
      }),
      new webpack.BannerPlugin({
        banner,
        exclude: /\.min\.js$/,
      }),
      new webpack.BannerPlugin({
        banner: minBanner,
        include: /\.min\.js$/,
      }),
      params.progress ? new webpack.ProgressPlugin() : undefined,
      new BundleAnalyzerPlugin({
        openAnalyzer: false,
        analyzerMode: "static",
        excludeAssets: /\.min\.js$/,
        reportFilename: "report.html",
      }),
    ].filter(Boolean),
    optimization: {
      minimize: min,
      concatenateModules: false,
      minimizer: [
        new TerserPlugin({
          include: /\.min\.js$/,
          minify: TerserPlugin.swcMinify,
          parallel: true,
          terserOptions: {
            compress: {
              unused: true,
              dead_code: true,
            },
            mangle: true,
            format: {
              comments: false,
            },
          },
        }),
      ],
    },
    performance: {
      hints: false,
    },
  };
}

const getConfig = (params: ConfigParams): unknown[] => {
  return [
    getSingleConfig(params, false, false),
    getSingleConfig(params, true, false),
    getSingleConfig(params, false, true),
    getSingleConfig(params, true, true),
  ];
};

export { getConfig };
