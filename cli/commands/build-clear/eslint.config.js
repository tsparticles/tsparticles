import { defineConfig } from "eslint/config";
import tsParticlesESLintConfig from "@tsparticles/eslint-config";

export default defineConfig([
  tsParticlesESLintConfig,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: process.cwd(),
      },
    },
    rules: {
      "no-console": "off",
    },
  },
]);
