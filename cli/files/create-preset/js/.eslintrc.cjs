module.exports = {
  root: true,
  parser: "@babel/eslint-parser",
  parserOptions: { requireConfigFile: "false", babelOptions: { configFile: "./.babelrc" } },
  extends: ["eslint:recommended", "prettier"],
  rules: {
    "sort-imports": [
      "error",
      {
        ignoreCase: false,
        ignoreDeclarationSort: false,
        ignoreMemberSort: false,
        memberSyntaxSortOrder: ["none", "all", "multiple", "single"],
        allowSeparatedGroups: false,
      },
    ],
  },
};
