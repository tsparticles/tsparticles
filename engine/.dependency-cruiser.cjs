const { defaultConfig } = require("@tsparticles/depcruise-config");

module.exports = {
  ...defaultConfig,
  forbidden: [
    ...defaultConfig.forbidden,
    {
      name: "no-engine-entrypoint-backedge",
      severity: "error",
      comment: "Core domains must not import the package entrypoints or public export aggregators.",
      from: {
        path: "(?:^|/)src/Core/",
      },
      to: {
        path: "(?:^|/)src/(?:index(?:[.]lazy)?|browser|exports|export-types)[.]ts$",
      },
    },
    {
      name: "no-core-domain-barrel-import",
      severity: "error",
      comment: "Core domains import direct sibling modules, not another domain barrel.",
      from: {
        path: "(?:^|/)src/Core/",
      },
      to: {
        path: "(?:^|/)src/Core/(?:Canvas|Container|Engine|Particles|Rendering)/index[.]ts$",
      },
    },
  ],
};
