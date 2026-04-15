import { Particles, initParticlesEngine } from "./components/particles";
import { loadFull } from "tsparticles";

void initParticlesEngine(async engine => {
  await loadFull(engine);
});

export default () => {
  return (
    <>
      <head>
        <meta charSet="utf-8" />
        <title>Qwik Particles App</title>
      </head>
      <body>
        <Particles
          id="tsparticles"
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
