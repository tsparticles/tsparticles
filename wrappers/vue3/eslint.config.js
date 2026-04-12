import js from "@eslint/js";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import vuePlugin from "eslint-plugin-vue";
import vueParser from "vue-eslint-parser";

export default [
  {
    ignores: ["dist/**", "node_modules/**"],
  },
  js.configs.recommended,
  ...vuePlugin.configs["flat/recommended"],
  {
    files: ["**/*.{js,mjs,cjs,ts,tsx,vue}"],
    languageOptions: {
      parser: vueParser,
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        parser: tsParser,
        extraFileExtensions: [".vue"],
      },
    },
    rules: {
      "no-unused-vars": "off",
    },
  },
];
