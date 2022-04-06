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
        "@typescript-eslint/no-explicit-any": "error",
        "@typescript-eslint/no-var-requires": "error",
        "@typescript-eslint/ban-types": "warn",
        "@typescript-eslint/explicit-function-return-type": "error",
        "@typescript-eslint/explicit-member-accessibility": [ "error", {
            "accessibility": "no-public"
        } ],
        "sort-imports": [ "error", {
            "ignoreCase": false,
            "ignoreDeclarationSort": false,
            "ignoreMemberSort": false,
            "memberSyntaxSortOrder": [ "none", "all", "multiple", "single" ],
            "allowSeparatedGroups": false
        } ]
    }
};
