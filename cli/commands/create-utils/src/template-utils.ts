import * as childProcess from "node:child_process";
import * as fsPromises from "node:fs/promises";
import { replaceTokensInFile, updateJsonFile } from "./file-utils.js";
import { lookpath } from "lookpath";
import path from "node:path";

export interface IProjectMetadata {
  description: string;
  directory: string;
  packageName: string;
  repoUrl: string;
  unpkgFileName: string;
}

/**
 * Updates the package.json file
 * @param destPath - The path where the package.json file is located
 * @param metadata - The project metadata used for updates
 */
export async function updatePackageFile(destPath: string, metadata: IProjectMetadata): Promise<void> {
  await updateJsonFile<Record<string, unknown>>(path.join(destPath, "package.json"), data => {
    const publishConfig = (data["publishConfig"] ?? {}) as Record<string, unknown>;

    return {
      ...data,
      name: metadata.packageName,
      description: metadata.description,
      repository: {
        type: "git",
        url: `git+${metadata.repoUrl}`,
        directory: metadata.directory,
      },
      bugs: {
        url: metadata.repoUrl.replace(/\.git$/, "/issues"),
      },
      publishConfig: {
        ...publishConfig,
        access: "public",
      },
      private: undefined,
    };
  });

  await replaceTokensInFile({
    path: path.join(destPath, "package.json"),
    tokens: [
      {
        from: /"tsparticles.empty.template.min.js"/g,
        to: `"${metadata.unpkgFileName}"`,
      },
    ],
  });
}

/**
 * Updates the package.dist.json file with the new project name and description
 * @param destPath - The path where the package.dist.json file is located
 * @param metadata - The project metadata used for updates
 */
export async function updatePackageDistFile(destPath: string, metadata: IProjectMetadata): Promise<void> {
  await updateJsonFile<Record<string, unknown>>(path.join(destPath, "package.dist.json"), data => {
    const publishConfig = (data["publishConfig"] ?? {}) as Record<string, unknown>;

    return {
      ...data,
      name: metadata.packageName,
      description: metadata.description,
      repository: {
        type: "git",
        url: `git+${metadata.repoUrl}`,
        directory: metadata.directory,
      },
      bugs: {
        url: metadata.repoUrl.replace(/\.git$/, "/issues"),
      },
      publishConfig: {
        ...publishConfig,
        access: "public",
      },
      private: undefined,
    };
  });

  await replaceTokensInFile({
    path: path.join(destPath, "package.dist.json"),
    tokens: [
      {
        from: /"tsparticles.empty.template.min.js"/g,
        to: `"${metadata.unpkgFileName}"`,
      },
    ],
  });
}

/**
 * Copies the empty template files to the destination path
 * @param destPath - The path where the project will be created
 */
export async function copyEmptyTemplateFiles(destPath: string): Promise<void> {
  await fsPromises.cp(path.join(__dirname, "..", "files", "empty-project"), destPath, {
    recursive: true,
    force: true,
    filter: copyFilter,
  });
}

/**
 * Filters the files to copy
 * @param src - The source file path
 * @returns true if the file should be copied
 */
export function copyFilter(src: string): boolean {
  return !(src.endsWith("node_modules") || src.endsWith("dist"));
}

/**
 * Runs npm install in the given path
 * @param destPath - The path where the project will be created
 */
export async function runInstall(destPath: string): Promise<void> {
  if (!(await lookpath("npm"))) {
    return;
  }

  return new Promise((resolve, reject) => {
    childProcess.exec(
      "npm install",
      {
        cwd: destPath,
      },
      error => {
        if (error) {
          reject(new Error(error.message));

          return;
        }

        resolve();
      },
    );
  });
}

/**
 * Runs npm run build in the given path
 * @param destPath - The path where the project will be build
 */
export async function runBuild(destPath: string): Promise<void> {
  if (!(await lookpath("npm"))) {
    return;
  }

  return new Promise((resolve, reject) => {
    childProcess.exec(
      "npm run build",
      {
        cwd: destPath,
      },
      error => {
        if (error) {
          reject(new Error(error.message));

          return;
        }

        resolve();
      },
    );
  });
}
