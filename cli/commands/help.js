const { addCommand, getCommand, getCommands } = require("../utils/commands");

/**
 *
 * @param {...string} args
 */
async function helpCb(...args) {
  if (!args || !args.length) {
    console.log("List of commands\n");

    getCommands().forEach((command) => {
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
const help = {
  id: "help",
  name: "help",
  description: "List of commands, or specific command help",
  callback: helpCb,
  help: helpCb,
};

addCommand(help);
