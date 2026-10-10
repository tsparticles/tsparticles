import type { Config } from "prettier";

const prettierConfig: Config = {
  singleQuote: false,
  semi: true,
  printWidth: 120,
  endOfLine: "lf",
  plugins: ["prettier-plugin-multiline-arrays"],
  overrides: [
    {
      files: ["*.js", "*.ts", "*.jsx", "*.tsx", "*.vue", "*.svelte", "*.html", "*.json", "*.md"],
      options: {
        tabWidth: 2,
        arrowParens: "avoid",
      },
    },
    {
      files: "*.riot",
      options: {
        parser: "mdx",
        bracketSameLine: true,
      },
    },
  ],
};

export default prettierConfig;
