import "./style.css";
import { tsParticles } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";
import configs from "@tsparticles/configs";

(async () => {
  await loadSlim(tsParticles);

  const keys = Object.keys(configs);
  const randomKey = keys[Math.floor(Math.random() * keys.length)] as keyof typeof configs;

  await tsParticles.load({
    id: "tsparticles",
    options: {
      ...configs[randomKey],
      fullScreen: { enable: true, zIndex: -1 },
    },
  });

  const contactForm = document.getElementById("contactForm") as HTMLFormElement;

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Message sent! (demo)");
    contactForm.reset();
  });
})();
