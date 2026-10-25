import { afterAll, describe, it, expect } from "vitest";
import { getDestinationDir, getRepositoryUrl, replaceTokensInFile, replaceTokensInFiles } from "../src";
import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";

describe("file-utils", async () => {
  const baseDir = path.resolve("tmp-files");

  await mkdir(baseDir, { recursive: true });

  describe("replace tokens in files", async () => {
    await writeFile(path.join(baseDir, "files1.txt"), "test");
    await writeFile(path.join(baseDir, "files2.txt"), "test");

    await replaceTokensInFiles([
      {
        path: path.join(baseDir, "files1.txt"),
        tokens: [
          {
            from: "test",
            to: "test1",
          },
        ],
      },
      {
        path: path.join(baseDir, "files2.txt"),
        tokens: [
          {
            from: "test",
            to: "test2",
          },
        ],
      },
    ]);

    it("should replace tokens in files", async () => {
      const data1 = await readFile(path.join(baseDir, "files1.txt"), "utf8"),
        data2 = await readFile(path.join(baseDir, "files2.txt"), "utf8");

      expect(data1).toBe("test1");
      expect(data2).toBe("test2");
    });
  });

  describe("replace tokens in file", async () => {
    await writeFile(path.join(baseDir, "file1.txt"), "test");

    await replaceTokensInFile({
      path: path.join(baseDir, "file1.txt"),
      tokens: [
        {
          from: "test",
          to: "test1",
        },
      ],
    });

    it("should replace tokens in files", async () => {
      const data = await readFile(path.join(baseDir, "file1.txt"), "utf8");

      expect(data).toBe("test1");
    });
  });

  describe("get destination dir", async () => {
    const destDir = await getDestinationDir(path.join("tmp-files", "baz"));

    it("should return the destination dir", () => {
      expect(destDir).toBe(path.join(baseDir, "baz"));
    });

    it("should return the destination dir", async () => {
      const destDir2 = await getDestinationDir(path.join("tmp-files", "baz"));

      expect(destDir2).toBe(path.join(baseDir, "baz"));
    });

    it("should throw exception", async () => {
      await writeFile(path.join(baseDir, "baz", "tmp.txt"), "");

      let ex = false;

      try {
        await getDestinationDir(path.join("tmp-files", "baz"));

        console.log("never");
      } catch {
        ex = true;
      }

      expect(ex).toBe(true);
    });
  });

  describe("get repository url", () => {
    it("should return the repository url", async () => {
      expect(await getRepositoryUrl()).not.toBe("");
    });
  });

  afterAll(async () => {
    await rm(baseDir, { recursive: true, force: true });
  });
});
