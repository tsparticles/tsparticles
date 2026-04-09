import { type ISourceOptions, MoveDirection, OutMode } from "@tsparticles/engine";

export const options: ISourceOptions = {
  fpsLimit: 120,
  background: {
    color: "#191d1e",
    image: "linear-gradient(0deg,  #191d1e 50%,#283139 100%)",
  },
  particles: {
    number: {
      value: 200,
      density: {
        enable: true,
      },
    },
    shape: {
      type: "circle",
      options: {
        circle: [
          {
            particles: {
              paint: {
                fill: {
                  enable: false,
                },
                stroke: {
                  width: 1,
                  color: {
                    value: "#0cdbf3",
                  },
                },
              },
              opacity: {
                value: { min: 0, max: 0.8 },
                animation: {
                  enable: true,
                  speed: 0.1,
                },
              },
              size: {
                value: { min: 3, max: 5 },
              },
            },
          },
          {
            particles: {
              paint: {
                fill: {
                  color: {
                    value: "#6fd2f3",
                  },
                  enable: true,
                },
              },
              opacity: {
                value: { min: 0, max: 0.6 },
                animation: {
                  enable: true,
                  speed: 0.1,
                },
              },
              size: {
                value: { min: 5, max: 7 },
              },
            },
          },
          {
            particles: {
              paint: {
                fill: {
                  color: {
                    value: "#93e9f3",
                  },
                  enable: true,
                },
              },
              opacity: {
                value: { min: 0, max: 0.4 },
                animation: {
                  enable: true,
                  speed: 0.1,
                },
              },
              size: {
                value: { min: 10, max: 20 },
              },
            },
          },
        ],
      },
    },
    move: {
      enable: true,
      speed: {
        min: 0.1,
        max: 0.5,
      },
      direction: MoveDirection.none,
      outModes: OutMode.bounce,
    },
  },
  detectRetina: true,
};
