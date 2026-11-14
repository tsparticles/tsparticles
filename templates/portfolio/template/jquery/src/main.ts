import $ from "jquery";
import "./style.css";
import configs from "@tsparticles/configs";
import "@tsparticles/jquery";
import { engine } from "../particlesEngine";
import { loadSlim } from "@tsparticles/slim";

(async () => {
  await loadSlim(engine);

  const keys = Object.keys(configs);
  const randomKey = keys[Math.floor(Math.random() * keys.length)] as keyof typeof configs;

  await $.particles(engine).init();
  $("#tsparticles")
    .particles(engine)
    .load({
      ...configs[randomKey],
      fullScreen: { enable: true, zIndex: -1 },
    });

  $(".nav-link").on("click", function (e) {
    e.preventDefault();
    const target = $($(this).attr("href")!);
    if (target.length) {
      $("html, body").animate({ scrollTop: target.offset()!.top }, 500);
    }
  });

  const contactForm = document.getElementById("contactForm") as HTMLFormElement;
  contactForm.addEventListener("submit", e => {
    e.preventDefault();
    alert("Message sent! (demo)");
    contactForm.reset();
  });
})();
