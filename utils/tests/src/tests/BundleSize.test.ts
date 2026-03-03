/* eslint-disable @typescript-eslint/no-var-requires */
import { describe, expect, test } from "vitest";
import path from "node:path";
import os from "node:os";
import fs from "fs-extra";
import webpack from "webpack";
import { gzipSizeSync } from "gzip-size";

// Budgets in bytes (gzipped)
const BUDGETS: Record<string, number> = {
  slim: 50 * 1024, // 50 KB
  full: 200 * 1024, // 200 KB
  pjs: 80 * 1024,
};

function runWebpackConfig(configPath: string, outDir: string): Promise<string[]> {
  return new Promise((resolve, reject) => {
    // dynamic import ESM config
    import(configPath).then(mod => {
      const cfg = mod.default || mod;
      // override output.path to a temp dir
      const cfgClone = Array.isArray(cfg) ? cfg.map((c: any) => ({ ...c })) : { ...cfg };
      const applyOut = (c: any) => {
        c.mode = "production";
        c.output = c.output || {};
        c.output.path = outDir;
        c.output.filename = c.output.filename || "[name].js";
        return c;
      };

      const finalCfg = Array.isArray(cfgClone) ? cfgClone.map(applyOut) : applyOut(cfgClone);

      webpack(finalCfg as any, (err, stats) => {
        if (err) {
          return reject(err);
        }
        if (!stats) {
          return reject(new Error("No stats from webpack"));
        }
        const info = stats.toJson({ all: false, assets: true });
        if (stats.hasErrors()) {
          return reject(new Error(info.errors?.join("\n") || "webpack errors"));
        }

        const files: string[] = [];
        for (const asset of info.assets || []) {
          files.push(path.join(outDir, asset.name));
        }

        resolve(files);
      });
    }, reject);
  });
}

describe("Bundle size budgets", () => {
  test(
    "bundles stay within configured gzipped budgets",
    async () => {
      const bundlesDir = path.resolve(__dirname, "../../../../bundles");
      // find webpack configs
      const bundleNames = ["slim", "full", "pjs"].filter(n =>
        fs.existsSync(path.join(bundlesDir, n, "webpack.config.js")),
      );

      if (bundleNames.length === 0) {
        // no bundles to test; pass but warn
        expect(bundleNames.length).toBeGreaterThan(0);
        return;
      }

      const tmp = await fs.mkdtemp(path.join(os.tmpdir(), "tsparticles-bundle-"));

      try {
        for (const name of bundleNames) {
          const cfgPath = path.join(bundlesDir, name, "webpack.config.js");
          const outDir = path.join(tmp, name);
          await fs.ensureDir(outDir);

          const files = await runWebpackConfig(cfgPath, outDir);
          // measure gzipped size of emitted JS files
          let total = 0;
          for (const f of files) {
            if (!f.endsWith(".js")) continue;
            const buf = await fs.readFile(f);
            const size = gzipSizeSync(buf);
            total += size;
          }

          const budget = BUDGETS[name] ?? BUDGETS["full"];

          // Provide helpful message on failure
          expect(
            total,
            `${name} bundle gzipped size ${Math.round(total / 1024)}KB exceeds budget ${(budget / 1024).toFixed(0)}KB`,
          ).toBeLessThanOrEqual(budget);
        }
      } finally {
        // cleanup
        await fs.remove(tmp).catch(() => undefined);
      }
    },
    10 * 60 * 1000,
  );
});
