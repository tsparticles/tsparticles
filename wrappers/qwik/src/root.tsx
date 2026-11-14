import { type Engine, createEngine } from "@tsparticles/engine";
import { Particles, initParticlesEngine } from "./components/particles";
import { component$, noSerialize, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { loadFull } from "tsparticles";

// Initialize the particles engine on the client only. Calling initParticlesEngine
// at module scope runs during SSR and won't set the client-side initialization
// state, which makes <Particles /> throw when it renders in the browser.
export default component$(() => {
  const engine = useSignal<Engine>();
  useVisibleTask$(async () => {
    const instance = createEngine();
    await initParticlesEngine(instance, async engine => {
      await loadFull(engine);
    });
    engine.value = noSerialize(instance);
  });

  return (
    <>
      <head>
        <meta charSet="utf-8" />
        <title>Qwik Particles App</title>
      </head>
      <body>
        <Particles
          engine={engine.value}
          id="tsparticles"
          options={{
            background: {
              color: {
                value: "#000",
              },
            },
            particles: {
              paint: {
                fill: {
                  enable: true,
                },
              },
              number: {
                value: 100,
              },
              move: {
                enable: true,
              },
              links: {
                enable: true,
              },
            },
          }}
        />
      </body>
    </>
  );
});
