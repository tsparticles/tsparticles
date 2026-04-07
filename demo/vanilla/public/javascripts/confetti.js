const end = Date.now() + 15 * 1000,
  colors = ["#bb0000", "#ffffff"];

async function frame() {
  await Promise.all([
    confetti({
      particleCount: 2,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: colors,
    }),
    confetti({
      particleCount: 2,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: colors,
    }),
  ]);

  if (Date.now() < end) {
    setTimeout(frame, 15);
  }
}

(async () => {
  await confetti.init();

  await frame();
})();
