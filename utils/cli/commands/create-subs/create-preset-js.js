const path = require("path");
const fs = require("fs-extra");
const { camelize, capitalize, dash } = require("../../utils/string-utils");

/**
 *
 * @param {string} name
 * @param {string} description
 * @param {string} repoUrl
 */
async function createJavaScriptTemplate(name, description, repoUrl) {
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
        filter: (src, dest) => {
            if (src.includes("node_modules") || src.includes("dist")) {
                return false;
            }

            return true;
        }
    });

    await replaceESLintIgnore(destPath, name);
    await replaceGitIgnore(destPath, name);
    await updateBundleFile(destPath, name);
    await updateIndexFile(destPath, name);
    await updatePackageFile(destPath, name, description, repoUrl);
    await updateReadmeFile(destPath, name, description, repoUrl);
    await updateWebpackFile(destPath, name, description);
}

/**
 *
 * @param {string} path
 * @param {string} name
 */
async function replaceESLintIgnore(destPath, name) {
    const eslintIgnorePath = path.resolve(destPath, ".eslintignore");
    const eslintIgnore = await fs.readFile(eslintIgnorePath, "utf-8");
    const camelizedName = camelize(camelize(name, "-"), " ");

    const eslintIgnoreRegex =
        /tsparticles\.preset\.template(\.bundle)?(\.min)?\.js/g;

    const replacedText = eslintIgnore.replace(
        eslintIgnoreRegex,
        `tsparticles.preset.${camelizedName}$1$2.js`
    );

    await fs.writeFile(eslintIgnorePath, replacedText);
}

/**
 *
 * @param {string} destPath
 * @param {string} name
 */
async function replaceGitIgnore(destPath, name) {
    const gitIgnorePath = path.resolve(destPath, ".gitignore");
    const gitIgnore = await fs.readFile(gitIgnorePath, "utf-8");
    const camelizedName = camelize(camelize(name, "-"), " ");

    const gitIgnoreRegex =
        /tsparticles\.preset\.template(\.bundle)?(\.min)?\.js/g;

    const replacedText = gitIgnore.replace(
        gitIgnoreRegex,
        `tsparticles.preset.${camelizedName}$1$2.js`
    );

    await fs.writeFile(gitIgnorePath, replacedText);
}

/**
 *
 * @param {string} destPath
 * @param {string} name
 */
async function updateBundleFile(destPath, name) {
    const bundlePath = path.resolve(destPath, "bundle.js");
    const bundle = await fs.readFile(bundlePath, "utf-8");
    const capitalizedName = capitalize(capitalize(name, "-"), " ");

    const bundleRegex = /loadTemplatePreset/g;

    const replacedText = bundle.replace(
        bundleRegex,
        `load${capitalizedName}Preset`
    );

    await fs.writeFile(bundlePath, replacedText);
}

/**
 *
 * @param {string} destPath
 * @param {string} name
 */
async function updateIndexFile(destPath, name) {
    const indexPath = path.resolve(destPath, "index.js");
    const index = await fs.readFile(indexPath, "utf-8");
    const capitalizedName = capitalize(capitalize(name, "-"), " ");
    const camelizedName = camelize(capitalizedName);

    const indexFunctionRegex = /loadTemplatePreset/g;

    const replacedFuncText = index.replace(
        indexFunctionRegex,
        `load${capitalizedName}Preset`
    );

    const indexNameRegex = /"template"/g;

    const replacedNameText = replacedFuncText.replace(
        indexNameRegex,
        `"${camelizedName}"`
    );

    await fs.writeFile(indexPath, replacedNameText);
}

/**
 *
 * @param {string} destPath
 * @param {string} name
 * @param {string} description
 * @param {string} repoUrl
 */
