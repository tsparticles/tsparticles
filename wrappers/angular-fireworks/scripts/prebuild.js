const fs = require("fs");
const mainPackage = require("../package.json");
const libPackage = "./projects/ng-fireworks/package.json";
const libReadme = "./projects/ng-fireworks/README.md";
const sourceReadme = "./README.md";

function resolveWorkspaceDependency(spec, fallbackVersion) {
  if (!spec?.startsWith("workspace:")) {
    return spec;
  }

  const workspaceRange = spec.replace("workspace:", "");

  if (workspaceRange.length > 0 && workspaceRange !== "*" && workspaceRange !== "^" && workspaceRange !== "~") {
    return workspaceRange;
  }

  return workspaceRange === "^" || workspaceRange === "~" ? `${workspaceRange}${fallbackVersion}` : `^${fallbackVersion}`;
}

fs.readFile(libPackage, function (error, data) {
  if (error) {
    throw error;
  }

  const text = data.toString();

  const libObj = JSON.parse(text);

  libObj.version = mainPackage.version;
  libObj.peerDependencies["@tsparticles/fireworks"] = resolveWorkspaceDependency(
    mainPackage.dependencies["@tsparticles/fireworks"],
    mainPackage.version,
  );
  libObj.peerDependencies["@tsparticles/engine"] = resolveWorkspaceDependency(
    mainPackage.dependencies["@tsparticles/engine"],
    mainPackage.version,
  );

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

fs.readFile("./projects/ng-fireworks/package.dist.json", function (distError, distData) {
  if (distError) {
    console.error("Failed to read package.dist.json:", distError.message);
    return;
  }
  const distObj = JSON.parse(distData);
  distObj.version = mainPackage.version;
  fs.writeFile("./projects/ng-fireworks/package.dist.json", JSON.stringify(distObj, undefined, 2), 'utf-8', function () {
    console.log(`lib package.dist.json updated successfully to version ${mainPackage.version}`);
  });
});
