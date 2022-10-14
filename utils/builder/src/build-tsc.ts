import fs from "fs-extra";
import path from "path";
import ts from "typescript";

async function readConfig(basePath: string, file: string): Promise<string | undefined> {
    const tsconfigPath = path.join(basePath, file);

    if (await fs.pathExists(tsconfigPath)) {
        const data = await fs.readFile(path.join(basePath, file));

        return data.toString();
    }

    return;
}

async function compile(basePath: string, type: "browser" | "cjs" | "esm" | "types" | "umd"): Promise<number> {
    let options: unknown, data: string | undefined;

    switch (type) {
        case "browser":
            data = await readConfig(basePath, "tsconfig.browser.json");

            if (!data) {
                options = {
                    extends: "@tsparticles/tsconfig/tsconfig.browser.json",
                    compilerOptions: {
                        rootDir: "./src",
                        outDir: "./dist/browser",
                    },
                    include: ["./src"],
                };
            }

            break;
        case "cjs":
            data = await readConfig(basePath, "tsconfig.json");

            if (!data) {
                options = {
                    extends: "@tsparticles/tsconfig/tsconfig.json",
                    compilerOptions: {
                        rootDir: "./src",
                        outDir: "./dist/cjs",
                    },
                    include: ["./src"],
                };
            }

            break;
        case "esm":
            data = await readConfig(basePath, "tsconfig.module.json");

            if (!data) {
                options = {
                    extends: "@tsparticles/tsconfig/tsconfig.module.json",
                    compilerOptions: {
                        rootDir: "./src",
                        outDir: "./dist/esm",
                    },
                    include: ["./src"],
                };
            }

            break;
        case "types":
            data = await readConfig(basePath, "tsconfig.types.json");

            if (!data) {
                options = {
                    extends: "@tsparticles/tsconfig/tsconfig.types.json",
                    compilerOptions: {
                        rootDir: "./src",
                        outDir: "./dist/types",
                    },
                    include: ["./src"],
                };
            }

            break;
        case "umd":
            data = await readConfig(basePath, "tsconfig.umd.json");

            if (!data) {
                options = {
                    extends: "@tsparticles/tsconfig/tsconfig.umd.json",
                    compilerOptions: {
                        rootDir: "./src",
                        outDir: "./dist/umd",
                    },
                    include: ["./src"],
                };
            }

            break;
    }

    if (!data && !options) {
        return 2;
    }

    if (!options && data) {
        options = JSON.parse(data);
    }

    if (!options) {
        return 3;
    }

    const parsed = ts.parseJsonConfigFileContent(options, ts.sys, basePath);

    if (!parsed) {
        return 4;
    }

    const program = ts.createProgram(parsed.fileNames, parsed.options),
        emitResult = program.emit(),
        allDiagnostics = ts.getPreEmitDiagnostics(program).concat(emitResult.diagnostics);

    let failed = false;

    allDiagnostics.forEach(diagnostic => {
        failed = failed || diagnostic.category === ts.DiagnosticCategory.Error;

        if (diagnostic.file) {
            const { line, character } = ts.getLineAndCharacterOfPosition(diagnostic.file, diagnostic.start ?? 0),
                message = ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n");

            console.log(`${diagnostic.file.fileName} (${line + 1},${character + 1}): ${message}`);
        } else {
            console.log(ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n"));
        }
    });

    const exitCode = emitResult.emitSkipped || failed ? 1 : 0;

    console.log(`TSC for ${type} done with exit code: '${exitCode}'.`);

    return exitCode;
}

export async function buildTS(basePath: string): Promise<boolean> {
    const types: ("browser" | "cjs" | "esm" | "types" | "umd")[] = ["browser", "cjs", "esm", "types", "umd"];

    for await (const type of types) {
        const exitCode = await compile(basePath, type);

        if (exitCode) {
            return false;
        }
    }

    return true;
}
