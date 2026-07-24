/* eslint-disable sort-imports */
import { Command } from "commander";
import { bundleWebpack, bundleWebpackCommand } from "@tsparticles/cli-command-build-bundle-webpack";
import { bundleRollup, bundleRollupCommand } from "@tsparticles/cli-command-build-bundle-rollup";
import { circularDeps as checkCircularDeps, circularDepsCommand } from "@tsparticles/cli-command-build-circular-deps";
import { clearCommand, clearDist } from "@tsparticles/cli-command-build-clear";
import { buildDistFiles, distFilesCommand } from "@tsparticles/cli-command-build-distfiles";
import { getDistStats, type IDistStats } from "@tsparticles/cli-command-build-diststats";
import { esLintCommand, lint } from "@tsparticles/cli-command-build-eslint";
import {
  prettierCommand,
  prettifyPackageDistJson,
  prettifyPackageJson,
  prettifyReadme,
  prettifySrc,
} from "@tsparticles/cli-command-build-prettier";
import { buildTS, tscCommand } from "@tsparticles/cli-command-build-tsc";
import path from "node:path";

const minSize = 0;

/**
 * Prints the difference in dist stats between two builds.
 * @param oldStats - stats captured before the build
 * @param newStats - stats captured after the build
 */
function printDistStatsDiff(oldStats: IDistStats, newStats: IDistStats): void {
  const diffSize = newStats.totalSize - oldStats.totalSize,
    bundleDiffSize = newStats.bundleSize - oldStats.bundleSize,
    bundleSizeIncreased = bundleDiffSize > minSize,
    bundleSizeText = bundleSizeIncreased ? "increased" : "decreased",
    diffSizeText = diffSize > minSize ? "increased" : "decreased",
    outputFunc = bundleSizeIncreased ? console.warn : console.info,
    texts = [
      bundleDiffSize
        ? `Bundle size ${bundleSizeText} from ${oldStats.bundleSize.toString()} to ${newStats.bundleSize.toString()} (${Math.abs(bundleDiffSize).toString()}B)`
        : "Bundle size unchanged",
      diffSize
        ? `Size ${diffSizeText} from ${oldStats.totalSize.toString()} to ${newStats.totalSize.toString()} (${Math.abs(diffSize).toString()}B)`
        : "Size unchanged",
      `Files count changed from ${oldStats.totalFiles.toString()} to ${newStats.totalFiles.toString()} (${(newStats.totalFiles - oldStats.totalFiles).toString()})`,
      `Folders count changed from ${oldStats.totalFolders.toString()} to ${newStats.totalFolders.toString()} (${(newStats.totalFolders - oldStats.totalFolders).toString()})`,
    ];

  for (const text of texts) {
    outputFunc(text);
  }
}

const buildCommand = new Command("build");

buildCommand.description("Build the tsParticles library using TypeScript");

buildCommand.addCommand(bundleWebpackCommand);
buildCommand.addCommand(bundleRollupCommand);
buildCommand.addCommand(circularDepsCommand);
buildCommand.addCommand(clearCommand);
buildCommand.addCommand(distFilesCommand);
buildCommand.addCommand(esLintCommand);
buildCommand.addCommand(prettierCommand);
buildCommand.addCommand(tscCommand);

buildCommand.option(
  "-a, --all",
  "Do all build steps (default if no flags are specified) (same as -b -c -d -l -p -t)",
  false,
);
buildCommand.option("-b, --bundle-rollup", "Bundle the library using Rollup", false);
buildCommand.option("--bundle-webpack", "Bundle the library using Webpack", false);
buildCommand.option("-c, --clean", "Clean the dist folder", false);
buildCommand.option(
  "--ci",
  "Do all build steps for CI, no fixing files, only checking if they are formatted correctly, sets silent to true by default",
  false,
);
buildCommand.option("-r, --circular-deps", "Check for circular dependencies", false);
buildCommand.option("-d, --dist", "Build the dist files", false);
buildCommand.option("-l, --lint", "Lint the source files", false);
buildCommand.option("-p, --prettify", "Prettify the source files", false);
buildCommand.option(
  "-s, --silent <boolean>",
  "Reduce the amount of output during the build, defaults to false, except when --ci is set",
  false,
);
buildCommand.option("-t, --tsc", "Build the library using TypeScript", false);

buildCommand.argument("[path]", `Path to the project root folder, default is "src"`, "src");

buildCommand.action(async (argPath: string) => {
  const opts = buildCommand.opts(),
    all =
      !!opts["all"] ||
      (!opts["bundleWebpack"] &&
        !opts["bundleRollup"] &&
        !opts["clean"] &&
        !opts["circularDeps"] &&
        !opts["dist"] &&
        !opts["lint"] &&
        !opts["prettify"] &&
        !opts["tsc"]),
    silentOpt = opts["silent"] as string | boolean,
    ci = !!opts["ci"],
    basePath = process.cwd(),
    sourcePath = path.join(basePath, argPath),
    options = {
      circularDeps: all || !!opts["circularDeps"],
      clean: all || !!opts["clean"],
      distfiles: all || !!opts["dist"],
      doBundleRollup: all || !!opts["bundleRollup"],
      doBundleWebpack: !!opts["bundleWebpack"],
      doLint: all || !!opts["lint"],
      prettier: all || !!opts["prettify"],
      silent: silentOpt === "false" ? false : !!silentOpt || ci,
      tsc: all || !!opts["tsc"],
    },
    oldStats = await getDistStats(basePath);

  if (options.clean && !(await clearDist(basePath, options.silent))) {
    throw new Error("Dist clear failed");
  }

  if (options.prettier && !(await prettifySrc(basePath, sourcePath, ci, options.silent))) {
    throw new Error("Source prettify failed");
  }

  if (options.doLint && !(await lint(ci, options.silent))) {
    throw new Error("Lint failed");
  }

  if (options.tsc && !(await buildTS(basePath, options.silent))) {
    throw new Error("TypeScript build failed");
  }

  if (options.circularDeps && !(await checkCircularDeps(basePath, options.silent))) {
    throw new Error("Circular dependencies check failed");
  }

  if (options.doBundleWebpack && !(await bundleWebpack(basePath, options.silent))) {
    throw new Error("Webpack bundling failed");
  }

  if (options.doBundleRollup && !(await bundleRollup(basePath, options.silent))) {
    throw new Error("Rollup bundling failed");
  }

  if (
    options.prettier &&
    (!(await prettifyReadme(basePath, ci, options.silent)) ||
      !(await prettifyPackageJson(basePath, ci, options.silent)) ||
      !(await prettifyPackageDistJson(basePath, ci, options.silent)))
  ) {
    throw new Error("Project prettify failed");
  }

  if (options.distfiles && !(await buildDistFiles(basePath, options.silent))) {
    throw new Error("Dist files build failed");
  }

  if (!options.silent) {
    printDistStatsDiff(oldStats, await getDistStats(basePath));
  }
});

export { buildCommand };
