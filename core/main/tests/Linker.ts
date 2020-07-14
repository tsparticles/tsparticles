import { expect } from "chai";
import { Linker } from "../src/Core/Particle/Interactions/Particles/Linker";
import { TestContainer } from "./Fixture/TestContainer";
import { TestParticles } from "./Fixture/TestParticles";
import { Point, QuadTree, Rectangle } from "../src/Utils";
import { TestCanvas } from "./Fixture/TestCanvas";

const testContainer = new TestContainer({});
const testCanvas = new TestCanvas(testContainer.container, 200, 200);
const testParticles = new TestParticles(testContainer.container);

describe("Linker in Canvas (200, 200) tests", () => {
    describe("Distance 10 tests", () => {
        describe("Particle (5, 5)", () => {
            testContainer.reset({
                particles: {
                    links: {
                        warp: true,
                        distance: 10,
                        enable: true,
                    },
                    move: {
                        warp: true,
                    },
                },
            });
            testParticles.reset(testContainer.container);
            testContainer.container.particles = testParticles.particles;
            testContainer.container.particles.init();
            testContainer.container.particles.quadTree = new QuadTree(new Rectangle(0, 0, 200, 200), 4);

            const p1 = testContainer.container.particles.addParticle({ x: 5, y: 5 });

            expect(p1).to.not.be.undefined;

            if (p1 === undefined) {
                return;
            }

            const pos1 = p1.getPosition();

            testContainer.container.particles.quadTree.insert(new Point(pos1, p1));

            it("should link Particle (10, 10)", function () {
                const p2 = testContainer.container.particles.addParticle({ x: 10, y: 10 });

                expect(p2).to.not.be.undefined;

                if (p2 === undefined) {
                    return;
                }

                const pos2 = p2.getPosition();

                testContainer.container.particles.quadTree.insert(new Point(pos2, p2));
                testContainer.container.canvas = testCanvas.canvas;

                const linker = new Linker(testContainer.container);

                linker.interact(p1);

                const links = p1.links;

                expect(links.filter((t) => t.opacity > 0)).to.be.not.empty;
                expect(links.map((t) => t.destination.getPosition())).to.deep.include(pos2);
            });

            it("should link Particle (199, 199)", function () {
                const p2 = testContainer.container.particles.addParticle({ x: 199, y: 199 });

                expect(p2).to.not.be.undefined;

                if (p2 === undefined) {
                    return;
                }

                const pos2 = p2.getPosition();

                testContainer.container.particles.quadTree.insert(new Point(pos2, p2));
                testContainer.container.canvas = testCanvas.canvas;

                const linker = new Linker(testContainer.container);

                linker.interact(p1);

                const links = p1.links;

                expect(links.filter((t) => t.opacity > 0)).to.be.not.empty;
                expect(links.map((t) => t.destination.getPosition())).to.deep.include(pos2);
            });
        });
    });
});
