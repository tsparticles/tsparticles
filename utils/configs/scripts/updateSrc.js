const fs = require("fs");

const toCamelCase = (text) => text.replace(/-./g, (m) => m[1].toUpperCase());
const files = fs.readdirSync("./src").filter(t => t.endsWith(".json"));
const importsNames = files.map(t => `import ${toCamelCase(t.substring(0, t.length - 5))} from "./${t}";`);
const exportsNames = files.map(t => `    ${toCamelCase(t.substring(0, t.length - 5))}`);

importsNames.push("import { tsParticles } from \"tsparticles-engine\";");

const regex = /import \{?\s?(\w+)\s?}? from/i

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

    const aMatch = regex.exec(a), bMatch = regex.exec(b);

    return aMatch[1].localeCompare(bMatch[1]);
};

importsNames.sort(checkStrings);

const text = `${importsNames.join("\n")}

const mainConfigs = tsParticles as {
    configs?: unknown;
};

mainConfigs.configs = {
${exportsNames.join(",\n")},
};
`;

fs.writeFileSync("./src/index.ts", text);
