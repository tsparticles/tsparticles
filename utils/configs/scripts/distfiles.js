const fs = require("fs");
const mainInfo = require("../package.json");

fs.readdir("./dist/cjs", function (error, files) {
    if (error) {
        throw error;
    }

    const skip = [ "index.js", "bundle.js" ]

    files.forEach(function (file) {
        if (skip.includes(file)) {
            return;
        }

        const data = require(`../dist/cjs/${file}`);

        fs.writeFileSync(`./dist/${file.replace(".js", ".json")}`, JSON.stringify(data), "utf8");
    });
});

const libPackage = "./package.dist.json";

fs.readFile(libPackage, function (error, data) {
    if (error) {
        throw error;
    }

    const text = data.toString();
    const libObj = JSON.parse(text);

    libObj.version = mainInfo.version;

    if (mainInfo.dependencies) {
        libObj.dependencies = JSON.parse(JSON.stringify(mainInfo.dependencies));
    }

    fs.writeFileSync(libPackage, JSON.stringify(libObj, undefined, 2), "utf8");

    console.log(`package.dist.json updated successfully to version ${mainInfo.version}`);

    fs.copyFileSync("./README.md", "./dist/README.md");
    fs.copyFileSync("./package.dist.json", "./dist/package.json");

    if (!fs.existsSync("./dist/scripts")) {
        fs.mkdirSync("./dist/scripts");
    }
});
