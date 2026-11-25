/* global console, process */
import assert from "node:assert/strict";
import { access, readdir, readFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd(),
  sourcePath = path.join(root, ".planning/handovers/V5-MIGRATION.md"),
  draftsDirectory = path.join(root, ".planning/handovers/evidence/e10/migration-drafts"),
  source = await readFile(sourcePath, "utf8"),
  sourceSections = [...source.matchAll(/^#{2,3} .+$/gm)].map((match) => match[0].split(" ")[0]),
  sourceCode = [...source.matchAll(/```[^\n]*\n([\s\S]*?)```/g)].map((match) => match[1].trimEnd()),
  drafts = (await readdir(draftsDirectory)).filter((file) => /^v5-migration-[a-z]{2}\.md$/.test(file));

assert(drafts.length > 0, "No localized migration drafts found");

for (const draftFile of drafts) {
  const draftPath = path.join(draftsDirectory, draftFile),
    draft = await readFile(draftPath, "utf8"),
    sections = [...draft.matchAll(/^#{2,3} .+$/gm)].map((match) => match[0].split(" ")[0]),
    code = [...draft.matchAll(/```[^\n]*\n([\s\S]*?)```/g)].map((match) => match[1].trimEnd());

  assert.deepEqual(sections, sourceSections, `${draftFile} section structure differs from English`);
  assert.deepEqual(code, sourceCode, `${draftFile} code examples differ from English`);

  const localLinks = [...draft.matchAll(/\]\(([^)]+)\)/g)].map((match) => match[1].split("#")[0]);

  for (const link of localLinks) {
    if (link && !link.includes("://")) {
      await access(path.resolve(path.dirname(draftPath), decodeURIComponent(link)));
    }
  }

  console.log(
    `${draftFile}: section structure, ${code.length} code examples, and ${localLinks.length} local links match`,
  );
}
