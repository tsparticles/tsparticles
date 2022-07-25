import fs from "fs";
import path from "path";

export async function buildDistFiles(basePath: string): Promise<void> {
    const pkgInfo = await import(path.join(basePath, "package.json"));
    const libPackage = path.join(basePath, "package.dist.json");

    fs.readFile(libPackage, function (error: NodeJS.ErrnoException | null, data: Buffer) {
        if (error) {
            throw error;
        }

        const text = data.toString();
        const libObj = JSON.parse(text);

        libObj.version = pkgInfo.version;

        if (pkgInfo.dependencies) {
            libObj.dependencies = JSON.parse(JSON.stringify(pkgInfo.dependencies));
        } else if (pkgInfo.peerDependencies) {
            libObj.peerDependencies = JSON.parse(JSON.stringify(pkgInfo.peerDependencies));
        }

        fs.writeFileSync(libPackage, JSON.stringify(libObj, undefined, 2), "utf8");

        console.log(`package.dist.json updated successfully to version ${pkgInfo.version}`);

        fs.copyFileSync(path.join(basePath, "README.md"), path.join(basePath, "dist", "README.md"));
        fs.copyFileSync(path.join(basePath, "package.dist.json"), path.join(basePath, "dist", "package.json"));

        if (!fs.existsSync(path.join(basePath, "dist", "scripts"))) {
            fs.mkdirSync(path.join(basePath, "dist", "scripts"));
        }
    });
}
