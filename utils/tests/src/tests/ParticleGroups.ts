import { LimitMode, type ICoordinates3d, type IDelta, tsParticles } from "@tsparticles/engine";
import type { Canvas } from "canvas";
import { beforeEach, describe, expect, it } from "vitest";

import { createCustomCanvas } from "../Fixture/CustomCanvas.js";
import { TestWindow } from "../Fixture/Window.js";

type TestCanvas = Canvas & HTMLCanvasElement;

/* eslint-disable @typescript-eslint/no-magic-numbers -- shared numeric test fixtures */
const minusOne = -1,
  zero = 0,
  one = 1,
  two = 2,
  three = 3,
  four = 4,
  five = 5,
  six = 6,
  eight = 8,
  width = 1920,
  height = 1080;
/* eslint-enable @typescript-eslint/no-magic-numbers */

const zeroDelta: IDelta = {
    factor: zero,
    value: zero,
  },
  createPosition = (value: number, z = zero): ICoordinates3d => ({
    x: value,
    y: value,
    z,
  });

describe("ParticleGroups", async () => {
  globalThis.window = TestWindow;

  const canvas = createCustomCanvas(width, height) as unknown as TestCanvas,
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
          value: zero,
        },
      },
    });
  });

  it("should assign the requested group when adding a particle", () => {
    const particle = container.particles.addParticle(undefined, undefined, "g1");

    expect(particle).to.be.not.undefined;
    expect(particle?.group).to.equal("g1");
    expect(container.particles.count).to.equal(one);
    expect(countGroupParticles("g1")).to.equal(one);
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
              value: three,
            },
          },
          g2: {
            number: {
              value: two,
            },
          },
        },
        number: {
          value: eight,
        },
      },
    });

    expect(container.particles.count).to.equal(eight);
    expect(countGroupParticles("g1")).to.equal(three);
    expect(countGroupParticles("g2")).to.equal(two);
    expect(countGroupParticles(undefined)).to.equal(three);
  });

  it("should apply group override options during initialization", async () => {
    await container.reset({
      particles: {
        groups: {
          g1: {
            number: {
              value: one,
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
          value: one,
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
                value: two,
              },
              value: zero,
            },
          },
        },
        number: {
          limit: {
            mode: LimitMode.wait,
            value: zero,
          },
          value: zero,
        },
      },
    });

    const ungroupedParticle = container.particles.addParticle(createPosition(one)),
      firstGroupParticle = container.particles.addParticle(createPosition(two), undefined, "g1"),
      secondGroupParticle = container.particles.addParticle(createPosition(three), undefined, "g1"),
      blockedGroupParticle = container.particles.addParticle(createPosition(four), undefined, "g1");

    expect(ungroupedParticle).to.be.not.undefined;
    expect(firstGroupParticle).to.be.not.undefined;
    expect(secondGroupParticle).to.be.not.undefined;
    expect(blockedGroupParticle).to.be.undefined;
    expect(countGroupParticles("g1")).to.equal(two);
    expect(countGroupParticles(undefined)).to.equal(one);
  });

  it("should not apply the global limit to groups with an explicit zero limit", async () => {
    await container.reset({
      particles: {
        groups: {
          g1: {
            number: {
              limit: {
                mode: LimitMode.wait,
                value: zero,
              },
              value: zero,
            },
          },
        },
        number: {
          limit: {
            mode: LimitMode.wait,
            value: one,
          },
          value: zero,
        },
      },
    });

    const firstGroupParticle = container.particles.addParticle(createPosition(one), undefined, "g1"),
      secondGroupParticle = container.particles.addParticle(createPosition(two), undefined, "g1");

    expect(firstGroupParticle).to.be.not.undefined;
    expect(secondGroupParticle).to.be.not.undefined;
    expect(countGroupParticles("g1")).to.equal(two);
  });

  it("should keep the global density limit fallback when the group limit is omitted", async () => {
    await container.reset({
      particles: {
        groups: {
          g1: {
            number: {
              density: {
                enable: true,
                height,
                width,
              },
              value: zero,
            },
          },
        },
        number: {
          density: {
            enable: true,
            height,
            width,
          },
          limit: {
            mode: LimitMode.wait,
            value: one,
          },
          value: zero,
        },
      },
    });

    const firstGroupParticle = container.particles.addParticle(createPosition(one), undefined, "g1"),
      blockedGroupParticle = container.particles.addParticle(createPosition(two), undefined, "g1");

    expect(firstGroupParticle).to.be.not.undefined;
    expect(blockedGroupParticle).to.be.undefined;
    expect(countGroupParticles("g1")).to.equal(one);
  });

  it("should remove only matching grouped particles with removeAt", () => {
    const [g1Particle1, g2Particle1, g1Particle2, g2Particle2, g1Particle3, g2Particle3] = addParticles(
      { group: "g1", position: createPosition(one) },
      { group: "g2", position: createPosition(two) },
      { group: "g1", position: createPosition(three) },
      { group: "g2", position: createPosition(four) },
      { group: "g1", position: createPosition(five) },
      { group: "g2", position: createPosition(six) },
    );

    container.particles.removeAt(zero, two, "g1");

    expect(container.particles.filter(() => true)).to.eql([g2Particle1, g2Particle2, g1Particle3, g2Particle3]);
    expect(countGroupParticles("g1")).to.equal(one);
    expect(countGroupParticles("g2")).to.equal(three);
    expect(container.particles.find(current => current === g1Particle1 || current === g1Particle2)).to.be.undefined;
  });

  it("should remove only matching grouped particles with removeQuantity", () => {
    const [g1Particle1, g2Particle1, g1Particle2, g2Particle2, g1Particle3, g2Particle3] = addParticles(
      { group: "g1", position: createPosition(one) },
      { group: "g2", position: createPosition(two) },
      { group: "g1", position: createPosition(three) },
      { group: "g2", position: createPosition(four) },
      { group: "g1", position: createPosition(five) },
      { group: "g2", position: createPosition(six) },
    );

    container.particles.removeQuantity(two, "g2");

    expect(container.particles.filter(() => true)).to.eql([g1Particle1, g1Particle2, g1Particle3, g2Particle3]);
    expect(countGroupParticles("g1")).to.equal(three);
    expect(countGroupParticles("g2")).to.equal(one);
    expect(container.particles.find(current => current === g2Particle1 || current === g2Particle2)).to.be.undefined;
  });

  it("should update group limits after removing grouped particles without a group filter", async () => {
    await container.reset({
      particles: {
        groups: {
          g1: {
            number: {
              limit: {
                mode: LimitMode.wait,
                value: one,
              },
              value: zero,
            },
          },
        },
        number: {
          value: zero,
        },
      },
    });

    const firstParticle = container.particles.addParticle(createPosition(one), undefined, "g1");

    expect(firstParticle).to.be.not.undefined;
    expect(countGroupParticles("g1")).to.equal(one);

    container.particles.removeAt(zero);

    expect(countGroupParticles("g1")).to.equal(zero);
    expect(container.particles.addParticle(createPosition(two), undefined, "g1")).to.be.not.undefined;
    expect(countGroupParticles("g1")).to.equal(one);
  });

  it("should ignore remove calls when the group does not match", () => {
    const [groupParticle, otherParticle] = addParticles(
      { group: "g1", position: createPosition(one) },
      { group: "g2", position: createPosition(two) },
    );

    expect(groupParticle).to.be.not.undefined;

    if (!groupParticle) {
      return;
    }

    container.particles.remove(groupParticle, "g2");

    expect(container.particles.count).to.equal(two);

    container.particles.remove(groupParticle, "g1");

    expect(container.particles.count).to.equal(one);
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
                value: two,
              },
              value: zero,
            },
          },
        },
        number: {
          limit: {
            mode: LimitMode.delete,
            value: zero,
          },
          value: zero,
        },
      },
    });

    const [ungroupedParticle, firstGroupParticle, secondGroupParticle] = addParticles(
        { position: createPosition(one) },
        { group: "g1", position: createPosition(two) },
        { group: "g1", position: createPosition(three) },
      ),
      firstGroupParticleId = firstGroupParticle?.id,
      replacementGroupParticle = container.particles.addParticle(createPosition(four), undefined, "g1");

    expect(replacementGroupParticle).to.be.not.undefined;
    expect(container.particles.filter(() => true)).to.eql([ungroupedParticle, secondGroupParticle, replacementGroupParticle]);
    expect(replacementGroupParticle?.id).to.be.greaterThan(firstGroupParticleId ?? minusOne);
    expect(countGroupParticles("g1")).to.equal(two);
    expect(countGroupParticles(undefined)).to.equal(one);
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
            height,
            width,
          },
          limit: {
            value: eight,
          },
          value: two,
        },
      },
    });

    expect(container.particles.count).to.equal(two);

    container.particles.setDensity();

    expect(container.particles.count).to.equal(two);
  });

  it("should keep grouped density handling isolated from ungrouped particles in the test harness", async () => {
    await container.reset({
      particles: {
        groups: {
          g1: {
            number: {
              density: {
                enable: true,
                height: height / four,
                width,
              },
              limit: {
                value: four,
              },
              value: one,
            },
          },
        },
        move: {
          enable: false,
        },
        number: {
          value: four,
        },
      },
    });

    expect(countGroupParticles("g1")).to.equal(one);
    expect(countGroupParticles(undefined)).to.equal(three);

    container.particles.setDensity();

    expect(countGroupParticles("g1")).to.equal(one);
    expect(countGroupParticles(undefined)).to.equal(three);
  });

  it("should draw particles from higher z buckets first and update ordering when z changes", () => {
    const [particle1, particle2, particle3] = addParticles(
      { position: createPosition(one) },
      { position: createPosition(two, one) },
      { position: createPosition(three, two) },
    );

    expect(particle1).to.be.not.undefined;
    expect(particle2).to.be.not.undefined;
    expect(particle3).to.be.not.undefined;

    if (!particle1 || !particle2 || !particle3) {
      return;
    }

    const drawOrder: number[] = [];

    particle1.position.z = zero;
    particle2.position.z = one;
    particle3.position.z = two;

    container.particles.update(zeroDelta);

    particle1.draw = () => {
      drawOrder.push(particle1.id);
    };
    particle2.draw = () => {
      drawOrder.push(particle2.id);
    };
    particle3.draw = () => {
      drawOrder.push(particle3.id);
    };

    container.particles.drawParticles(zeroDelta);

    expect(drawOrder).to.eql([particle3.id, particle2.id, particle1.id]);

    drawOrder.length = zero;
    particle1.position.z = three;

    container.particles.update(zeroDelta);
    container.particles.drawParticles(zeroDelta);

    expect(drawOrder[zero]).to.equal(particle1.id);
    expect(drawOrder).to.include.members([particle1.id, particle2.id, particle3.id]);
  });
});
