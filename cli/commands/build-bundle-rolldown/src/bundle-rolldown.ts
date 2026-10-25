import { Command } from "commander";
import { bundleRolldown } from "./utils.js";
import { existsSync } from "node:fs";

const bundleRolldownCommand = new Command("bundle:rolldown");

bundleRolldownCommand.description("Bundle the tsParticles library using Rolldown");
bundleRolldownCommand.option(
  "--ci",
  "Do all build steps for CI, no fixing files, only checking if they are formatted correctly, sets silent to true by default",
  false,
);
bundleRolldownCommand.option(
  "-s, --silent <boolean>",
  "Reduce the amount of output during the build, defaults to false, except when --ci is set",
  false,
);

bundleRolldownCommand.action(async () => {
  const opts = bundleRolldownCommand.opts(),
    ci = !!opts["ci"],
    silentOpt = opts["silent"] as string | boolean,
    silent = silentOpt === "false" ? false : !!silentOpt || ci,
    basePath = process.cwd();

  if (!existsSync(basePath)) {
    throw new Error("Provided path does not exist");
  }

  if (!(await bundleRolldown(basePath, silent))) {
    throw new Error("Rolldown bundling failed");
  }

  console.info("Rolldown bundling completed successfully!");
});

export { bundleRolldown, bundleRolldownCommand };
