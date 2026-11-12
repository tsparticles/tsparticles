import { Command } from "commander";
import { buildDistFiles } from "./utils.js";
import { existsSync } from "node:fs";

const distFilesCommand = new Command("distfiles");

distFilesCommand.description("Prepare the dist files for tsParticles library");
distFilesCommand.option(
  "--ci",
  "Do all build steps for CI, no fixing files, only checking if they are formatted correctly, sets silent to true by default",
  false,
);
distFilesCommand.option(
  "-s, --silent <boolean>",
  "Reduce the amount of output during the build, defaults to false, except when --ci is set",
  false,
);

distFilesCommand.action(async () => {
  const opts = distFilesCommand.opts(),
    ci = opts["ci"] === true || distFilesCommand.parent?.getOptionValue("ci") === true,
    silentOpt = opts["silent"] as string | boolean,
    silent = silentOpt === "false" ? false : !!silentOpt || ci,
    basePath = process.cwd();

  if (!existsSync(basePath)) {
    throw new Error("Provided path does not exist");
  }

  if (!(await buildDistFiles(basePath, silent, ci))) {
    throw new Error("Dist files build failed");
  }

  console.info("Bundle finished successfully!");
});

export { buildDistFiles, distFilesCommand };
