import { Particles } from "./components/particles";
import { loadFull } from "tsparticles";
import { $ } from "@builder.io/qwik";
import type { Engine } from "tsparticles-engine";

export default () => {
  const init = $(async (engine: Engine) => {
    await loadFull(engine);
  });

  return (
    <>
      <head>
        <meta charSet="utf-8" />
        <title>Qwik Particles App</title>
      </head>
      <body>
        <Particles
          id="tsparticles"
          init={init}
          options={{
            background: {
              color: {
                value: "#000",
              },
            },
            particles: {
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
};
