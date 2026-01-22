import type { ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
  key: "reduceDuplicates",
  name: "Reduce Duplicates",
  particles: {
    color: {
      value: "#ffffff",
    },
    move: {
      direction: "none",
      enable: true,
      outModes: "bounce",
      speed: 2,
    },
    number: {
      value: 16,
    },
    opacity: {
      value: 1,
    },
    reduceDuplicates: true,
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
        image: [
          {
            src: "https://particles.js.org/images/hdr/fruits/apple.png",
            width: 32,
            height: 32,
          },
          {
            src: "https://particles.js.org/images/hdr/fruits/avocado.png",
            width: 32,
            height: 32,
          },
          {
            src: "https://particles.js.org/images/hdr/fruits/banana.png",
            width: 32,
            height: 32,
          },
          {
            src: "https://particles.js.org/images/hdr/fruits/berries.png",
            width: 32,
            height: 32,
          },
          {
            src: "https://particles.js.org/images/hdr/fruits/cherry.png",
            width: 32,
            height: 32,
          },
          {
            src: "https://particles.js.org/images/hdr/fruits/grapes.png",
            width: 32,
            height: 32,
          },
          {
            src: "https://particles.js.org/images/hdr/fruits/lemon.png",
            width: 32,
            height: 32,
          },
          {
            src: "https://particles.js.org/images/hdr/fruits/orange.png",
            width: 32,
            height: 32,
          },
          {
            src: "https://particles.js.org/images/hdr/fruits/peach.png",
            width: 32,
            height: 32,
          },
          {
            src: "https://particles.js.org/images/hdr/fruits/pear.png",
            width: 32,
            height: 32,
          },
          {
            src: "https://particles.js.org/images/hdr/fruits/pepper.png",
            width: 32,
            height: 32,
          },
          {
            src: "https://particles.js.org/images/hdr/fruits/plum.png",
            width: 32,
            height: 32,
          },
          {
            src: "https://particles.js.org/images/hdr/fruits/star.png",
            width: 32,
            height: 32,
          },
          {
            src: "https://particles.js.org/images/hdr/fruits/strawberry.png",
            width: 32,
            height: 32,
          },
          {
            src: "https://particles.js.org/images/hdr/fruits/watermelon.png",
            width: 32,
            height: 32,
          },
          {
            src: "https://particles.js.org/images/hdr/fruits/watermelon_slice.png",
            width: 32,
            height: 32,
          },
        ],
      },
      type: "image",
    },
    size: {
      value: 16,
    },
  },
  background: {
    color: "#fff",
  },
};
export default options;
