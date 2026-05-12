document.addEventListener("DOMContentLoaded", async () => {
  const end = performance.now() + 15 * 1000,
    colors = ["#bb0000", "#ffffff"],
    canvas = document.getElementById("canvas"),
    fetti = await confetti.create(canvas),
    fworks = async options => await fireworks.create(canvas, options),
    prtcls = async options => await particles.create(canvas, options),
    standard = async options =>
      await tsParticles.load({
        element: canvas,
        options,
      });

  await Promise.all([
    confetti.init(),
    fireworks.init(),
    particles.init(),
    loadAll(tsParticles),
  ]);

  console.log(canvas);

  function confettiFrame() {
    fetti({
      particleCount: 2,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.5 },
      colors: colors,
    });
    fetti({
      particleCount: 2,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.5 },
      colors: colors,
    });

    if (performance.now() < end) {
      setTimeout(() => {
        confettiFrame();
      }, 15);
    }
  }

  function fireworksFrame() {
    fworks();
  }

  function particlesFrame() {
    prtcls({
      links: true
    });
  }

  function standardFrame() {
    standard({
      fullScreen: {
        enable: false,
      },
      particles: {
        number: {
          value: 50,
        },
        move: {
          enable: true,
        },
        links: {
          enable: true
        },
      }
    });
  }

  //confettiFrame();
  //fireworksFrame();
  //particlesFrame();
  standardFrame();

  console.log("started");
});
