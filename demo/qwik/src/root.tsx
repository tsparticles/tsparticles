import { Particles, initParticlesEngine } from "../../../wrappers/qwik/src/components/particles";
import type { Engine } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

void initParticlesEngine(async (engine: Engine) => {
  await loadSlim(engine);
});

export default function Root() {
  return (
    <>
      <head>
        <meta charSet="utf-8" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <title>tsParticles Qwik Demo</title>
      </head>
      <body>
        <main>
          <h1>tsParticles Qwik Demo</h1>
          <Particles
            id="tsparticles"
            options={{
              fullScreen: {
                zIndex: -1,
              },
              particles: {
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
}
