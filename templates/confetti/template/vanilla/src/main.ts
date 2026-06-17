import "./style.css";
import { confetti } from "@tsparticles/confetti";

function randomInRange(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

const fireBtn = document.getElementById("fireBtn") as HTMLButtonElement;
const modeSelect = document.getElementById("modeSelect") as HTMLSelectElement;

fireBtn.addEventListener("click", () => {
  const mode = modeSelect.value;

  switch (mode) {
    case "cannon":
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      break;

    case "waterfall":
      {
        const duration = 3000;
        const end = Date.now() + duration;

        const interval = setInterval(() => {
          if (Date.now() > end) {
            clearInterval(interval);
            return;
          }
          confetti({
            particleCount: 10,
            angle: 60,
            spread: 55,
            origin: { x: 0, y: 0.6 },
          });
          confetti({
            particleCount: 10,
            angle: 120,
            spread: 55,
            origin: { x: 1, y: 0.6 },
          });
        }, 100);
      }
      break;

    case "random":
      confetti({
        angle: randomInRange(55, 125),
        spread: randomInRange(50, 70),
        particleCount: randomInRange(50, 100),
        origin: { y: 0.6 },
      });
      break;
  }
});
