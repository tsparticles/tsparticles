import { type ISourceOptions, MoveDirection } from "@tsparticles/engine";

const emitterRate = {
    delay: 0.2,
    quantity: 1,
  },
  options: ISourceOptions = {
    key: "shapeEmoji",
    name: "Shape Emoji",
    particles: {
      opacity: {
        value: 1,
      },
      size: {
        value: {
          min: 16,
          max: 32,
        },
      },
      move: {
        enable: true,
        gravity: {
          enable: true,
        },
        speed: 15,
        outModes: {
          default: "destroy",
          top: "none",
        },
      },
    },
    background: {
      color: "#000000",
    },
    emitters: [
      {
        position: {
          x: 0,
          y: 33,
        },
        rate: emitterRate,
        particles: {
          move: {
            direction: MoveDirection.topRight,
          },
          shape: {
            type: "emoji",
            options: {
              emoji: {
                value: "🦄",
              },
            },
          },
        },
      },
      {
        position: {
          x: 0,
          y: 66,
        },
        rate: emitterRate,
        particles: {
          move: {
            direction: MoveDirection.topRight,
          },
          shape: {
            type: "emoji",
            options: {
              emoji: {
                value: "🌈",
              },
            },
          },
        },
      },
      {
        position: {
          x: 100,
          y: 33,
        },
        rate: emitterRate,
        particles: {
          move: {
            direction: MoveDirection.topLeft,
          },
          shape: {
            type: "emoji",
            options: {
              emoji: {
                value: "🎉",
              },
            },
          },
        },
      },
      {
        position: {
          x: 100,
          y: 66,
        },
        rate: emitterRate,
        particles: {
          move: {
            direction: MoveDirection.topLeft,
          },
          shape: {
            type: "emoji",
            options: {
              emoji: {
                value: "🤡",
              },
            },
          },
        },
      },
      {
        position: {
          x: 50,
          y: 50,
        },
        rate: emitterRate,
        particles: {
          move: {
            direction: MoveDirection.top,
          },
          shape: {
            type: "emoji",
            options: {
              emoji: {
                value: "🍑",
              },
            },
          },
        },
      },
    ],
  };

export default options;
