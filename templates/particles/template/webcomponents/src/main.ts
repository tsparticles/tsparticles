import "./style.css";
import { loadParticles } from "@tsparticles/particles";
import { tsParticles } from "@tsparticles/engine";

(async () => {
  await loadParticles(tsParticles);

  const app = document.createElement("div");
  app.id = "app";
  app.innerHTML = "<h1>tsParticles</h1>";
  document.body.appendChild(app);

  const particles = document.createElement("web-particles");
  particles.id = "tsparticles";
  document.body.appendChild(particles);
})();
