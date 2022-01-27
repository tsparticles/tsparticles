const path = require("path");
const fs = require("fs-extra");

/**
 *
 * @param {string} name
 * @param {string} description
 * @param {string} repoUrl
 */
async function createTypeScriptTemplate(name, description, repoUrl) {
  const destPath = path.resolve(".");
  const sourcePath = path.resolve(
    __dirname,
    "../..",
    "files",
    "create-preset",
    "js"
  );

  await fs.copy(sourcePath, destPath, {
    overwrite: true,
    recursive: true,
  });
}

module.exports = {
  createTypeScriptTemplate,
};
