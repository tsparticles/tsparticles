/* eslint-disable @typescript-eslint/no-magic-numbers */
import type { BackgroundDrawContext, IDelta, ISourceOptions } from "@tsparticles/engine";

let hue = 0;

const options: ISourceOptions = {
  key: "backgroundCanvas",
  name: "Background Canvas",
  particles: {
    number: {
      value: 80,
      density: {
        enable: true,
      },
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
      value: 0.5,
    },
    size: {
      value: {
        min: 1,
        max: 3,
      },
    },
    links: {
      enable: true,
      distance: 150,
      color: "#ffffff",
      opacity: 0.4,
      width: 1,
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
    },
    modes: {
      repulse: {
        distance: 100,
      },
    },
  },
  background: {
    draw: (ctx: BackgroundDrawContext, delta: IDelta): void => {
      hue = (hue + delta.value * 0.02) % 360;

      const gradient = ctx.createLinearGradient(0, 0, ctx.canvas.width, ctx.canvas.height);

      gradient.addColorStop(0, `hsl(${hue}, 70%, 20%)`);
      gradient.addColorStop(1, `hsl(${(hue + 60) % 360}, 70%, 10%)`);

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    },
  },
};

export default options;
