const engine = tsParticles.createEngine();
const confetti = tsParticles.createConfetti(engine);

const end = Date.now() + 15 * 1000,
  colors = ["#bb0000", "#ffffff"];

function frame() {
  confetti({
    count: 2,
    angle: 60,
    spread: 55,
    position: { x: 0, y: 50 },
    colors: colors,
  });
  confetti({
    count: 2,
    angle: 120,
    spread: 55,
    position: { x: 100, y: 50 },
    colors: colors,
  });

  if (Date.now() < end) {
    setTimeout(() => {
      frame();
    }, 15);
  }
}

frame();
