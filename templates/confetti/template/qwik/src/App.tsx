import { component$, useVisibleTask$, useSignal } from "@builder.io/qwik";
import { Particles, initParticlesEngine } from "@tsparticles/qwik";
import { confetti } from "@tsparticles/confetti";

function randomInRange(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

export default component$(() => {
  const mode = useSignal("cannon");

  useVisibleTask$(() => {
    void initParticlesEngine(() => Promise.resolve());
  });

  const fireConfetti = () => {
    switch (mode.value) {
      case "cannon":
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
        break;
      case "waterfall": {
        const duration = 3000;
        const end = Date.now() + duration;
        const interval = setInterval(() => {
          if (Date.now() > end) {
            clearInterval(interval);
            return;
          }
          confetti({ particleCount: 10, angle: 60, spread: 55, origin: { x: 0, y: 0.6 } });
          confetti({ particleCount: 10, angle: 120, spread: 55, origin: { x: 1, y: 0.6 } });
        }, 100);
        break;
      }
      case "random":
        confetti({
          angle: randomInRange(55, 125),
          spread: randomInRange(50, 70),
          particleCount: randomInRange(50, 100),
          origin: { y: 0.6 },
        });
        break;
    }
  };

  return (
    <div>
      <div id="app">
        <h1>Confetti!</h1>
        <div class="controls">
          <button onClick$={fireConfetti}>Fire Confetti</button>
          <select value={mode.value} onChange$={(_, el) => (mode.value = el.value)}>
            <option value="cannon">Cannon</option>
            <option value="waterfall">Waterfall</option>
            <option value="random">Random</option>
          </select>
        </div>
      </div>
      <Particles id="tsparticles" options={{}} />
    </div>
  );
});
