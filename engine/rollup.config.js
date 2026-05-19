import { loadParticlesEngine } from "@tsparticles/rollup-plugin";
import { fileURLToPath } from "node:url";
import { readFile } from "node:fs/promises";
import path from "node:path";

const __filename = fileURLToPath(import.meta.url),
  __dirname = path.dirname(__filename),
  rootPkgPath = path.join(__dirname, "package.json"),
  pkg = JSON.parse(await readFile(rootPkgPath, "utf8")),
  version = pkg.version;

export default loadParticlesEngine({
  version,
  dir: __dirname,
  progress: false,
});
