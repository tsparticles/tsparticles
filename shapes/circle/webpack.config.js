import { loadParticlesShape } from "@tsparticles/webpack-plugin";
import { fileURLToPath } from "node:url";
import fs from "fs-extra";
import path from "node:path";

const __filename = fileURLToPath(import.meta.url),
    __dirname = path.dirname(__filename),
    rootPkgPath = path.join(__dirname, "package.json"),
    pkg = await fs.readJson(rootPkgPath),
    version = pkg.version;

export default loadParticlesShape({ moduleName: "circle", shapeName: "Circle", version, dir: __dirname });
