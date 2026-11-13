import { execFileSync } from "node:child_process";
import { writeFile } from "node:fs/promises";
const results = [];
for (const condition of ["import", "require", "browser"]) {
  for (const subpath of ["", "/lazy"]) {
    const source = `import {createRequire} from 'node:module';
    import {pathToFileURL} from 'node:url';
    const require=createRequire(new URL('./utils/tests/package.json',import.meta.url));
    const specifier='@tsparticles/engine${subpath}';
    const before=new Set(Object.keys(globalThis));
    const resolved=require.resolve(specifier);
    const value=${condition === "require" ? "require(specifier)" : "await import(pathToFileURL(resolved).href)"};
    console.log(JSON.stringify({condition:'${condition}',subpath:'${subpath}',resolved,
      singleton:!!value.tsParticles,factory:typeof value.createEngine,
      globalsAdded:Object.keys(globalThis).filter(k=>!before.has(k)),window:typeof window,document:typeof document}));`;
    // require.resolve selects require by default; import cases resolve with import condition
    const args = [
      "--input-type=module",
      ...(condition === "browser" ? ["--conditions=browser"] : condition === "import" ? ["--conditions=import"] : []),
      "-e",
      source,
    ];
    results.push(JSON.parse(execFileSync(process.execPath, args, { encoding: "utf8" })));
  }
}
await writeFile(".planning/handovers/evidence/e0/package-conditions.json", JSON.stringify(results, null, 2) + "\n");
console.log(results);
