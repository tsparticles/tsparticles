#!/usr/bin/env node
import * as ts from "typescript";
import { ESLint } from "eslint";
import fs from "fs-extra";
import klaw from "klaw";
import path from "path";
import prettier from "prettier";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const pkgInfo = require("../package.json");

function compile(basePath: string, type: "browser" | "cjs" | "esm" | "types" | "umd"): number {
    let options: unknown = undefined;

    switch (type) {
        case "browser":
            options = {
                extends: "@tsparticles/tsconfig/tsconfig.browser.json",
                compilerOptions: {
                    rootDir: "./src",
                    outDir: "./dist/browser",
                },
                include: ["./src"],
            };
            break;
        case "cjs":
            options = {
                extends: "@tsparticles/tsconfig/tsconfig.json",
                compilerOptions: {
                    rootDir: "./src",
                    outDir: "./dist/cjs",
                },
                include: ["./src"],
            };
            break;
        case "esm":
            options = {
                extends: "@tsparticles/tsconfig/tsconfig.module.json",
                compilerOptions: {
                    rootDir: "./src",
                    outDir: "./dist/esm",
                },
                include: ["./src"],
            };
            break;
        case "types":
            options = {
                extends: "@tsparticles/tsconfig/tsconfig.types.json",
                compilerOptions: {
                    rootDir: "./src",
                    outDir: "./dist/types",
                },
                include: ["./src"],
            };
            break;
        case "umd":
            options = {
                extends: "@tsparticles/tsconfig/tsconfig.umd.json",
                compilerOptions: {
                    rootDir: "./src",
                    outDir: "./dist/umd",
                },
                include: ["./src"],
            };
            break;
    }

    if (!options) {
        return 0;
    }

    const parsed = ts.parseJsonConfigFileContent(options, ts.sys, basePath);

    if (!parsed) {
        return 0;
    }

    const program = ts.createProgram(parsed.fileNames, parsed.options),
        emitResult = program.emit(),
        allDiagnostics = ts.getPreEmitDiagnostics(program).concat(emitResult.diagnostics);

    allDiagnostics.forEach((diagnostic) => {
        if (diagnostic.file) {
            const { line, character } = ts.getLineAndCharacterOfPosition(diagnostic.file, diagnostic.start ?? 0);
            const message = ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n");
            console.log(`${diagnostic.file.fileName} (${line + 1},${character + 1}): ${message}`);
        } else {
            console.log(ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n"));
        }
    });

    const exitCode = emitResult.emitSkipped ? 1 : 0;

    console.log(`Process exiting with code '${exitCode}'.`);

    return exitCode;
}

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
    for await (const file of klaw(srcPath)) {
        console.log(file.path);

        if (file.stats.isDirectory()) {
            continue;
        }

        const contents = await fs.readFile(file.path, "utf8");

        const options = (await prettier.resolveConfig(basePath)) ?? {};

        options.printWidth = 120;
        options.endOfLine = "lf";
        options.parser = "typescript";
        options.tabWidth = 4;

        const formatted = prettier.format(contents, options);

        await fs.writeFile(file.path, formatted, "utf8");
    }

    console.log("prettier done");

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
    let exitCode = compile(basePath, "browser");

    exitCode ||= compile(basePath, "cjs");
    exitCode ||= compile(basePath, "esm");
    exitCode ||= compile(basePath, "types");
    exitCode ||= compile(basePath, "umd");

    process.exit(exitCode);
})().catch((error) => {
    process.exitCode = 1;

    console.error(error);
});
