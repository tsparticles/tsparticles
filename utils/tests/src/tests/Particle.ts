/* eslint-disable @typescript-eslint/no-magic-numbers,@typescript-eslint/no-unused-expressions */
import {
  type ICoordinates,
  type IEffectDrawer,
  type IShapeDrawer,
  OutMode,
  OutModeDirection,
  calcExactPositionOrRandomFromSize,
  tsParticles,
} from "@tsparticles/engine";
import { afterAll, beforeEach, describe, expect, it } from "vitest";
import { TestWindow } from "../Fixture/Window.js";
import { createCustomCanvas } from "../Fixture/CustomCanvas.js";

const width = 1920,
  height = 1080;

describe("Particle", async () => {
  globalThis.window = TestWindow;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-explicit-any
  const canvas = createCustomCanvas(width, height) as any,
    container = await tsParticles.load({
      id: "test-particle",
      options: {
        autoPlay: false,
      },
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      element: canvas,
    });

  if (!container) {
    throw new Error("test container not initialized");
  }

  describe("constructor/initialization", () => {
    const squareShapeOptions = {
        particles: {
          shape: {
            type: "square",
            options: {
              square: { close: true, fill: false },
              circle: { close: false, fill: true },
            },
          },
        },
      },
      shapeTypes = ["char", "edge", "image", "polygon"],
      multipleShapeTypeOptions = {
        particles: {
          shape: {
            type: shapeTypes,
            options: {
              char: { close: true, fill: true },
              edge: { close: true, fill: false },
              image: { close: false, fill: true },
              polygon: { close: false, fill: false },
            },
          },
        },
      };

    describe("shape - no emitter", () => {
      it("should set the shape property to circle when default Particles options are used", () => {
        const particle = container.particles.addParticle();

        expect(particle?.shape).to.equal("circle");
      });

      it("should set the shape property to square when container Particles options specifies a shape type of square", async () => {
        await container.reset(squareShapeOptions);

        const particle = container.particles.addParticle();

        expect(particle?.shape).to.equal("square");
      });

      it("should choose a single shape from the specified array when container Particles options specifies an array of shape types", async () => {
        await container.reset(multipleShapeTypeOptions);

        const particle = container.particles.addParticle();

        expect(particle?.shape).to.be.a("string");
        expect(shapeTypes).to.include(particle?.shape);
      });

      afterAll(async () => {
        await container.reset();
      });
    });

    describe("shapeData - no emitter", () => {
      it("should have undefined shapeData whenever shape data is not specified for container Particles", () => {
        const particle = container.particles.find(() => true);

        expect(particle?.shapeData).to.be.undefined;
      });

      it("should set shapeData to the square shape data configured on the container Particles", async () => {
        await container.reset(squareShapeOptions);

        const particle = container.particles.addParticle();

        expect(particle?.shapeData).to.eql(squareShapeOptions.particles.shape.options.square);
        expect(particle?.shapeClose).to.eql(squareShapeOptions.particles.shape.options.square.close);
      });

      it("should set shapeData to the configured shape data matching the chosen shape whenever multiple shapes are specified for container Particles", async () => {
        await container.reset(multipleShapeTypeOptions);

        const particle = container.particles.addParticle();

        expect(particle?.shape).to.be.a("string");

        let expectedShapeData;

        switch (particle?.shape) {
          case "char":
            expectedShapeData = multipleShapeTypeOptions.particles.shape.options.char;
            break;
          case "edge":
            expectedShapeData = multipleShapeTypeOptions.particles.shape.options.edge;
            break;
          case "image":
            expectedShapeData = multipleShapeTypeOptions.particles.shape.options.image;
            break;
          case "polygon":
            expectedShapeData = multipleShapeTypeOptions.particles.shape.options.polygon;
            break;
          default:
            throw new Error(`Unexpected shape type "${particle?.shape ?? ""}"`);
        }

        expect(particle.shapeClose).to.eql(expectedShapeData.close);
      });

      afterAll(async () => {
        await container.reset();
      });
    });
  });

  describe("calcPosition", () => {
    beforeEach(async () => {
      await container.reset();
    });

    it("should always return the position when specified", () => {
      const position: ICoordinates = calcExactPositionOrRandomFromSize({
          size: { width, height },
        }),
        particle = container.particles.addParticle(position);

      expect(particle).to.be.not.undefined;

      if (!particle) {
        return;
      }

      expect(particle.position.x).to.be.equal(position.x);
      expect(particle.position.y).to.be.equal(position.y);
    });

    it("should always return a position that is on the canvas when no position specified", () => {
      const particle = container.particles.addParticle();

      expect(particle).to.be.not.undefined;

      if (!particle) {
        return;
      }

      expect(particle.position.x).to.be.at.least(0);
      expect(particle.position.x).to.be.at.most(width);
      expect(particle.position.y).to.be.at.least(0);
      expect(particle.position.y).to.be.at.most(height);
    });

    afterAll(async () => {
      await container.reset();
    });
  });

  describe("canvas bounds ownership", () => {
    const pluginManager = tsParticles.pluginManager,
      defaultOptions = {
        particles: {
          effect: {
            type: "none",
          },
          move: {
            enable: false,
          },
          number: {
            value: 0,
          },
          shape: {
            type: "bounds-default-shape",
          },
          size: {
            value: 8,
          },
        },
      },
      outsidePosition = {
        x: -100,
        y: height * 0.5,
      },
      shapeDrawerDefault: IShapeDrawer = {
        draw: () => {
          // no-op
        },
      },
      shapeDrawerInside: IShapeDrawer = {
        draw: () => {
          // no-op
        },
        isInsideCanvas: () => true,
      },
      shapeDrawerOutside: IShapeDrawer = {
        draw: () => {
          // no-op
        },
        isInsideCanvas: () => false,
      },
      effectDrawerInside: IEffectDrawer = {
        isInsideCanvas: () => true,
      },
      effectDrawerOutside: IEffectDrawer = {
        isInsideCanvas: () => false,
      },
      effectDrawerOutModeAware: IEffectDrawer = {
        isInsideCanvas: data => {
          return data.outMode !== OutMode.destroy;
        },
      },
      shapeDrawerOutModeAware: IShapeDrawer = {
        draw: () => {
          // no-op
        },
        isInsideCanvas: data => {
          return data.outMode !== OutMode.destroy;
        },
      };

    pluginManager.addShape(["bounds-default-shape"], () => Promise.resolve(shapeDrawerDefault));
    pluginManager.addShape(["bounds-shape-inside"], () => Promise.resolve(shapeDrawerInside));
    pluginManager.addShape(["bounds-shape-outside"], () => Promise.resolve(shapeDrawerOutside));
    pluginManager.addShape(["bounds-shape-out-mode-aware"], () => Promise.resolve(shapeDrawerOutModeAware));
    pluginManager.addEffect("bounds-effect-inside", () => Promise.resolve(effectDrawerInside));
    pluginManager.addEffect("bounds-effect-outside", () => Promise.resolve(effectDrawerOutside));
    pluginManager.addEffect("bounds-effect-out-mode-aware", () => Promise.resolve(effectDrawerOutModeAware));

    it("should use default radius-based bounds when no callbacks are defined", async () => {
      await container.reset(defaultOptions);

      const particle = container.particles.addParticle({
        x: width * 0.5,
        y: height * 0.5,
      });

      expect(particle).to.be.not.undefined;

      if (!particle) {
        return;
      }

      particle.position.x = outsidePosition.x;
      particle.position.y = outsidePosition.y;

      expect(particle.isInsideCanvas()).to.be.false;
      expect(particle.isInsideCanvas(OutModeDirection.right)).to.be.true;
    });

    it("should use shape callback when only shape implements bounds", async () => {
      await container.reset({
        particles: {
          ...defaultOptions.particles,
          shape: {
            type: "bounds-shape-inside",
          },
        },
      });

      const particle = container.particles.addParticle({
        x: width * 0.5,
        y: height * 0.5,
      });

      expect(particle).to.be.not.undefined;

      if (!particle) {
        return;
      }

      particle.position.x = outsidePosition.x;
      particle.position.y = outsidePosition.y;

      expect(particle.isInsideCanvas()).to.be.true;
      expect(particle.isInsideCanvas(OutModeDirection.left)).to.be.true;
    });

    it("should use effect callback when only effect implements bounds", async () => {
      await container.reset({
        particles: {
          ...defaultOptions.particles,
          effect: {
            type: "bounds-effect-inside",
          },
        },
      });

      const particle = container.particles.addParticle({
        x: width * 0.5,
        y: height * 0.5,
      });

      expect(particle).to.be.not.undefined;

      if (!particle) {
        return;
      }

      particle.position.x = outsidePosition.x;
      particle.position.y = outsidePosition.y;

      expect(particle.isInsideCanvas()).to.be.true;
      expect(particle.isInsideCanvas(OutModeDirection.left)).to.be.true;
    });

    it("should combine shape and effect callbacks with AND policy", async () => {
      await container.reset({
        particles: {
          ...defaultOptions.particles,
          effect: {
            type: "bounds-effect-outside",
          },
          shape: {
            type: "bounds-shape-inside",
          },
        },
      });

      const particle = container.particles.addParticle({
        x: width * 0.5,
        y: height * 0.5,
      });

      expect(particle).to.be.not.undefined;

      if (!particle) {
        return;
      }

      expect(particle.isInsideCanvas()).to.be.false;
      expect(particle.isInsideCanvas(OutModeDirection.bottom)).to.be.false;
    });

    it("should combine shape and effect callbacks with AND policy when shape is false", async () => {
      await container.reset({
        particles: {
          ...defaultOptions.particles,
          effect: {
            type: "bounds-effect-inside",
          },
          shape: {
            type: "bounds-shape-outside",
          },
        },
      });

      const particle = container.particles.addParticle({
        x: width * 0.5,
        y: height * 0.5,
      });

      expect(particle).to.be.not.undefined;

      if (!particle) {
        return;
      }

      expect(particle.isInsideCanvas()).to.be.false;
      expect(particle.isInsideCanvas(OutModeDirection.top)).to.be.false;
    });

    it("should pass out mode to callbacks for strategy-aware bounds", async () => {
      await container.reset({
        particles: {
          ...defaultOptions.particles,
          effect: {
            type: "bounds-effect-out-mode-aware",
          },
        },
      });

      const particle = container.particles.addParticle({
        x: width * 0.5,
        y: height * 0.5,
      });

      expect(particle).to.be.not.undefined;

      if (!particle) {
        return;
      }

      expect(particle.isInsideCanvas()).to.be.true;
      expect(particle.isInsideCanvasForOutMode(OutMode.out, OutModeDirection.left)).to.be.true;
      expect(particle.isInsideCanvasForOutMode(OutMode.destroy, OutModeDirection.left)).to.be.false;
    });

    it("should pass out mode to shape callbacks for strategy-aware bounds", async () => {
      await container.reset({
        particles: {
          ...defaultOptions.particles,
          shape: {
            type: "bounds-shape-out-mode-aware",
          },
        },
      });

      const particle = container.particles.addParticle({
        x: width * 0.5,
        y: height * 0.5,
      });

      expect(particle).to.be.not.undefined;

      if (!particle) {
        return;
      }

      expect(particle.isInsideCanvas()).to.be.true;
      expect(particle.isInsideCanvasForOutMode(OutMode.out, OutModeDirection.top)).to.be.true;
      expect(particle.isInsideCanvasForOutMode(OutMode.destroy, OutModeDirection.top)).to.be.false;
    });

    afterAll(async () => {
      await container.reset();
    });
  });
});
