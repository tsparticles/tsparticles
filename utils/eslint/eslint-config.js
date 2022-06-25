module.exports = {
    root: true,
    parser: "@typescript-eslint/parser",
    parserOptions: {
        project: "./tsconfig.json",
    },
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
        "@typescript-eslint/ban-types": "warn",
        "@typescript-eslint/comma-spacing": [ "error" ],
        "@typescript-eslint/consistent-generic-constructors": [
            "error",
            "constructor"
        ],
        "@typescript-eslint/explicit-function-return-type": "error",
        "@typescript-eslint/explicit-member-accessibility": [ "error", {
            "accessibility": "no-public"
        } ],
        "@typescript-eslint/no-explicit-any": "error",
        "@typescript-eslint/no-extra-parens": [ "error" ],
        "@typescript-eslint/no-var-requires": "error",
        "@typescript-eslint/prefer-readonly": [ "error" ],
        "comma-spacing": "off",
        "no-extra-parens": "off",
        "sort-imports": [ "error", {
            "allowSeparatedGroups": false,
            "ignoreCase": false,
            "ignoreDeclarationSort": false,
            "ignoreMemberSort": false,
            "memberSyntaxSortOrder": [ "none", "all", "multiple", "single" ],
        } ]
    }
};
