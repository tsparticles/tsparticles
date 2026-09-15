/* eslint-disable @typescript-eslint/no-magic-numbers,@typescript-eslint/no-unused-expressions,@typescript-eslint/require-await */
import { type Container, type ICoordinates3d, type ISourceOptions, LimitMode, tsParticles } from "@tsparticles/engine";
import { beforeEach, describe, expect, it } from "vitest";
import { TestWindow } from "../Fixture/Window.js";
import { createCustomCanvas } from "../Fixture/CustomCanvas.js";

const width = 1920,
  height = 1080;

/**
 * Loads a fresh container with the given options and a deterministic canvas size.
 * Fresh containers are required by the limit/density-invariant tests so the
 * first-load ordering of `particles.init()` vs `setDensity()` is exercised.
 * @param id - The container id
 * @param options - The options to load
 * @returns the loaded container
 */
async function loadContainer(id: string, options: ISourceOptions): Promise<Container> {
  const container = await tsParticles.load({
    id,
    options,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/no-unsafe-assignment
    element: createCustomCanvas(width, height) as any,
  });

  if (!container) {
    throw new Error(`Error test container ${id} not initialized`);
  }

  return container;
}

describe("ParticleGroups", async () => {
  globalThis.window = TestWindow;

  const container = await tsParticles.load({
    id: "test-particle-groups",
    options: {
      autoPlay: false,
    },

    // eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/no-unsafe-assignment
    element: createCustomCanvas(width, height) as any,
  });

  if (!container) {
    throw new Error(`Error test container not initialized`);
  }

  const groupMixOptions = {
    particles: {
      number: {
        value: 6,
      },
      groups: {
        g1: {
          number: {
            value: 3,
          },
        },
        g2: {
          number: {
            value: 3,
          },
        },
      },
    },
  };

  describe("group assignment and initialization", () => {
    beforeEach(async () => {
      await container.reset();
    });

    it("T8 - should assign the requested group to the added particle", async () => {
      const particle = container.particles.addParticle(undefined, undefined, "g1");

      expect(particle).to.be.not.undefined;

      if (!particle) {
        return;
      }

      expect(particle.group).to.equal("g1");
      expect(container.particles.count).to.equal(1);
      expect(container.particles.filter(t => t.group === "g1")).to.have.length(1);
    });

    it("T9 - should initialize the configured mix of grouped and ungrouped particles", async () => {
      await container.reset({
        particles: {
          number: {
            value: 8,
          },
          groups: {
            g1: {
              number: {
                value: 3,
              },
            },
            g2: {
              number: {
                value: 2,
              },
            },
          },
        },
      });

      expect(container.particles.count).to.equal(8);
      expect(container.particles.filter(t => t.group === "g1")).to.have.length(3);
      expect(container.particles.filter(t => t.group === "g2")).to.have.length(2);
      expect(container.particles.filter(t => t.group === undefined)).to.have.length(3);
    });

    it("T10 - should apply per-group options overrides to the grouped particles", async () => {
      await container.reset({
        particles: {
          number: {
            value: 3,
          },
          groups: {
            g1: {
              number: {
                value: 2,
              },
              shape: {
                type: "square",
              },
            },
          },
        },
      });

      const arr = container.particles.filter(() => true);

      expect(arr).to.have.length(3);

      const grouped = arr.filter(t => t.group === "g1"),
        ungrouped = arr.filter(t => t.group === undefined);

      expect(grouped).to.have.length(2);
      expect(ungrouped).to.have.length(1);

      for (const particle of grouped) {
        expect(particle.shape).to.equal("square");
      }

      for (const particle of ungrouped) {
        expect(particle.shape).to.equal("circle");
      }
    });

    it("T11 - should not let a group limit block ungrouped addParticle calls", async () => {
      await container.reset({
        particles: {
          number: {
            value: 0,
            limit: {
              mode: LimitMode.wait,
            },
          },
          groups: {
            g1: {
              number: {
                value: 0,
                limit: {
                  value: 1,
                  mode: LimitMode.wait,
                },
              },
            },
          },
        },
      });

      const first = container.particles.addParticle(undefined, undefined, "g1"),
        second = container.particles.addParticle(undefined, undefined, "g1");

      expect(first).to.be.not.undefined;
      expect(second).to.be.undefined;
      expect(container.particles.filter(t => t.group === "g1")).to.have.length(1);

      const ungrouped = container.particles.addParticle();

      expect(ungrouped).to.be.not.undefined;
      expect(container.particles.filter(t => t.group === undefined)).to.have.length(1);
      expect(container.particles.count).to.equal(2);
    });
  });

  describe("group-filtered removal", () => {
    beforeEach(async () => {
      await container.reset(groupMixOptions);
    });

    it("T12 - should remove only particles of the requested group when using removeAt", async () => {
      expect(container.particles.count).to.equal(6);

      container.particles.removeAt(0, 2, "g1");

      expect(container.particles.count).to.equal(4);
      expect(container.particles.filter(t => t.group === "g1")).to.have.length(1);
      expect(container.particles.filter(t => t.group === "g2")).to.have.length(3);
    });

    it("T13 - should remove only particles of the requested group when using removeQuantity", async () => {
      expect(container.particles.count).to.equal(6);

      container.particles.removeQuantity(2, "g2");

      expect(container.particles.count).to.equal(4);
      expect(container.particles.filter(t => t.group === "g1")).to.have.length(3);
      expect(container.particles.filter(t => t.group === "g2")).to.have.length(1);
    });

    it("T14 - should be a no-op when removing a particle with a mismatched group", async () => {
      await container.reset({
        particles: {
          number: {
            value: 3,
          },
        },
      });

      expect(container.particles.count).to.equal(3);

      const target = container.particles.filter(() => true)[0];

      container.particles.remove(target, "g1");

      expect(container.particles.count).to.equal(3);
      expect(container.particles.find(t => t === target)).to.be.not.undefined;

      container.particles.remove(target);

      expect(container.particles.count).to.equal(2);
      expect(container.particles.find(t => t === target)).to.be.undefined;
    });
  });

  describe("group limits", () => {
    beforeEach(async () => {
      await container.reset();
    });

    it("T15 - should refuse particles over a group limit in wait mode", async () => {
      await container.reset({
        particles: {
          number: {
            value: 0,
            limit: {
              mode: LimitMode.wait,
            },
          },
          groups: {
            g1: {
              number: {
                value: 0,
                limit: {
                  value: 2,
                  mode: LimitMode.wait,
                },
              },
            },
          },
        },
      });

      const ungrouped = container.particles.addParticle();

      expect(ungrouped).to.be.not.undefined;

      const first = container.particles.addParticle(undefined, undefined, "g1"),
        second = container.particles.addParticle(undefined, undefined, "g1"),
        third = container.particles.addParticle(undefined, undefined, "g1");

      expect(first).to.be.not.undefined;
      expect(second).to.be.not.undefined;
      expect(third).to.be.undefined;
      expect(container.particles.filter(t => t.group === "g1")).to.have.length(2);
      expect(container.particles.filter(t => t.group === undefined)).to.have.length(1);
      expect(container.particles.count).to.equal(3);
    });

    it("T16 - should trim the oldest group particle over a group limit in delete mode, leaving other groups alone", async () => {
      await container.reset({
        particles: {
          number: {
            value: 6,
          },
          groups: {
            g1: {
              number: {
                value: 2,
                limit: {
                  value: 2,
                  mode: LimitMode.delete,
                },
              },
            },
            g2: {
              number: {
                value: 2,
              },
            },
          },
        },
      });

      expect(container.particles.filter(t => t.group === "g1")).to.have.length(2);
      expect(container.particles.filter(t => t.group === "g2")).to.have.length(2);
      expect(container.particles.filter(t => t.group === undefined)).to.have.length(2);

      const initialG1Ids = container.particles.filter(t => t.group === "g1").map(t => t.id);

      for (let i = 0; i < 5; i++) {
        const particle = container.particles.addParticle(undefined, undefined, "g1");

        expect(particle).to.be.not.undefined;
        expect(container.particles.filter(t => t.group === "g1")).to.have.length(2);
      }

      const finalG1Ids = container.particles.filter(t => t.group === "g1").map(t => t.id);

      expect(finalG1Ids).to.not.include(initialG1Ids[0]);
      expect(container.particles.filter(t => t.group === "g2")).to.have.length(2);
      expect(container.particles.filter(t => t.group === undefined)).to.have.length(2);
      expect(container.particles.count).to.equal(6);
    });

    it("T16b - should cap the global total in delete mode even when a group's own limit is higher", async () => {
      await container.reset({
        particles: {
          number: {
            value: 6,
            limit: {
              value: 3,
              mode: LimitMode.delete,
            },
          },
          groups: {
            g1: {
              number: {
                value: 5,
                limit: {
                  value: 5,
                  mode: LimitMode.delete,
                },
              },
            },
          },
        },
      });

      expect(container.particles.count).to.be.at.most(3);

      for (let i = 0; i < 6; i++) {
        container.particles.addParticle(undefined, undefined, "g1");
      }

      expect(container.particles.count).to.be.at.most(3);
      expect(container.particles.filter(t => t.group === "g1")).to.have.length.at.most(5);
    });

    it("T28 - should not blow through the global limit during group initialization", async () => {
      await container.reset({
        particles: {
          number: {
            value: 200,
            limit: {
              value: 100,
              mode: LimitMode.wait,
            },
          },
          groups: {
            g1: {
              number: {
                value: 150,
              },
            },
            g2: {
              number: {
                value: 150,
              },
            },
          },
        },
      });

      expect(container.particles.count).to.be.at.most(100);
      expect(container.particles.filter(t => t.group === "g1")).to.have.length.at.most(100);
      expect(container.particles.filter(t => t.group === "g2")).to.have.length.at.most(100);
    });

    it("T29 - should enforce a per-group limit in both wait and delete modes", async () => {
      await container.reset({
        particles: {
          number: {
            value: 0,
            limit: {
              mode: LimitMode.wait,
            },
          },
          groups: {
            g1: {
              number: {
                value: 0,
                limit: {
                  value: 2,
                  mode: LimitMode.wait,
                },
              },
            },
          },
        },
      });

      let accepted = 0;

      for (let i = 0; i < 5; i++) {
        if (container.particles.addParticle(undefined, undefined, "g1")) {
          accepted++;
        }
      }

      expect(accepted).to.equal(2);
      expect(container.particles.filter(t => t.group === "g1")).to.have.length(2);

      container.particles.push(3);

      expect(container.particles.filter(t => t.group === undefined)).to.have.length(3);

      await container.reset({
        particles: {
          number: {
            value: 0,
            limit: {
              mode: LimitMode.delete,
            },
          },
          groups: {
            g1: {
              number: {
                value: 0,
                limit: {
                  value: 2,
                  mode: LimitMode.delete,
                },
              },
            },
          },
        },
      });

      const initialG1Ids = container.particles.filter(t => t.group === "g1").map(t => t.id);

      expect(initialG1Ids).to.have.length(0);

      for (let i = 0; i < 5; i++) {
        container.particles.addParticle(undefined, undefined, "g1");

        expect(container.particles.filter(t => t.group === "g1")).to.have.length.at.most(2);
      }

      expect(container.particles.filter(t => t.group === "g1")).to.have.length(2);

      container.particles.push(3);

      expect(container.particles.filter(t => t.group === undefined)).to.have.length(3);
      expect(container.particles.filter(t => t.group === "g1")).to.have.length(2);
    });

    it("T31 - should apply a group delete limit even when the global limit waits", async () => {
      await container.reset({
        particles: {
          number: {
            value: 0,
            limit: {
              value: 3,
              mode: LimitMode.wait,
            },
          },
          groups: {
            g1: {
              number: {
                value: 0,
                limit: {
                  value: 2,
                  mode: LimitMode.delete,
                },
              },
            },
          },
        },
      });

      for (let i = 0; i < 5; i++) {
        container.particles.addParticle(undefined, undefined, "g1");
      }

      // the group keeps its own delete mode and trims g1 to its own limit
      expect(container.particles.filter(t => t.group === "g1")).to.have.length(2);
      expect(container.particles.count).to.equal(2);

      // the global wait mode still caps the total count
      const ungrouped1 = container.particles.addParticle(),
        ungrouped2 = container.particles.addParticle();

      expect(ungrouped1).to.be.not.undefined;
      expect(ungrouped2).to.be.undefined;
      expect(container.particles.count).to.equal(3);
    });

    it("T32 - should apply a group wait limit even when the global limit deletes", async () => {
      await container.reset({
        particles: {
          number: {
            value: 0,
            limit: {
              value: 3,
              mode: LimitMode.delete,
            },
          },
          groups: {
            g1: {
              number: {
                value: 0,
                limit: {
                  value: 2,
                  mode: LimitMode.wait,
                },
              },
            },
          },
        },
      });

      const first = container.particles.addParticle(undefined, undefined, "g1"),
        second = container.particles.addParticle(undefined, undefined, "g1"),
        third = container.particles.addParticle(undefined, undefined, "g1");

      expect(first).to.be.not.undefined;
      expect(second).to.be.not.undefined;
      expect(third).to.be.undefined;
      expect(container.particles.filter(t => t.group === "g1")).to.have.length(2);

      // the global delete mode still trims the total when it would be exceeded
      for (let i = 0; i < 3; i++) {
        container.particles.addParticle();
      }

      expect(container.particles.count).to.equal(3);
    });
  });

  describe("density", () => {
    it("T17 - should scale the global particle count by the density factor and re-scale on resize", async () => {
      const fresh = await loadContainer("test-density-global", {
        detectRetina: false,
        autoPlay: false,
        particles: {
          number: {
            value: 50,
            density: {
              enable: true,
              width,
              height: height / 2,
            },
          },
        },
      });

      // density factor = (1920 * 1080) / (1920 * 540) = 2
      try {
        fresh.canvas.size = { width, height };
        fresh.particles.setDensity();

        expect(fresh.particles.count).to.equal(100);

        // resize to half the height -> density factor = 1 -> density must trim
        fresh.canvas.size = { width, height: height / 2 };
        fresh.particles.setDensity();

        expect(fresh.particles.count).to.equal(50);

        fresh.particles.update({
          value: 16.66667,
          factor: 1,
        });

        expect(fresh.particles.count).to.equal(50);
      } finally {
        fresh.destroy(false);
      }
    });

    it("T18 - should scale the group particle count by the density factor and trim only that group on resize", async () => {
      const fresh = await loadContainer("test-density-group", {
        detectRetina: false,
        autoPlay: false,
        particles: {
          number: {
            value: 15,
          },
          groups: {
            g1: {
              number: {
                value: 20,
                limit: {
                  value: 15,
                  mode: LimitMode.delete,
                },
                density: {
                  enable: true,
                  width,
                  height: height / 2,
                },
              },
            },
          },
        },
      });

      // group count = min(20, 15) * 2 = 30, other groups untouched
      try {
        fresh.canvas.size = { width, height };
        fresh.particles.setDensity();

        expect(fresh.particles.filter(t => t.group === "g1")).to.have.length(30);
        expect(fresh.particles.count).to.equal(30);

        // resize to half the height -> group count = min(20, 15) * 1 = 15 -> only g1 trimmed
        fresh.canvas.size = { width, height: height / 2 };
        fresh.particles.setDensity();

        expect(fresh.particles.filter(t => t.group === "g1")).to.have.length(15);
        expect(fresh.particles.count).to.equal(15);
      } finally {
        fresh.destroy(false);
      }
    });

    it("T18b - should bound the initial particle count at the limit when density is disabled (value > limit)", async () => {
      for (const mode of [LimitMode.wait, LimitMode.delete]) {
        const fresh = await loadContainer(`test-density-disabled-${mode}`, {
          detectRetina: false,
          autoPlay: false,
          particles: {
            number: {
              value: 200,
              limit: {
                value: 100,
                mode,
              },
              density: {
                enable: false,
                width,
                height,
              },
            },
          },
        });

        try {
          expect(fresh.particles.count).to.equal(100);
        } finally {
          fresh.destroy(false);
        }
      }
    });

    it("T30 - should preserve the effective limit across density push and remove paths", async () => {
      const limit = 100,
        fresh = await loadContainer("test-density-limit", {
          detectRetina: false,
          autoPlay: false,
          particles: {
            number: {
              value: 200,
              limit: {
                value: limit,
                mode: LimitMode.wait,
              },
              density: {
                enable: true,
                width,
                height: height * 2,
              },
            },
          },
        });

      // density factor = (1920 * 1080) / (1920 * 2160) = 0.5
      // target = min(200, 100) * 0.5 = 50 -> density trims (removeQuantity path)
      try {
        fresh.canvas.size = { width, height };
        fresh.particles.setDensity();

        expect(fresh.particles.count).to.equal(50);
        expect(fresh.particles.count).to.be.at.most(limit);

        // resize to double the height -> density factor = 1
        // target = min(200, 100) * 1 = 100 -> density pushes (push path)
        fresh.canvas.size = { width, height: height * 2 };
        fresh.particles.setDensity();

        expect(fresh.particles.count).to.equal(100);
        expect(fresh.particles.count).to.be.at.most(limit);
      } finally {
        fresh.destroy(false);
      }
    });
  });

  describe("z-bucket bookkeeping", () => {
    it("T22 - should keep the array consistent when particles change z and are removed", async () => {
      await container.reset({
        particles: {
          number: {
            value: 0,
          },
        },
      });

      const particle1 = container.particles.addParticle(),
        particle2 = container.particles.addParticle(),
        particle3 = container.particles.addParticle();

      expect(particle1).to.be.not.undefined;
      expect(particle2).to.be.not.undefined;
      expect(particle3).to.be.not.undefined;

      if (!particle1 || !particle2 || !particle3) {
        return;
      }

      particle1.position.z = 20;
      particle2.position.z = 5;
      particle3.position.z = -5;

      container.particles.update({
        value: 16.66667,
        factor: 1,
      });

      expect(container.particles.count).to.equal(3);

      container.particles.remove(particle2);

      expect(container.particles.count).to.equal(2);

      container.particles.update({
        value: 16.66667,
        factor: 1,
      });

      const arr = container.particles.filter(() => true);

      expect(arr).to.eql([particle1, particle3]);
    });

    it("T22b - should re-assign buckets when a particle z changes across updates", async () => {
      await container.reset({
        particles: {
          number: {
            value: 1,
          },
        },
      });

      const particle = container.particles.find(() => true);

      expect(particle).to.be.not.undefined;

      if (!particle) {
        return;
      }

      const position: ICoordinates3d = { x: 0, y: 0, z: 0 };

      particle.position.z = position.z;

      for (let i = 1; i <= 10; i++) {
        particle.position.z = i * 10;

        container.particles.update({
          value: 16.66667,
          factor: 1,
        });

        expect(container.particles.count).to.equal(1);
        expect(container.particles.find(t => t === particle)).to.be.not.undefined;
      }
    });
  });
});
