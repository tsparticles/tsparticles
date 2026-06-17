const fs = require("fs-extra");

const libPackage = "./template.json";

const workspaceVersions = {
  "@tsparticles/engine": require("../../../engine/package.json").version,
  "@tsparticles/slim": require("../../../bundles/slim/package.json").version,
  "@tsparticles/confetti": require("../../../bundles/confetti/package.json").version,
};

function resolveWorkspaceDependency(name) {
  const libObj = JSON.parse(fs.readFileSync(libPackage, "utf-8"));

  const allDeps = {
    ...libObj.package.dependencies,
    ...libObj.package.devDependencies,
  };

  const spec = allDeps[name];

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
