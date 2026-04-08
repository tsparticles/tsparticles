import type { ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
  key: "plasma",
  name: "Plasma",
  background: {
    color: {
      value: "#000000",
    },
  },
  particles: {
    number: {
      value: 150,
      density: {
        enable: true,
      },
    },
    paint: {
      fill: {
        color: {
          value: "#ffffff",
        },
        enable: true,
      },
    },
    shape: {
      type: "circle",
    },
    opacity: {
      value: 1,
    },
    size: {
      value: 0,
    },
    links: {
      enable: true,
      distance: 110,
      color: "#19f",
      opacity: 0.4,
      width: 2,
    },
    move: {
      enable: true,
      speed: 50,
      outModes: "bounce",
    },
  },
  interactivity: {
    events: {
      onHover: {
        enable: true,
        mode: "repulse",
      },
    },
    modes: {
      repulse: {
        distance: 150,
        duration: 0.4,
      },
    },
  },
  detectRetina: true,
};

export default options;
