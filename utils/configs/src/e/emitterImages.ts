import type { ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
  key: "emitterImages",
  name: "Emitter Images",
  particles: {
    move: {
      enable: true,
      outModes: "destroy",
      speed: 2,
    },
    number: {
      density: {
        enable: true,
      },
      value: 80,
    },
    opacity: {
      value: 1,
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
      type: "circle",
    },
    size: {
      value: 16,
    },
  },
  background: {
    color: "#fff",
  },
  emitters: {
    particles: {
      shape: {
        type: "image",
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
      },
    },
  },
};

export default options;
