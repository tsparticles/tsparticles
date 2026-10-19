import { defineConfig } from "vite";

export default defineConfig({
  base: "./",
  oxc: {
    jsx: {
      runtime: "classic",
      pragma: "createElement",
      pragmaFrag: "Fragment",
    },
    jsxInject: "import { createElement } from 'inferno-create-element';\nimport { Fragment } from 'inferno';",
  },
});
