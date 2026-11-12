import { mkdtemp, readFile, rm } from "node:fs/promises";
import { expect, it, vi } from "vitest";
import { copyEmptyTemplateFiles } from "../src/template-utils.js";
import { createProjectTemplate } from "../src/create-project.js";
import { join } from "node:path";
import { tmpdir } from "node:os";

vi.mock(import("../src/template-utils.js"), async importOriginal => ({
  ...(await importOriginal()),
  runBuild: vi.fn(),
  runInstall: vi.fn(),
}));

it("copies the feature template from the ESM package into an external directory", async () => {
  const directory = await mkdtemp(join(tmpdir(), "tsparticles-template-"));

  try {
    await copyEmptyTemplateFiles(directory);

    const manifest = JSON.parse(await readFile(join(directory, "package.json"), "utf8"));

    expect(manifest.name).toBe("@tsparticles/empty-template");
    expect(manifest.devDependencies["prettier-plugin-multiline-arrays"]).toEqual(expect.any(String));
  } finally {
    await rm(directory, { force: true, recursive: true });
  }
});

it("generates a shape with type-only imports compatible with the feature lint configuration", async () => {
  const directory = await mkdtemp(join(tmpdir(), "tsparticles-shape-"));

  try {
    await createProjectTemplate({
      description: "Example shape",
      destination: directory,
      kind: "shape",
      name: "example",
      repositoryUrl: "",
    });

    const [entry, drawer] = await Promise.all([
      readFile(join(directory, "src/index.ts"), "utf8"),
      readFile(join(directory, "src/ShapeDrawer.ts"), "utf8"),
    ]);

    expect(entry).toContain('import type { Engine } from "@tsparticles/engine";');
    expect(drawer).toContain('import type { IShapeDrawData, IShapeDrawer } from "@tsparticles/engine";');
  } finally {
    await rm(directory, { force: true, recursive: true });
  }
});
