import "./style.css";
import { ParticlesBase } from "@tsparticles/webcomponents";
import { loadSlim } from "@tsparticles/slim";
import configs from "@tsparticles/configs";
import type { ISourceOptions } from "@tsparticles/engine";

(async () => {
  await ParticlesBase.init(async (engine) => {
    await loadSlim(engine);
  });

  const keys = Object.keys(configs);
  const randomKey = keys[Math.floor(Math.random() * keys.length)] as keyof typeof configs;
  const options: ISourceOptions = {
    ...configs[randomKey],
    fullScreen: { enable: true, zIndex: -1 },
  } as ISourceOptions;

  const particlesEl = document.createElement("ts-particles");
  particlesEl.id = "tsparticles";
  (particlesEl as unknown as Record<string, unknown>).options = options;
  document.body.appendChild(particlesEl);

  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const target = document.querySelector((e.target as HTMLAnchorElement).getAttribute("href")!);
      if (target) target.scrollIntoView({ behavior: "smooth" });
    });
  });

  const contactForm = document.getElementById("contactForm") as HTMLFormElement;
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Message sent! (demo)");
    contactForm.reset();
  });
})();
