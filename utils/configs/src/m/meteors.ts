import { type ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
  key: "meteors",
  name: "Meteors",
  particles: {
    number: {
      value: 0,
    },
    paint: {
      color: {
        value: "#1a1a1a",
      },
    },
    effect: {
      type: "trail",
      options: {
        trail: {
          length: 30,
        },
      },
    },
    size: {
      value: 1,
    },
    opacity: {
      value: { min: 0, max: 1 },
      animation: {
        enable: true,
        sync: true,
        speed: 0.2,
        startValue: "max",
        destroy: "min",
        count: 1,
      },
    },
    move: {
      enable: true,
      speed: { min: 3, max: 6 },
      straight: true,
      direction: 120,
      outModes: {
        default: "destroy",
      },
    },
  },
  background: {
    color: "#f5f7fa",
  },
  emitters: {
    position: {
      x: 50,
      y: 0,
    },
    size: {
      width: 100,
      height: 0,
    },
    rate: {
      delay: 0.2,
      quantity: 2,
    },
  },
};

export default options;
