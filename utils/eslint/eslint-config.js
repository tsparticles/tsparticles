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
        "@typescript-eslint/consistent-type-exports": [ "error" ],
        "@typescript-eslint/consistent-type-imports": [ "error" ],
        "@typescript-eslint/explicit-function-return-type": "error",
        "@typescript-eslint/explicit-member-accessibility": [ "error", {
            "accessibility": "no-public"
        } ],
        "@typescript-eslint/no-explicit-any": "error",
        //"@typescript-eslint/no-extra-parens": [ "error" ],
        "@typescript-eslint/no-inferrable-types": "error",
        "@typescript-eslint/member-ordering": [ "error", {
            "default": {
                "memberTypes": [
                    // Index signature
                    "signature",

                    // Fields
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
                    "private-abstract-field",

                    "public-field",
                    "protected-field",
                    "private-field",

                    "static-field",
                    "instance-field",
                    "abstract-field",

                    "decorated-field",

                    "field",

                    // Constructors
                    "public-constructor",
                    "protected-constructor",
                    "private-constructor",

                    "constructor",

                    // Getters & Setters
                    [ "public-static-get", "public-static-set" ],
                    [ "protected-static-get", "protected-static-set" ],
                    [ "private-static-get", "private-static-set" ],

                    [ "public-decorated-get", "public-decorated-set" ],
                    [ "protected-decorated-get", "protected-decorated-set" ],
                    [ "private-decorated-get", "private-decorated-set" ],

                    [ "public-instance-get", "public-instance-set" ],
                    [ "protected-instance-get", "protected-instance-set" ],
                    [ "private-instance-get", "private-instance-set" ],

                    [ "public-abstract-get", "public-abstract-set" ],
                    [ "protected-abstract-get", "protected-abstract-set" ],
                    [ "private-abstract-get", "private-abstract-set" ],

                    [ "public-get", "public-set" ],
                    [ "protected-get", "protected-set" ],
                    [ "private-get", "private-set" ],

                    [ "static-get", "static-set" ],
                    [ "instance-get", "instance-set" ],
                    [ "abstract-get", "abstract-set" ],

                    [ "decorated-get", "decorated-set" ],

                    [ "get", "set" ],

                    // Methods
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
                    "private-abstract-method",

                    "public-method",
                    "protected-method",
                    "private-method",

                    "static-method",
                    "instance-method",
                    "abstract-method",

                    "decorated-method",

                    "method"
                ],
                "order": "alphabetically"
            }
        } ],
        "@typescript-eslint/no-unnecessary-type-arguments": "error",
        "@typescript-eslint/no-unnecessary-type-assertion": "error",
        "@typescript-eslint/no-var-requires": "error",
        "@typescript-eslint/prefer-readonly": [ "error" ],
        "comma-spacing": "off",
        //"no-extra-parens": "off",
        "sort-imports": [ "error", {
            "allowSeparatedGroups": false,
            "ignoreCase": false,
            "ignoreDeclarationSort": false,
            "ignoreMemberSort": false,
            "memberSyntaxSortOrder": [ "none", "all", "multiple", "single" ],
        } ]
    }
};
