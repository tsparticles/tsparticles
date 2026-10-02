import type { ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
  key: "absorbersSplitOrbit",
  name: "Absorbers Split Orbit",
  particles: {
    number: {
      value: 300,
    },
    paint: {
      fill: {
        color: {
          value: ["#ffffff", "#ffd166", "#06d6a0", "#ef476f"],
        },
        enable: true,
      },
    },
    shape: {
      type: "circle",
    },
    opacity: {
      value: {
        min: 0.4,
        max: 1,
      },
    },
    size: {
      value: {
        min: 1,
        max: 3,
      },
    },
    move: {
      enable: true,
      speed: 0.6,
      direction: "none",
      random: true,
    },
  },
  interactivity: {
    events: {
      onClick: {
        enable: true,
        mode: "absorber-split",
      },
    },
  },
  absorbers: [
    {
      color: {
        value: "#1b1b3a",
      },
      draggable: true,
      // the orbit field bounds the motion: the attraction is applied to the orbit radius and angle
      // instead of being summed into the particle velocity, so a high density stays stable here
      orbits: true,
      destroy: false,
      position: {
        x: 30,
        y: 35,
      },
      size: {
        value: 6,
        density: 600,
        // the radius must always be bounded: with no `limit.radius` an absorber keeps growing
        // forever, swallowing the whole canvas, and `split.quantity` keeps adding particles on top
        limit: {
          radius: 45,
        },
      },
      split: {
        enable: true,
        quantity: 12,
      },
    },
    {
      color: {
        value: "#3a1b2b",
      },
      draggable: true,
      orbits: true,
      destroy: false,
      position: {
        x: 70,
        y: 65,
      },
      size: {
        value: 6,
        density: 600,
        limit: {
          radius: 45,
          mass: 7200,
        },
      },
      split: {
        enable: true,
        quantity: 12,
      },
    },
  ],
  background: {
    color: "#0d0d0d",
  },
};

export default options;
