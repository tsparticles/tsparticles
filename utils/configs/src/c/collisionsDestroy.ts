import type { ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
  key: "collisionsDestroy",
  name: "Collisions Destroy",
  particles: {
    number: {
      value: 80,
    },
    color: {
      value: ["#3998D0", "#2EB6AF", "#A9BD33", "#FEC73B", "#F89930", "#F45623", "#D62E32", "#EB586E", "#9952CF"],
    },
    destroy: {
      mode: "split",
      split: {
        count: 1,
        factor: {
          value: {
            min: 4,
            max: 9,
          },
        },
        particles: {
          collisions: {
            enable: false,
          },
          destroy: {
            mode: "none",
          },
          life: {
            count: 1,
            duration: {
              value: {
                min: 1,
                max: 2,
              },
            },
          },
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
      value: {
        min: 10,
        max: 15,
      },
    },
    collisions: {
      enable: true,
      mode: "destroy",
    },
    move: {
      enable: true,
      speed: 5,
    },
  },
  background: {
    color: "#000000",
  },
  poisson: {
    enable: true,
  },
  emitters: {
    position: {
      x: 50,
      y: 50,
    },
    size: {
      width: 100,
      height: 100,
    },
    fill: false,
  },
  smooth: true,
};

export default options;
