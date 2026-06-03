#!/usr/bin/env node
const fs = require("fs");
const path = require("path");

const pkgDir = process.cwd();
const pkgPath = path.join(pkgDir, "package.json");
const distPkgPath = path.join(pkgDir, "package.dist.json");
const distDir = path.join(pkgDir, "dist");
const distPkgOut = path.join(distDir, "package.json");

const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8"));
const distPkg = JSON.parse(fs.readFileSync(distPkgPath, "utf8"));
const srcPkg = JSON.parse(fs.readFileSync(distPkgPath, "utf8"));

/* sync version back to source template, but keep __VERSION__ placeholders intact */
srcPkg.version = pkg.version;
fs.writeFileSync(distPkgPath, JSON.stringify(srcPkg, null, 2) + "\n");

/* resolve __VERSION__ for the published dist/package.json */
distPkg.version = pkg.version;

for (const key of ["dependencies", "peerDependencies", "optionalDependencies"]) {
	if (distPkg[key]) {
		for (const [dep, ver] of Object.entries(distPkg[key])) {
			if (ver.includes("__VERSION__")) {
				distPkg[key][dep] = ver.replace("__VERSION__", pkg.version);
			}
		}
	}
}

if (!fs.existsSync(distDir)) {
	fs.mkdirSync(distDir, { recursive: true });
}
fs.writeFileSync(distPkgOut, JSON.stringify(distPkg, null, 2) + "\n");
