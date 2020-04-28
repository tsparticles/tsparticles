const Window = require('window');

globalThis.window = new Window();

import { expect } from "chai";
import { TestContainer } from "./Fixture/TestContainer";
import { TestParticle } from "./Fixture/TestParticle";
import { ShapeType } from "../src/Enums/ShapeType";
import { ShapeData } from "../src/Types/ShapeData";

const testContainer = new TestContainer({});
const testParticle = new TestParticle(testContainer.container);

describe('Particle', () => {

    describe('constructor/initialization', () => {
        const squareShapeOptions = {
            particles: {
                shape: {
                    type: ShapeType.square,
                    options: {
                        square: { close: true, fill: false },
                        circle: { close: false, fill: true }
                    }
                }
            }
        };
        const shapeTypes = [ShapeType.char, ShapeType.edge, ShapeType.image, ShapeType.polygon];
        const multipleShapeTypeOptions = {
            particles: {
                shape: {
                    type: shapeTypes,
                    options: {
                        char: { close: true, fill: true },
                        edge: { close: true, fill: false },
                        image: { close: false, fill: true },
                        polygon: { close: false, fill: false }
                    }
                }
            }
        };

        describe('shape - no emitter', () => {

            it('should set the shape property to circle when default Particles options are used', () => {
                expect(testParticle.particle.shape).to.equal(ShapeType.circle);
            });

            it('should set the shape property to square when container Particles options specifies a shape type of square', () => {
                testContainer.reset(squareShapeOptions);
                testParticle.reset(testContainer.container);

                expect(testParticle.particle.shape).to.equal(ShapeType.square);
            });

            it('should choose a single shape from the specified array when container Particles options specifies an array os shape types', () => {
                testContainer.reset(multipleShapeTypeOptions);
                testParticle.reset(testContainer.container);

                expect(testParticle.particle.shape).to.be.a('string');
                expect(shapeTypes).to.include(testParticle.particle.shape);
            });

            after(() => {
                testContainer.reset({});
                testParticle.reset(testContainer.container);
            });
        });

        describe('shapeData - no emitter', () => {
            it('should have undefined shapeData whenever shape data is not specified for container Particles', () => {
                expect(testParticle.particle.shapeData).to.be.undefined;
            });

            it('should set shapeData to the square shape data configured on the container Particles', () => {
                testContainer.reset(squareShapeOptions);
                testParticle.reset(testContainer.container);

                expect(testParticle.particle.shapeData).to.eql(squareShapeOptions.particles.shape.options.square);
            });

            it('should set shapeData to the configured shape data matching the chosen shape whenever multiple shapes are specified for container Particles', () => {
                testContainer.reset(multipleShapeTypeOptions);
                testParticle.reset(testContainer.container);
                expect(testParticle.particle.shape).to.be.a('string');
                const chosenShape = testParticle.particle.shape;
                let expectedShapeData;
                switch(testParticle.particle.shape) {
                    case(ShapeType.char):
                        expectedShapeData = multipleShapeTypeOptions.particles.shape.options[ShapeType.char];
                        break;
                    case(ShapeType.edge):
                        expectedShapeData = multipleShapeTypeOptions.particles.shape.options[ShapeType.edge];
                        break;
                    case(ShapeType.image):
                        expectedShapeData = multipleShapeTypeOptions.particles.shape.options[ShapeType.image];
                        break;
                    case(ShapeType.polygon):
                        expectedShapeData = multipleShapeTypeOptions.particles.shape.options[ShapeType.polygon];
                        break;
                    default:
                        throw new Error(`Unexpected shape type "${testParticle.particle.shape}"`);
                }

                expect(testParticle.particle.shapeData).to.eql(expectedShapeData);
            });

        });

    });

});