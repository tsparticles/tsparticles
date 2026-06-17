import { existsSync } from "node:fs";
import path from "node:path";
import { readFile } from "node:fs/promises";

enum ExitCodes {
  OK = 0,
  EmitErrors = 1,
  NoDataOrOptions = 2,
  NoOptions = 3,
  ParseError = 4,
}

type CompileType = "browser" | "cjs" | "esm" | "types";

interface CompileResult {
  exitCode: ExitCodes;
  logs: string[];
  type: CompileType;
}

interface CompileConfig {
  configFile: string;
  extends: string;
  outDir: string;
}

const compileConfigs: Record<CompileType, CompileConfig> = {
  browser: {
    configFile: "tsconfig.browser.json",
    extends: "@tsparticles/tsconfig/dist/tsconfig.browser.json",
    outDir: "./dist/browser",
  },
  cjs: {
    configFile: "tsconfig.json",
    extends: "@tsparticles/tsconfig/dist/tsconfig.json",
    outDir: "./dist/cjs",
  },
  esm: {
    configFile: "tsconfig.module.json",
    extends: "@tsparticles/tsconfig/dist/tsconfig.module.json",
    outDir: "./dist/esm",
  },
  types: {
    configFile: "tsconfig.types.json",
    extends: "@tsparticles/tsconfig/dist/tsconfig.types.json",
    outDir: "./dist/types",
  },
};

/**
 * @param type - The type
 * @returns -
 */
function getDefaultOptions(type: CompileType): unknown {
  const config = compileConfigs[type];

  return {
    extends: config.extends,
    compilerOptions: {
      rootDir: "./src",
      outDir: config.outDir,
    },
    include: ["./src"],
  };
}

/**
 * @param basePath - The basePath
 * @param file - The file
 * @returns the file content or undefined if the file doesn't exist
 */
async function readConfig(basePath: string, file: string): Promise<string | undefined> {
  const tsconfigPath = path.join(basePath, file);

  if (existsSync(tsconfigPath)) {
    const data = await readFile(path.join(basePath, file));

    return data.toString();
  }

  return undefined;
}

/**
 * @param basePath - The basePath
 * @param type - The type
 * @param silent - The silent
 * @returns the exit code
 */
async function compile(basePath: string, type: CompileType, silent: boolean): Promise<CompileResult> {
  let options: unknown;

  const logs: string[] = [],
    data = await readConfig(basePath, compileConfigs[type].configFile);

  if (!data) {
    options = getDefaultOptions(type);
  }

  if (!data && !options) {
    logs.push(`No TS config found for ${type} build.`);

    return {
      type,
      logs,
      exitCode: ExitCodes.NoDataOrOptions,
    };
  }

  if (!options && data) {
    options = JSON.parse(data);
  }

  if (!options) {
    logs.push(`No TS options available for ${type} build.`);

    return {
      type,
      logs,
      exitCode: ExitCodes.NoOptions,
    };
  }

  const ts = await import("typescript");

  let parsed = ts.parseJsonConfigFileContent(options, ts.sys, basePath);

  if (parsed.errors.length && type === "cjs" && data) {
    const noInputsCode = 18003,
      hasNoInputsError = parsed.errors.some(diagnostic => diagnostic.code === noInputsCode);

    if (hasNoInputsError) {
      options = getDefaultOptions(type);
      parsed = ts.parseJsonConfigFileContent(options, ts.sys, basePath);

      if (!silent) {
        logs.push("Using default cjs build options because tsconfig.json has no input files for this build.");
      }
    }
  }

  if (parsed.errors.length) {
    for (const diagnostic of parsed.errors) {
      logs.push(ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n"));
    }

    return {
      type,
      logs,
      exitCode: ExitCodes.ParseError,
    };
  }

  const program = ts.createProgram(parsed.fileNames, parsed.options),
    emitResult = program.emit(),
    allDiagnostics = ts.getPreEmitDiagnostics(program).concat(emitResult.diagnostics);

  let failed = false;

  for (const diagnostic of allDiagnostics) {
    failed = failed || diagnostic.category === ts.DiagnosticCategory.Error;

    if (diagnostic.file) {
      const startingPos = 0,
        { line, character } = ts.getLineAndCharacterOfPosition(diagnostic.file, diagnostic.start ?? startingPos),
        message = ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n"),
        increment = 1;

      logs.push(
        `${diagnostic.file.fileName} (${(line + increment).toString()},${(character + increment).toString()}): ${message}`,
      );
    } else {
      logs.push(ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n"));
    }
  }

  const exitCode = emitResult.emitSkipped || failed ? ExitCodes.EmitErrors : ExitCodes.OK;

  if (!silent || exitCode) {
    logs.push(`TSC for ${type} done with exit code: '${exitCode.toLocaleString()}'.`);
  }

  return {
    type,
    logs,
    exitCode,
  };
}

/**
 * @param basePath - The basePath
 * @param silent - The silent
 * @returns true if the build was successful
 */
export async function buildTS(basePath: string, silent: boolean): Promise<boolean> {
  if (!silent) {
    console.info("Building TS files");
  }

  const types: CompileType[] = ["browser", "cjs", "esm", "types"],
    results = await Promise.all(types.map(type => compile(basePath, type, silent)));

  for (const type of types) {
    const result = results.find(r => r.type === type);

    if (!result) {
      continue;
    }

    if (!silent) {
      console.info(`Building TS files for ${type} configuration`);
    }

    for (const log of result.logs) {
      console.info(log);
    }
  }

  const res = results.every(result => result.exitCode === ExitCodes.OK);

  if (!silent) {
    console.info("Building TS files done");
  }

  return res;
}
