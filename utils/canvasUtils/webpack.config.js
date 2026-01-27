import { loadParticlesBundle } from "@tsparticles/webpack-plugin";
import { fileURLToPath } from "url";
import fs from "fs-extra";
import path from "path";

const __filename = fileURLToPath(import.meta.url),
    __dirname = path.dirname(__filename),
    rootPkgPath = path.join(__dirname, "package.json"),
    pkg = await fs.readJson(rootPkgPath),
    version = pkg.version;

export default loadParticlesBundle({ moduleName: "canvas.utils", bundle: false, bundleName: "Canvas Utils", version, dir: __dirname });
