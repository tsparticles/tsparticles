import type { ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
  key: "chars",
  name: "Chars",
  particles: {
    number: {
      value: 80,
      density: {
        enable: true,
      },
    },
    stroke: {
      width: 1,
      color: "#ffffff",
    },
    shape: {
      type: "text",
      options: {
        text: {
          value: ["t", "s", "P", "a", "r", "t", "i", "c", "l", "e", "s"],
          font: "Verdana",
          style: "",
          weight: "400",
          particles: {
            fill: [
              {
                color: {
                  value: "#ff0000",
                },
                enable: true,
              },
              { enable: false },
            ],
          },
        },
      },
    },
    opacity: {
      value: {
        min: 0.4,
        max: 0.8,
      },
      animation: {
        enable: true,
        speed: 1,
      },
    },
    size: {
      value: 16,
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
      grab: {
        distance: 400,
        links: {
          opacity: 1,
        },
      },
      bubble: {
        distance: 400,
        size: 40,
        duration: 2,
        opacity: 0.8,
      },
      repulse: {
        distance: 200,
      },
      push: {
        quantity: 4,
      },
      remove: {
        quantity: 2,
      },
    },
  },
  background: {
    color: "#0d47a1",
  },
};

export default options;
