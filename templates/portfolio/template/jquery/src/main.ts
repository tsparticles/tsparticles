import "./style.css";
import $ from "jquery";
import "jquery-particles";
import { loadSlim } from "@tsparticles/slim";
import configs from "@tsparticles/configs";
import { tsParticles } from "@tsparticles/engine";

(async () => {
  await loadSlim(tsParticles);

  const keys = Object.keys(configs);
  const randomKey = keys[Math.floor(Math.random() * keys.length)] as keyof typeof configs;

  $("#tsparticles").particles().ajax({
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
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Message sent! (demo)");
    contactForm.reset();
  });
})();
