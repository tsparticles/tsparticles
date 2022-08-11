const { notFound } = require("./notFound");

/**
 * @callback CommandCallback
 * @param {...string} args
 * @returns {Promise<void>}
 */

/**
 * @callback CommandHelpCallback
 * @param {...string} args
 * @returns {Promise<void>}
 */

/**
 * @typedef {Object} Command
 * @property {string} id
 * @property {string} name
 * @property {string[]} parents
 * @property {string} description
 * @property {CommandCallback} callback
 * @property {CommandHelpCallback} help
 */

/**
 * @type Command[]
 */
const commands = [];

/**
 *
 * @param {string} name
 * @returns {Command | undefined}
 */
function findCommand(name, ...parents) {
  const command = getCommands(...parents).find((c) => c.name === name);

  return command;
}

/**
 *
 * @param {string} id
 * @returns {Command | undefined}
 */
function findCommandById(id) {
  const command = commands.find((c) => c.id === id);

  return command;
}

/**
 *
 * @param {...string} parents
 * @returns {Command[]}
 */
function getCommands(...parents) {
  let subCommands = commands;

  if (parents) {
    for (const parent of parents) {
      subCommands = subCommands.filter(
        (t) => t.parents && t.parents.includes(parent)
      );
    }
  }

  return subCommands;
}

/**
 *
 * @param {string} name
 * @param {...string} parents
 * @returns {Command | undefined}
 */
function getCommand(name, ...parents) {
  const command = findCommand(name, ...parents);

  if (!command) {
    notFound(...[name, ...parents]);

    return;
  }

  return command;
}

/**
 *
 * @param {Command} command
 */
function addCommand(command) {
  if (!command) {
    throw new Error("Impossible add an undefined command");
  }

  if (findCommandById(command.id)) {
    console.log(`${command.name} already present`);

    return;
  }

  commands.push(command);

  commands.sort((a, b) => a.name - b.name);
}

/**
 *
 * @param {string} commandName
 * @param  {...string} args
 */
async function handleCommand(commandName, ...args) {
  const command = getCommand(commandName);

  if (command) {
    await command.callback(...args);
  }
}

module.exports = {
  addCommand,
  getCommand,
  getCommands,
  handleCommand,
};
