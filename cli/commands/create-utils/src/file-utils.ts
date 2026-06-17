import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import { exec } from "node:child_process";
import { existsSync } from "node:fs";
import { lookpath } from "lookpath";
import path from "node:path";

const jsonIndentation = 2;

export interface ReplaceTokensOptions {
  path: string;
  tokens: ReplaceTokensData[];
}

export interface ReplaceTokensData {
  from: string | RegExp;
  to: string;
}

export type JsonUpdater<T> = (data: T) => T;

/**
 *
 * @param options - The options to handle
 */
export async function replaceTokensInFiles(options: ReplaceTokensOptions[]): Promise<void> {
  for (const item of options) {
    const filePath = item.path;

    let data = await readFile(filePath, "utf-8");

    for (const token of item.tokens) {
      const regex = token.from instanceof RegExp ? token.from : new RegExp(token.from, "g");

      data = data.replace(regex, token.to);
    }

    await writeFile(filePath, data);
  }
}

/**
 *
 * @param options - The options to handle
 */
export async function replaceTokensInFile(options: ReplaceTokensOptions): Promise<void> {
  await replaceTokensInFiles([options]);
}

/**
 * Updates a JSON file preserving standard indentation.
 * @param filePath - The JSON file path
 * @param updater - The updater callback
 */
export async function updateJsonFile<T>(filePath: string, updater: JsonUpdater<T>): Promise<void> {
  const data = JSON.parse(await readFile(filePath, "utf-8")) as T,
    updatedData = updater(data);

  await writeFile(filePath, `${JSON.stringify(updatedData, undefined, jsonIndentation)}\n`);
}

/**
 *
 * @param destination - The destination point
 * @returns the destination directory path
 */
export async function getDestinationDir(destination: string): Promise<string> {
  const destPath = path.join(process.cwd(), destination),
    destExists = existsSync(destPath);

  if (destExists) {
    const destContents = await readdir(destPath),
      destContentsNoGit = destContents.filter(t => t !== ".git" && t !== ".gitignore");

    if (destContentsNoGit.length) {
      throw new Error("Destination folder already exists and is not empty");
    }
  }

  await mkdir(destPath, { recursive: true });

  return destPath;
}

/**
 * @returns the repository URL
 */
export async function getRepositoryUrl(): Promise<string> {
  if (!(await lookpath("git"))) {
    return "";
  }

  return new Promise<string>(resolve => {
    exec("git config --get remote.origin.url", (error, stdout) => {
      if (error) {
        resolve("");
        return;
      }

      resolve(stdout.trim());
    });
  });
}
