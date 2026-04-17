"use strict";

module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: ["eslint:recommended"],
  ignorePatterns: ["dist/", "tmp/", "node_modules/"],
};
