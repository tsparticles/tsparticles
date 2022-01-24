const { addCommand } = require("../../utils/commands");

/**
 * 
 * @param  {...string} args 
 */
function createPresetCb(...args) {
    if (!args || !args.length) {
        helpPresetCb(...args);
    } else {

    }
}

/**
 * 
 * @param  {...string} args 
 */
function helpPresetCb(...args) {
    console.log("Create Preset Help\n");
    console.log("tsparticles-cli create preset \"<name>\" \"<description>\" [-type <type>]\n");
    console.log("  name - The preset name");
    console.log("  description - The preset description");
    console.log("  type - The preset type, accepts ts (TypeScript) or js (JavaScript, default value)");
    console.log();
}

const createPreset = {
  id: "create-preset",
  name: "preset",
  description: "Create a tsParticles preset",
  callback: createPresetCb,
  help: helpPresetCb,
  parents: ["create"],
};

addCommand(createPreset);
