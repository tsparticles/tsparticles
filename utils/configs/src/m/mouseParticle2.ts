import type { ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
  key: "mouseParticle2",
  name: "Mouse Particle 2",
  background: {
    color: "#0d0d0d",
  },
  particles: {
    number: {
      value: 80,
      density: {
        enable: true,
      },
    },
    paint: {
      fill: {
        color: {
          value: "#ff0000",
          animation: {
            enable: true,
            speed: 20,
            sync: true,
          },
        },
        enable: true,
      },
    },
    shape: {
      type: "circle",
    },
    opacity: {
      value: 0.5,
    },
    size: {
      value: {
        min: 1,
        max: 3,
      },
    },
    links: {
      enable: true,
      distance: 200,
      color: "#f0f0f0",
      opacity: 0.4,
      width: 1,
    },
    move: {
      enable: true,
      speed: 6,
    },
  },
  interactivity: {
    events: {
      onHover: {
        enable: true,
        mode: "particle",
      },
    },
    modes: {
      particle: {
        replaceCursor: false,
        pauseOnStop: false,
      },
    },
  },
};

export default options;
