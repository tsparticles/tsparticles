"use strict";

module.exports = function (environment) {
  const ENV = {
    modulePrefix: "ember-demo",
    environment,
    rootURL: "/",
    locationType: "history",
    EmberENV: {
      FEATURES: {},
      EXTEND_PROTOTYPES: false,
    },
    APP: {},
  };

  if (environment === "test") {
    ENV.locationType = "none";
    ENV.APP.rootElement = "#ember-testing";
    ENV.APP.autoboot = false;
  }

  return ENV;
};
