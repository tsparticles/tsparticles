/* eslint-disable @typescript-eslint/no-magic-numbers */
import type { BackgroundDrawContext, IDelta, ISourceOptions } from "@tsparticles/engine";

const hues = new WeakMap<BackgroundDrawContext, number>(),
  options: ISourceOptions = {
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
            value: "#f0f0f0",
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
        color: "#f0f0f0",
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
        const hue = ((hues.get(ctx) ?? 0) + delta.value * 0.02) % 360;

        hues.set(ctx, hue);

        const gradient = ctx.createLinearGradient(0, 0, ctx.canvas.width, ctx.canvas.height);

        gradient.addColorStop(0, `hsl(${hue}, 70%, 20%)`);
        gradient.addColorStop(1, `hsl(${(hue + 60) % 360}, 70%, 10%)`);

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      },
    },
  };

export default options;
