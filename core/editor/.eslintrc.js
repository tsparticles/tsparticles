module.exports = {
    root: true,
    parser: "@typescript-eslint/parser",
    plugins: [
        "@typescript-eslint"
    ],
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended",
        "prettier"
    ],
    rules: {
        "@typescript-eslint/no-explicit-any": 1,
        "@typescript-eslint/no-var-requires": 1,
        "@typescript-eslint/ban-types": 1,
        "@typescript-eslint/no-unused-vars": 1,
        "@typescript-eslint/no-empty-function": 1
    }
};