require("./create-subs/index");

const { addCommand, getCommand, getCommands } = require("../utils/commands");

/**
 *
 * @param {...string} args
 */
async function createCb(...args) {
  if (!args || !args.length) {
    await helpCb(...args.splice(1));
  } else {
    const command = getCommand(args[0]);

    if (command) {
      await command.callback(...args.splice(1));
    }
  }
}

/**
 *
 * @param  {...string} args
 */
async function helpCb(...args) {
  if (!args || !args.length) {
    console.log("List of Create commands\n");

    getCommands("create").forEach((command) => {
      console.log(`  ${command.name} - ${command.description || ""}`);
    });

    console.log();
  } else {
    const command = getCommand(args[0]);

    if (command) {
      await command.help(...args.splice(1));
    }
  }
}

/**
 * @type Command
 */
const create = {
  id: "create",
  name: "create",
  description:
    "Utility for creating projects (presets, plugins, updaters, etc.) starting from templates",
  callback: createCb,
  help: helpCb,
};

addCommand(create);
