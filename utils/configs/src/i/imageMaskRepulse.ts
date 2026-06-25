import type { IRgba, ISourceOptions } from "@tsparticles/engine";

const minFilterValue = 30,
  minFilterAlpha = 0,
  options: ISourceOptions = {
    key: "imageMaskRepulse",
    name: "Image Mask Repulse Restore",
    smooth: true,
    interactivity: {
      events: {
        onHover: {
          enable: true,
          mode: "repulse",
        },
      },
      modes: {
        repulse: {
          distance: 50,
          duration: 0.4,
          speed: 1,
          factor: 90,
          maxSpeed: 80,
          restore: {
            enable: true,
            delay: 0,
            speed: 0.3,
            follow: true,
          },
        },
      },
    },
    particles: {
      move: {
        direction: "none",
        distance: 10,
        enable: false,
        speed: 1,
      },
      number: {
        value: 600,
      },
      shape: {
        type: ["circle", "square", "triangle"],
      },
      size: {
        value: {
          min: 3,
          max: 5,
        },
      },
    },
    canvasMask: {
      enable: true,
      scale: 5,
      pixels: {
        filter: (pixel: IRgba) =>
          pixel.r < minFilterValue && pixel.g < minFilterValue && pixel.b < minFilterValue
            ? false
            : pixel.a > minFilterAlpha,
      },
      image: {
        src: "https://particles.js.org/images/hdr/amongus_cyan.png",
      },
    },
    background: {
      color: "#0d0d0d",
    },
  };

export default options;
