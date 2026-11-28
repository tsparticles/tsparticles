import type { ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
  key: "colorTransitions",
  name: "Color Transitions",
  particles: {
    number: {
      value: 80,
      density: {
        enable: true,
      },
    },
    life: {
      count: 0,
      duration: {
        sync: true,
        value: 5,
      },
    },
    colorTransitions: {
      lifetime: {
        enable: true,
        sync: true,
        stops: [
          {
            offset: 0,
            value: "#ff0000",
          },
          {
            offset: 0.5,
            value: "#00ff00",
          },
          {
            offset: 1,
            value: "#0000ff",
          },
        ],
        stroke: {
          stops: [
            {
              offset: 0,
              value: "#ffffff",
            },
            {
              offset: 1,
              value: "#ff00ff",
            },
          ],
        },
      },
    },
    paint: {
      fill: {
        color: {
          value: "#ff0000",
        },
        enable: true,
      },
      stroke: {
        width: 2,
        color: {
          value: "#ffffff",
        },
      },
    },
    shape: {
      type: "circle",
    },
    opacity: {
      value: 1,
    },
    size: {
      value: 8,
    },
    move: {
      enable: true,
      speed: 3,
    },
  },
  background: {
    color: "#0d0d0d",
  },
};

export default options;
