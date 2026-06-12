#!/usr/bin/env node

import { spawnSync } from "node:child_process";

const forwardedArgs = process.argv.slice(2),
  result = spawnSync(
    "tsparticles-create",
    ["app", ...forwardedArgs, "--template", "404", "--framework", "vanilla"],
    {
      stdio: "inherit",
      shell: process.platform === "win32",
    },
  );

process.exit(result.status ?? 1);
