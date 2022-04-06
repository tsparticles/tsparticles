/**
 *
 * @param {string} str
 * @param {string} split
 * @returns {string}
 */
function capitalize(str, split) {
  if (split) {
    return str
      .split(split)
      .map((token) => capitalize(token))
      .join("");
  } else {
    return str.replace(/./, (c) => c.toUpperCase());
  }
}

/**
 *
 * @param {string} str
 * @param {string} split
 * @returns {string}
 */
function camelize(str, split) {
  const capitalized = capitalize(str, split);

  return capitalized.replace(/./, (c) => c.toLowerCase());
}

/**
 *
 * @param {string} str
 * @returns {string}
 */
function dash(str) {
  return str.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`);
}

module.exports = {
  camelize,
  capitalize,
  dash,
};
