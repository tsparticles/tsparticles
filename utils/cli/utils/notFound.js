/**
 * 
 * @param  {...string} args 
 */
function notFound(...args) {
  throw new Error(`Command not found: ${args[0]}`);
  //console.error(`Command not found: ${args[0]}`);
}

module.exports = {
  notFound,
};
