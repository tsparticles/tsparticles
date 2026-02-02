import type { ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
  key: "effectParticles",
  name: "Effect Particles",
  particles: {
    number: {
      value: 25,
    },
    color: {
      value: "#ffff00",
    },
    effect: {
      type: "particles",
      options: {
        particles: {
          spawn: {
            particles: {
              color: {
                value: "#ffff00",
                animation: {
                  enable: true,
                  speed: -70,
                  sync: true,
                },
              },
              effect: {
                type: "none",
              },
              shape: {
                type: "star",
              },
              move: {
                enable: true,
                speed: 1,
              },
              life: {
                duration: {
                  sync: false,
                  value: {
                    min: 1,
                    max: 2,
                  },
                },
                count: 1,
              },
              size: {
                value: {
                  min: 2,
                  max: 3,
                },
              },
              zIndex: {
                value: 5,
              },
            },
            rate: {
              delay: 0.1,
              quantity: { min: 3, max: 5 },
            },
          },
        },
      },
    },
    shape: {
      type: "star",
    },
    opacity: {
      value: 1,
    },
    size: {
      value: {
        min: 10,
        max: 15,
      },
    },
    move: {
      enable: true,
      speed: 6,
    },
    rotate: {
      path: true,
    },
    zIndex: {
      value: 0,
    },
  },
  background: {
    color: "#000000",
  },
};

export default options;
