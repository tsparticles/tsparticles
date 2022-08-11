import path from "path";
import webpack from "webpack";

export async function bundle(basePath: string): Promise<boolean> {
    try {
        const options = await import(path.join(basePath, "webpack.config.js")),
            res = await new Promise<boolean>((resolve, reject) => {
                webpack(options.default, (err, stats) => {
                    if (err) {
                        console.error(err.stack || err);

                        reject(err);
                        return;
                    }

                    if (!stats) {
                        const err = "No stats returned from webpack";

                        console.error(err);
                        reject(err);

                        return;
                    }

                    const info = stats.toJson();

                    if (stats.hasErrors()) {
                        console.error(info.errors);

                        reject(info.errors);
                    }

                    if (stats.hasWarnings()) {
                        console.warn(info.warnings);
                    }

                    resolve(true);
                });
            });

        return res;
    } catch (e) {
        console.log(e);

        return false;
    }
}
