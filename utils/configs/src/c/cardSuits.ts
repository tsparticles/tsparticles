import type { ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
  key: "cardSuits",
  name: "Card Suits",
  particles: {
    number: {
      value: 80,
      density: {
        enable: true,
      },
    },
    reduceDuplicates: true,
    shape: {
      type: ["spades", "hearts", "diamonds", "clubs"],
      options: {
        spades: {
          particles: {
            paint: {
              fill: {
                color: {
                  value: "#000000",
                },
                enable: true,
              },
            },
          },
        },
        hearts: {
          particles: {
            paint: {
              fill: {
                color: {
                  value: "#ff0000",
                },
                enable: true,
              },
            },
          },
        },
        diamonds: {
          particles: {
            paint: {
              fill: {
                color: {
                  value: "#ff0000",
                },
                enable: true,
              },
            },
          },
        },
        clubs: {
          particles: {
            paint: {
              fill: {
                color: {
                  value: "#000000",
                },
                enable: true,
              },
            },
          },
        },
      },
    },
    opacity: {
      value: 1,
    },
    size: {
      value: 30,
    },
    move: {
      enable: true,
      speed: 2,
    },
  },
  interactivity: {
    events: {
      onHover: {
        enable: true,
        mode: "repulse",
      },
      onClick: {
        enable: true,
        mode: "push",
      },
    },
    modes: {
      repulse: {
        distance: 200,
      },
      push: {
        quantity: 4,
      },
    },
  },
  background: {
    color: "#fff",
  },
};

export default options;
