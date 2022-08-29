#!/usr/bin/env node
import { prettifyReadme, prettifySrc } from "./build-prettier";
import { buildDistFiles } from "./build-distfiles";
import { buildTS } from "./build-tsc";
import { bundle } from "./build-bundle";
import { clearDist } from "./build-clear";
import fs from "fs-extra";
import { lint } from "./build-eslint";
import path from "path";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const pkgInfo = require("../package.json");

(async function (): Promise<void> {
    console.log(`tsParticles Builder v${pkgInfo.version}\n`);

    if (process.argv.length < 2) {
        console.error(`Not enough parameters, run "tsparticles-build --help" for a full list`);

        process.exitCode = 1;
        return;
    }

    if (process.argv[2] === "--version" || process.argv[2] === "-v") {
        console.log(`
        tsParticles Builder version ${pkgInfo.version}
    `);

        process.exitCode = 0;
        return;
    }

    if (process.argv[2] === "--help" || process.argv[2] === "-h") {
        console.log(`
        Usage: tsparticles-build [path] [--distfiles] [--ci]
        
        Options:
            -h, --help        Prints this help message
            -v, --version     Prints the version
    `);

        process.exitCode = 0;
        return;
    }

    let ci = false;

    if (process.argv.includes("--ci")) {
        ci = true;
    }

    if (process.argv.includes("--distfiles")) {
        await buildDistFiles(process.cwd());

        process.exitCode = 0;

        return;
    }

    const basePath = process.cwd();

    await clearDist(basePath);

    const srcPath = path.join(basePath, process.argv[2]);

    if (!(await fs.pathExists(srcPath))) {
        console.error("Provided path does not exist");

        process.exitCode = 1;

        return;
    }

    let canContinue = true;

    if (canContinue) {
        // prettier src
        console.log("Start prettier on src");
        canContinue = await prettifySrc(basePath, srcPath, ci);
        console.log("Prettier done on src");
    }

    if (canContinue) {
        // eslint
        console.log("Start ESLint on src");
        canContinue = await lint(ci);
        console.log("ESLint done on src", canContinue);
    }

    if (canContinue) {
        // tsc
        canContinue = await buildTS(basePath);
    }

    if (canContinue) {
        // webpack
        canContinue = await bundle(basePath);
    }

    if (canContinue) {
        // prettier readme
        canContinue = await prettifyReadme(basePath, ci);
    }

    if (canContinue) {
        // distfiles
        canContinue = await buildDistFiles(basePath);
    }

    if (!canContinue) {
        process.exitCode = 1;
        process.abort();
    }
})().catch((error) => {
    process.exitCode = 1;

    console.error(error);
});
