import { access, copyFile, mkdir, readdir, rm } from "node:fs/promises";
import { constants } from "node:fs";
import { resolve } from "node:path";

const workspaceRoot = resolve(process.cwd());

const tasks = [
  {
    packageName: "@tsparticles/all",
    destination: "js/tsparticles",
  },
  {
    packageName: "@tsparticles/configs",
    destination: "js/configs",
  },
];

async function pathExists(path) {
  try {
    await access(path, constants.F_OK);

    return true;
  } catch {
    return false;
  }
}

async function resolveDistSource(packageName) {
  const packageRoot = resolve(workspaceRoot, "node_modules", packageName);
  const candidates = [
    resolve(packageRoot, "dist"),
    packageRoot,
  ];

  for (const candidate of candidates) {
    if (await pathExists(candidate)) {
      return candidate;
    }
  }

  throw new Error(`Dist assets not found for ${packageName}`);
}

async function copyTopLevelJsFiles(source, destination) {
  const entries = await readdir(source, { withFileTypes: true });

  await rm(destination, { recursive: true, force: true });
  await mkdir(destination, { recursive: true });

  for (const entry of entries) {
    if (!entry.isFile() || !entry.name.endsWith(".js")) {
      continue;
    }

    await copyFile(resolve(source, entry.name), resolve(destination, entry.name));
  }
}

for (const task of tasks) {
  const source = await resolveDistSource(task.packageName);
  const destination = resolve(workspaceRoot, task.destination);

  await copyTopLevelJsFiles(source, destination);
}

console.log("Dist JS assets copied successfully.");

