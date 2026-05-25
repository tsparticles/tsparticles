import type { ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
  key: "shapeRibbon",
  name: "Shape Ribbon",
  particles: {
    number: {
      value: 18,
      density: {
        enable: false,
      },
    },
    paint: {
      fill: {
        color: {
          value: "#ff0000",
          animation: {
            enable: true,
            speed: 8,
            sync: true,
          },
        },
        enable: true,
      },
      stroke: {
        color: {
          value: "#ffffff",
          animation: {
            enable: true,
            speed: 8,
            sync: true,
          },
        },
        width: 1,
      },
    },
    shape: {
      type: "ribbon",
      options: {
        ribbon: {
          count: 50,
          particleDist: 8,
          thickness: 8,
          angle: 45,
          mass: 1,
          drag: 0.05,
          velocityInherit: 5,
          oscillationSpeed: 3,
          oscillationDistance: 40,
          ySpeed: 100,
        },
      },
    },
    opacity: {
      value: 1,
    },
    size: {
      value: 1,
    },
    links: {
      enable: false,
    },
    move: {
      enable: true,
      direction: "none",
      speed: 2,
    },
  },
  background: {
    color: "#000000",
  },
};

export default options;
