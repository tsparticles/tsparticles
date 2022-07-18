import { ESLint } from "eslint";

export async function lint(): Promise<void> {
    const eslint = new ESLint({
        baseConfig: {
            extends: ["@tsparticles/eslint-config"],
        },
        extensions: [".js", ".jsx", ".ts", ".tsx"],
        fix: true,
    });

    const results = await eslint.lintFiles(["src"]);

    await ESLint.outputFixes(results);

    const formatter = await eslint.loadFormatter("stylish");
    const resultText = formatter.format(results);

    console.log(resultText);
}
