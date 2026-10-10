import { type ISourceOptions, MoveDirection } from "@tsparticles/engine";

const options: ISourceOptions = {
  key: "emittersDrawDrag",
  name: "Emitters Draw & Drag",
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
  interactivity: {
    events: {
      onClick: {
        enable: true,
        mode: "emitter",
      },
    },
  },
  emitters: [
    {
      draw: true,
      draggable: true,
      direction: MoveDirection.top,
      position: {
        x: 30,
        y: 50,
      },
      rate: {
        quantity: 2,
        delay: 0.1,
      },
      shape: {
        type: "square",
      },
      size: {
        width: 15,
        height: 15,
        mode: "percent",
      },
      spawn: {
        fill: {
          color: {
            value: "rgba(0, 255, 0, 0.5)",
          },
        },
        stroke: {
          width: 2,
          color: {
            value: "#5cff6a",
          },
        },
      },
    },
    {
      draw: true,
      draggable: true,
      direction: MoveDirection.bottom,
      position: {
        x: 70,
        y: 50,
      },
      rate: {
        quantity: 2,
        delay: 0.1,
      },
      shape: {
        type: "circle",
      },
      size: {
        width: 15,
        height: 15,
        mode: "percent",
      },
      spawn: {
        fill: {
          color: {
            value: "rgba(255, 165, 0, 0.5)",
          },
        },
        stroke: {
          width: 2,
          color: {
            value: "#ffa500",
          },
        },
      },
    },
  ],
};

export default options;
