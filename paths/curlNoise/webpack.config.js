import { loadParticlesPath } from "@tsparticles/webpack-plugin";
import { fileURLToPath } from "node:url";
import fs from "fs-extra";
import path from "node:path";

const __filename = fileURLToPath(import.meta.url),
    __dirname = path.dirname(__filename),
    rootPkgPath = path.join(__dirname, "package.json"),
    pkg = await fs.readJson(rootPkgPath),
    version = pkg.version;

export default loadParticlesPath({
    moduleName: "curl.noise",
    pluginName: "Curl Noise",
    version,
    dir: __dirname
});
