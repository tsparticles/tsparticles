async function startDemo() {
  const engine = tsParticles.createEngine(),
    confetti = tsParticles.createConfetti(engine),
    fireworks = tsParticles.createFireworks(engine),
    particles = tsParticles.createParticles(engine),
    end = performance.now() + 15 * 1000,
    colors = ["#bb0000", "#ffffff"],
    canvas = document.getElementById("canvas"),
    fetti = async options => (await confetti.create(canvas))(options),
    fworks = async options => await fireworks.create(canvas, options),
    prtcls = async options => await particles.create(canvas, options),
    standard = async options =>
      await engine.load({
        element: canvas,
        options,
      });

  await Promise.all([confetti.init(), fireworks.init(), particles.init(), loadAll(engine)]);

  console.log(canvas);

  async function confettiFrame() {
    await Promise.all([
      fetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.5 },
        colors: colors,
      }),
      fetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.5 },
        colors: colors,
      }),
    ]);

    if (performance.now() < end) {
      setTimeout(() => {
        void confettiFrame().catch(console.error);
      }, 15);
    }
  }

  async function fireworksFrame() {
    await fworks();
  }

  async function particlesFrame() {
    await prtcls({
      links: true,
    });
  }

  async function standardFrame() {
    await standard({
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
          enable: true,
        },
      },
    });
  }

  //confettiFrame();
  //fireworksFrame();
  //particlesFrame();
  await standardFrame();

  console.log("started");
}

document.addEventListener("DOMContentLoaded", () => {
  void startDemo().catch(console.error);
});
