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

        const errors = ESLint.getErrorResults(results);

        await ESLint.outputFixes(results);

        const formatter = await eslint.loadFormatter("stylish");
        const resultText = formatter.format(results);

        if (errors.length > 0) {
            const messages = errors.map(t =>
                t.messages.map(m => `${t.filePath} (${m.line},${m.column}): ${m.message}`).join("\n")
            );
            console.log(messages.join("\n"));

            return false;
        }

        console.log(resultText);

        return true;
    } catch {
        return false;
    }
}
