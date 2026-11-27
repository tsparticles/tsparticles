import { Particles, initParticlesEngine } from "../../../wrappers/qwik/src/components/particles";
import { component$, noSerialize, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import type { Engine } from "@tsparticles/engine";
import { engine } from "../particlesEngine";
import { loadFull } from "tsparticles";

export default component$(() => {
  const readyEngine = useSignal<typeof engine>();
  useVisibleTask$(async () => {
    await initParticlesEngine(engine, async (engine: Engine) => {
      await loadFull(engine);
    });
    readyEngine.value = noSerialize(engine);
  });
  return (
    <>
      <head>
        <meta charset="utf-8" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <title>tsParticles Qwik Demo</title>
      </head>
      <body>
        <main>
          <h1>tsParticles Qwik Demo</h1>
          <Particles
            id="tsparticles"
            options={{
              background: {
                color: {
                  value: "#000",
                },
              },
              fullScreen: {
                zIndex: -1,
              },
              particles: {
                paint: {
                  fill: {
                    enable: true,
                  },
                },
                links: {
                  enable: true,
                },
                move: {
                  enable: true,
                },
                number: {
                  value: 80,
                },
              },
            }}
          />
        </main>
      </body>
    </>
  );
});
