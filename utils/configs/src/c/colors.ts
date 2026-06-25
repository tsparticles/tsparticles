import type { ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
  key: "colors",
  name: "Colors",
  background: {
    color: "#0d0d0d",
  },
  interactivity: {
    events: {
      onHover: {
        mode: "trail",
        enable: true,
      },
    },
    modes: {
      trail: {
        delay: 0.005,
        quantity: 5,
        pauseOnStop: true,
        particles: {
          paint: {
            color: {
              value: "#ff0000",
              animation: {
                enable: true,
                speed: 400,
                sync: true,
              },
            },
          },
          collisions: {
            enable: false,
          },
          links: {
            enable: false,
          },
          move: {
            outModes: {
              default: "destroy",
            },
            speed: 2,
          },
          size: {
            value: {
              min: 1,
              max: 5,
            },
            animation: {
              enable: true,
              speed: 5,
              sync: true,
              startValue: "min",
              destroy: "max",
            },
          },
        },
      },
    },
  },
  particles: {
    paint: {
      color: {
        animation: {
          enable: true,
          sync: false,
          speed: 50,
        },
        value: "#ff0000",
      },
    },
    links: {
      color: "random",
      enable: true,
    },
    move: {
      enable: true,
    },
    number: {
      value: 100,
      density: {
        enable: true,
      },
    },
    opacity: {
      animation: {
        enable: true,
        speed: 0.1,
      },
      value: {
        min: 0.3,
        max: 0.8,
      },
    },
    size: {
      animation: {
        enable: true,
        speed: 3,
      },
      value: {
        min: 1,
        max: 3,
      },
    },
  },
  emitters: [],
};

export default options;
