import fs from "fs-extra";
import klaw from "klaw";
import prettier from "prettier";

export async function prettifySrc(basePath: string, srcPath: string, ci: boolean): Promise<void> {
    for await (const file of klaw(srcPath)) {
        if (file.stats.isDirectory()) {
            continue;
        }

        const contents = await fs.readFile(file.path, "utf8");

        const options = (await prettier.resolveConfig(basePath)) ?? {};

        options.printWidth = 120;
        options.endOfLine = "lf";
        options.parser = "typescript";
        options.tabWidth = 4;

        if (ci) {
            if (!prettier.check(contents, options)) {
                console.error(`${file.path} is not formatted correctly`);
                process.exitCode = 1;
                process.abort();
            }
        } else {
            const formatted = prettier.format(contents, options);

            await fs.writeFile(file.path, formatted, "utf8");
        }
    }
}

export async function prettifyReadme(basePath: string, ci: boolean): Promise<void> {
    const contents = await fs.readFile("README.md", "utf8"),
        options = (await prettier.resolveConfig(basePath)) ?? {};

    options.printWidth = 120;
    options.endOfLine = "lf";
    options.parser = "markdown";
    options.tabWidth = 4;

    const formatted = prettier.format(contents, options);

    await fs.writeFile("README.md", formatted, "utf8");
}
