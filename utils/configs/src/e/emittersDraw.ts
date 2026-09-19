import { type ISourceOptions, MoveDirection } from "@tsparticles/engine";

const options: ISourceOptions = {
  key: "emittersDraw",
  name: "Emitters Draw",
  particles: {
    paint: {
      fill: {
        enable: false,
      },
    },
    shape: {
      type: "circle",
    },
    size: {
      value: 3,
    },
    move: {
      enable: true,
      speed: 5,
      outModes: {
        default: "destroy",
      },
    },
  },
  background: {
    color: "#0d0d0d",
  },
  emitters: [
    {
      draw: true,
      direction: MoveDirection.topRight,
      position: {
        x: 25,
        y: 50,
      },
      rate: {
        quantity: 2,
        delay: 0.1,
      },
      shape: {
        type: "square",
      },
      spawn: {
        fill: {
          color: {
            value: "rgba(255, 0, 0, 0.5)",
          },
        },
        stroke: {
          width: 2,
          color: {
            value: "#ff0000",
          },
        },
      },
    },
    {
      draw: true,
      direction: MoveDirection.bottomLeft,
      position: {
        x: 75,
        y: 50,
      },
      rate: {
        quantity: 2,
        delay: 0.1,
      },
      shape: {
        type: "circle",
      },
      spawn: {
        fill: {
          color: {
            value: "rgba(0, 0, 255, 0.5)",
          },
        },
        stroke: {
          width: 2,
          color: {
            value: "#00a2ff",
          },
        },
      },
    },
  ],
};

export default options;
