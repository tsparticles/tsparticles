import { readFile, writeFile } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, "..");
const templateDir = join(rootDir, "files", "empty-project");

function resolveWorkspaceVersion(value, version) {
    if (!value.startsWith("workspace:")) {
        return value;
    }

    const spec = value.slice("workspace:".length);

    if (!spec || spec === "*") {
        return version;
    }

    if (spec === "^" || spec === "~") {
        return `${spec}${version}`;
    }

    return spec;
}

function resolveDeps(deps, version) {
    return Object.fromEntries(
        Object.entries(deps).map(([name, value]) => [
            name,
            resolveWorkspaceVersion(value, version),
        ]),
    );
}

async function main() {
    const pkg = JSON.parse(await readFile(join(rootDir, "package.json"), "utf8"));
    const { version } = pkg;

    if (!version) {
        console.error("No version found in create-utils/package.json");
        process.exit(1);
    }

    const pkgJsonPath = join(templateDir, "package.json");
    const pkgDistJsonPath = join(templateDir, "package.dist.json");

    const pkgJson = JSON.parse(await readFile(pkgJsonPath, "utf8"));
    const pkgDistJson = JSON.parse(await readFile(pkgDistJsonPath, "utf8"));

    pkgJson.version = version;

    if (pkgJson.devDependencies) {
        pkgJson.devDependencies = resolveDeps(pkgJson.devDependencies, version);
    }

    if (pkgJson.dependencies) {
        pkgJson.dependencies = resolveDeps(pkgJson.dependencies, version);
    }

    if (pkgJson.peerDependencies?.["@tsparticles/engine"]) {
        pkgJson.peerDependencies["@tsparticles/engine"] = `^${version}`;
    }

    pkgDistJson.version = version;

    if (pkgDistJson.peerDependencies?.["@tsparticles/engine"]) {
        pkgDistJson.peerDependencies["@tsparticles/engine"] = `^${version}`;
    }

    const jsonIndent = 2;

    await writeFile(pkgJsonPath, `${JSON.stringify(pkgJson, null, jsonIndent)}\n`, "utf8");
    await writeFile(pkgDistJsonPath, `${JSON.stringify(pkgDistJson, null, jsonIndent)}\n`, "utf8");

    console.log(`Updated empty-project templates to version ${version}`);
}

main();
