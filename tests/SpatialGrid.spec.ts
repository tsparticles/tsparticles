const Window = require('window');
globalThis.window = new Window();

import { expect } from "chai";
import { Particle } from "../src/Classes/Particle";
import { TestContainer } from "./Fixture/TestContainer";
import { TestSpatialGrid } from "./Fixture/TestSpatialGrid";
import { Utils } from "../src/Classes/Utils/Utils";

const testContainer = new TestContainer();

describe('SpatialGrid', () => {

    describe('queryInCell', () => {
        // Setup grid and initial particles
        const mainResolution = {width: 1920, height: 1200};
        const testSpatialGrid = new TestSpatialGrid(mainResolution);
        const spatialGrid = testSpatialGrid.spatialGrid;
        const particle1 = new Particle(testContainer.container, {x: 1, y: 1});
        const particle2 = new Particle(testContainer.container, {x: 2, y: 2});
        const particle3 = new Particle(testContainer.container, {x: 3, y: 3});
        const particle4 = new Particle(testContainer.container, {x: 768, y: 240});
        testSpatialGrid.spatialGrid.setGrid([particle1, particle2, particle3, particle4]);

        it('should return particle 4 when position is random in same grid as particle 4', () => {

            // Particle 4 cell should have width in [586, 960) and height in [120, 360).
            const position = {x: Utils.randomInRange(586, 959), y: Utils.randomInRange(120, 359)}
            expect(
                spatialGrid.queryInCell(position),
                `Failed for position {x: ${position.x}, y: ${position.y}}`
            ).to.eql([particle4]);

        });

        it('should return particle 4 when position is on upper left corner of grid containing particle 4', () => {
            const position = {x: 586, y: 120};
            expect(
                spatialGrid.queryInCell(position),
                `Failed for position {x: ${position.x}, y: ${position.y}}`
            ).to.eql([particle4]);
        });

        it('should return particle 4 when position is on lower left corner of grid containing particle 4', () => {
            const position = {x: 586, y: 359};
            expect(
                spatialGrid.queryInCell(position),
                `Failed for position {x: ${position.x}, y: ${position.y}}`
            ).to.eql([particle4]);
        });

        it('should return particle 4 when position is on upper right corner of grid containing particle 4', () => {
            const position = {x: 959, y: 120};
            expect(
                spatialGrid.queryInCell(position),
                `Failed for position {x: ${position.x}, y: ${position.y}}`
            ).to.eql([particle4]);
        });

        it('should return particle 4 when position is on lower right corner of grid containing particle 4', () => {
            const position = {x: 959, y: 359};
            expect(
                spatialGrid.queryInCell(position),
                `Failed for position {x: ${position.x}, y: ${position.y}}`
            ).to.eql([particle4]);
        });

        it('should return empty array when position is just outside upper left corner of grid containing particle 4', () => {
            const position = {x: 586-1, y: 120-1};
            expect(
                spatialGrid.queryInCell(position),
                `Failed for position {x: ${position.x}, y: ${position.y}}`
            ).to.eql([]);
        });

        it('should return empty array when position is just outside lower left corner of grid containing particle 4', () => {
            const position = {x: 586-1, y: 359+1};
            expect(
                spatialGrid.queryInCell(position),
                `Failed for position {x: ${position.x}, y: ${position.y}}`
            ).to.eql([]);
        });

        it('should return empty array when position is just outside upper right corner of grid containing particle 4', () => {
            const position = {x: 959+1, y: 120-1};
            expect(
                spatialGrid.queryInCell(position),
                `Failed for position {x: ${position.x}, y: ${position.y}}`
            ).to.eql([]);
        });

        it('should return empty array when position is just outside lower right corner of grid containing particle 4', () => {
            const position = {x: 959+1, y: 359+1};
            expect(
                spatialGrid.queryInCell(position),
                `Failed for position {x: ${position.x}, y: ${position.y}}`
            ).to.eql([]);
        });

    });

});