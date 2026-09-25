import { loadParticlesUtil } from "@tsparticles/rolldown-plugin";
import { fileURLToPath } from "node:url";
import fs from "fs-extra";
import path from "node:path";

const __filename = fileURLToPath(import.meta.url),
  __dirname = path.dirname(__filename),
  rootPkgPath = path.join(__dirname, "package.json"),
  pkg = await fs.readJson(rootPkgPath),
  version = pkg.version;

export default loadParticlesUtil({
  moduleName: "smooth.value.noise",
  bundle: false,
  bundleName: "Smooth Value Noise",
  version,
  dir: __dirname,
  progress: false,
});
