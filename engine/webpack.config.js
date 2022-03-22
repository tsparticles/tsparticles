const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
const webpack = require("webpack");
const version = require("./package.json").version;
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

const banner = `Author : Matteo Bruni
MIT license: https://opensource.org/licenses/MIT
Demo / Generator : https://particles.js.org/
GitHub : https://www.github.com/matteobruni/tsparticles
How to use? : Check the GitHub README
v${version}`;

const minBanner = `tsParticles v${version} by Matteo Bruni`;

const getConfig = (entry) => {
    const isSlim = Object.keys(entry).find((t) => t.indexOf("slim") >= 0);
    const reportFileName = isSlim ? "report.slim" : "report";

    return {
        entry: entry,
        output: {
            path: path.resolve(__dirname, "dist"),
            filename: "[name].js",
            libraryTarget: "umd",
            globalObject: "window"
        },
        resolve: {
            extensions: [ ".js", ".json" ]
        },
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
                banner,
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
                reportFilename: `${reportFileName}.html`
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
                }),
                new TerserPlugin({
                    exclude: /\.min\.js$/,
                    terserOptions: {
                        compress: false,
                        format: {
                            beautify: true,
                            indent_level: 2,
                            semicolons: false,
                            comments: banner
                        },
                        mangle: false,
                        keep_classnames: true,
                        keep_fnames: true,
                    },
                    extractComments: false
                })
            ]
        }
    };
};

