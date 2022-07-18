import * as ts from "typescript";

function compile(basePath: string, type: "browser" | "cjs" | "esm" | "types" | "umd"): number {
    let options: unknown;

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

export function buildTS(basePath: string): void {
    let exitCode = compile(basePath, "browser");

    if (!exitCode) {
        exitCode = compile(basePath, "cjs");
    }

    if (!exitCode) {
        exitCode = compile(basePath, "esm");
    }

    if (!exitCode) {
        exitCode = compile(basePath, "types");
    }

    if (!exitCode) {
        compile(basePath, "umd");
    }
}
