import configs from "@tsparticles/configs";
import "./style.css";

import { engine } from "../particlesEngine";
import { loadSlim } from "@tsparticles/slim";

(async () => {
  await loadSlim(engine);

  const keys = Object.keys(configs);
  const randomKey = keys[Math.floor(Math.random() * keys.length)] as keyof typeof configs;

  await engine.load({
    id: "tsparticles",
    options: {
      ...configs[randomKey],
      fullScreen: { enable: true, zIndex: -1 },
    },
  });

  const contactForm = document.getElementById("contactForm") as HTMLFormElement;

  contactForm.addEventListener("submit", e => {
    e.preventDefault();
    alert("Message sent! (demo)");
    contactForm.reset();
  });
})();
