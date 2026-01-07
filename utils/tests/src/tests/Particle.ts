/* eslint-disable @typescript-eslint/no-magic-numbers,@typescript-eslint/no-unused-expressions */
import { type ICoordinates, calcExactPositionOrRandomFromSize, tsParticles } from "@tsparticles/engine";
import { afterAll, beforeEach, describe, expect, it } from "vitest";
import { TestWindow } from "../Fixture/Window.js";
import { createCustomCanvas } from "../Fixture/CustomCanvas.js";

const width = 1920,
    height = 1080;

describe("Particle", async () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    globalThis.window = TestWindow;

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-explicit-any
    const canvas = createCustomCanvas(width, height) as any;

    const container = await tsParticles.load({
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
                expect(particle?.shapeFill).to.eql(squareShapeOptions.particles.shape.options.square.fill);
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
                expect(particle.shapeFill).to.eql(expectedShapeData.fill);
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
});
