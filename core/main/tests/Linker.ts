import { expect } from "chai";
import { Linker } from "../src/Interactions/Particles/Linker";
import { TestContainer } from "./Fixture/TestContainer";
import { TestParticles } from "./Fixture/TestParticles";
import { Point, QuadTree, Rectangle } from "../src/Utils";
import { TestCanvas } from "./Fixture/TestCanvas";

describe("Linker in Canvas (200, 200) tests", () => {
    const testContainer = new TestContainer({});
    const testParticles = new TestParticles(testContainer.container);

    describe("Distance 10 tests", () => {
        describe("Particle (5, 5)", () => {
            testContainer.reset({
                particles: {
                    number: {
                        value: 0,
                    },
                    links: {
                        warp: true,
                        distance: 10,
                        enable: true,
                        triangles: {
                            enable: true,
                        },
                    },
                    move: {
                        warp: true,
                    },
                },
            });
            testParticles.reset(testContainer.container);
            const testCanvas = new TestCanvas(testContainer.container, 200, 200);
            testContainer.container.particles.init();
            testContainer.container.particles.quadTree = new QuadTree(
                new Rectangle(
                    0,
                    0,
                    testContainer.container.canvas.size.width,
                    testContainer.container.canvas.size.height
                ),
                4
            );

            const p1 = testContainer.container.particles.addParticle({ x: 5, y: 5 });

            expect(p1).to.not.be.undefined;

            if (p1 === undefined) {
                return;
            }

            const pos1 = p1.getPosition();

            testContainer.container.particles.quadTree.insert(new Point(pos1, p1));

            it("should link Particle (10, 10)", () => {
                const p2 = testContainer.container.particles.addParticle({ x: 10, y: 10 });

                expect(p2).to.not.be.undefined;

                if (p2 === undefined) {
                    return;
                }

                const pos2 = p2.getPosition();

                testContainer.container.particles.quadTree.insert(new Point(pos2, p2));

                const linker = new Linker(testContainer.container);

                linker.interact(p1);

                const link = testContainer.container.particles.findLink(p1, p2);

                expect(link).to.be.not.undefined;

                if (!link) {
                    return;
                }

                expect(link.opacity > 0).to.be.true;
                expect(link.edges).to.include(p2);
            });

            it("should link Particle (199, 199)", () => {
                const p2 = testContainer.container.particles.addParticle({ x: 199, y: 199 });

                expect(p2).to.not.be.undefined;

                if (p2 === undefined) {
                    return;
                }

                const pos2 = p2.getPosition();

                testContainer.container.particles.quadTree.insert(new Point(pos2, p2));

                const linker = new Linker(testContainer.container);

                linker.interact(p1);

                const link = testContainer.container.particles.findLink(p1, p2);

                expect(link).to.be.not.undefined;

                if (!link) {
                    return;
                }

                expect(link.opacity > 0).to.be.true;
                expect(link.edges).to.include(p2);
            });

            it("should have a triangle with Particle (0, 0) and Particle (5, 0)", () => {
                const p2 = testContainer.container.particles.addParticle({ x: 0, y: 0 });
                const p3 = testContainer.container.particles.addParticle({ x: 5, y: 0 });

                expect(p2).to.not.be.undefined;
                expect(p3).to.not.be.undefined;

                if (p2 === undefined || p3 === undefined) {
                    return;
                }

                const pos2 = p2.getPosition();
                const pos3 = p3.getPosition();

                testContainer.container.particles.quadTree.insert(new Point(pos2, p2));
                testContainer.container.particles.quadTree.insert(new Point(pos3, p3));

                const linker = new Linker(testContainer.container);

                linker.interact(p1);
                linker.interact(p2);
                linker.interact(p3);

                const triangle = testContainer.container.particles.triangles.find(
                    (t) => t.vertices.includes(p1) && t.vertices.includes(p2) && t.vertices.includes(p3)
                );

                expect(triangle).to.be.not.undefined;

                if (triangle === undefined) {
                    return;
                }

                expect(triangle.opacity > 0).to.be.true;
                expect(triangle.vertices).to.include(p2);
                expect(triangle.vertices).to.include(p3);
            });
        });
    });
});
