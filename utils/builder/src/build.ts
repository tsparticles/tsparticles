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

    if (process.argv[2] === "--version" || process.argv[2] === "-v") {
        console.log(`
    tsParticles Builder version ${pkgInfo.version}
`);

        process.exitCode = 0;
        return;
    }

    if (process.argv[2] === "--help" || process.argv[2] === "-h") {
        console.log(`
    Usage: tsparticles-build [path] [-a] [-b] [-c] [--ci] [-d] [-l] [-p] [-t]
    
    Arguments:
        path    Path to the tsParticles project root folder, default is "src"
    
    Options:
        -h, --help        Prints this help message
        -v, --version     Prints the version
        
        -a, --all         Do all build steps (default if no flags are specified) (same as -b -c -d -l -p -t)
        -b, --bundle      Bundle the library using Webpack
        -c, --clean       Clean the dist folder
        --ci              Do all build steps for CI, no fixing files, only checking if they are correct
        -d, --distfiles   Runs only the distfiles script step
        -l, --lint        Runs only the ESLint build step
        -p, --prettier    Runs only the Prettier build step
        -t, --tsc         Runs only the TypeScript build step
`);

        process.exitCode = 0;
        return;
    }

    const hasPath = !!process.argv.find((a, idx) => idx > 1 && !a.startsWith("-")),
        ci = process.argv.includes("--ci"),
        all =
            process.argv.includes("--all") ||
            process.argv.includes("-a") ||
            (process.argv.length === 2 && !hasPath) ||
            (process.argv.length === 3 && !hasPath && ci) ||
            (process.argv.length === 3 && hasPath) ||
            (process.argv.length === 4 && hasPath && ci),
        doBundle = all || process.argv.includes("--bundle") || process.argv.includes("-b"),
        clean = all || process.argv.includes("--clean") || process.argv.includes("-c"),
        distfiles = all || process.argv.includes("--distfiles") || process.argv.includes("-d"),
        doLint = all || process.argv.includes("--lint") || process.argv.includes("-l"),
        prettier = all || process.argv.includes("--prettier") || process.argv.includes("-p"),
        tsc = all || process.argv.includes("--tsc") || process.argv.includes("-t");

    const basePath = process.cwd();

    if (clean) {
        await clearDist(basePath);
    }

    const argPath = !hasPath ? "src" : process.argv[2],
        srcPath = path.join(basePath, argPath);

    if (!(await fs.pathExists(srcPath))) {
        console.error("Provided path does not exist");

        process.exitCode = 1;

        return;
    }

    let canContinue = true;

    if (canContinue && prettier) {
        // prettier src
        console.log("Start prettier on src");
        canContinue = await prettifySrc(basePath, srcPath, ci);
        console.log("Prettier done on src");
    }

    if (canContinue && doLint) {
        // eslint
        console.log("Start ESLint on src");
        canContinue = await lint(ci);
        console.log("ESLint done on src", canContinue);
    }

    if (canContinue && tsc) {
        // tsc
        canContinue = await buildTS(basePath);
    }

    if (canContinue && doBundle) {
        // webpack
        canContinue = await bundle(basePath);
    }

    if (canContinue && prettier) {
        // prettier readme
        canContinue = await prettifyReadme(basePath, ci);
    }

    if (canContinue && distfiles) {
        // distfiles
        canContinue = await buildDistFiles(basePath);
    }

    if (!canContinue) {
        process.exitCode = 1;
    }
})().catch(error => {
    process.exitCode = 1;

    console.error(error);
});
