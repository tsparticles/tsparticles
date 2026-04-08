import type { ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
  key: "reactSimple",
  name: "React Simple",
  interactivity: {
    events: {
      onHover: {
        enable: true,
        mode: "repulse",
      },
    },
    modes: {
      repulse: {
        distance: 100,
        duration: 5,
      },
    },
  },
  particles: {
    paint: {
      fill: {
        color: {
          value: "#FFF",
        },
        enable: true,
      },
      stroke: {
        color: {
          value: "#ff0000",
        },
        width: 0,
        opacity: 1,
      },
    },
    links: {
      blink: false,
      color: {
        value: "#fff",
      },
      consent: false,
      distance: 150,
      enable: true,
      opacity: 0.6,
      width: 1,
    },
    move: {
      enable: true,
      outModes: "bounce",
      speed: 3,
    },
    collisions: {
      enable: true,
    },
    number: {
      value: 50,
    },
    opacity: {
      animation: {
        enable: true,
        speed: 1,
        sync: false,
      },
      value: {
        min: 0.1,
        max: 0.5,
      },
    },
    shape: {
      type: "circle",
    },
    size: {
      value: 3,
    },
  },
  backgroundMask: {
    cover: {
      color: "#fff",
      opacity: 1,
    },
    enable: false,
  },
  pauseOnBlur: true,
  background: {
    color: "#0d47a1",
    image: "",
    position: "50% 50%",
    repeat: "no-repeat",
    size: "cover",
  },
};

export default options;
