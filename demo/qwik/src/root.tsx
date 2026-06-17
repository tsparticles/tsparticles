import { Particles, initParticlesEngine } from "../../../wrappers/qwik/src/components/particles";
import type { Engine } from "@tsparticles/engine";
import { loadFull } from "tsparticles";
import { component$, useVisibleTask$ } from "@builder.io/qwik";

export default component$(() => {
  useVisibleTask$(async () => {
    await initParticlesEngine(async (engine: Engine) => {
      await loadFull(engine);
    });
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
