import { type ISourceOptions, LimitMode } from "@tsparticles/engine";

const options: ISourceOptions = {
  key: "pop",
  name: "Pop",
  particles: {
    number: {
      limit: {
        value: 80,
        mode: LimitMode.wait,
      },
      value: 80,
    },
    color: {
      value: ["#3998D0", "#2EB6AF", "#A9BD33", "#FEC73B", "#F89930", "#F45623", "#D62E32", "#EB586E", "#9952CF"],
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
      mode: "bounce",
    },
    move: {
      enable: true,
      speed: 3,
    },
  },
  interactivity: {
    events: {
      onClick: {
        enable: true,
        mode: "pop",
      },
    },
  },
  background: {
    color: "#000000",
  },
  emitters: {
    direction: "none",
    life: {
      count: 0,
      duration: 0.1,
      delay: 0.1,
    },
    rate: {
      delay: 0.1,
      quantity: 1,
    },
    size: {
      width: 100,
      height: 100,
    },
    position: {
      x: 50,
      y: 50,
    },
  },
};

export default options;
