import { execFileSync } from "node:child_process";
import { mkdtemp, writeFile, readdir } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import assert from "node:assert/strict";
const temporary = await mkdtemp(path.join(tmpdir(), "v5-retired-templates-"));
const rows = [];
for (const name of [
  "scaffold",
  "login",
  "portfolio",
  "landing",
  "tictactoe",
  "confetti",
  "ribbons",
  "particles",
  "404",
]) {
  execFileSync("pnpm", ["--dir", path.resolve("templates", name), "pack", "--pack-destination", temporary, "--json"], {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  });
  const archive = (await readdir(temporary)).find((x) => x.includes(`template-${name}-`) && x.endsWith(".tgz"));
  assert(archive);
  const files = execFileSync("tar", ["-tzf", path.join(temporary, archive)], { encoding: "utf8" })
    .split("\n")
    .filter(Boolean);
  assert(!files.some((x) => /\/(vue2|nuxt2|nuxt3)\//.test(x)));
  if (name === "scaffold")
    for (const framework of ["vue3", "nuxt4"]) assert(files.includes(`package/template/${framework}/package.json`));
  rows.push({
    name,
    archive,
    files: files.length,
    retiredVariants: 0,
    supportedFrameworks: files
      .filter((x) => /^package\/template\/[^/]+\/package.json$/.test(x))
      .map((x) => x.split("/")[2]),
  });
}
await writeFile(".planning/handovers/evidence/e1/template-packages.json", JSON.stringify(rows, null, 2) + "\n");
console.log(JSON.stringify(rows));
