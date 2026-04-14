import type { ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
  key: "destroyExplode",
  name: "Destroy Explode",
  particles: {
    number: {
      value: 80,
      density: {
        enable: true,
      },
    },
    destroy: {
      mode: "explode",
      explode: {
        maxSizeFactor: 5,
        speed: 2,
      },
    },
    paint: {
      fill: {
        color: {
          value: ["#3998D0", "#2EB6AF", "#A9BD33", "#FEC73B", "#F89930", "#F45623", "#D62E32", "#EB586E", "#9952CF"],
        },
        enable: true,
      },
      stroke: {
        width: 0,
      },
    },
    shape: {
      type: "circle",
    },
    opacity: {
      value: 0.9,
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
      speed: 3,
      outModes: "bounce",
    },
  },
  interactivity: {
    events: {
      onClick: {
        enable: true,
        mode: "push",
      },
    },
    modes: {
      push: {
        quantity: 1,
      },
    },
  },
  background: {
    color: "#000000",
  },
};

export default options;
