import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { createRequire } from "node:module";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const require = createRequire(path.resolve("cli/utils/rollup-plugin/package.json")),
  { minify } = createRequire(require.resolve("@rollup/plugin-terser"))("terser"),
  original = await readFile("bundles/all/dist/tsparticles.all.bundle.js", "utf8"),
  mode = process.argv[3] ?? "empty-branch",
  branchPatches = [
    [
      "return this.#applyModifiers(this.size.value, m => m.radius);",
      "const radius = this.size.value; return this.#modifiers.length ? this.#applyModifiers(radius, m => m.radius) : radius;",
    ],
    ...["fill", "stroke"].map((kind) => [
      `return this.#getRollColor(this.#applyModifiers(getOklchFromAnimation(this.${kind}Color), m => m.${kind}Color));`,
      `const color = getOklchFromAnimation(this.${kind}Color); return this.#getRollColor(this.#modifiers.length ? this.#applyModifiers(color, m => m.${kind}Color) : color);`,
    ]),
    [
      "this.#applyModifiers(undefined, m => m.opacity)",
      "(this.#modifiers.length ? this.#applyModifiers(undefined, m => m.opacity) : undefined)",
    ],
  ];
const patches =
  mode === "control"
    ? []
    : mode === "inline-radius"
      ? [
          [
            "return this.#applyModifiers(this.size.value, m => m.radius);",
            "let value = this.size.value; for (const mod of this.#modifiers) { if (mod.enabled) { const override = mod.radius; if (override !== undefined) value = override; } } return value;",
          ],
        ]
      : mode === "shared-selectors"
        ? [
            ["m => m.radius", "e5ModifierRadius"],
            ["m => m.fillColor", "e5ModifierFill"],
            ["m => m.strokeColor", "e5ModifierStroke"],
            ["m => m.opacity", "e5ModifierOpacity"],
            [
              "class Particle {",
              "const e5ModifierRadius = m => m.radius, e5ModifierFill = m => m.fillColor, e5ModifierStroke = m => m.strokeColor, e5ModifierOpacity = m => m.opacity; class Particle {",
            ],
          ]
        : branchPatches;
let source = original;
for (const [before, after] of patches) {
  assert.equal(source.split(before).length, 2, before);
  source = source.replace(before, after);
}
const result = await minify(source, { compress: true, mangle: true, format: { comments: false } }),
  destination = process.argv[2] ?? "/tmp/e5-getter-fast-path.bundle.min.js",
  hash = (bytes) => createHash("sha256").update(bytes).digest("hex");
await writeFile(destination, result.code);
await writeFile(
  destination + ".json",
  JSON.stringify(
    {
      mode,
      originalSha256: hash(original),
      patchedSha256: hash(source),
      minifiedSha256: hash(result.code),
      patches,
      limitations: [
        "In-memory getter prototype, no production source changed; default Terser settings differ from the release bundle configuration.",
      ],
    },
    null,
    2,
  ) + "\n",
);
console.log(destination, result.code.length);
