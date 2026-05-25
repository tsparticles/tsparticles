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
          angle: 45,
          backColor: "#777",
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
    opacity: {
      value: 1,
    },
    size: {
      value: 8,
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
