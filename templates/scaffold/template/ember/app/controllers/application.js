import Controller from "@ember/controller";
import { action } from "@ember/object";
import { initParticlesEngine } from "@tsparticles/ember";
import { loadSlim } from "@tsparticles/slim";

export default class ApplicationController extends Controller {
  options = {
    fullScreen: { enable: true, zIndex: -1 },
    background: { color: { value: "#1a1a2e" } },
    fpsLimit: 60,
    particles: {
      number: { value: 80, density: { enable: true } },
      color: { value: ["#6c5ce7", "#a29bfe", "#fd79a8"] },
      shape: { type: "circle" },
      opacity: { value: 0.5, random: true },
      size: { value: { min: 1, max: 4 }, random: true },
      move: {
        enable: true,
        speed: 2,
        direction: "none",
        random: false,
        straight: false,
        outModes: { default: "out" },
      },
    },
    detectRetina: true,
  };

  @action
  async initParticles() {
    await initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    });
  }
}
