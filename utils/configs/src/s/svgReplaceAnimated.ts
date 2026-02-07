import type { ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
  key: "svgReplaceAnimated",
  name: "SVG Replace Animated",
  interactivity: {
    events: {
      onClick: {
        enable: true,
        mode: "push",
      },
      onHover: {
        enable: true,
        mode: "bubble",
      },
    },
    modes: {
      bubble: {
        distance: 400,
        duration: 2,
        opacity: 0.8,
        size: 40,
      },
      connect: {
        distance: 80,
        links: {
          opacity: 0.5,
        },
        radius: 60,
      },
      grab: {
        distance: 400,
        links: {
          opacity: 1,
        },
      },
      push: {
        quantity: 4,
      },
      remove: {
        quantity: 2,
      },
      repulse: {
        distance: 200,
        duration: 0.4,
      },
    },
  },
  particles: {
    color: {
      value: "#ff0000",
      animation: {
        enable: true,
        speed: 20,
        sync: true,
      },
    },
    move: {
      enable: true,
      speed: 2,
    },
    number: {
      density: {
        enable: true,
      },
      value: 80,
    },
    opacity: {
      value: {
        min: 0.1,
        max: 1,
      },
    },
    rotate: {
      animation: {
        enable: true,
        speed: 5,
        sync: false,
      },
      direction: "random",
      value: {
        min: 0,
        max: 360,
      },
    },
    shape: {
      options: {
        image: {
          name: "canine",
        },
      },
      type: "image",
    },
    size: {
      value: 16,
    },
  },
  preload: [
    {
      name: "canine",
      src: "/images/canine.svg",
      width: 32,
      height: 32,
      tint: true,
    },
  ],
  background: {
    color: "#fff",
    image: "",
    position: "50% 50%",
    repeat: "no-repeat",
    size: "cover",
  },
};

export default options;
