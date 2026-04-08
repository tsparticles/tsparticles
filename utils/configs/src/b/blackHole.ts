import type { ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
  key: "blackHole",
  name: "Black Hole",
  particles: {
    number: {
      value: 1000,
      density: {
        enable: true,
      },
    },
    paint: {
      fill: {
        color: {
          value: ["#ffffff", "#77ccff", "#ff3333", "#ffff33"],
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
      value: {
        min: 1,
        max: 10,
      },
    },
    move: {
      enable: true,
      speed: { max: 2, min: 0 },
      warp: true,
    },
  },
  interactivity: {
    events: {
      onClick: {
        enable: true,
        mode: "push",
      },
    },
    modes: {
      push: {
        quantity: 4,
      },
    },
  },
  absorbers: {
    orbits: true,
    destroy: false,
    size: {
      value: 5,
      limit: 50,
      density: 1500,
    },
    position: {
      x: 50,
      y: 50,
    },
  },
  background: {
    color: "#000",
    image: "",
    position: "50% 50%",
    repeat: "no-repeat",
    size: "cover",
  },
};

export default options;
