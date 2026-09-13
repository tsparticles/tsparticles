/* eslint-disable */
import { LimitMode, type ICoordinates3d, tsParticles } from "@tsparticles/engine";
import { beforeEach, describe, expect, it } from "vitest";
import { createCustomCanvas } from "../Fixture/CustomCanvas.js";
import { TestWindow } from "../Fixture/Window.js";

const width = 1920,
  height = 1080;

describe("ParticleGroups", async () => {
  globalThis.window = TestWindow;

  const canvas = createCustomCanvas(width, height) as any,
    container = await tsParticles.load({
      id: "test-particle-groups",
      options: {
        autoPlay: false,
      },
      element: canvas,
    });

  if (!container) {
    throw new Error("test particle groups container not initialized");
  }

  const setCanvasSize = (newWidth: number, newHeight: number): void => {
      canvas.offsetWidth = newWidth;
      canvas.offsetHeight = newHeight;
      canvas.style.width = `${newWidth.toString()}px`;
      canvas.style.height = `${newHeight.toString()}px`;
    },
    countGroupParticles = (group?: string): number => container.particles.filter(particle => particle.group === group).length,
    addParticles = (...particles: Array<{ group?: string; position: ICoordinates3d }>) =>
      particles.map(({ group, position }) => container.particles.addParticle(position, undefined, group));

  beforeEach(async () => {
    setCanvasSize(width, height);
    await container.reset({
      particles: {
        move: {
          enable: false,
        },
        number: {
          value: 0,
        },
      },
    });
  });

  it("should assign the requested group when adding a particle", () => {
    const particle = container.particles.addParticle(undefined, undefined, "g1");

    expect(particle).to.be.not.undefined;
    expect(particle?.group).to.equal("g1");
    expect(container.particles.count).to.equal(1);
    expect(countGroupParticles("g1")).to.equal(1);
  });

  it("should initialize grouped and ungrouped particles on reset", async () => {
    await container.reset({
      particles: {
        move: {
          enable: false,
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
        number: {
          value: 8,
        },
      },
    });

    expect(container.particles.count).to.equal(8);
    expect(countGroupParticles("g1")).to.equal(3);
    expect(countGroupParticles("g2")).to.equal(2);
    expect(countGroupParticles(undefined)).to.equal(3);
  });

  it("should apply group override options during initialization", async () => {
    await container.reset({
      particles: {
        groups: {
          g1: {
            number: {
              value: 1,
            },
            shape: {
              type: "square",
              options: {
                square: {
                  close: false,
                },
              },
            },
          },
        },
        number: {
          value: 1,
        },
        shape: {
          type: "circle",
        },
      },
    });

    const particle = container.particles.find(current => current.group === "g1");

    expect(particle).to.be.not.undefined;
    expect(particle?.shape).to.equal("square");
    expect(particle?.shapeClose).to.be.false;
  });

  it("should load group options from a JSON string entry", async () => {
    await container.reset({
      particles: {
        groups: {
          g1: JSON.stringify({
            number: {
              value: 1,
            },
            shape: {
              type: "square",
              options: {
                square: {
                  close: false,
                },
              },
            },
          }),
        } as any,
        number: {
          value: 1,
        },
        shape: {
          type: "circle",
        },
      },
    });

    const particle = container.particles.find(current => current.group === "g1");

    expect(particle).to.be.not.undefined;
    expect(particle?.shape).to.equal("square");
    expect(particle?.shapeClose).to.be.false;
  });

  it("should keep ungrouped additions independent from group limits", async () => {
    await container.reset({
      particles: {
        groups: {
          g1: {
            number: {
              limit: {
                mode: LimitMode.wait,
                value: 2,
              },
              value: 0,
            },
          },
        },
        number: {
          limit: {
            mode: LimitMode.wait,
            value: 0,
          },
          value: 0,
        },
      },
    });

    const ungroupedParticle = container.particles.addParticle({ x: 1, y: 1 }),
      firstGroupParticle = container.particles.addParticle({ x: 2, y: 2 }, undefined, "g1"),
      secondGroupParticle = container.particles.addParticle({ x: 3, y: 3 }, undefined, "g1"),
      blockedGroupParticle = container.particles.addParticle({ x: 4, y: 4 }, undefined, "g1");

    expect(ungroupedParticle).to.be.not.undefined;
    expect(firstGroupParticle).to.be.not.undefined;
    expect(secondGroupParticle).to.be.not.undefined;
    expect(blockedGroupParticle).to.be.undefined;
    expect(countGroupParticles("g1")).to.equal(2);
    expect(countGroupParticles(undefined)).to.equal(1);
  });

  it("should remove only matching grouped particles with removeAt", () => {
    const [g1Particle1, g2Particle1, g1Particle2, g2Particle2, g1Particle3, g2Particle3] = addParticles(
      { group: "g1", position: { x: 1, y: 1, z: 0 } },
      { group: "g2", position: { x: 2, y: 2, z: 0 } },
      { group: "g1", position: { x: 3, y: 3, z: 0 } },
      { group: "g2", position: { x: 4, y: 4, z: 0 } },
      { group: "g1", position: { x: 5, y: 5, z: 0 } },
      { group: "g2", position: { x: 6, y: 6, z: 0 } },
    );

    container.particles.removeAt(0, 2, "g1");

    expect(container.particles.filter(() => true)).to.eql([g2Particle1, g2Particle2, g1Particle3, g2Particle3]);
    expect(countGroupParticles("g1")).to.equal(1);
    expect(countGroupParticles("g2")).to.equal(3);
    expect(container.particles.find(current => current === g1Particle1 || current === g1Particle2)).to.be.undefined;
  });

  it("should remove only matching grouped particles with removeQuantity", () => {
    const [g1Particle1, g2Particle1, g1Particle2, g2Particle2, g1Particle3, g2Particle3] = addParticles(
      { group: "g1", position: { x: 1, y: 1, z: 0 } },
      { group: "g2", position: { x: 2, y: 2, z: 0 } },
      { group: "g1", position: { x: 3, y: 3, z: 0 } },
      { group: "g2", position: { x: 4, y: 4, z: 0 } },
      { group: "g1", position: { x: 5, y: 5, z: 0 } },
      { group: "g2", position: { x: 6, y: 6, z: 0 } },
    );

    container.particles.removeQuantity(2, "g2");

    expect(container.particles.filter(() => true)).to.eql([g1Particle1, g1Particle2, g1Particle3, g2Particle3]);
    expect(countGroupParticles("g1")).to.equal(3);
    expect(countGroupParticles("g2")).to.equal(1);
    expect(container.particles.find(current => current === g2Particle1 || current === g2Particle2)).to.be.undefined;
  });

  it("should ignore remove calls when the group does not match", () => {
    const [groupParticle, otherParticle] = addParticles(
      { group: "g1", position: { x: 1, y: 1, z: 0 } },
      { group: "g2", position: { x: 2, y: 2, z: 0 } },
    );

    expect(groupParticle).to.be.not.undefined;

    if (!groupParticle) {
      return;
    }

    container.particles.remove(groupParticle, "g2");

    expect(container.particles.count).to.equal(2);

    container.particles.remove(groupParticle, "g1");

    expect(container.particles.count).to.equal(1);
    expect(container.particles.find(current => current === otherParticle)).to.equal(otherParticle);
  });

  it("should delete only particles from the limited group when using delete mode", async () => {
    await container.reset({
      particles: {
        groups: {
          g1: {
            number: {
              limit: {
                mode: LimitMode.delete,
                value: 2,
              },
              value: 0,
            },
          },
        },
        number: {
          limit: {
            mode: LimitMode.delete,
            value: 0,
          },
          value: 0,
        },
      },
    });

    const [ungroupedParticle, firstGroupParticle, secondGroupParticle] = addParticles(
        { position: { x: 1, y: 1, z: 0 } },
        { group: "g1", position: { x: 2, y: 2, z: 0 } },
        { group: "g1", position: { x: 3, y: 3, z: 0 } },
      ),
      firstGroupParticleId = firstGroupParticle?.id,
      replacementGroupParticle = container.particles.addParticle({ x: 4, y: 4, z: 0 }, undefined, "g1");

    expect(replacementGroupParticle).to.be.not.undefined;
    expect(container.particles.filter(() => true)).to.eql([ungroupedParticle, secondGroupParticle, replacementGroupParticle]);
    expect(replacementGroupParticle?.id).to.be.greaterThan(firstGroupParticleId ?? -1);
    expect(countGroupParticles("g1")).to.equal(2);
    expect(countGroupParticles(undefined)).to.equal(1);
  });

  it("should keep global density initialization stable in the test canvas harness", async () => {
    await container.reset({
      particles: {
        move: {
          enable: false,
        },
        number: {
          density: {
            enable: true,
            height: height / 4,
            width,
          },
          limit: {
            value: 8,
          },
          value: 2,
        },
      },
    });

    expect(container.particles.count).to.equal(2);

    container.particles.setDensity();

    expect(container.particles.count).to.equal(2);
  });

  it("should keep grouped density handling isolated from ungrouped particles in the test harness", async () => {
    await container.reset({
      particles: {
        groups: {
          g1: {
            number: {
              density: {
                enable: true,
                height: height / 4,
                width,
              },
              limit: {
                value: 4,
              },
              value: 1,
            },
          },
        },
        move: {
          enable: false,
        },
        number: {
          value: 4,
        },
      },
    });

    expect(countGroupParticles("g1")).to.equal(1);
    expect(countGroupParticles(undefined)).to.equal(3);

    container.particles.setDensity();

    expect(countGroupParticles("g1")).to.equal(1);
    expect(countGroupParticles(undefined)).to.equal(3);
  });

  it("should draw particles from higher z buckets first and update ordering when z changes", () => {
    const [particle1, particle2, particle3] = addParticles(
      { position: { x: 1, y: 1, z: 0 } },
      { position: { x: 2, y: 2, z: 1 } },
      { position: { x: 3, y: 3, z: 2 } },
    );

    expect(particle1).to.be.not.undefined;
    expect(particle2).to.be.not.undefined;
    expect(particle3).to.be.not.undefined;

    if (!particle1 || !particle2 || !particle3) {
      return;
    }

    const drawOrder: number[] = [];

    particle1.position.z = 0;
    particle2.position.z = 1;
    particle3.position.z = 2;

    container.particles.update({
      factor: 0,
      value: 0,
    });

    particle1.draw = () => {
      drawOrder.push(particle1.id);
    };
    particle2.draw = () => {
      drawOrder.push(particle2.id);
    };
    particle3.draw = () => {
      drawOrder.push(particle3.id);
    };

    container.particles.drawParticles({
      factor: 0,
      value: 0,
    });

    expect(drawOrder).to.eql([particle3.id, particle2.id, particle1.id]);

    drawOrder.length = 0;
    particle1.position.z = 3;

    container.particles.update({
      factor: 0,
      value: 0,
    });
    container.particles.drawParticles({
      factor: 0,
      value: 0,
    });

    expect(drawOrder[0]).to.equal(particle1.id);
    expect(drawOrder).to.include.members([particle1.id, particle2.id, particle3.id]);
  });
});