module.exports = [
    getConfig({
        "tsparticles.engine": "./dist/browser/index.engine.js",
        "tsparticles.engine.min": "./dist/browser/index.engine.js"
    }),
    getConfig({
        "tsparticles.slim": "./dist/browser/index.slim.js",
        "tsparticles.slim.min": "./dist/browser/index.slim.js"
    }),
    getConfig({
        tsparticles: "./dist/browser/index.js",
        "tsparticles.min": "./dist/browser/index.js"
    }),
    getConfig({
        "tsparticles.interaction.external.attract": "./dist/browser/Interactions/External/Attract/index.js",
        "tsparticles.interaction.external.attract.min": "./dist/browser/Interactions/External/Attract/index.js",
    }),
    getConfig({
        "tsparticles.interaction.external.bounce": "./dist/browser/Interactions/External/Bounce/index.js",
        "tsparticles.interaction.external.bounce.min": "./dist/browser/Interactions/External/Bounce/index.js",
    }),
    getConfig({
        "tsparticles.interaction.external.bubble": "./dist/browser/Interactions/External/Bubble/index.js",
        "tsparticles.interaction.external.bubble.min": "./dist/browser/Interactions/External/Bubble/index.js",
    }),
    getConfig({
        "tsparticles.interaction.external.connect": "./dist/browser/Interactions/External/Connect/index.js",
        "tsparticles.interaction.external.connect.min": "./dist/browser/Interactions/External/Connect/index.js",
    }),
    getConfig({
        "tsparticles.interaction.external.grab": "./dist/browser/Interactions/External/Grab/index.js",
        "tsparticles.interaction.external.grab.min": "./dist/browser/Interactions/External/Grab/index.js",
    }),
    getConfig({
        "tsparticles.interaction.external.repulse": "./dist/browser/Interactions/External/Repulse/index.js",
        "tsparticles.interaction.external.repulse.min": "./dist/browser/Interactions/External/Repulse/index.js",
    }),
    getConfig({
        "tsparticles.interaction.external.trail": "./dist/browser/Interactions/External/Trail/index.js",
        "tsparticles.interaction.external.trail.min": "./dist/browser/Interactions/External/Trail/index.js",
    }),
    getConfig({
        "tsparticles.interaction.particles.attract": "./dist/browser/Interactions/Particles/Attract/index.js",
        "tsparticles.interaction.particles.attract.min": "./dist/browser/Interactions/Particles/Attract/index.js",
    }),
    getConfig({
        "tsparticles.interaction.particles.collisions": "./dist/browser/Interactions/Particles/Collisions/index.js",
        "tsparticles.interaction.particles.collisions.min": "./dist/browser/Interactions/Particles/Collisions/index.js",
    }),
    getConfig({
        "tsparticles.interaction.particles.links": "./dist/browser/Interactions/Particles/Links/index.js",
        "tsparticles.interaction.particles.links.min": "./dist/browser/Interactions/Particles/Links/index.js",
    }),
    getConfig({
        "tsparticles.plugins.absorbers": "./dist/browser/Plugins/Absorbers/index.js",
        "tsparticles.plugins.absorbers.min": "./dist/browser/Plugins/Absorbers/index.js",
    }),
    getConfig({
        "tsparticles.plugins.emitters": "./dist/browser/Plugins/Emitters/index.js",
        "tsparticles.plugins.emitters.min": "./dist/browser/Plugins/Emitters/index.js",
    }),
    getConfig({
        "tsparticles.plugins.polygonMask": "./dist/browser/Plugins/PolygonMask/index.js",
        "tsparticles.plugins.polygonMask.min": "./dist/browser/Plugins/PolygonMask/index.js",
    }),
    getConfig({
        "tsparticles.shape.circle": "./dist/browser/Shapes/Circle/index.js",
        "tsparticles.shape.circle.min": "./dist/browser/Shapes/Circle/index.js",
    }),
    getConfig({
        "tsparticles.shape.image": "./dist/browser/Shapes/Image/index.js",
        "tsparticles.shape.image.min": "./dist/browser/Shapes/Image/index.js",
    }),
    getConfig({
        "tsparticles.shape.line": "./dist/browser/Shapes/Line/index.js",
        "tsparticles.shape.line.min": "./dist/browser/Shapes/Line/index.js",
    }),
    getConfig({
        "tsparticles.shape.polygon": "./dist/browser/Shapes/Polygon/index.js",
        "tsparticles.shape.polygon.min": "./dist/browser/Shapes/Polygon/index.js",
    }),
    getConfig({
        "tsparticles.shape.square": "./dist/browser/Shapes/Square/index.js",
        "tsparticles.shape.square.min": "./dist/browser/Shapes/Square/index.js",
    }),
    getConfig({
        "tsparticles.shape.star": "./dist/browser/Shapes/Star/index.js",
        "tsparticles.shape.star.min": "./dist/browser/Shapes/Star/index.js",
    }),
    getConfig({
        "tsparticles.shape.text": "./dist/browser/Shapes/Text/index.js",
        "tsparticles.shape.text.min": "./dist/browser/Shapes/Text/index.js",
    }),
    getConfig({
        "tsparticles.updater.angle": "./dist/browser/Updaters/Angle/index.js",
        "tsparticles.updater.angle.min": "./dist/browser/Updaters/Angle/index.js",
    }),
    getConfig({
        "tsparticles.updater.color": "./dist/browser/Updaters/Color/index.js",
        "tsparticles.updater.color.min": "./dist/browser/Updaters/Color/index.js",
    }),
    getConfig({
        "tsparticles.updater.life": "./dist/browser/Updaters/Life/index.js",
        "tsparticles.updater.life.min": "./dist/browser/Updaters/Life/index.js",
    }),
    getConfig({
        "tsparticles.updater.opacity": "./dist/browser/Updaters/Opacity/index.js",
        "tsparticles.updater.opacity.min": "./dist/browser/Updaters/Opacity/index.js",
    }),
    getConfig({
        "tsparticles.updater.outModes": "./dist/browser/Updaters/OutModes/index.js",
        "tsparticles.updater.outModes.min": "./dist/browser/Updaters/OutModes/index.js",
    }),
    getConfig({
        "tsparticles.updater.roll": "./dist/browser/Updaters/Roll/index.js",
        "tsparticles.updater.roll.min": "./dist/browser/Updaters/Roll/index.js",
    }),
    getConfig({
        "tsparticles.updater.size": "./dist/browser/Updaters/Size/index.js",
        "tsparticles.updater.size.min": "./dist/browser/Updaters/Size/index.js",
    }),
    getConfig({
        "tsparticles.updater.strokeColor": "./dist/browser/Updaters/StrokeColor/index.js",
        "tsparticles.updater.strokeColor.min": "./dist/browser/Updaters/StrokeColor/index.js",
    }),
    getConfig({
        "tsparticles.updater.tilt": "./dist/browser/Updaters/Tilt/index.js",
        "tsparticles.updater.tilt.min": "./dist/browser/Updaters/Tilt/index.js",
    }),
    getConfig({
        "tsparticles.updater.wobble": "./dist/browser/Updaters/Wobble/index.js",
        "tsparticles.updater.wobble.min": "./dist/browser/Updaters/Wobble/index.js",
    })
];
