import { loadParticlesShape } from "@tsparticles/webpack-plugin";
import { fileURLToPath } from "url";
import fs from "fs-extra";
import path from "path";

const __filename = fileURLToPath(import.meta.url),
    __dirname = path.dirname(__filename),
    rootPkgPath = path.join(__dirname, "package.json"),
    pkg = await fs.readJson(rootPkgPath),
    version = pkg.version;

export default loadParticlesShape({ moduleName: "cards", shapeName: "Cards", version, dir: __dirname });
