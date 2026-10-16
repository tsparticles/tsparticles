import { type ISourceOptions, MoveDirection } from "@tsparticles/engine";

const options: ISourceOptions = {
  key: "emitters",
  name: "Emitters",
  particles: {
    paint: {
      fill: {
        color: {
          value: "#1a1a1a",
        },
        enable: true,
      },
    },
    shape: {
      type: "circle",
    },
    size: {
      value: {
        min: 1,
        max: 5,
      },
    },
    move: {
      enable: true,
      speed: 2,
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
      direction: MoveDirection.top,
      position: {
        x: 25,
        y: 75,
      },
      rate: {
        quantity: 2,
        delay: 0.1,
      },
      spawn: {
        fill: {
          color: {
            value: "#5cff6a",
          },
        },
      },
    },
    {
      direction: MoveDirection.bottomRight,
      position: {
        x: 75,
        y: 25,
      },
      rate: {
        quantity: 2,
        delay: 0.1,
      },
      shape: {
        type: "polygon",
        options: {
          polygon: {
            sides: 6,
          },
        },
      },
      spawn: {
        fill: {
          color: {
            value: "#00a2ff",
          },
        },
      },
    },
  ],
};

export default options;
