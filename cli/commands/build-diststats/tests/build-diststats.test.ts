/* eslint-disable */
import { mkdtemp, mkdir, writeFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { getDistStats } from "../src/diststats.js";

let tmpDirs: string[] = [];

async function createTempProject(): Promise<string> {
  const dir = await mkdtemp(path.join(tmpdir(), "tsparticles-diststats-"));

  tmpDirs.push(dir);

  return dir;
}

afterEach(async () => {
  for (const dir of tmpDirs) {
    await rm(dir, { recursive: true, force: true });
  }

  tmpDirs = [];
});

describe("getDistStats", () => {
  it("should return empty stats when dist folder is missing", async () => {
    const basePath = await createTempProject(),
      stats = await getDistStats(basePath);

    expect(stats).toEqual({
      bundleSize: 0,
      totalFiles: 0,
      totalFolders: 0,
      totalSize: 0,
    });
  });

  it("should count files, folders and total size", async () => {
    const basePath = await createTempProject(),
      distPath = path.join(basePath, "dist");

    await mkdir(path.join(distPath, "sub"), { recursive: true });
    await writeFile(path.join(distPath, "a.js"), "12345");
    await writeFile(path.join(distPath, "sub", "b.js"), "123");

    const stats = await getDistStats(basePath);

    expect(stats.totalFiles).toBe(2);
    expect(stats.totalFolders).toBe(1);
    expect(stats.totalSize).toBe(8);
    expect(stats.bundleSize).toBe(0);
  });

  it("should measure bundle size when jsdelivr points to a dist file", async () => {
    const basePath = await createTempProject(),
      distPath = path.join(basePath, "dist");

    await mkdir(distPath, { recursive: true });
    await writeFile(path.join(distPath, "package.json"), JSON.stringify({ jsdelivr: "bundle.min.js" }));
    await writeFile(path.join(distPath, "bundle.min.js"), "1234567890");
    await writeFile(path.join(distPath, "other.js"), "12");

    const stats = await getDistStats(basePath);

    expect(stats.totalFiles).toBe(3);
    expect(stats.bundleSize).toBe(10);
    expect(stats.totalSize).toBeGreaterThan(stats.bundleSize);
  });
});
