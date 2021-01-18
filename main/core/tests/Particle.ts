import { expect } from "chai";
import { TestCanvas } from "./Fixture/TestCanvas";
import { TestContainer } from "./Fixture/TestContainer";
import { TestParticle } from "./Fixture/TestParticle";
import { ICoordinates } from "../src/";

const Window = require("window");

describe("Particle", () => {
    globalThis.window = new Window();

    const testContainer = new TestContainer({});
    const testParticle = new TestParticle(testContainer.container);
    const testCanvas = new TestCanvas(testContainer.container, 1920, 1080);

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
        };
        const shapeTypes = ["char", "edge", "image", "polygon"];
        const multipleShapeTypeOptions = {
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
                expect(testParticle.particle?.shape).to.equal("circle");
            });

            it("should set the shape property to square when container Particles options specifies a shape type of square", () => {
                testContainer.reset(squareShapeOptions);
                testParticle.reset(testContainer.container);

                testContainer.container.start().then(() => {
                    expect(testParticle.particle?.shape).to.equal("square");
                });
            });

            it("should choose a single shape from the specified array when container Particles options specifies an array os shape types", () => {
                testContainer.reset(multipleShapeTypeOptions);
                testParticle.reset(testContainer.container);

                testContainer.container.start().then(() => {
                    expect(testParticle.particle?.shape).to.be.a("string");
                    expect(shapeTypes).to.include(testParticle.particle?.shape);
                });
            });

            after(() => {
                testContainer.reset({});
                testParticle.reset(testContainer.container);
            });
        });

        describe("shapeData - no emitter", () => {
            it("should have undefined shapeData whenever shape data is not specified for container Particles", () => {
                expect(testParticle.particle?.shapeData).to.be.undefined;
            });

            it("should set shapeData to the square shape data configured on the container Particles", () => {
                testContainer.reset(squareShapeOptions);
                testParticle.reset(testContainer.container);

                testContainer.container.start().then(() => {
                    expect(testParticle.particle?.shapeData).to.eql(squareShapeOptions.particles.shape.options.square);
                    expect(testParticle.particle?.close).to.eql(
                        squareShapeOptions.particles.shape.options.square.close
                    );
                    expect(testParticle.particle?.fill).to.eql(squareShapeOptions.particles.shape.options.square.fill);
                });
            });

            it("should set shapeData to the configured shape data matching the chosen shape whenever multiple shapes are specified for container Particles", () => {
                testContainer.reset(multipleShapeTypeOptions);
                testParticle.reset(testContainer.container);
                testContainer.container.start().then(() => {
                    expect(testParticle.particle?.shape).to.be.a("string");
                    let expectedShapeData;
                    switch (testParticle.particle?.shape) {
                        case "char":
                            expectedShapeData = multipleShapeTypeOptions.particles.shape.options["char"];
                            break;
                        case "edge":
                            expectedShapeData = multipleShapeTypeOptions.particles.shape.options["edge"];
                            break;
                        case "image":
                            expectedShapeData = multipleShapeTypeOptions.particles.shape.options["image"];
                            break;
                        case "polygon":
                            expectedShapeData = multipleShapeTypeOptions.particles.shape.options["polygon"];
                            break;
                        default:
                            throw new Error(`Unexpected shape type "${testParticle.particle?.shape}"`);
                    }

                    expect(testParticle.particle?.close).to.eql(expectedShapeData.close);
                    expect(testParticle.particle?.fill).to.eql(expectedShapeData.fill);
                });
            });

            after(() => {
                testContainer.reset({});
                testParticle.reset(testContainer.container);
            });
        });

        it("should always set an angle in range [0,360]", () => {
            // Note, the real range should be [0,360) but the function includes 360 and it won't hurt anything
            expect(testParticle.particle?.rotate.value).to.be.at.least(-2 * Math.PI);
            expect(testParticle.particle?.rotate.value).to.be.at.most(2 * Math.PI);
        });
    });

    describe("calcPosition", () => {
        const width = 1920;
        const height = 1080;

        beforeEach(() => {
            testContainer.reset({});
            testCanvas.reset(width, height, testContainer.container);
        });

        it("should always return the position when specified", () => {
            const position: ICoordinates = testParticle.randomPositionInCanvas(testContainer.container);
            testParticle.reset(testContainer.container, position);

            expect(testParticle.particle?.position).to.eql(position);
        });

        it("should always return a position that is on the canvas when no position specified", () => {
            testParticle.reset(testContainer.container);

            expect(testParticle.particle?.position.x).to.be.at.least(0);
            expect(testParticle.particle?.position.x).to.be.at.most(width);
            expect(testParticle.particle?.position.y).to.be.at.least(0);
            expect(testParticle.particle?.position.y).to.be.at.most(height);
        });

        after(() => {
            testContainer.reset({});
            testParticle.reset(testContainer.container);
        });
    });
});
