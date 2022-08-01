import { ESLint } from "eslint";

export async function lint(ci: boolean): Promise<boolean> {
    try {
        const eslint = new ESLint({
            baseConfig: {
                extends: ["@tsparticles/eslint-config"],
            },
            extensions: [".js", ".jsx", ".ts", ".tsx"],
            fix: !ci,
        });

        const results = await eslint.lintFiles(["src"]);

        await ESLint.outputFixes(results);

        const formatter = await eslint.loadFormatter("stylish");
        const resultText = formatter.format(results);

        console.log(resultText);

        return true;
    } catch {
        return false;
    }
}
