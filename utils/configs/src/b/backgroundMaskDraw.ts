import type { IDelta, ISourceOptions } from "@tsparticles/engine";

const saturation = 70,
  lightness = 50,
  toSeconds = 0.001,
  options: ISourceOptions = {
    key: "backgroundMaskDraw",
    name: "Background Mask Draw",
    particles: {
      number: {
        value: 80,
      },
      paint: {
        fill: {
          color: {
            value: "#ffffff",
          },
          enable: true,
        },
      },
      shape: {
        type: "circle",
      },
      opacity: {
        value: 1,
      },
      size: {
        value: {
          min: 10,
          max: 30,
        },
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
          mode: "bubble",
        },
        onClick: {
          enable: true,
          mode: "push",
        },
      },
      modes: {
        bubble: {
          distance: 400,
          size: 100,
          duration: 2,
          opacity: 1,
        },
        push: {
          quantity: 4,
        },
      },
    },
    backgroundMask: {
      enable: true,
      cover: {
        draw: (ctx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D, _delta: IDelta): void => {
          const t = performance.now() * toSeconds,
            w = ctx.canvas.width,
            h = ctx.canvas.height,
            speed = 30,
            fullCircle = 360,
            hue = (t * speed) % fullCircle;

          ctx.fillStyle = `hsl(${hue}, ${saturation}%, ${lightness}%)`;

          const originX = 0,
            originY = 0;

          ctx.fillRect(originX, originY, w, h);
        },
      },
    },
    background: {
      color: "#000000",
    },
  };

export default options;
