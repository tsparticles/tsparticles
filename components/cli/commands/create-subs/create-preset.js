const { addCommand } = require("../../utils/commands");
const { createJavaScriptTemplate } = require("./create-preset-js");
const { createTypeScriptTemplate } = require("./create-preset-ts");
const fs = require("fs-extra");
const path = require("path");

/**
 *
 * @param  {...string} args
 */
async function createPresetCb(...args) {
  if (!args || !args.length) {
    await helpPresetCb(...args);
  } else {
    if (args.length < 2) {
      console.log("Not enough parameters");

      await helpPresetCb(...args);

      return;
    }

    const typeIdx = args.indexOf("-type");
    const hasType = typeIdx >= 0;

    if (args.length < 3 && hasType) {
      console.log("Not enough parameters");

      await helpPresetCb(...args);

      return;
    }

    const type = hasType ? args[typeIdx + 1] : "js";
    const name = hasType ? args[typeIdx === 0 ? args[2] : args[0]] : args[0];

    if (!type) {
      console.log("Invalid type parameter");

      await helpPresetCb(...args);

      return;
    }

    switch (type) {
      case "js":
        console.log(
          "Creating new tsParticles preset using JavaScript template"
        );

        await createJavaScriptTemplate(name);

        break;
      case "ts":
        console.log(
          "Creating new tsParticles preset using TypeScript template"
        );

        await createTypeScriptTemplate(name);

        break;
      default:
        console.log("Invalid type parameter");

        await helpPresetCb(...args);

        return;
    }
  }
}

/**
 *
 * @param  {...string} args
 */
async function helpPresetCb(...args) {
  console.log("Create Preset Help\n");
  console.log(
    'tsparticles-cli create preset "<name>" "<description>" [-type <type>]\n'
  );
  console.log("  name - The preset name");
  console.log("  description - The preset description");
  console.log(
    "  type - The preset type, accepts ts (TypeScript) or js (JavaScript, default value)"
  );
  console.log();
}

/**
 * @type Command
 */
const createPreset = {
  id: "create-preset",
  name: "preset",
  description: "Create a tsParticles preset",
  callback: createPresetCb,
  help: helpPresetCb,
  parents: ["create"],
};

addCommand(createPreset);
