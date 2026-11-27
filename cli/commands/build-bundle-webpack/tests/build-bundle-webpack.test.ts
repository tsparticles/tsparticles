/* eslint-disable */
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, symlinkSync, writeFileSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import { runInNewContext } from "node:vm";
import { describe, expect, it } from "vitest";
import { loadParticlesBundle } from "@tsparticles/webpack-plugin";

import { bundleWebpack, bundleWebpackCommand } from "../src/bundle-webpack.js";

describe("build-bundle-webpack", () => {
  it("should export bundleWebpack function", () => {
    expect(typeof bundleWebpack).toBe("function");
  });

  it("should export bundleWebpackCommand", () => {
    expect(bundleWebpackCommand).toBeDefined();
    expect(typeof bundleWebpackCommand.name).toBe("function");
  });

  it("should generate Webpack entries only for files emitted by bundle packages", () => {
    const configs = loadParticlesBundle({
      bundle: true,
      bundleName: "basic",
      dir: "/tmp/basic",
      moduleName: "tsparticles.basic",
      progress: false,
      version: "4.6.0",
    }) as { entry: Record<string, string> }[];
    const entries = configs.flatMap(config => Object.values(config.entry));

    expect(entries).toHaveLength(6);
    expect(entries).toContain("./dist/browser/index.js");
    expect(entries).toContain("./dist/browser/index.lazy.js");
    expect(entries).toContain("./dist/browser/bundle.js");
    expect(entries).not.toContain("./dist/browser/bundle.lazy.js");
  });

  it("should resolve the external engine from the classic tsParticles namespace", async () => {
    const configs = loadParticlesBundle({
      bundle: false,
      bundleName: "basic",
      dir: "/tmp/basic",
      moduleName: "tsparticles.basic",
      progress: false,
      version: "4.6.0",
    }) as { externals: unknown[] }[];
    const externalResolver = configs[0].externals.find(external => typeof external === "function") as (
      data: { request: string },
      callback: (error?: Error | null, external?: unknown) => void,
    ) => void;
    const external = await new Promise<Record<string, unknown>>((resolve, reject) => {
      externalResolver({ request: "@tsparticles/engine" }, (error, result) => {
        if (error) {
          reject(error);

          return;
        }

        resolve(result as Record<string, unknown>);
      });
    });

    expect(external.root).toEqual(["tsParticles"]);
  });

  it("should build a standalone package entry with the generated Webpack config", async () => {
    const dir = mkdtempSync(path.join(os.tmpdir(), "tsparticles-webpack-smoke-"));

    try {
      const browserDir = path.join(dir, "dist/browser");

      mkdirSync(browserDir, { recursive: true });
      symlinkSync(path.resolve(process.cwd(), "../../../node_modules"), path.join(dir, "node_modules"));
      writeFileSync(path.join(browserDir, "bundle.js"), "export const smoke = true;\n");
      writeFileSync(path.join(dir, "package.json"), JSON.stringify({ type: "module" }));
      writeFileSync(
        path.join(dir, "webpack.config.js"),
        `import { loadParticlesBundle } from "@tsparticles/webpack-plugin";
const dir = new URL(".", import.meta.url).pathname;
const configs = loadParticlesBundle({ bundle: true, bundleName: "basic", dir, moduleName: "tsparticles.basic", progress: false, version: "4.6.0" });
export default configs.filter(config => Object.keys(config.entry).some(name => name.endsWith(".bundle")));
`,
      );

      expect(await bundleWebpack(dir, true)).toBe(true);
      expect(existsSync(path.join(dir, "dist", "tsparticles.tsparticles.basic.bundle.js"))).toBe(true);
    } finally {
      rmSync(dir, { force: true, recursive: true });
    }
  });

  it("should build an external engine entry against the classic engine namespace", async () => {
    const dir = mkdtempSync(path.join(os.tmpdir(), "tsparticles-webpack-external-"));

    try {
      const browserDir = path.join(dir, "dist/browser");

      mkdirSync(browserDir, { recursive: true });
      symlinkSync(path.resolve(process.cwd(), "../../../node_modules"), path.join(dir, "node_modules"));
      writeFileSync(
        path.join(browserDir, "index.js"),
        'import { createEngine } from "@tsparticles/engine"; export const create = createEngine;\n',
      );
      writeFileSync(path.join(dir, "package.json"), JSON.stringify({ type: "module" }));
      writeFileSync(
        path.join(dir, "webpack.config.js"),
        `import { loadParticlesBundle } from "@tsparticles/webpack-plugin";
const dir = new URL(".", import.meta.url).pathname;
const configs = loadParticlesBundle({ bundle: false, bundleName: "basic", dir, moduleName: "tsparticles.basic", progress: false, version: "4.6.0" });
export default configs.filter(config => Object.keys(config.entry).some(name => !name.includes(".lazy") && !name.includes(".min")));
`,
      );

      expect(await bundleWebpack(dir, true)).toBe(true);
      const output = readFileSync(path.join(dir, "dist", "tsparticles.tsparticles.basic.js"), "utf8");
      const engine = { marker: "classic-engine" },
        context: Record<string, any> = { tsParticles: { createEngine: () => engine } };

      expect(output).toContain("tsParticles");
      runInNewContext(output, context);
      expect(context.create()).toBe(engine);
    } finally {
      rmSync(dir, { force: true, recursive: true });
    }
  });
});
