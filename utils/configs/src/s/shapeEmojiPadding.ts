import { type ISourceOptions } from "@tsparticles/engine";

const emitterRate = {
    delay: 0.2,
    quantity: 1,
  },
  options: ISourceOptions = {
    key: "shapeEmojiPadding",
    name: "Shape Emoji Padding",
    particles: {
      opacity: {
        value: 1,
      },
      size: {
        value: 16,
      },
      move: {
        enable: true,
        speed: 5,
        outModes: "destroy",
      },
    },
    background: {
      color: "#0d0d0d",
    },
    emitters: [
      {
        position: {
          x: 0,
          y: 33,
        },
        rate: emitterRate,
        particles: {
          shape: {
            type: "emoji",
            options: {
              emoji: {
                value: "👻",
                padding: 5,
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
          shape: {
            type: "emoji",
            options: {
              emoji: {
                value: "🌈",
                padding: 10,
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
          shape: {
            type: "emoji",
            options: {
              emoji: {
                value: "🤡",
                padding: 15,
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
          shape: {
            type: "emoji",
            options: {
              emoji: {
                value: "🍑",
                padding: 2,
              },
            },
          },
        },
      },
    ],
  };

export default options;
