import { DestroyType, type ISourceOptions, RotateDirection, StartValueType } from "@tsparticles/engine";

export const options: ISourceOptions = {
  particles: {
    paint: {
      stroke: {
        width: 5,
        color: {
          value: ["#5bc0eb", "#fde74c", "#9bc53d", "#e55934", "#fa7921", "#2FF3E0", "#F8D210", "#FA26A0", "#F51720"],
        },
      },
      fill: {
        enable: false,
      },
    },
    shape: {
      type: "square",
    },
    rotate: {
      value: 0,
      direction: RotateDirection.counterClockwise,
      animation: {
        enable: true,
        speed: 2,
        sync: true,
      },
    },
    size: {
      value: { min: 1, max: 500 },
      animation: {
        enable: true,
        startValue: StartValueType.min,
        speed: 60,
        sync: true,
        destroy: DestroyType.max,
      },
    },
  },
  background: {
    color: "#000",
  },
  emitters: {
    position: {
      y: 50,
      x: 50,
    },
    rate: {
      delay: 1,
      quantity: 1,
    },
  },
};
