#!/usr/bin/env node
import { ESLint } from "eslint";
import fs from "fs-extra";
import klaw from "klaw";
import path from "path";
import prettier from "prettier";
//import tsc from "typescript";

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

    const srcPath = path.join(process.cwd(), process.argv[2]);

    if (!(await fs.pathExists(srcPath))) {
        console.error("Provided path does not exist");

        process.exitCode = 1;

        return;
    }

    // prettier
    for await (const file of klaw(srcPath)) {
        const contents = await fs.readFile(file.path, "utf8");

        prettier.resolveConfig(srcPath).then(async (options) => {
            const formatted = prettier.format(contents, options || {});

            await fs.writeFile(file.path, formatted, "utf8");
        });
    }

    // eslint
    const eslint = new ESLint({
        baseConfig: {
            extends: ["@tsparticles/eslint-config"],
        },
        extensions: [".js", ".jsx", ".ts", ".tsx"],
        fix: true,
    });

    const results = await eslint.lintFiles(["src"]);

    await ESLint.outputFixes(results);

    const formatter = await eslint.loadFormatter("stylish");
    const resultText = formatter.format(results);

    console.log(resultText);

    // tsc
})().catch((error) => {
    process.exitCode = 1;

    console.error(error);
});
