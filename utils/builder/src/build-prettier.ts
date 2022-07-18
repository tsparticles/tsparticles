import fs from "fs-extra";
import klaw from "klaw";
import prettier from "prettier";

export async function prettify(basePath: string, srcPath: string): Promise<void> {
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

        const formatted = prettier.format(contents, options);

        await fs.writeFile(file.path, formatted, "utf8");
    }
}
