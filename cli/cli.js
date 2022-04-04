#!/usr/bin/env node
require("./commands/index");
const { handleCommand } = require("./utils/commands");
const pkgInfo = require("./package.json");

console.log(`tsParticles CLI v${pkgInfo.version}\n`);

if (process.argv.length < 3) {
  console.error(
    `Not enought parameters, run "tsparticles-cli help" for a full list`
  );

  return;
}

handleCommand(process.argv[2], ...process.argv.slice(3));
