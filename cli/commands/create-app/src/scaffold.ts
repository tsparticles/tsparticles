/* eslint-disable sort-imports */
import { runInstall } from "@tsparticles/cli-create-utils";
import { fileURLToPath } from "node:url";
import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import type { Framework, UseCase } from "./prompts.js";

const jsonIndentation = 2,
  __filename = fileURLToPath(import.meta.url),
  __dirname = path.dirname(__filename),
  repoRoot = path.resolve(__dirname, "..", "..", "..", ".."),
  scaffoldDir = path.join(repoRoot, "templates", "scaffold"),
  useCaseDirs: Record<UseCase, string | undefined> = {
    none: undefined,
    login: path.join(repoRoot, "templates", "login"),
    portfolio: path.join(repoRoot, "templates", "portfolio"),
    landing: path.join(repoRoot, "templates", "landing"),
    tictactoe: path.join(repoRoot, "templates", "tictactoe"),
    confetti: path.join(repoRoot, "templates", "confetti"),
    ribbons: path.join(repoRoot, "templates", "ribbons"),
    particles: path.join(repoRoot, "templates", "particles"),
  };

interface IAppCreateOptions {
  destination: string;
  framework: Framework;
  projectName: string;
  useCase: UseCase;
}

/**
 *
 * @param filePath -
 */
async function fileExists(filePath: string): Promise<boolean> {
  try {
    await readFile(filePath);

    return true;
  } catch {
    return false;
  }
}

/**
 *
 * @param src -
 * @param dest -
 * @param replacements -
 */
async function copyAndReplace(src: string, dest: string, replacements: Record<string, string>): Promise<void> {
  const entries = await readdir(src, { withFileTypes: true });

  await mkdir(dest, { recursive: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    let destName = entry.name;

    if (destName === "gitignore") {
      destName = ".gitignore";
    }

    const destPath = path.join(dest, destName);

    if (entry.isDirectory()) {
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

interface ITemplateDeps {
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
}

/**
 *
 * @param templateRoot -
 */
async function readTemplateJson(templateRoot: string): Promise<ITemplateDeps | null> {
  const templateJsonPath = path.join(templateRoot, "template.json");

  if (!(await fileExists(templateJsonPath))) {
    return null;
  }

  const content = JSON.parse(await readFile(templateJsonPath, "utf-8")) as {
    package?: ITemplateDeps;
  };

  return content.package ?? null;
}

/**
 *
 * @param templateRoot -
 * @param framework -
 */
async function templateSourceDir(templateRoot: string, framework: Framework): Promise<string | null> {
  const candidate = path.join(templateRoot, "template", framework);

  if (await fileExists(path.join(candidate, "package.json"))) {
    return candidate;
  }

  return null;
}

/**
 *
 * @param options -
 */
export async function createAppProject(options: IAppCreateOptions): Promise<void> {
  const { destination, framework, projectName, useCase } = options,
    replacements: Record<string, string> = {
      "{{projectName}}": projectName,
    },
    scaffoldSource = await templateSourceDir(scaffoldDir, framework);

  if (!scaffoldSource) {
    throw new Error(`Scaffold template not found for framework: ${framework}`);
  }

  await copyAndReplace(scaffoldSource, destination, replacements);

  let mergedDeps: ITemplateDeps = {};

  const scaffoldDeps = await readTemplateJson(scaffoldDir);

  if (scaffoldDeps) {
    mergedDeps = deepMergeDeps(mergedDeps, scaffoldDeps);
  }

  if (useCase !== "none") {
    const ucDir = useCaseDirs[useCase];

    if (ucDir) {
      const ucSource = await templateSourceDir(ucDir, framework);

      if (ucSource) {
        await copyAndReplace(ucSource, destination, replacements);
      }

      const ucDeps = await readTemplateJson(ucDir);

      if (ucDeps) {
        mergedDeps = deepMergeDeps(mergedDeps, ucDeps);
      }
    }
  }

  if (mergedDeps.dependencies || mergedDeps.devDependencies) {
    const pkgJsonPath = path.join(destination, "package.json"),
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

  await runInstall(destination);
}

/**
 *
 * @param target -
 * @param source -
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
