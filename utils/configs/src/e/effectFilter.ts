import type { ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
  key: "effectFilter",
  name: "Effect Filter",
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
    effect: {
      type: "filter",
      options: {
        filter: {
          blur: 4,
        },
      },
    },
    shape: {
      type: "circle",
    },
    size: {
      value: {
        min: 5,
        max: 50,
      },
    },
    move: {
      enable: true,
      speed: 6,
    },
  },
  background: {
    color: "#000000",
  },
};

export default options;
