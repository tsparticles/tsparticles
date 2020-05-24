import { expect } from "chai";
import { Circle, CircleWarp, Point, QuadTree, Rectangle } from "../src/Utils";
import { TestContainer } from "./Fixture/TestContainer";
import { TestParticle } from "./Fixture/TestParticle";

const testContainer = new TestContainer({});

const canvasSize = {
    width: 200,
    height: 200,
};

describe("QuadTree tests", () => {
    describe("Rectangle (0, 0, 50, 50) tests", () => {
        const rect1 = new Rectangle(0, 0, 50, 50);

        it("should intersect with a (40, 40, 10, 10) rectangle", function () {
            const rect2 = new Rectangle(40, 40, 10, 10);

            expect(rect1.intersects(rect2)).to.be.true;
        });
    });

    describe("Circle (0, 0, 30) tests", () => {
        const circle1 = new Circle(0, 0, 30);

        it("should intersect with a (0, 0, 20, 20) rectangle", function () {
            const rect2 = new Rectangle(0, 0, 20, 20);

            expect(circle1.intersects(rect2)).to.be.true;
        });
    });

    describe("CircleWarp (0, 0, 30) in canvas (200, 200) tests", () => {
        const circle1 = new CircleWarp(0, 0, 30, canvasSize);

        it("should intersect with a (180, 180, 20, 20) rectangle", function () {
            const rect2 = new Rectangle(180, 180, 20, 20);

            expect(circle1.intersects(rect2)).to.be.true;
        });

        it("should intersect with a (0, 0, 20, 20) rectangle", function () {
            const rect2 = new Rectangle(0, 0, 20, 20);

            expect(circle1.intersects(rect2)).to.be.true;
        });
    });

    describe("Quad Tree (200x200) tests", () => {
        const quadTree = new QuadTree(new Rectangle(0, 0, 200, 200), 4);

        describe("Particle (5, 5) tests", () => {
            const p1 = new TestParticle(testContainer.container, { x: 5, y: 5 });
            const pos1 = p1.particle.getPosition();

            quadTree.insert(new Point(pos1, p1.particle));

            it("query (radius 10) with p1 (5, 5) center should have at least p2 (10, 10)", () => {
                const p2 = new TestParticle(testContainer.container, { x: 10, y: 10 });
                const pos2 = p2.particle.getPosition();

                quadTree.insert(new Point(pos2, p2.particle));

                expect(quadTree.query(new CircleWarp(pos1.x, pos1.y, 10, canvasSize))).to.be.not.empty;
            });

            it("query (radius 10) with p1 (5, 5) center should have at least p2 (0, 0)", () => {
                const p2 = new TestParticle(testContainer.container, { x: 0, y: 0 });
                const pos2 = p2.particle.getPosition();

                quadTree.insert(new Point(pos2, p2.particle));

                expect(quadTree.query(new CircleWarp(pos1.x, pos1.y, 10, canvasSize))).to.be.not.empty;
            });

            it("query (radius 10) with p1 (5, 5) center should have at least p2 (199, 199)", () => {
                const p2 = new TestParticle(testContainer.container, { x: 199, y: 199 });
                const pos2 = p2.particle.getPosition();

                quadTree.insert(new Point(pos2, p2.particle));

                expect(quadTree.query(new CircleWarp(pos1.x, pos1.y, 10, canvasSize))).to.be.not.empty;
            });

            it("query (radius 10) with p1 (5, 5) center should have at least p2 (5, 199)", () => {
                const p2 = new TestParticle(testContainer.container, { x: 5, y: 199 });
                const pos2 = p2.particle.getPosition();

                quadTree.insert(new Point(pos2, p2.particle));

                expect(quadTree.query(new CircleWarp(pos1.x, pos1.y, 10, canvasSize))).to.be.not.empty;
            });

            it("query (radius 10) with p1 (5, 5) center should have at least p2 (199, 5)", () => {
                const p2 = new TestParticle(testContainer.container, { x: 5, y: 199 });
                const pos2 = p2.particle.getPosition();

                quadTree.insert(new Point(pos2, p2.particle));

                expect(quadTree.query(new CircleWarp(pos1.x, pos1.y, 10, canvasSize))).to.be.not.empty;
            });
        });

        describe("Particle (100, 5) tests", () => {
            const p1 = new TestParticle(testContainer.container, { x: 100, y: 5 });
            const pos1 = p1.particle.getPosition();

            quadTree.insert(new Point(pos1, p1.particle));

            it("query (radius 10) with p1 (100, 5) center should have at least p2 (100, 199)", () => {
                const p2 = new TestParticle(testContainer.container, { x: 100, y: 199 });
                const pos2 = p2.particle.getPosition();

                quadTree.insert(new Point(pos2, p2.particle));

                expect(quadTree.query(new CircleWarp(pos1.x, pos1.y, 10, canvasSize))).to.be.not.empty;
            });
        });

        describe("Particle (5, 100) tests", () => {
            const p1 = new TestParticle(testContainer.container, { x: 5, y: 100 });
            const pos1 = p1.particle.getPosition();

            quadTree.insert(new Point(pos1, p1.particle));

            it("query (radius 10) with p1 (5, 100) center should have at least p2 (199, 100)", () => {
                const p2 = new TestParticle(testContainer.container, { x: 199, y: 100 });
                const pos2 = p2.particle.getPosition();

                quadTree.insert(new Point(pos2, p2.particle));

                expect(quadTree.query(new CircleWarp(pos1.x, pos1.y, 10, canvasSize))).to.be.not.empty;
            });
        });
    });
});
