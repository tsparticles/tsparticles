import path from "node:path";
import webpack from "webpack";

/**
 * @param basePath - The basePath
 * @param silent - The silent
 * @returns true if the bundle was created
 */
export async function bundleWebpack(basePath: string, silent: boolean): Promise<boolean> {
  if (!silent) {
    console.info("Webpack bundling started");
  }

  let res: boolean;

  try {
    const options = (await import(path.join(basePath, "webpack.config.js"))) as { default: webpack.Configuration };

    res = await new Promise<boolean>((resolve, reject) => {
      webpack(options.default, (err, stats) => {
        if (err) {
          console.error(err.stack ?? err);

          reject(err);

          return;
        }

        if (!stats) {
          const err = new Error("No stats returned from webpack");

          console.error(err);

          reject(err);

          return;
        }

        const statsInfo = stats.toJson();

        if (stats.hasErrors()) {
          console.error(statsInfo.errors);

          reject(new Error(statsInfo.errors?.map(error => error.message).join("\n")));
        }

        if (stats.hasWarnings()) {
          console.warn(statsInfo.warnings);
        }

        resolve(true);
      });
    });
  } catch (e) {
    console.error(e);

    res = false;
  }

  if (!silent) {
    console.info("Webpack bundling completed");
  }

  return res;
}
