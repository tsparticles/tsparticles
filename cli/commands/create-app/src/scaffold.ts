/* eslint-disable sort-imports */
import { runInstall, dash } from "@tsparticles/cli-create-utils";
import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { resolveEngineVersion, resolveTemplateRoot } from "./template-resolver.js";
import type { ScaffoldResult, UserOptions } from "./types.js";
import type { Framework, UseCase } from "./prompts.js";

const jsonIndentation = 2,
  useCaseTemplateNames: Record<UseCase, string | undefined> = {
    none: undefined,
    login: "login",
    portfolio: "portfolio",
    landing: "landing",
    tictactoe: "tictactoe",
    confetti: "confetti",
    ribbons: "ribbons",
    particles: "particles",
  };

/**
 *
 * @param options
 */
export async function createAppProject(
  options: UserOptions & { framework: Framework; useCase: UseCase },
): Promise<ScaffoldResult> {
  const { projectName, framework, skipInstall, useCase } = options,
    targetDir = options.destination,
    packageName = dash(projectName),
    version = resolveEngineVersion(),
    replacements: Record<string, string> = {
      "{{projectName}}": projectName,
      "{{packageName}}": packageName,
      "{{version}}": version,
    };

  let mergedDeps: ITemplateDeps = {};

  const scaffoldRoot = resolveTemplateRoot("scaffold"),
    scaffoldDeps = await readTemplateJson(scaffoldRoot);

  if (scaffoldDeps) {
    mergedDeps = deepMergeDeps(mergedDeps, scaffoldDeps);
  }

  const scaffoldSource = path.join(scaffoldRoot, "template", framework);

  if (!existsSync(path.join(scaffoldSource, "package.json"))) {
    throw new Error(
      `Scaffold template not found for framework "${framework}". Looked at: ${scaffoldSource}. Available frameworks: check template directories.`,
    );
  }

  await mkdir(targetDir, { recursive: true });
  await copyAndReplace(scaffoldSource, targetDir, replacements);

  if (useCase !== "none") {
    const ucTemplateName = useCaseTemplateNames[useCase];

    if (ucTemplateName) {
      const ucRoot = resolveTemplateRoot(ucTemplateName),
        ucDeps = await readTemplateJson(ucRoot);

      if (ucDeps) {
        mergedDeps = deepMergeDeps(mergedDeps, ucDeps);
      }

      const ucSource = path.join(ucRoot, "template", framework);

      if (existsSync(path.join(ucSource, "package.json"))) {
        await copyAndReplace(ucSource, targetDir, replacements);
      }
    }
  }

  if (mergedDeps.dependencies || mergedDeps.devDependencies) {
    const pkgJsonPath = path.join(targetDir, "package.json"),
      pkg = JSON.parse(await readFile(pkgJsonPath, "utf-8")) as Record<string, unknown>;

    if (mergedDeps.dependencies) {
      const existingDeps = (pkg.dependencies ?? {}) as Record<string, string>;

      pkg.dependencies = { ...mergedDeps.dependencies, ...existingDeps };
    }

    if (mergedDeps.devDependencies) {
      const existingDevDeps = (pkg.devDependencies ?? {}) as Record<string, string>;

      pkg.devDependencies = { ...mergedDeps.devDependencies, ...existingDevDeps };
    }

    await writeFile(pkgJsonPath, `${JSON.stringify(pkg, undefined, jsonIndentation)}\n`);
  }

  if (!skipInstall) {
    await runInstall(targetDir);
  }

  return {
    frameworkUsed: framework,
    targetDir,
    templateUsed: useCase === "none" ? "scaffold" : useCase,
  };
}

interface ITemplateDeps {
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
}

/**
 *
 * @param templateRoot
 */
async function readTemplateJson(templateRoot: string): Promise<ITemplateDeps | null> {
  const templateJsonPath = path.join(templateRoot, "template.json");

  if (!existsSync(templateJsonPath)) {
    return null;
  }

  const content = JSON.parse(await readFile(templateJsonPath, "utf-8")) as {
    package?: ITemplateDeps;
  };

  return content.package ?? null;
}

/**
 *
 * @param src
 * @param dest
 * @param replacements
 */
async function copyAndReplace(src: string, dest: string, replacements: Record<string, string>): Promise<void> {
  const entries = await readdir(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    let destName = entry.name;

    if (destName === "gitignore") {
      destName = ".gitignore";
    }

    const destPath = path.join(dest, destName);

    if (entry.isDirectory()) {
      await mkdir(destPath, { recursive: true });
      await copyAndReplace(srcPath, destPath, replacements);
    } else {
      let content = await readFile(srcPath, "utf-8");

      for (const [key, value] of Object.entries(replacements)) {
        content = content.replaceAll(key, value);
      }

      await writeFile(destPath, content);
    }
  }
}

/**
 *
 * @param target
 * @param source
 */
function deepMergeDeps(target: ITemplateDeps, source: ITemplateDeps): ITemplateDeps {
  return {
    dependencies: {
      ...(target.dependencies ?? {}),
      ...(source.dependencies ?? {}),
    },
    devDependencies: {
      ...(target.devDependencies ?? {}),
      ...(source.devDependencies ?? {}),
    },
  };
}
