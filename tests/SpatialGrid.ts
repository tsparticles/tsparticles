const Window = require('window');

globalThis.window = new Window();

import { expect } from "chai";
import { Particle } from "../src/Core/Particle";
import { TestContainer } from "./Fixture/TestContainer";
import { TestParticle } from "./Fixture/TestParticle";
import { TestSpatialGrid } from "./Fixture/TestSpatialGrid";
import { Utils } from "../src/Utils/Utils";

const testContainer = new TestContainer();
const particle1 = new Particle(testContainer.container, { x: 1, y: 1 });
const particle2 = new Particle(testContainer.container, { x: 2, y: 2 });
const particle3 = new Particle(testContainer.container, { x: 3, y: 3 });
const particle4 = new Particle(testContainer.container, { x: 768, y: 240 });

const mainResolution = { width: 1920, height: 1200 };
const testSpatialGrid = new TestSpatialGrid(mainResolution);

describe('SpatialGrid', () => {

    describe('queryInCell', () => {
        // Setup grid and initial particles
        const spatialGrid = testSpatialGrid.spatialGrid;
        spatialGrid.setGrid([ particle1, particle2, particle3, particle4 ]);

        const topLeftCellExtent = { xmin: 0, xmax: 47, ymin: 0, ymax: 29 };
        const particle4CellExtent = { xmin: 720, xmax: 815, ymin: 210, ymax: 269 }

        it('should return particles 1, 2, and 3 when position is random in top left corner grid', () => {
            const extent = topLeftCellExtent;
            const position = {
                x: Utils.randomInRange(extent.xmin, extent.xmax),
                y: Utils.randomInRange(extent.ymin, extent.ymax)
            };
            const particles = spatialGrid.queryInCell(position);
            const positions = TestParticle.sortedPositions(particles);
            expect(
                positions,
                `Failed for position {x: ${position.x}, y: ${position.y}}`
            ).to.eql([ particle1.position, particle2.position, particle3.position ]);
        });

        it('should return particles 1, 2, and 3 when position is on upper left corner of top left grid', () => {
            const extent = topLeftCellExtent;
            const position = { x: extent.xmin, y: extent.ymin };
            const particles = spatialGrid.queryInCell(position);
            const positions = TestParticle.sortedPositions(particles);
            expect(positions).to.eql([ particle1.position, particle2.position, particle3.position ]);
        });

        it('should return particles 1, 2, and 3 when position is on lower left corner of top left grid', () => {
            const extent = topLeftCellExtent;
            const position = { x: extent.xmin, y: extent.ymax };
            const particles = spatialGrid.queryInCell(position);
            const positions = TestParticle.sortedPositions(particles);
            expect(positions).to.eql([ particle1.position, particle2.position, particle3.position ]);
        });

        it('should return particles 1, 2, and 3 when position is on upper right corner of top left grid', () => {
            const extent = topLeftCellExtent;
            const position = { x: extent.xmax, y: extent.ymin };
            const particles = spatialGrid.queryInCell(position);
            const positions = TestParticle.sortedPositions(particles);
            expect(positions).to.eql([ particle1.position, particle2.position, particle3.position ]);
        });

        it('should return particles 1, 2, and 3 when position is on lower right corner of top left grid', () => {
            const extent = topLeftCellExtent;
            const position = { x: extent.xmax, y: extent.ymax };
            const particles = spatialGrid.queryInCell(position);
            const positions = TestParticle.sortedPositions(particles);
            expect(positions).to.eql([ particle1.position, particle2.position, particle3.position ]);
        });

        it('should return particle 4 when position is random in same grid as particle 4', () => {
            const extent = particle4CellExtent;
            const position = {
                x: Utils.randomInRange(extent.xmin, extent.xmax),
                y: Utils.randomInRange(extent.ymin, extent.ymax)
            };
            const particles = spatialGrid.queryInCell(position);
            const positions = TestParticle.sortedPositions(particles);
            expect(
                positions,
                `Failed for position {x: ${position.x}, y: ${position.y}}`
            ).to.eql([ particle4.position ]);
        });

        it('should return particle 4 when position is on upper left corner of grid containing particle 4', () => {
            const extent = particle4CellExtent;
            const position = { x: extent.xmin, y: extent.ymin };
            const particles = spatialGrid.queryInCell(position);
            const positions = TestParticle.sortedPositions(particles);
            expect(positions).to.eql([ particle4.position ]);
        });

        it('should return particle 4 when position is on lower left corner of grid containing particle 4', () => {
            const extent = particle4CellExtent;
            const position = { x: extent.xmin, y: extent.ymax };
            const particles = spatialGrid.queryInCell(position);
            const positions = TestParticle.sortedPositions(particles);
            expect(positions).to.eql([ particle4.position ]);
        });

        it('should return particle 4 when position is on upper right corner of grid containing particle 4', () => {
            const extent = particle4CellExtent;
            const position = { x: extent.xmax, y: extent.ymin };
            const particles = spatialGrid.queryInCell(position);
            const positions = TestParticle.sortedPositions(particles);
            expect(positions).to.eql([ particle4.position ]);
        });

        it('should return particle 4 when position is on lower right corner of grid containing particle 4', () => {
            const extent = particle4CellExtent;
            const position = { x: extent.xmax, y: extent.ymax };
            const particles = spatialGrid.queryInCell(position);
            const positions = TestParticle.sortedPositions(particles);
            expect(positions).to.eql([ particle4.position ]);
        });

    });

    describe('queryRadius', () => {
        testSpatialGrid.reset();
        const spatialGrid = testSpatialGrid.spatialGrid;
        spatialGrid.setGrid([ particle1, particle2, particle3, particle4 ]);

        const origin = { x: 0, y: 0 };
        const center = { x: mainResolution.width / 2, y: mainResolution.height / 2 };

        it('should return empty array when position is origin and radius is less than square root of 2', () => {
            const particles = spatialGrid.queryRadius(origin, 1);
            const positions = TestParticle.sortedPositions(particles);
            expect(positions).to.eql([]);
        });

        it('should return particle 1 when position is origin and radius is between 1 and 2 square roots of 2', () => {
            const particles = spatialGrid.queryRadius(origin, 2);
            const positions = TestParticle.sortedPositions(particles);
            expect(positions).to.eql([ particle1.position ]);
        });

        it('should return particles 1 and 2 when position is origin and radius is between 2 and 3 square roots of 2', () => {
            const particles = spatialGrid.queryRadius(origin, 3);
            const positions = TestParticle.sortedPositions(particles);
            expect(positions).to.eql([ particle1.position, particle2.position ]);
        });

        it('should return particles 1, 2, and 3 when position is origin and radius is between 3 and 4 square roots of 2', () => {
            const particles = spatialGrid.queryRadius(origin, 5);
            const positions = TestParticle.sortedPositions(particles);
            expect(positions).to.eql([ particle1.position, particle2.position, particle3.position ]);
        });

        it('should return empty array when position is center of screen and radius does not cross particle 4', () => {
            // True distance to particle 4 is 408
            const particles = spatialGrid.queryRadius(center, 407)
            const positions = TestParticle.sortedPositions(particles);
            expect(positions).to.eql([]);
        });

        it('should return particle 4 when position is center of screen and radius does cross particle 4', () => {
            // True distance to particle 4 is 408
            const particles = spatialGrid.queryRadius(center, 409)
            const positions = TestParticle.sortedPositions(particles);
            expect(positions).to.eql([ particle4.position ]);
        });

        it('should return all particles when position is center of screen and radius passes edges', () => {
            const particles = spatialGrid.queryRadius(center, 2000)
            const positions = TestParticle.sortedPositions(particles);
            expect(positions).to.eql([
                particle1.position,
                particle2.position,
                particle3.position,
                particle4.position
            ]);
        });

    });

    describe('queryRadiusWithDistance', () => {
        testSpatialGrid.reset();
        const spatialGrid = testSpatialGrid.spatialGrid;
        spatialGrid.setGrid([ particle1, particle2, particle3, particle4 ]);

        const origin = { x: 0, y: 0 };
        const center = { x: mainResolution.width / 2, y: mainResolution.height / 2 };
        const tolerance = 1e-10;

        it('should return empty array when position is origin and radius is less than square root of 2', () => {
            const particlesWithDistances = spatialGrid.queryRadiusWithDistance(origin, 1);
            const positionsWithDistances = TestParticle.sortedPositionsWithDistances(particlesWithDistances);
            expect(positionsWithDistances).to.eql([]);
        });

        it('should return particle 1 with distance when position is origin and radius is between 1 and 2 square roots of 2', () => {
            const particlesWithDistances = spatialGrid.queryRadiusWithDistance(origin, 2);
            const positionsWithDistances = TestParticle.sortedPositionsWithDistances(particlesWithDistances);
            const expectedPositionsWithDistances = [ { dist: Math.SQRT2, position: particle1.position } ];

            const actualPositions = positionsWithDistances.map(positionWithDistance => positionWithDistance.position);
            const expectedPositions = expectedPositionsWithDistances.map(positionWithDistance => positionWithDistance.position);
            const actualDistances = positionsWithDistances.map(positionWithDistance => positionWithDistance.distance);
            const expectedDistances = positionsWithDistances.map(positionWithDistance => positionWithDistance.distance);

            // Long convoluted test required because there is no native way to provide a tolerance for deep equals in chai
            expect(actualPositions).to.eql(expectedPositions);
            expect(actualDistances.length).to.equal(expectedDistances.length);
            for (let i = 0; i < actualDistances.length; i++) {
                expect(actualDistances[i]).to.be.closeTo(expectedDistances[i], tolerance);
            }
        });

        it('should return particles 1 and 2 with distance when position is origin and radius is between 2 and 3 square roots of 2', () => {
            const particlesWithDistances = spatialGrid.queryRadiusWithDistance(origin, 3);
            const positionsWithDistances = TestParticle.sortedPositionsWithDistances(particlesWithDistances);
            const expectedPositionsWithDistances = [
                { dist: Math.SQRT2, position: particle1.position },
                { dist: 2 * Math.SQRT2, position: particle2.position }
            ];

            const actualPositions = positionsWithDistances.map(positionWithDistance => positionWithDistance.position);
            const expectedPositions = expectedPositionsWithDistances.map(positionWithDistance => positionWithDistance.position);
            const actualDistances = positionsWithDistances.map(positionWithDistance => positionWithDistance.distance);
            const expectedDistances = positionsWithDistances.map(positionWithDistance => positionWithDistance.distance);

            // Long convoluted test required because there is no native way to provide a tolerance for deep equals in chai
            expect(actualPositions).to.eql(expectedPositions);
            expect(actualDistances.length).to.equal(expectedDistances.length);
            for (let i = 0; i < actualDistances.length; i++) {
                expect(actualDistances[i]).to.be.closeTo(expectedDistances[i], tolerance);
            }
        });

        it('should return particles 1, 2, and 3 with distance when position is origin and radius is between 3 and 4 square roots of 2', () => {
            const particlesWithDistances = spatialGrid.queryRadiusWithDistance(origin, 5);
            const positionsWithDistances = TestParticle.sortedPositionsWithDistances(particlesWithDistances);
            const expectedPositionsWithDistances = [
                { dist: Math.SQRT2, position: particle1.position },
                { dist: 2 * Math.SQRT2, position: particle2.position },
                { dist: 3 * Math.SQRT2, position: particle3.position }
            ];

            const actualPositions = positionsWithDistances.map(positionWithDistance => positionWithDistance.position);
            const expectedPositions = expectedPositionsWithDistances.map(positionWithDistance => positionWithDistance.position);
            const actualDistances = positionsWithDistances.map(positionWithDistance => positionWithDistance.distance);
            const expectedDistances = positionsWithDistances.map(positionWithDistance => positionWithDistance.distance);

            // Long convoluted test required because there is no native way to provide a tolerance for deep equals in chai
            expect(actualPositions).to.eql(expectedPositions);
            expect(actualDistances.length).to.equal(expectedDistances.length);
            for (let i = 0; i < actualDistances.length; i++) {
                expect(actualDistances[i]).to.be.closeTo(expectedDistances[i], tolerance);
            }
        });

        it('should return empty array when position is center of screen and radius does not cross particle 4', () => {
            // True distance to particle 4 is 408
            const particlesWithDistances = spatialGrid.queryRadiusWithDistance(center, 407);
            const positionsWithDistances = TestParticle.sortedPositionsWithDistances(particlesWithDistances);
            expect(positionsWithDistances).to.eql([]);
        });

        it('should return particle 4 with distance when position is center of screen and radius does cross particle 4', () => {
            // True distance to particle 4 is 408
            const particlesWithDistances = spatialGrid.queryRadiusWithDistance(center, 409);
            const positionsWithDistances = TestParticle.sortedPositionsWithDistances(particlesWithDistances);
            const expectedPositionsWithDistances = [
                { dist: 408, position: particle4.position }
            ];

            const actualPositions = positionsWithDistances.map(positionWithDistance => positionWithDistance.position);
            const expectedPositions = expectedPositionsWithDistances.map(positionWithDistance => positionWithDistance.position);
            const actualDistances = positionsWithDistances.map(positionWithDistance => positionWithDistance.distance);
            const expectedDistances = positionsWithDistances.map(positionWithDistance => positionWithDistance.distance);

            // Long convoluted test required because there is no native way to provide a tolerance for deep equals in chai
            expect(actualPositions).to.eql(expectedPositions);
            expect(actualDistances.length).to.equal(expectedDistances.length);
            for (let i = 0; i < actualDistances.length; i++) {
                expect(actualDistances[i]).to.be.closeTo(expectedDistances[i], tolerance);
            }
        });

        it('should return all particles with distances when position is center of screen and radius passes edges', () => {
            const particlesWithDistances = spatialGrid.queryRadiusWithDistance(center, 2000);
            const positionsWithDistances = TestParticle.sortedPositionsWithDistances(particlesWithDistances);
            const expectedPositionsWithDistances = [
                { dist: 1130.7, position: particle1.position },
                { dist: 1129.852, position: particle2.position },
                { dist: 1127.944, position: particle3.position },
                { dist: 408, position: particle4.position }
            ];

            const actualPositions = positionsWithDistances.map(positionWithDistance => positionWithDistance.position);
            const expectedPositions = expectedPositionsWithDistances.map(positionWithDistance => positionWithDistance.position);
            const actualDistances = positionsWithDistances.map(positionWithDistance => positionWithDistance.distance);
            const expectedDistances = positionsWithDistances.map(positionWithDistance => positionWithDistance.distance);

            // Long convoluted test required because there is no native way to provide a tolerance for deep equals in chai
            expect(actualPositions).to.eql(expectedPositions);
            expect(actualDistances.length).to.equal(expectedDistances.length);
            for (let i = 0; i < actualDistances.length; i++) {
                expect(actualDistances[i]).to.be.closeTo(expectedDistances[i], tolerance);
            }
        });
    });

});