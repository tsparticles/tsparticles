import { setApplication } from "@ember/test-helpers";
import { start } from "ember-qunit";
import { loadTests } from "ember-qunit/test-loader";
import Application from "@tsparticles/ember-demo/app";
import config from "@tsparticles/ember-demo/config/environment";

setApplication(Application.create(config.APP));
loadTests();
start();
