import type { ISourceOptions } from "@tsparticles/engine";

const chars = ["♪", "♫", "♩", "♬", "♭", "♮", "♯"],
  options: ISourceOptions = {
    key: "musicEmitter",
    name: "Music Emitter",
    particles: {
      paint: {
        color: {
          value: [
            "#ff5733",
            "#33ff57",
            "#3357ff",
            "#ff33a1",
            "#a133ff",
            "#33fff6",
            "#f4d03f",
          ],
        },
      },
      opacity: {
        value: {
          min: 0,
          max: 1,
        },
        animation: {
          enable: true,
          speed: 0.25,
          startValue: "max",
          destroy: "min",
          sync: true,
          count: 1,
        },
      },
      move: {
        enable: true,
        outModes: "destroy",
      },
      life: {
        enable: true,
        count: 1,
      },
      size: {
        value: { min: 20, max: 40 },
      },
      shape: {
        type: "text",
        options: {
          text: {
            value: chars,
          },
        },
      },
    },
    emitters: {
      direction: "top",
      position: {
        x: 50,
        y: 50,
      },
      size: {
        width: 10,
        height: 10,
      },
      rate: {
        delay: 0.25,
        quantity: 1,
      },
    },
  };

export default options;
