const fs = require("fs");

const paths = [
    "core/main",
    "core/editor",
    "components/angular",
    "components/inferno",
    "components/jquery",
    "components/preact",
    "components/react",
    "components/svelte",
    "components/vue",
    "components/vue3",
    "presets/60fps",
    "presets/backgroundMask",
    "presets/basic",
    "presets/bigCircles",
    "presets/bouncing",
    "presets/fire",
    "presets/fontAwesome",
    "presets/fountain",
    "presets/snow",
    "presets/stars",
    "shapes/bubble",
    "shapes/heart",
    "shapes/multiline-text",
    "shapes/spiral"
];

const lines = [];

for (const path of paths) {
    try {
        const packageInfo = require(`../${path}/package.json`);

        if (packageInfo) {
            lines.push(`npm deprecate ${packageInfo.name}@"<${packageInfo.version}" "The latest version is ${packageInfo.version}, please update ${packageInfo.name}"`);
        }
    } catch (err) {
        console.log(err);
    }

    if (lines.length) {
        fs.writeFile("./deprecate.sh", lines.join('\n'), function (err) {
            if (err) {
                console.log(err);
            }
        });
    }
}
