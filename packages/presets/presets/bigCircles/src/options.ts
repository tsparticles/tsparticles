import { type ISourceOptions, MoveDirection, OutMode } from "@tsparticles/engine";

export const options: ISourceOptions = {
  fpsLimit: 120,
  background: {
    color: "#fff",
  },
  particles: {
    number: {
      value: 100,
      density: {
        enable: true,
      },
    },
    paint: {
      fill: {
        color: {
          value: [
            "#FF0000",
            "#FF2A00",
            "#FF5500",
            "#FF8000",
            "#FFAA00",
            "#FFD400",
            "#FFFF00",
            "#D4FF00",
            "#AAFF00",
            "#80FF00",
            "#55FF00",
            "#2AFF00",
            "#00FF00",
            "#00FF2A",
            "#00FF55",
            "#00FF80",
            "#00FFAA",
            "#00FFD4",
            "#00FFFF",
            "#00D4FF",
            "#00AAFF",
            "#0080FF",
            "#0055FF",
            "#002AFF",
            "#0000FF",
            "#2A00FF",
            "#5500FF",
            "#8000FF",
            "#AA00FF",
            "#D400FF",
            "#FF00FF",
            "#FF00D4",
            "#FF00AA",
            "#FF0080",
            "#FF0055",
            "#FF002A",
          ],
        },
        enable: true,
      },
    },
    shape: {
      type: "circle",
    },
    opacity: {
      value: { min: 0.4, max: 0.8 },
    },
    size: {
      value: { min: 150, max: 300 },
    },
    move: {
      enable: true,
      angle: {
        value: 30,
        offset: 0,
      },
      speed: {
        min: 10,
        max: 20,
      },
      direction: MoveDirection.top,
      outModes: OutMode.out,
    },
  },
  detectRetina: true,
};
