import "./style.css";
import { tsParticles } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

(async () => {
  await loadSlim(tsParticles);

  await tsParticles.load({
    id: "tsparticles",
    options: {
      fullScreen: { enable: true, zIndex: -1 },
      background: { color: { value: "#080818" } },
      fpsLimit: 60,
      particles: {
        number: { value: 100, density: { enable: true } },
        color: { value: ["#6c5ce7", "#00cec9", "#fd79a8", "#ffeaa7"] },
        shape: { type: "circle" },
        opacity: { value: 0.4, random: true },
        size: { value: { min: 1, max: 4 }, random: true },
        links: {
          enable: true,
          distance: 150,
          color: "#6c5ce7",
          opacity: 0.15,
          width: 1,
        },
        move: {
          enable: true,
          speed: 1.5,
          direction: "none",
          random: true,
          straight: false,
          outModes: { default: "out" },
        },
      },
      interactivity: {
        events: {
          onHover: { enable: true, mode: "grab" },
        },
        modes: {
          grab: { distance: 200, links: { opacity: 0.5 } },
        },
      },
      detectRetina: true,
    },
  });
})();
