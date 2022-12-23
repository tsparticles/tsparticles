const fs = require("fs");

const toCamelCase = (text) => text.replace(/-./g, (m) => m[1].toUpperCase());
const files = fs.readdirSync("./src").filter(t => t.endsWith(".json"));
const importsNames = files.map(t => `import _${toCamelCase(t.substring(0, t.length - 5))} from "./${t}";`);
const exportsNames = files.map(t => `    ${toCamelCase(t.substring(0, t.length - 5))}`);

importsNames.push("import type { ISourceOptions } from \"tsparticles-engine\";");
importsNames.push("import { tsParticles } from \"tsparticles-engine\";");

const regex = /import (type )?\{?\s?(_?\w+)\s?}? from/i;

const checkStrings = (a, b) => {
    if (!b) {
        return -1;
    }

    if (!a) {
        return 1;
    }

    if (a === b) {
        return 0;
    }

    const aMatch = regex.exec(a), bMatch = regex.exec(b), first = aMatch[2], second = bMatch[2];

    return first > second ? 1 : first < second ? -1 : 0;
};

importsNames.sort(checkStrings);

const text = `${importsNames.join("\n")}

const ${exportsNames.map((t, idx) => `${idx === 0 ? t.trim() : t} = _${t.trim()} as unknown as ISourceOptions`).join(",\n")};

export type ExportedConfigurations = {
${exportsNames.map(t => `${t}: ISourceOptions;`).join("\n")}
};

const mainConfigs = tsParticles as {
    configs?: ExportedConfigurations;
};

mainConfigs.configs = {
${exportsNames.join(",\n")},
};

export {
${exportsNames.join(",\n")},
};
`;

fs.writeFileSync("./src/index.ts", text);
