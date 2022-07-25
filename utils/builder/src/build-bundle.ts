import path from "path";
import webpack from "webpack";

export async function bundle(basePath: string): Promise<void> {
    const options = await import(path.join(basePath, "webpack.config.js"));

    webpack(options.default, (err, stats) => {
        if (err) {
            console.error(err.stack || err);
            return;
        }

        if (!stats) {
            console.error("No stats returned from webpack");
            return;
        }

        const info = stats.toJson();

        if (stats.hasErrors()) {
            console.error(info.errors);
        }

        if (stats.hasWarnings()) {
            console.warn(info.warnings);
        }
    });
}
