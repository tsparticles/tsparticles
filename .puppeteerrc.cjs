module.exports = {
  skipDownload: !!(
    process.env.CI ||
    process.env.npm_config_frozen_lockfile === "true"
  ),
};
