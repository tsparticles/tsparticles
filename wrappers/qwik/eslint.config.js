import tsParser from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import qwikPlugin from "eslint-plugin-qwik";

export default [
  {
    ignores: ["dist/**", "lib/**", "lib-types/**", "node_modules/**"],
  },
  {
    files: ["src/**/*.{ts,tsx}"],
    plugins: {
      "@typescript-eslint": tsPlugin,
      qwik: qwikPlugin,
    },
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: import.meta.dirname,
      },
      sourceType: "module",
      ecmaVersion: "latest",
    },
    rules: {
      ...qwikPlugin.configs.recommended.rules,
      "prefer-const": "warn",
      "no-console": "warn",
      "no-debugger": "warn",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/no-unnecessary-type-assertion": "warn",
      "@typescript-eslint/no-unnecessary-condition": "warn",
      "@typescript-eslint/no-useless-empty-export": "warn",
    },
  },
];