import type { ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
  key: "mouseTrailNoise",
  name: "Mouse Trail Noise",
  particles: {
    number: {
      value: 0,
    },
    shape: {
      type: "triangle",
    },
    opacity: {
      value: { min: 0, max: 1 },
      animation: {
        enable: true,
        speed: 1,
        sync: true,
        destroy: "min",
      },
    },
    size: {
      value: {
        min: 8,
        max: 14,
      },
    },
    move: {
      enable: true,
      speed: {
        min: 3,
        max: 6,
      },
      outModes: "destroy",
      path: {
        enable: true,
        options: {
          size: 64,
          draw: false,
          increment: 0.005,
        },
        delay: {
          value: 0,
        },
        generator: "perlinNoise",
      },
    },
    rotate: {
      value: {
        min: 0,
        max: 360,
      },
      direction: "random",
      move: true,
      animation: {
        enable: true,
        speed: 60,
      },
    },
    tilt: {
      direction: "random",
      enable: true,
      value: {
        min: 0,
        max: 360,
      },
      animation: {
        enable: true,
        speed: 60,
      },
    },
    roll: {
      darken: {
        enable: true,
        value: 30,
      },
      enlighten: {
        enable: true,
        value: 30,
      },
      enable: true,
      mode: "both",
      speed: {
        min: 15,
        max: 25,
      },
    },
    wobble: {
      distance: 30,
      enable: true,
      move: true,
      speed: {
        min: -15,
        max: 15,
      },
    },
  },
  interactivity: {
    events: {
      onHover: {
        enable: true,
        mode: "trail",
      },
    },
    modes: {
      trail: {
        delay: 0.1,
        quantity: 10,
        particles: {
          color: {
            value: {
              h: 0,
              s: 40,
              l: {
                min: 40,
                max: 60,
              },
            },
          },
        },
        colorCoords: {
          h: {
            weights: {
              x: 1,
            },
            value: {
              max: 360,
              min: 0,
            },
          },
        },
      },
    },
  },
  background: {
    color: "#000000",
  },
};

export default options;
