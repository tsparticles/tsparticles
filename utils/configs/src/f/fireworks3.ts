import { EventType, type ISourceOptions, type Particle } from "@tsparticles/engine";

const options: ISourceOptions = {
  key: "fireworks3",
  name: "Fireworks 3",
  fullScreen: {
    enable: true,
  },
  background: {
    color: "#000",
  },
  blend: {
    enable: true,
    mode: "lighter",
  },
  emitters: {
    direction: "top",
    life: {
      count: 0,
      duration: 0.1,
      delay: 0.1,
    },
    rate: {
      delay: 0.1,
      quantity: 1,
    },
    size: {
      width: 100,
      height: 0,
    },
    position: {
      y: 100,
      x: 50,
    },
  },
  particles: {
    stroke: {
      color: {
        value: [
          "#FF0000",
          "#FF2A00",
          "#FF5500",
          "#FF8000",
          "#FFAA00",
          "#FFD400",
          "#FFFF00",
          "#D4FF00",
          "#AAFF00",
          "#80FF00",
          "#55FF00",
          "#2AFF00",
          "#00FF00",
          "#00FF2A",
          "#00FF55",
          "#00FF80",
          "#00FFAA",
          "#00FFD4",
          "#00FFFF",
          "#00D4FF",
          "#00AAFF",
          "#0080FF",
          "#0055FF",
          "#002AFF",
          "#0000FF",
          "#2A00FF",
          "#5500FF",
          "#8000FF",
          "#AA00FF",
          "#D400FF",
          "#FF00FF",
          "#FF00D4",
          "#FF00AA",
          "#FF0080",
          "#FF0055",
          "#FF002A",
        ],
      },
      width: 2,
    },
    number: {
      value: 0,
    },
    destroy: {
      bounds: {
        top: 30,
      },
      mode: "split",
      split: {
        count: 1,
        factor: {
          value: 0.333333,
        },
        rate: {
          value: 100,
        },
        strokeColorOffset: {
          l: {
            min: -25,
            max: 25,
          },
        },
        particles: {
          destroy: {
            bounds: {
              top: 0,
            },
          },
          opacity: {
            value: {
              min: 0.1,
              max: 1,
            },
            animation: {
              enable: true,
              speed: { min: 2, max: 4 },
              sync: true,
              startValue: "max",
              destroy: "min",
              count: 1,
            },
          },
          size: {
            value: { min: 5, max: 10 },
            animation: {
              enable: false,
            },
          },
          life: {
            count: 1,
            duration: {
              value: {
                min: 0.5,
                max: 1,
              },
            },
          },
          move: {
            gravity: {
              enable: false,
            },
            enable: true,
            decay: 0.05,
            speed: {
              min: 10,
              max: 25,
            },
            direction: "outside",
            outModes: "destroy",
          },
        },
      },
    },
    life: {
      count: 1,
    },
    shape: {
      type: "line",
      options: {
        line: {
          cap: "round",
        },
      },
    },
    size: {
      value: { min: 10, max: 20 },
    },
    move: {
      enable: true,
      gravity: {
        acceleration: 30,
        enable: true,
        inverse: true,
        maxSpeed: 150,
      },
      speed: {
        min: 20,
        max: 40,
      },
      outModes: {
        default: "destroy",
        top: "none",
      },
    },
    rotate: {
      path: true,
    },
  },
  sounds: {
    enable: true,
    events: [
      {
        event: EventType.particleRemoved,
        filter: (args: unknown): boolean => {
          const data = (args as { data?: { particle?: Particle } }).data;

          return data?.particle?.options.move.gravity.inverse ?? false;
        },
        audio: [
          "https://particles.js.org/audio/explosion0.mp3",
          "https://particles.js.org/audio/explosion1.mp3",
          "https://particles.js.org/audio/explosion2.mp3",
        ],
      },
    ],
    volume: 50,
  },
};

export default options;
