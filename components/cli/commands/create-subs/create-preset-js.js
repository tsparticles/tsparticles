/**
 *
 * @param {string} name
 * @param {string} description
 */
async function createJavaScriptTemplate(name, description) {
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

  replaceESLintIgnore(destPath, name);

  await fs.writeFile(eslintIgnorePath, replacedText);
}

/**
 *
 * @param {string} path
 * @param {string} name
 */
async function replaceESLintIgnore(destPath, name) {
  const eslintIgnorePath = path.resolve(destPath, ".eslintignore");
  const eslintIgnore = await fs.readFile(eslintIgnorePath, "utf-8");

  const eslintIgnoreRegex =
    /tsparticles\.preset\.template(\.bundle)?(\.min)?\.js/g;

  const replacedText = eslintIgnore.replace(
    eslintIgnoreRegex,
    `tsparticles.preset.${name}$1$2.js`
  );
}

module.exports = {
  createJavaScriptTemplate,
};
