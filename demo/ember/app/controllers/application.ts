import Controller from "@ember/controller";
import { tracked } from "@glimmer/tracking";
import type { Container, Engine, ISourceOptions } from "@tsparticles/engine";
import { loadSnowPreset } from "@tsparticles/preset-snow";
import { initParticlesEngine } from "@tsparticles/ember/utils/init-particles-engine";
import { loadFull } from "tsparticles";
import { CONFETTI_OPTIONS, LINK_OPTIONS, SNOW_OPTIONS } from "../utils/options";

export default class ApplicationController extends Controller {
  @tracked isConfettiVisible = false;
  @tracked options: ISourceOptions = LINK_OPTIONS;
  @tracked theme = "default";

  confetti = CONFETTI_OPTIONS;

  // Use a typed args parameter for compatibility with Ember/TS
  constructor(...args: any[]) {
    super(...(args as [object?]));

    // Defer particles engine initialization to client runtime. Ember apps
    // may run in FastBoot (server) where window/document are not available.
    // Guard and initialize only on the client.
    if (typeof window !== "undefined") {
      void initParticlesEngine(async (engine: Engine) => {
        await loadFull(engine);
        await loadSnowPreset(engine);
      });
    }
  }

  loadedCallback = (container?: Container) => {
    console.log("Particles loaded", container);
  };

  switchConfig = () => {
    this.options = (this.options === LINK_OPTIONS ? SNOW_OPTIONS : LINK_OPTIONS) as ISourceOptions;
  };

  toggleTheme = () => {
    this.theme = this.theme === "default" ? "dark" : "default";
  };
}
