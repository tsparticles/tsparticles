const fs = require("fs-extra");

const mainPackage = require("../package.json");
const libPackage = "./template.json";

const workspaceVersions = {
  "@tsparticles/engine": require("../../../engine/package.json").version,
  "@tsparticles/slim": require("../../../bundles/slim/package.json").version,
  "@tsparticles/configs": require("../../../utils/configs/package.json").version,
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

  const libObj = JSON.parse(data.toString());

  for (const dep of Object.keys(libObj.package.dependencies)) {
    const resolved = resolveWorkspaceDependency(dep);
    if (resolved) {
      libObj.package.dependencies[dep] = resolved;
    }
  }

  for (const dep of Object.keys(libObj.package.devDependencies)) {
    const resolved = resolveWorkspaceDependency(dep);
    if (resolved) {
      libObj.package.devDependencies[dep] = resolved;
    }
  }

  fs.writeFile(libPackage, JSON.stringify(libObj, undefined, 2), "utf-8", function () {
    console.log("template.json dependencies updated successfully");
  });
});
