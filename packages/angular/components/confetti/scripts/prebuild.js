const fs = require("fs");
const mainPackage = require("../package.json");
const libPackage = "./projects/ng-confetti/package.json";
const libReadme = "./projects/ng-confetti/README.md";
const sourceReadme = "./README.md";

fs.readFile(libPackage, function (error, data) {
  if (error) {
    throw error;
  }

  const text = data.toString();

  const libObj = JSON.parse(text);

  libObj.version = mainPackage.version;
  libObj.peerDependencies["@tsparticles/confetti"] = mainPackage.dependencies["@tsparticles/confetti"].replace("workspace:", "");

  fs.writeFile(libPackage, JSON.stringify(libObj, undefined, 2), 'utf-8', function () {
    console.log(`lib package.json updated successfully to version ${mainPackage.version}`);
  });

  fs.readFile(sourceReadme, function (readmeError, readmeData) {
    if (readmeError) {
      throw readmeError;
    }

    fs.writeFile(libReadme, readmeData.toString(), "utf-8", function () {
      console.log("README.md updated successfully");
    });
  });
});
