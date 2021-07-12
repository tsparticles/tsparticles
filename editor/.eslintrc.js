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
        "@typescript-eslint/no-explicit-any": "warn",
        "@typescript-eslint/no-var-requires": "warn",
        "@typescript-eslint/ban-types": "warn",
        "@typescript-eslint/explicit-member-accessibility": ["error", {
            "accessibility": "no-public"
        }],
        "@typescript-eslint/no-unused-vars": "warn",
        "@typescript-eslint/no-empty-function": "warn"
    }
};
