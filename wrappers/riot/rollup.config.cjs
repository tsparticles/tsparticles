const { readFileSync } = require("node:fs");
const path = require("node:path");
const { compile } = require("@riotjs/compiler");
const babel = require("@rollup/plugin-babel").babel || require("@rollup/plugin-babel");

// Inline riot plugin to avoid peer-dependency resolution issues with rollup-plugin-riot
const riotPlugin = () => ({
  name: "riot",
  transform(code, id) {
    if (!id.endsWith(".riot")) return null;
    const { code: compiledCode, map } = compile(code, { file: id });
    return { code: compiledCode, map };
  },
});

const external = ["riot", "@tsparticles/engine"];

const plugins = [
  riotPlugin(),
  babel({
    exclude: "node_modules/**",
    inputSourceMap: true,
    babelHelpers: "bundled",
  }),
];

const typesPlugin = () => ({
  name: "riot-types",
  generateBundle() {
    this.emitFile({
      type: "asset",
      fileName: "riot-particles.d.ts",
      source: readFileSync(path.resolve(__dirname, "src/riot-particles.d.ts"), "utf8"),
    });
  },
});

module.exports = [
  {
    input: "src/riot-particles.riot",
    output: {
      file: "dist/riot-particles.cjs",
      format: "cjs",
      sourcemap: true,
      exports: "named",
    },
    external,
    plugins: [...plugins, typesPlugin()],
  },
  {
    input: "src/riot-particles.riot",
    output: {
      file: "dist/riot-particles.esm.js",
      format: "esm",
      sourcemap: true,
    },
    external,
    plugins: [...plugins, typesPlugin()],
  },
];
