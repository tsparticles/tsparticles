import { type ISourceOptions, MoveDirection } from "@tsparticles/engine";

const options: ISourceOptions = {
  key: "emittersDrag",
  name: "Emitters Drag",
  particles: {
    paint: {
      fill: {
        enable: false,
      },
    },
    shape: {
      type: "star",
    },
    size: {
      value: {
        min: 3,
        max: 8,
      },
    },
    move: {
      enable: true,
      speed: 4,
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
      draw: false,
      draggable: true,
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
      size: {
        width: 15,
        height: 15,
        mode: "percent",
      },
    },
    {
      draw: false,
      draggable: true,
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
      size: {
        width: 15,
        height: 15,
        mode: "percent",
      },
    },
  ],
};

export default options;
