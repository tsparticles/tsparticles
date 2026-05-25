import type { ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
  key: "fallingConfettiWithRibbons",
  name: "Falling Confetti with Ribbons",
  background: {
    color: "#000000",
  },
  particles: {
    paint: {
      fill: {
        color: {
          value: [
            "#FF0000",
            "#FF2A00",
            "#FF5500",
            "#FF8000",
            "#FFAA00",
            "#FFD400",
            "#FFFF00",
            "#D4FF00",
            "#AAFF00",
            "#80FF00",
            "#55FF00",
            "#2AFF00",
            "#00FF00",
            "#00FF2A",
            "#00FF55",
            "#00FF80",
            "#00FFAA",
            "#00FFD4",
            "#00FFFF",
            "#00D4FF",
            "#00AAFF",
            "#0080FF",
            "#0055FF",
            "#002AFF",
            "#0000FF",
            "#2A00FF",
            "#5500FF",
            "#8000FF",
            "#AA00FF",
            "#D400FF",
            "#FF00FF",
            "#FF00D4",
            "#FF00AA",
            "#FF0080",
            "#FF0055",
            "#FF002A",
          ],
          animation: {
            enable: true,
            speed: 30,
          },
        },
        enable: true,
      },
    },
    move: {
      direction: "bottom",
      enable: true,
      outModes: "out",
      speed: {
        min: 3,
        max: 6,
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
  emitters: {
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
      delay: 2,
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
        speed: 3,
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
            count: 50,
            drag: 0.05,
            mass: 1,
            oscillationDistance: 40,
            oscillationSpeed: 3,
            particleDist: 8,
            velocityInherit: 5,
            ySpeed: 100,
          },
        },
      },
    },
  },
};

export default options;
