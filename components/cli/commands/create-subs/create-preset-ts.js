/**
 *
 * @param {string} name
 * @param {string} description
 */
async function createTypeScriptTemplate(name, description) {
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
