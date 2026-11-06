import { defineConfig, globalIgnores } from "eslint/config";
import { existsSync } from "node:fs";
import { join } from "node:path";
import js from "@eslint/js";
import prettierRecommended from "eslint-plugin-prettier/recommended";
import stylistic from "@stylistic/eslint-plugin";
import tsdoc from "eslint-plugin-tsdoc";
import tseslint from "typescript-eslint";

const tsFiles = ["**/*.{ts,tsx,mts,cts}"],
  jsFiles = ["**/*.{js,jsx,mjs,cjs}"],
  // process.cwd() is intentional: this is a shared config, the consumer's tsconfig is the one that matters
  hasTsconfig = existsSync(join(process.cwd(), "tsconfig.json"));

export default defineConfig([
  globalIgnores(["dist", "build", "coverage", "node_modules"]),

  js.configs.recommended,

  // --- TypeScript: presets + type-aware parsing ---
  {
    files: tsFiles,
    extends: [tseslint.configs.strictTypeChecked, tseslint.configs.stylisticTypeChecked],
    languageOptions: {
      parserOptions: hasTsconfig
        ? {
            projectService: {
              allowDefaultProject: ["*.config.ts"],
            },
            tsconfigRootDir: process.cwd(),
          }
        : undefined,
    },
  },

  // --- JS files: no type-aware rules ---
  {
    files: jsFiles,
    extends: [tseslint.configs.disableTypeChecked],
  },

  // --- Prettier: disables conflicting rules, must come BEFORE our own rules ---
  // (eslint-config-prettier turns off `curly` and some stylistic rules, so our rules must be re-applied after it)
  prettierRecommended,

  // --- Project rules (only overrides/additions relative to the presets) ---
  {
    files: tsFiles,
    plugins: {
      "@stylistic": stylistic,
      tsdoc,
    },
    linterOptions: {
      reportUnusedDisableDirectives: "error",
    },
    rules: {
      // --- stylistic (only rules Prettier does not cover) ---
      "@stylistic/lines-between-class-members": ["error", "always", { exceptAfterSingleLine: true }],
      "@stylistic/padding-line-between-statements": [
        "error",
        { blankLine: "always", prev: "*", next: "return" },
        { blankLine: "always", prev: ["const", "let"], next: "*" },
        { blankLine: "any", prev: ["const", "let"], next: ["const", "let"] },
      ],
      "@stylistic/spaced-comment": ["error", "always", { block: { balanced: true } }],

      // --- typescript-eslint ---
      "@typescript-eslint/consistent-type-exports": "error",
      "@typescript-eslint/consistent-type-imports": "error",
      "@typescript-eslint/explicit-function-return-type": ["error", { allowExpressions: true }],
      "@typescript-eslint/explicit-member-accessibility": ["error", { accessibility: "no-public" }],
      "@typescript-eslint/member-ordering": [
        "error",
        {
          default: {
            memberTypes: [
              "signature",
              "public-static-field",
              "protected-static-field",
              "private-static-field",
              "public-decorated-field",
              "protected-decorated-field",
              "private-decorated-field",
              "public-instance-field",
              "protected-instance-field",
              "private-instance-field",
              "public-abstract-field",
              "protected-abstract-field",
              "public-field",
              "protected-field",
              "private-field",
              "static-field",
              "instance-field",
              "abstract-field",
              "decorated-field",
              "field",
              "public-constructor",
              "protected-constructor",
              "private-constructor",
              "constructor",
              ["public-static-get", "public-static-set"],
              ["protected-static-get", "protected-static-set"],
              ["private-static-get", "private-static-set"],
              ["public-decorated-get", "public-decorated-set"],
              ["protected-decorated-get", "protected-decorated-set"],
              ["private-decorated-get", "private-decorated-set"],
              ["public-instance-get", "public-instance-set"],
              ["protected-instance-get", "protected-instance-set"],
              ["private-instance-get", "private-instance-set"],
              ["public-abstract-get", "public-abstract-set"],
              ["protected-abstract-get", "protected-abstract-set"],
              ["public-get", "public-set"],
              ["protected-get", "protected-set"],
              ["private-get", "private-set"],
              ["static-get", "static-set"],
              ["instance-get", "instance-set"],
              ["abstract-get", "abstract-set"],
              ["decorated-get", "decorated-set"],
              ["get", "set"],
              "public-static-method",
              "protected-static-method",
              "private-static-method",
              "public-decorated-method",
              "protected-decorated-method",
              "private-decorated-method",
              "public-instance-method",
              "protected-instance-method",
              "private-instance-method",
              "public-abstract-method",
              "protected-abstract-method",
              "public-method",
              "protected-method",
              "private-method",
              "static-method",
              "instance-method",
              "abstract-method",
              "decorated-method",
              "method",
            ],
            order: "alphabetically-case-insensitive",
          },
        },
      ],
      "@typescript-eslint/no-import-type-side-effects": "error",
      "@typescript-eslint/no-magic-numbers": [
        "error",
        {
          ignore: [-1, 0, 1, 2],
          ignoreArrayIndexes: true,
          ignoreClassFieldInitialValues: true,
          ignoreEnums: true,
          ignoreNumericLiteralTypes: true,
          ignoreReadonlyClassProperties: true,
        },
      ],
      // intentional downgrade from "error" (strictTypeChecked)
      "@typescript-eslint/no-empty-object-type": "warn",
      "@typescript-eslint/no-wrapper-object-types": "warn",
      "@typescript-eslint/no-unnecessary-type-arguments": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
          destructuredArrayIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/prefer-readonly": "error",
      "@typescript-eslint/restrict-template-expressions": [
        "error",
        {
          allowNumber: true,
          allowBoolean: true,
          allowNullish: true,
          allowRegExp: true,
        },
      ],
      "@typescript-eslint/switch-exhaustiveness-check": [
        "error",
        {
          allowDefaultCaseForExhaustiveSwitch: true,
          considerDefaultExhaustiveForUnions: true,
        },
      ],

      // --- core rules (not in js.recommended / typescript-eslint presets) ---
      curly: ["error", "all"],
      eqeqeq: ["error", "always"],
      "no-alert": "error",
      "no-console": "error",
      "no-duplicate-imports": ["error", { allowSeparateTypeImports: true }],
      "no-inner-declarations": "error",
      "no-nested-ternary": "error",
      "no-unneeded-ternary": "error",
      "no-useless-computed-key": "error",
      "no-useless-concat": "error",
      "no-useless-rename": "error",
      "no-useless-return": "error",
      "one-var": ["error", "consecutive"],
      "prefer-arrow-callback": "error",
      "prefer-object-spread": "error",
      "prefer-template": "error",
      "sort-imports": [
        "error",
        {
          allowSeparatedGroups: false,
          ignoreCase: false,
          ignoreDeclarationSort: false,
          ignoreMemberSort: false,
          memberSyntaxSortOrder: ["none", "all", "multiple", "single"],
        },
      ],
      yoda: ["error", "never", { exceptRange: true }],

      // --- docs ---
      "tsdoc/syntax": "warn",
    },
  },

  // --- No tsconfig.json found: type-aware rules cannot run, so turn them off for TS files too ---
  ...(hasTsconfig ? [] : [{ files: tsFiles, extends: [tseslint.configs.disableTypeChecked] }]),

  // --- Tests, scripts and config files ---
  {
    files: ["**/*.{test,spec}.{ts,tsx}", "scripts/**", "**/*.config.{ts,js,mjs,cjs}"],
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-magic-numbers": "off",
      "@typescript-eslint/no-non-null-assertion": "off",
      "no-console": "off",
    },
  },
]);
