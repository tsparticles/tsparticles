import type { ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
  key: "imagesTinted",
  name: "Images Tinted",
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
      push: {
        quantity: 4,
      },
    },
  },
  particles: {
    color: {
      value: "#ff0000",
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
      options: {
        image: [
          {
            name: "apple",
          },
          {
            name: "avocado",
          },
          {
            name: "banana",
          },
          {
            name: "berries",
          },
          {
            name: "cherry",
          },
          {
            name: "grapes",
          },
          {
            name: "lemon",
          },
          {
            name: "orange",
          },
          {
            name: "peach",
          },
          {
            name: "pear",
          },
          {
            name: "pepper",
          },
          {
            name: "plum",
          },
          {
            name: "star",
          },
          {
            name: "strawberry",
          },
          {
            name: "watermelon",
          },
          {
            name: "watermelon_slice",
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
  preload: [
    {
      src: "https://particles.js.org/images/hdr/fruits/apple.png",
      name: "apple",
      width: 32,
      height: 32,
      tint: true,
    },
    {
      src: "https://particles.js.org/images/hdr/fruits/avocado.png",
      name: "avocado",
      width: 32,
      height: 32,
      tint: true,
    },
    {
      src: "https://particles.js.org/images/hdr/fruits/banana.png",
      name: "banana",
      width: 32,
      height: 32,
      tint: true,
    },
    {
      src: "https://particles.js.org/images/hdr/fruits/berries.png",
      name: "berries",
      width: 32,
      height: 32,
      tint: true,
    },
    {
      src: "https://particles.js.org/images/hdr/fruits/cherry.png",
      name: "cherry",
      width: 32,
      height: 32,
      tint: true,
    },
    {
      src: "https://particles.js.org/images/hdr/fruits/grapes.png",
      name: "grapes",
      width: 32,
      height: 32,
      tint: true,
    },
    {
      src: "https://particles.js.org/images/hdr/fruits/lemon.png",
      name: "lemon",
      width: 32,
      height: 32,
      tint: true,
    },
    {
      src: "https://particles.js.org/images/hdr/fruits/orange.png",
      name: "orange",
      width: 32,
      height: 32,
      tint: true,
    },
    {
      src: "https://particles.js.org/images/hdr/fruits/peach.png",
      name: "peach",
      width: 32,
      height: 32,
      tint: true,
    },
    {
      src: "https://particles.js.org/images/hdr/fruits/pear.png",
      name: "pear",
      width: 32,
      height: 32,
      tint: true,
    },
    {
      src: "https://particles.js.org/images/hdr/fruits/pepper.png",
      name: "pepper",
      width: 32,
      height: 32,
      tint: true,
    },
    {
      src: "https://particles.js.org/images/hdr/fruits/plum.png",
      name: "plum",
      width: 32,
      height: 32,
      tint: true,
    },
    {
      src: "https://particles.js.org/images/hdr/fruits/star.png",
      name: "star",
      width: 32,
      height: 32,
      tint: true,
    },
    {
      src: "https://particles.js.org/images/hdr/fruits/strawberry.png",
      name: "strawberry",
      width: 32,
      height: 32,
      tint: true,
    },
    {
      src: "https://particles.js.org/images/hdr/fruits/watermelon.png",
      name: "watermelon",
      width: 32,
      height: 32,
      tint: true,
    },
    {
      src: "https://particles.js.org/images/hdr/fruits/watermelon_slice.png",
      name: "watermelon_slice",
      width: 32,
      height: 32,
      tint: true,
    },
  ],
};
export default options;
