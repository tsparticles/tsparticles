import type { ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
  key: "delayOpacity",
  name: "Delay Opacity",
  background: {
    color: {
      value: "#0d0d0d",
    },
  },
  particles: {
    paint: {
      fill: {
        color: {
          value: "#f0f0f0",
        },
        enable: true,
      },
    },
    number: {
      value: 100,
    },
    opacity: {
      value: { max: 1, min: 0 },
      animation: {
        enable: true,
        speed: 5,
        sync: true,
        delay: {
          min: 1,
          max: 3,
        },
        startValue: "max",
        destroy: "min",
        count: 1,
      },
    },
    size: {
      value: 5,
    },
    move: {
      enable: true,
    },
  },
};

export default options;
