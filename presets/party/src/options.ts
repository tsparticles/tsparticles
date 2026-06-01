import type { ISourceOptions } from "@tsparticles/engine";

export const options: ISourceOptions = {
  palette: "confetti",
  background: {
    color: "#000000",
  },
  particles: {
    move: {
      direction: "bottom",
      enable: true,
      outModes: "out",
      speed: {
        min: 3,
        max: 5,
      },
    },
    number: {
      value: 300,
    },
    opacity: {
      value: 1,
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
    shape: {
      type: ["triangle", "circle", "square", "polygon"],
      options: {
        polygon: [
          {
            sides: 5,
          },
          {
            sides: 6,
          },
        ],
      },
    },
    size: {
      value: {
        min: 3,
        max: 5,
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
        min: 40,
        max: 60,
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
  emitters: {
    name: "confetti",
    direction: "bottom",
    position: {
      x: 50,
      y: 0,
    },
    size: {
      width: 100,
      height: 0,
    },
    rate: {
      delay: 1,
      quantity: 1,
    },
    particles: {
      move: {
        direction: "bottom",
        enable: true,
        outModes: {
          top: "none",
          default: "destroy",
        },
        speed: {
          min: 4,
          max: 6,
        },
      },
      size: {
        value: 8,
      },
      roll: {
        enable: false,
      },
      rotate: {
        value: 0,
        move: false,
        animation: {
          enable: false,
        },
      },
      tilt: {
        enable: false,
      },
      wobble: {
        enable: false,
      },
      shape: {
        type: "ribbon",
        options: {
          ribbon: {
            angle: 45,
            darken: {
              enable: true,
              value: 30,
            },
            count: 60,
            drag: 0.02,
            mass: 1,
            oscillationDistance: {
              min: 100,
              max: 140,
            },
            oscillationSpeed: {
              min: 3,
              max: 5,
            },
            particleDist: 8,
            velocityInherit: {
              min: 4,
              max: 6,
            },
          },
        },
      },
    },
  },
};
