const fs = require("fs-extra");

const mainPackage = require("../package.json");
const libPackage = "./template.json";

const workspaceVersions = {
  "@tsparticles/engine": require("../../../engine/package.json").version,
  "@tsparticles/particles": require("../../../bundles/particles/package.json").version,
};

function resolveWorkspaceDependency(name, currentRange) {
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

  let prefix = "";

  if (workspaceRange === "^" || workspaceRange === "~") {
    prefix = workspaceRange;
  } else if (currentRange[0] === "^" || currentRange[0] === "~") {
    prefix = currentRange[0];
  }

  return `${prefix}${version}`;
}

fs.readFile(libPackage, function (error, data) {
  if (error) {
    throw error;
  }

  const libObj = JSON.parse(data.toString());

  for (const dep of Object.keys(libObj.package.dependencies)) {
    const resolved = resolveWorkspaceDependency(dep, libObj.package.dependencies[dep]);
    if (resolved) {
      libObj.package.dependencies[dep] = resolved;
    }
  }

  for (const dep of Object.keys(libObj.package.devDependencies)) {
    const resolved = resolveWorkspaceDependency(dep, libObj.package.devDependencies[dep]);
    if (resolved) {
      libObj.package.devDependencies[dep] = resolved;
    }
  }

  fs.writeFile(libPackage, `${JSON.stringify(libObj, undefined, 2)}\n`, "utf-8", function () {
    console.log("template.json dependencies updated successfully");
  });
});
