import path from "path";
import {fileURLToPath} from "url";
import {defineConfig} from "eslint/config";
import tsParticlesESLintConfig from "@tsparticles/eslint-config";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig([
    tsParticlesESLintConfig,
    {
        languageOptions: {
            parserOptions: {
                project: [path.join(__dirname, "src", "tsconfig.json")],
                tsconfigRootDir: __dirname,
                sourceType: "module"
            }
        },
        rules: {
            "no-console": "off"
        }
    }
]);
