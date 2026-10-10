import type { ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
  key: "absorbersSplit",
  name: "Absorbers Split",
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
      // without orbits the attraction is summed straight into the particle velocity, and the
      // absorber mass grows with the density: a high density would kick the particles away with a
      // huge speed on every single frame, so it has to stay low for this demo to be readable
      orbits: false,
      destroy: false,
      position: {
        x: 30,
        y: 35,
      },
      size: {
        value: 6,
        density: 100,
        // the radius must always be bounded: with no `limit.radius` an absorber keeps growing
        // forever, swallowing the whole canvas, and `split.quantity` keeps adding particles on top
        limit: {
          radius: 40,
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
      orbits: false,
      destroy: false,
      position: {
        x: 70,
        y: 65,
      },
      size: {
        value: 6,
        density: 100,
        // the mass grows with the size, so this one splits on the mass limit first: it needs to
        // absorb five times its initial mass before it splits, instead of the double it took with
        // the values this config used to have
        limit: {
          radius: 55,
          mass: 3000,
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
