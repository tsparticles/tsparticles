import { MoveDirection, OutMode } from "@tsparticles/engine";

export const options = {
  background: {
    color: "#000000",
  },
  particles: {
    number: {
      value: 100,
    },
    color: {
      value: "#ffffff",
    },
    life: {
      count: 1,
      duration: {
        value: 5,
      },
    },
    shape: {
      type: "circle",
    },
    opacity: {
      value: 1,
    },
    size: {
      value: 3,
    },
    move: {
      enable: true,
      speed: 10,
      decay: 0.005,
      direction: MoveDirection.outside,
      straight: true,
      outModes: OutMode.destroy,
    },
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
    rate: {
      quantity: 10,
      delay: 0.1,
    },
  },
  trail: {
    enable: true,
    length: 15,
    fill: {
      color: "#000000",
    },
  },
};
