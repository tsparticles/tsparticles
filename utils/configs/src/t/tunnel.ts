import type { ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
  key: "tunnel",
  name: "Tunnel",
  particles: {
    number: {
      value: 0,
    },
    paint: {
      color: {
        value: "#ffffff",
      },
    },
    shape: {
      type: "circle",
    },
    opacity: {
      value: {
        min: 0.3,
        max: 0.8,
      },
    },
    size: {
      value: {
        min: 1,
        max: 10,
      },
    },
    move: {
      enable: true,
      size: true,
      speed: 5,
      direction: "none",
      outModes: {
        default: "destroy",
      },
    },
  },
  background: {
    color: "#000",
  },
  trail: {
    enable: true,
    fill: {
      color: "#000000",
    },
    length: 3,
  },
  emitters: {
    direction: "none",
    rate: {
      delay: 0.25,
      quantity: 10,
    },
    position: {
      x: 50,
      y: 50,
    },
    size: {
      width: 0,
      height: 0,
    },
    spawn: {
      fill: {
        color: {
          value: "#ff0000",
          animation: {
            h: {
              enable: true,
              speed: 5,
            },
            l: {
              enable: true,
              speed: 0,
              offset: {
                min: 20,
                max: 80,
              },
            },
          },
        },
      },
    },
  },
};

export default options;