async function updatePackageFile(destPath, name, description, repoUrl) {
    const pacakgePath = path.resolve(destPath, "package.json");
    const package = await fs.readFile(pacakgePath, "utf-8");
    const camelizedName = camelize(camelize(name, "-"), " ");
    const dashedName = dash(camelizedName);
    const descriptionRegex = /"tsParticles template preset"/g;
    const replacedDescriptionText = package.replace(
        descriptionRegex,
        `"${description}"`
    );
    const fileRegex = /"tsparticles.preset.template.min.js"/g;
    const replacedFileText = replacedDescriptionText.replace(
        fileRegex,
        `"tsparticles.preset.${camelizedName}.min.js"`
    );

    const privateRegex = /"private": true/g;
    const replacedPrivateText = replacedFileText.replace(
        privateRegex,
        ""
    );


    const nameRegex = /"tsparticles-preset-template"/g;
    const nameReplacedText = replacedPrivateText.replace(
        nameRegex,
        `"tsparticles-preset-${dashedName}"`
    );

    const repoUrlRegex =
        /"url": "git\+https:\/\/github\.com\/tsparticles\/preset-template\.git"/g;
    const repoUrlReplacedText = nameReplacedText.replace(
        repoUrlRegex,
        `"url": "git+${repoUrl}"`
    );

    const issuesUrlRegex =
        /"url": "https:\/\/github\.com\/tsparticles\/preset-template\/issues"/g;
    const replacedText = repoUrlReplacedText.replace(
        issuesUrlRegex,
        `"url": "${repoUrl.replace(".git", "/issues")}"`
    );

    await fs.writeFile(pacakgePath, replacedText);
}

/**
 *
 * @param {string} destPath
 * @param {string} name
 * @param {string} description
 * @param {string} repoUrl
 */
async function updateReadmeFile(destPath, name, description, repoUrl) {
    const readmePath = path.resolve(destPath, "README.md");
    const readme = await fs.readFile(readmePath, "utf-8");
    const capitalizedName = capitalize(capitalize(name, "-"), " ");
    const camelizedName = camelize(capitalizedName);
    const dashedName = dash(camelizedName);

    const readmeDescriptionRegex = /tsParticles Template Preset/g;

    const replacedDescriptionText = readme.replace(
        readmeDescriptionRegex,
        `tsParticles ${description} Preset`
    );

    const readmePackageNameRegex = /tsparticles-preset-template/g;

    const replacedPackageNameText = replacedDescriptionText.replace(
        readmePackageNameRegex,
        `tsparticles-preset-${dashedName}`
    );

    const readmeFileNameRegex =
        /tsparticles\.preset\.template(\.bundle)?\.min\.js/g;

    const replacedFileNameText = replacedPackageNameText.replace(
        readmeFileNameRegex,
        `tsparticles.preset.${camelizedName}$1.min.js`
    );

    const readmeFunctionNameRegex = /loadTemplatePreset/g;

    const replacedFunctionNameText = replacedFileNameText.replace(
        readmeFunctionNameRegex,
        `load${capitalizedName}Preset`
    );

    const readmeMiniDescriptionRegex =
        /\[tsParticles\]\(https\:\/\/github.com\/matteobruni\/tsparticles\) preset template\./g;

    const replacedMiniDescriptionText = replacedFunctionNameText.replace(
        readmeMiniDescriptionRegex,
        `[tsParticles](https://github.com/matteobruni/tsparticles) preset ${name}.`
    );

    const readmeUsageRegex = /preset: "template"/g;

    const replacedUsageText = replacedMiniDescriptionText.replace(
        readmeUsageRegex,
        `preset: "${camelizedName}`
    );

    const sampleImageRegex = /!\[demo\]\(https:\/\/raw.githubusercontent.com\/tsparticles\/preset-template\/main\/images\/sample.png\)/g;
    const repoPath = repoUrl.includes("github.com") ? repoUrl.substring(repoUrl.indexOf("github.com/") + 11, repoUrl.indexOf(".git")) : "tsparticles/preset-template";
    const replacedText = replacedUsageText.replace(sampleImageRegex,
        `![demo](https://raw.githubusercontent.com/${repoPath}/main/images/sample.png)`)

    await fs.writeFile(readmePath, replacedText);
}

/**
 *
 * @param {string} destPath
 * @param {string} name
 * @param {string} description
 */
async function updateWebpackFile(destPath, name, description) {
    const webpackPath = path.resolve(destPath, "webpack.config.cjs");
    const webpack = await fs.readFile(webpackPath, "utf-8");
    const capitalizedName = capitalize(capitalize(name, "-"), " ");
    const camelizedName = camelize(capitalizedName);

    const webpackDescriptionRegex = /tsParticles Template Preset/g;

    const replacedDescriptionText = webpack.replace(
        webpackDescriptionRegex,
        `tsParticles ${description} Preset`
    );

    const webpackEntryRegex = /"template(\.bundle)?"/g;

    const replacedNameText = replacedDescriptionText.replace(
        webpackEntryRegex,
        `"${camelizedName}$1"`
    );

    await fs.writeFile(webpackPath, replacedNameText);
}

module.exports = {
    createJavaScriptTemplate,
};
