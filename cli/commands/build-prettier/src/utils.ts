import { readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import klaw from "klaw";
import path from "node:path";
import prettier from "prettier";

type PrettierSupportedParser = "typescript" | "json" | "markdown";

/**
 * @param basePath - The basePath
 * @param parser - The parser
 * @returns -
 */
async function getPrettierOptions(
  basePath: string,
  parser: PrettierSupportedParser,
): Promise<prettier.Options & { parser: PrettierSupportedParser }> {
  const baseOptions = (await prettier.resolveConfig(basePath)) ?? {};

  return {
    ...baseOptions,
    printWidth: 120,
    endOfLine: "lf",
    tabWidth: 2,
    arrowParens: "avoid",
    parser,
  };
}

/**
 * @param filePath - The filePath
 * @param options - The options to handle
 * @param ci - The ci
 * @param errorMessage - The errorMessage
 */
async function formatOrCheckFile(
  filePath: string,
  options: prettier.Options,
  ci: boolean,
  errorMessage: string,
): Promise<void> {
  const contents = await readFile(filePath, "utf8");

  if (ci) {
    if (!(await prettier.check(contents, options))) {
      throw new Error(errorMessage);
    }

    return;
  }

  const formatted = await prettier.format(contents, options);

  if (formatted !== contents) {
    await writeFile(filePath, formatted, "utf8");
  }
}

/**
 * @param basePath - The basePath
 * @param srcPath - The srcPath
 * @param ci - The ci
 * @param silent - The silent
 * @returns true if the prettify src process was successful
 */
export async function prettifySrc(basePath: string, srcPath: string, ci: boolean, silent: boolean): Promise<boolean> {
  if (!silent) {
    console.info("Prettier - started on src");
  }

  let res: boolean;

  try {
    const options = await getPrettierOptions(basePath, "typescript");

    for await (const file of klaw(srcPath)) {
      if (file.stats.isDirectory()) {
        continue;
      }

      await formatOrCheckFile(file.path, options, ci, `${file.path} is not formatted correctly`);
    }

    res = true;
  } catch (e) {
    console.error(e);

    res = false;
  }

  if (!silent) {
    console.info("Prettier - done on src");
  }

  return res;
}

/**
 * @param basePath - The basePath
 * @param ci - The ci
 * @param silent - The silent
 * @returns true if the prettify package.json process was successful
 */
export async function prettifyPackageJson(basePath: string, ci: boolean, silent: boolean): Promise<boolean> {
  if (!silent) {
    console.info("Prettier - started on package.json");
  }

  let res: boolean;

  try {
    const options = await getPrettierOptions(basePath, "json");

    await formatOrCheckFile("package.json", options, ci, "package.json is not formatted correctly");

    res = true;
  } catch (e) {
    console.error(e);

    res = false;
  }

  if (!silent) {
    console.info("Prettier - done on package.json");
  }

  return res;
}

/**
 * @param basePath - The basePath
 * @param ci - The ci
 * @param silent - The silent
 * @returns true if the prettify package.dist.json process was successful
 */
export async function prettifyPackageDistJson(basePath: string, ci: boolean, silent: boolean): Promise<boolean> {
  if (!silent) {
    console.info("Prettier - started on package.dist.json");
  }

  let res: boolean;

  try {
    const options = await getPrettierOptions(basePath, "json");

    await formatOrCheckFile("package.dist.json", options, ci, "package.dist.json is not formatted correctly");

    res = true;
  } catch (e) {
    console.error(e);

    res = false;
  }

  if (!silent) {
    console.info("Prettier - done on package.dist.json");
  }

  return res;
}

/**
 * @param basePath - The basePath
 * @param ci - The ci
 * @param silent - The silent
 * @returns true if the prettify readme process was successful
 */
export async function prettifyReadme(basePath: string, ci: boolean, silent: boolean): Promise<boolean> {
  if (!silent) {
    console.info("Prettier - started on README.md");
  }

  let res: boolean;

  try {
    const options = await getPrettierOptions(basePath, "markdown");

    await formatOrCheckFile("README.md", options, ci, "README.md is not formatted correctly");

    res =
      (await prettifyTraductions(basePath, ci, silent)) && (await prettifyMarkdownTypeDocFiles(basePath, ci, silent));
  } catch (e) {
    console.error(e);

    res = false;
  }

  if (!silent) {
    console.info("Prettier - done on README.md");
  }

  return res;
}

/**
 * @param basePath - The basePath
 * @param ci - The ci
 * @param silent - The silent
 * @returns true if the prettify traductions process was successful
 */
async function prettifyTraductions(basePath: string, ci: boolean, silent: boolean): Promise<boolean> {
  if (!silent) {
    console.info("Prettier - started on traductions");
  }

  let res = false;

  try {
    const folder = "traduction",
      folderPath = path.join(basePath, folder),
      options = await getPrettierOptions(basePath, "markdown");

    if (!existsSync(folderPath)) {
      res = true;
    }

    if (!res) {
      for await (const file of klaw(folderPath)) {
        if (file.stats.isDirectory()) {
          continue;
        }

        await formatOrCheckFile(file.path, options, ci, `${file.path} is not formatted correctly`);
      }

      res = true;
    }
  } catch (e) {
    console.error(e);

    res = false;
  }

  if (!silent) {
    console.info("Prettier - done on traductions");
  }

  return res;
}

/**
 * @param basePath - The basePath
 * @param ci - The ci
 * @param silent - The silent
 * @returns true if the prettify markdown typedoc files process was successful
 */
async function prettifyMarkdownTypeDocFiles(basePath: string, ci: boolean, silent: boolean): Promise<boolean> {
  if (!silent) {
    console.info("Prettier - started on markdown");
  }

  let res = false;

  try {
    const folder = "markdown",
      folderPath = path.join(basePath, folder),
      options = await getPrettierOptions(basePath, "markdown");

    if (!existsSync(folderPath)) {
      res = true;
    }

    if (!res) {
      for await (const file of klaw(folderPath)) {
        if (file.stats.isDirectory()) {
          continue;
        }

        await formatOrCheckFile(file.path, options, ci, `${file.path} is not formatted correctly`);
      }

      res = true;
    }
  } catch (e) {
    console.error(e);

    res = false;
  }

  if (!silent) {
    console.info("Prettier - done on markdown");
  }

  return res;
}
