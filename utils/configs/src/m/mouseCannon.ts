import type { ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
  key: "mouseCannon",
  name: "Mouse Cannon",
  particles: {
    number: {
      value: 0,
      density: {
        enable: true,
      },
    },
    paint: {
      fill: {
        color: {
          value: ["#ffffff", "#ff0000"],
        },
        enable: true,
      },
    },
    shape: {
      type: ["square", "circle"],
    },
    size: {
      value: {
        min: 3,
        max: 5,
      },
    },
    move: {
      enable: true,
      speed: 1,
      decay: 0.1,
      gravity: {
        enable: true,
      },
      outModes: {
        default: "destroy",
        top: "none",
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
      onClick: {
        enable: true,
        mode: "cannon",
      },
    },
  },
  background: {
    color: "#000000",
  },
};

export default options;
