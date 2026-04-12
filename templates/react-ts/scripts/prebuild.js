const fs = require("fs-extra");

const mainPackage = require("../package.json");
const libPackage = "./template.json";
const workspaceVersions = {
  "@tsparticles/react": require("../../../wrappers/react/package.json").version,
  "@tsparticles/engine": require("../../../engine/package.json").version,
  tsparticles: require("../../../bundles/full/package.json").version,
};

function resolveWorkspaceDependency(name) {
  const spec = mainPackage.dependencies[name];

  if (!spec?.startsWith("workspace:")) {
    return spec;
  }

  const workspaceRange = spec.replace("workspace:", "");

  if (workspaceRange.length > 0 && workspaceRange !== "*" && workspaceRange !== "^" && workspaceRange !== "~") {
    return workspaceRange;
  }

  const version = workspaceVersions[name];

  if (!version) {
    throw new Error(`Cannot resolve workspace dependency version for ${name}`);
  }

  return workspaceRange === "^" || workspaceRange === "~" ? `${workspaceRange}${version}` : `^${version}`;
}

fs.readFile(libPackage, function (error, data) {
  if (error) {
    throw error;
  }

  const text = data.toString();

  const libObj = JSON.parse(text);

  libObj.package.dependencies["@tsparticles/react"] = resolveWorkspaceDependency("@tsparticles/react");
  libObj.package.dependencies.tsparticles = resolveWorkspaceDependency("tsparticles");
  libObj.package.dependencies["@tsparticles/engine"] = resolveWorkspaceDependency("@tsparticles/engine");

  fs.writeFile(libPackage, JSON.stringify(libObj, undefined, 2), "utf-8", function () {
    console.log("template.json dependencies updated successfully");
  });
});
