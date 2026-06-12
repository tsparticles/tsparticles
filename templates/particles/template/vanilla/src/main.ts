import "./style.css";
import { tsParticles } from "@tsparticles/engine";
import { loadParticles } from "@tsparticles/particles";

(async () => {
  await loadParticles(tsParticles);

  await tsParticles.load({
    id: "tsparticles",
    options: {
      background: { color: { value: "#0d0d2b" } },
      fpsLimit: 120,
      particles: {
        number: { value: 80, density: { enable: true } },
        color: { value: "#ffffff" },
        shape: { type: "circle" },
        opacity: { value: 0.5 },
        size: { value: { min: 1, max: 5 } },
        links: {
          enable: true,
          distance: 150,
          color: "#ffffff",
          opacity: 0.3,
          width: 1,
        },
        move: {
          enable: true,
          speed: 2,
          direction: "none",
          random: false,
          straight: false,
          outModes: { default: "bounce" },
        },
      },
      interactivity: {
        events: {
          onHover: { enable: true, mode: "repulse" },
          onClick: { enable: true, mode: "push" },
        },
        modes: {
          repulse: { distance: 100, duration: 0.4 },
          push: { quantity: 4 },
        },
      },
      detectRetina: true,
    },
  });
})();
