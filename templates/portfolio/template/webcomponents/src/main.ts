import { defineParticlesElement, initParticlesEngine } from "@tsparticles/webcomponents";
import "./style.css";

import type { ISourceOptions } from "@tsparticles/engine";
import configs from "@tsparticles/configs";
import { engine } from "../particlesEngine";
import { loadSlim } from "@tsparticles/slim";

(async () => {
  await initParticlesEngine(engine, async engine => {
    await loadSlim(engine);
  });

  defineParticlesElement();

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

  document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const target = document.querySelector((e.target as HTMLAnchorElement).getAttribute("href")!);
      if (target) target.scrollIntoView({ behavior: "smooth" });
    });
  });

  const contactForm = document.getElementById("contactForm") as HTMLFormElement;
  contactForm.addEventListener("submit", e => {
    e.preventDefault();
    alert("Message sent! (demo)");
    contactForm.reset();
  });
})();

for (const element of document.querySelectorAll("web-particles")) {
  (element as import("@tsparticles/webcomponents").Particles).engine = engine;
}
