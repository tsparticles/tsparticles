#!/usr/bin/env node
import { buildTS } from "./build-tsc";
import { bundle } from "./build-bundle";
import fs from "fs-extra";
import { lint } from "./build-eslint";
import path from "path";
import { prettify } from "./build-prettier";

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
        Usage: tsparticles-build [path]
        
        Options:
            -h, --help        Prints this help message
            -v, --version     Prints the version
    `);

        process.exitCode = 0;
        return;
    }

    const basePath = process.cwd();
    const srcPath = path.join(basePath, process.argv[2]);

    if (!(await fs.pathExists(srcPath))) {
        console.error("Provided path does not exist");

        process.exitCode = 1;

        return;
    }

    // prettier
    await prettify(basePath, srcPath);

    // eslint
    await lint();

    // tsc
    buildTS(basePath);

    bundle();
})().catch((error) => {
    process.exitCode = 1;

    console.error(error);
});
