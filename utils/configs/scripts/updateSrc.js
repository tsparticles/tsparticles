const fs = require("fs");

const toCamelCase = (text) => text.replace(/-./g, (m) => m[1].toUpperCase());
const files = fs.readdirSync("./src").filter(t => t.endsWith(".json"));
const importsNames = files.map(t => `import ${toCamelCase(t.substring(0, t.length - 5))} from "./${t}";`);
const exportsNames = files.map(t => `    ${toCamelCase(t.substring(0, t.length - 5))}`)

const text = `${importsNames.join("\n")}
import { tsParticles } from "tsparticles-engine";

const mainConfigs = tsParticles as unknown as {
    configs: unknown
};

mainConfigs.configs = {
${exportsNames.join(",\n")}
}
`;

fs.writeFileSync("./src/index.ts", text);
