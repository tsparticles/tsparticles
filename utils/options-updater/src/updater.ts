#!/usr/bin/env node
import { Options, tsParticles } from "tsparticles-engine";
import { JSDOM } from "jsdom";
import _ from "lodash";
import fs from "fs-extra";
import { loadBubbleShape } from "tsparticles-shape-bubble";
import { loadCanvasMaskPlugin } from "tsparticles-plugin-canvas-mask";
import { loadCurvesPath } from "tsparticles-path-curves";
import { loadEasingBackPlugin } from "tsparticles-plugin-easing-back";
import { loadEasingCircPlugin } from "tsparticles-plugin-easing-circ";
import { loadEasingCubicPlugin } from "tsparticles-plugin-easing-cubic";
import { loadEasingExpoPlugin } from "tsparticles-plugin-easing-expo";
import { loadEasingQuartPlugin } from "tsparticles-plugin-easing-quart";
import { loadEasingQuintPlugin } from "tsparticles-plugin-easing-quint";
import { loadEasingSinePlugin } from "tsparticles-plugin-easing-sine";
import { loadFull } from "tsparticles";
import { loadGradientUpdater } from "tsparticles-updater-gradient";
import { loadHeartShape } from "tsparticles-shape-heart";
import { loadHsvColorPlugin } from "tsparticles-plugin-hsv-color";
import { loadInfectionPlugin } from "tsparticles-plugin-infection";
import { loadLightInteraction } from "tsparticles-interaction-light";
import { loadMotionPlugin } from "tsparticles-plugin-motion";
import { loadMultilineTextShape } from "tsparticles-shape-multiline-text";
import { loadOrbitUpdater } from "tsparticles-updater-orbit";
import { loadParticlesRepulseInteraction } from "tsparticles-interaction-particles-repulse";
import { loadPerlinNoisePath } from "tsparticles-path-perlin-noise";
import { loadPolygonMaskPlugin } from "tsparticles-plugin-polygon-mask";
import { loadPolygonPath } from "tsparticles-path-polygon";
import { loadRoundedRectShape } from "tsparticles-shape-rounded-rect";
import { loadSimplexNoisePath } from "tsparticles-path-simplex-noise";
import { loadSpiralShape } from "tsparticles-shape-spiral";
import path from "path";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const pkgInfo = require("../package.json");

type CustomRecord = {
    [key: string]: CustomRecord;
};

const objectDifference = (object: CustomRecord, base: CustomRecord): CustomRecord => {
    function changes(object: CustomRecord, base: CustomRecord): CustomRecord {
        return _.transform(object, function (result: CustomRecord, value: CustomRecord, key: string) {
            if (key.startsWith("_")) {
                return;
            }

            if (!_.isEqual(value, base[key])) {
                result[key] = _.isObject(value) && _.isObject(base[key]) ? changes(value, base[key]) : value;
            }
        });
    }

    return changes(object, base);
};

(async function (): Promise<void> {
    console.log(`tsParticles Options Updater v${pkgInfo.version}\n`);

    if (process.argv[2] === "--version" || process.argv[2] === "-v") {
        console.log(`
    tsParticles Builder version ${pkgInfo.version}
`);

        process.exitCode = 0;
        return;
    }

    if (process.argv[2] === "--help" || process.argv[2] === "-h") {
        console.log(`
    Usage: tsparticles-options-updater [path]
    
    Arguments:
        path    Path to the tsParticles options to update, can be a JSON file or a directory
                Only JSON files will be searched in the given directory
    
    Options:
        -h, --help        Prints this help message
        -v, --version     Prints the version
`);

        process.exitCode = 0;
        return;
    }

    const hasPath = !!process.argv.find((a, idx) => idx > 1 && !a.startsWith("-"));

    if (!hasPath) {
        console.log("Error: No path specified");

        process.exitCode = 1;

        return;
    }

    const basePath = process.cwd(),
        argPath = process.argv[2],
        srcPath = path.join(basePath, argPath);

    if (!(await fs.pathExists(srcPath))) {
        console.error("Error: Provided path does not exist");

        process.exitCode = 1;

        return;
    }

    await loadHsvColorPlugin();

    await loadFull(tsParticles);

    await loadCanvasMaskPlugin(tsParticles);
    await loadEasingBackPlugin();
    await loadEasingCircPlugin();
    await loadEasingCubicPlugin();
    await loadEasingExpoPlugin();
    await loadEasingQuartPlugin();
    await loadEasingQuintPlugin();
    await loadEasingSinePlugin();
    await loadInfectionPlugin(tsParticles);
    await loadMotionPlugin(tsParticles);
    await loadPolygonMaskPlugin(tsParticles);
    await loadLightInteraction(tsParticles);
    await loadParticlesRepulseInteraction(tsParticles);
    await loadGradientUpdater(tsParticles);
    await loadOrbitUpdater(tsParticles);
    await loadCurvesPath(tsParticles);
    await loadPolygonPath(tsParticles);
    await loadPerlinNoisePath(tsParticles);
    await loadSimplexNoisePath(tsParticles);
    await loadBubbleShape(tsParticles);
    await loadHeartShape(tsParticles);
    await loadMultilineTextShape(tsParticles);
    await loadRoundedRectShape(tsParticles);
    await loadSpiralShape(tsParticles);

    let canContinue = true;

    if (canContinue) {
        const jsdom = new JSDOM("");

        globalThis.window = jsdom.window as unknown as Window & typeof globalThis;
        globalThis.document = jsdom.window.document;
        globalThis.HTMLElement = jsdom.window.HTMLElement;
        globalThis.HTMLCanvasElement = jsdom.window.HTMLCanvasElement;
        globalThis.requestAnimationFrame = jsdom.window.requestAnimationFrame;
        globalThis.cancelAnimationFrame = jsdom.window.cancelAnimationFrame;

        const fileStat = await fs.lstat(srcPath);

        if (fileStat.isFile()) {
            const fileContent = await fs.readFile(srcPath, "utf8"),
                fileData = JSON.parse(fileContent),
                fileContainer = await tsParticles.load("file-tmp", fileData);

            if (fileContainer) {
                const fileOptions = fileContainer.actualOptions;

                fileContainer.reset();

                const newOptions = objectDifference(
                    fileOptions as unknown as CustomRecord,
                    fileContainer.options as unknown as CustomRecord
                );

                await fs.writeFile(srcPath, JSON.stringify(newOptions, undefined, 4));

                fileContainer.destroy();
            }
        } else {
            const files = await fs.readdir(srcPath);

            for (const file of files) {
                const filePath = path.join(srcPath, file);

                if (path.extname(filePath) !== ".json") {
                    continue;
                }

                const fileContent = await fs.readFile(filePath, "utf8"),
                    fileData = JSON.parse(fileContent),
                    fileContainer = await tsParticles.load(`file-${file}`, fileData);

                if (fileContainer) {
                    const fileOptions = fileContainer.options;

                    fileContainer.reset();

                    const newOptions = objectDifference(
                        fileOptions as unknown as CustomRecord,
                        fileContainer.options as unknown as CustomRecord
                    );

                    await fs.writeFile(filePath, JSON.stringify(newOptions, undefined, 4));

                    fileContainer.destroy();
                }
            }
        }

        canContinue = true;
    }

    if (!canContinue) {
        process.exitCode = 1;
    }
})().catch(error => {
    process.exitCode = 1;

    console.error(error);
});
