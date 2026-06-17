import { initParticlesEngine } from "@tsparticles/lit";
import { loadSlim } from "@tsparticles/slim";
import "./my-app";
import "./style.css";

void initParticlesEngine(async (engine) => {
  await loadSlim(engine);
});
