import { type ISourceOptions, MoveDirection } from "@tsparticles/engine";

const emitterRate = {
    delay: 0.1,
    quantity: 2,
  },
  options: ISourceOptions = {
    key: "emitterSpawnColor",
    name: "Emitter Spawn Color",
    particles: {
      opacity: {
        value: 1,
      },
      paint: {
        fill: {
          enable: false,
        },
      },
      size: {
        value: 3,
      },
      life: {
        count: 1,
        duration: {
          value: 5,
        },
      },
      move: {
        enable: true,
        speed: 3,
        outModes: {
          default: "destroy",
        },
      },
    },
    background: {
      color: "#000000",
    },
    emitters: [
      {
        position: {
          x: 33,
          y: 0,
        },
        rate: emitterRate,
        particles: {
          move: {
            direction: MoveDirection.bottomRight,
          },
        },
        spawn: {
          fill: {
            color: {
              value: "#ff0000",
              animation: {
                h: {
                  enable: true,
                  speed: 10,
                },
              },
            },
          },
        },
      },
      {
        position: {
          x: 33,
          y: 100,
        },
        rate: emitterRate,
        particles: {
          move: {
            direction: MoveDirection.topRight,
          },
        },
        spawn: {
          stroke: {
            width: 1,
            color: {
              value: "#ff0000",
              animation: {
                s: {
                  enable: true,
                  speed: 10,
                  offset: {
                    min: -10,
                    max: 10,
                  },
                },
              },
            },
          },
        },
      },
      {
        position: {
          x: 100,
          y: 0,
        },
        rate: emitterRate,
        particles: {
          move: {
            direction: MoveDirection.bottomLeft,
          },
        },
        spawn: {
          fill: {
            color: {
              value: "#ff0000",
              animation: {
                l: {
                  enable: true,
                  speed: 10,
                  offset: {
                    min: -10,
                    max: 10,
                  },
                },
              },
            },
          },
        },
      },
      {
        position: {
          x: 100,
          y: 100,
        },
        rate: emitterRate,
        particles: {
          move: {
            direction: MoveDirection.topLeft,
          },
        },
        spawn: {
          stroke: {
            width: 1,
            color: {
              value: "#ff0000",
              animation: {
                h: {
                  enable: true,
                  speed: 10,
                },
                s: {
                  enable: true,
                  speed: 10,
                  offset: {
                    min: -10,
                    max: 10,
                  },
                },
              },
            },
          },
        },
      },
      {
        position: {
          x: 66,
          y: 50,
        },
        rate: emitterRate,
        particles: {
          move: {
            direction: MoveDirection.none,
          },
        },
        spawn: {
          fill: {
            color: {
              value: "#ff0000",
              animation: {
                h: {
                  enable: true,
                  speed: 10,
                },
                l: {
                  enable: true,
                  speed: 10,
                  offset: {
                    min: -10,
                    max: 10,
                  },
                },
              },
            },
          },
          stroke: {
            width: 1,
            color: {
              value: "#00ff00",
              animation: {
                h: {
                  enable: true,
                  speed: 10,
                },
                l: {
                  enable: true,
                  speed: 10,
                  offset: {
                    min: -10,
                    max: 10,
                  },
                },
              },
            },
          },
        },
      },
    ],
  };

export default options;
