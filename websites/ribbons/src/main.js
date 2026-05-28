import { ribbons } from "@tsparticles/ribbons";
import "./style.css";

window.ribbons = ribbons;

let customCanvasRibbons;

async function ensureCustomCanvasRibbons() {
  if (customCanvasRibbons) {
    return customCanvasRibbons;
  }

  const canvas = document.getElementById("customCanvas");

  customCanvasRibbons = await ribbons.create(canvas, { zIndex: 0 });

  return customCanvasRibbons;
}

function createFallingEffect(runFrame) {
  const duration = 8000;
  const animationEnd = Date.now() + duration;

  const interval = window.setInterval(() => {
    if (Date.now() >= animationEnd) {
      window.clearInterval(interval);

      return;
    }

    runFrame();
  }, 260);
}

function getFallingOptions() {
  return {
    position: {
      x: Math.floor(Math.random() * 100),
      y: 0,
    },
  };
}

async function runBase() {
  createFallingEffect(() => {
    void ribbons(getFallingOptions());
  });
}

async function runCustomCanvas() {
  const localRibbons = await ensureCustomCanvasRibbons();

  createFallingEffect(() => {
    void localRibbons(getFallingOptions());
  });
}

document.addEventListener("DOMContentLoaded", async () => {
  await ribbons.init();

  document.getElementById("runBase").addEventListener("click", () => {
    runBase().catch(error => {
      console.error(error);
    });
  });

  document.getElementById("runCustom").addEventListener("click", () => {
    runCustomCanvas().catch(error => {
      console.error(error);
    });
  });
});
