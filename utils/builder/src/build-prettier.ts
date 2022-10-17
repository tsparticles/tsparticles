import fs from "fs-extra";
import klaw from "klaw";
import path from "path";
import prettier from "prettier";

export async function prettifySrc(basePath: string, srcPath: string, ci: boolean): Promise<boolean> {
    try {
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

                    return false;
                }
            } else {
                const formatted = prettier.format(contents, options);

                await fs.writeFile(file.path, formatted, "utf8");
            }
        }

        return true;
    } catch (e) {
        console.error(e);

        return false;
    }
}

export async function prettifyReadme(basePath: string, ci: boolean): Promise<boolean> {
    try {
        const contents = await fs.readFile("README.md", "utf8"),
            options = (await prettier.resolveConfig(basePath)) ?? {};

        options.printWidth = 120;
        options.endOfLine = "lf";
        options.parser = "markdown";

        if (ci) {
            if (!prettier.check(contents, options)) {
                console.error(`README.md is not formatted correctly`);

                return false;
            }
        } else {
            const formatted = prettier.format(contents, options);

            await fs.writeFile("README.md", formatted, "utf8");
        }

        return (await prettifyTraductions(basePath, ci)) && (await prettifyMarkdownTypeDocFiles(basePath, ci));
    } catch (e) {
        console.error(e);

        return false;
    }
}

async function prettifyTraductions(basePath: string, ci: boolean): Promise<boolean> {
    try {
        const folder = "traduction",
            folderPath = path.join(basePath, folder);

        if (!fs.existsSync(folderPath)) {
            return true;
        }

        for await (const file of klaw(folderPath)) {
            if (file.stats.isDirectory()) {
                continue;
            }

            const contents = await fs.readFile(file.path, "utf8");

            const options = (await prettier.resolveConfig(basePath)) ?? {};

            options.printWidth = 120;
            options.endOfLine = "lf";
            options.parser = "markdown";

            if (ci) {
                if (!prettier.check(contents, options)) {
                    console.error(`${file.path} is not formatted correctly`);

                    return false;
                }
            } else {
                const formatted = prettier.format(contents, options);

                await fs.writeFile(file.path, formatted, "utf8");
            }
        }

        return true;
    } catch (e) {
        console.error(e);

        return false;
    }
}

async function prettifyMarkdownTypeDocFiles(basePath: string, ci: boolean): Promise<boolean> {
    try {
        const folder = "markdown",
            folderPath = path.join(basePath, folder);

        if (!fs.existsSync(folderPath)) {
            return true;
        }

        for await (const file of klaw(folderPath)) {
            if (file.stats.isDirectory()) {
                continue;
            }

            const contents = await fs.readFile(file.path, "utf8");

            const options = (await prettier.resolveConfig(basePath)) ?? {};

            options.printWidth = 120;
            options.endOfLine = "lf";
            options.parser = "markdown";

            if (ci) {
                if (!prettier.check(contents, options)) {
                    console.error(`${file.path} is not formatted correctly`);

                    return false;
                }
            } else {
                const formatted = prettier.format(contents, options);

                await fs.writeFile(file.path, formatted, "utf8");
            }
        }

        return true;
    } catch (e) {
        console.error(e);

        return false;
    }
}
