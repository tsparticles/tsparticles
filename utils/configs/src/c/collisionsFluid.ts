import type { ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
  key: "collisionsFluid",
  name: "Collisions Fluid",
  particles: {
    number: {
      value: 1500,
    },
    collisions: {
      enable: true,
      mode: "fluid",
      fluid: {
        /* radius must exceed the particle contact distance (2 * size) so touching particles are
           actually simulated; tuned so the fluid settles into a loose pool with visible gaps */
        radius: 26,
        stiffness: 1.5,
        nearStiffness: 1.5,
        restDensity: 8,
        maxForce: 30,
        maxNeighbors: 64,
      },
    },
    paint: {
      fill: {
        color: {
          value: "#ffffff",
        },
        enable: true,
      },
      stroke: {
        color: {
          value: "#ff0000",
        },
        width: 1,
      },
    },
    shape: {
      type: "circle",
    },
    opacity: {
      value: 0.85,
    },
    size: {
      value: 10,
    },
    move: {
      enable: true,
      speed: 1,
      outModes: {
        default: "bounce",
      },
      gravity: {
        enable: true,
        acceleration: 9.81,
      },
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
        distance: 120,
        duration: 2,
      },
    },
  },
  background: {
    color: "#0b1c2c",
  },
};

export default options;
