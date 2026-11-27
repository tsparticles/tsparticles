import { engine } from "./particlesEngine";
import { initParticlesEngine } from "@tsparticles/lit";
import { loadSlim } from "@tsparticles/slim";
import "./my-app";
import "./style.css";

void initParticlesEngine(engine, async engine => {
  await loadSlim(engine);
});
