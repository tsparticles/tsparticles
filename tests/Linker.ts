import { expect } from 'chai';
import { Linker } from "../src/Core/Particle/Interactions/Particles/Linker";
import { TestContainer } from "./Fixture/TestContainer";
import { TestParticle } from "./Fixture/TestParticle";
import { TestParticles } from "./Fixture/TestParticles";
import { Point } from "../src/Utils/Point";
import { QuadTree } from "../src/Utils/QuadTree";
import { Rectangle } from "../src/Utils/Rectangle";
import { TestCanvas } from "./Fixture/TestCanvas";

const testContainer = new TestContainer({});
const testCanvas = new TestCanvas(testContainer.container, 200, 200);
const testParticles = new TestParticles(testContainer.container);

describe('Linker in Canvas (200, 200) tests', () => {
    describe('Distance 10 tests', () => {
        describe('Particle (5, 5)', () => {
            testContainer.reset({
                particles: {
                    lineLinked: {
                        warp: true,
                        distance: 10,
                        enable: true
                    },
                    move: {
                        warp: true
                    }
                }
            });
            testParticles.reset(testContainer.container);
            testContainer.container.particles = testParticles.particles;
            testContainer.container.particles.init();
            testContainer.container.particles.quadTree = new QuadTree(new Rectangle(0, 0, 200, 200), 4);

            const p1 = new TestParticle(testContainer.container, { x: 5, y: 5 });

            const pos1 = p1.particle.getPosition();

            testContainer.container.particles.quadTree.insert(new Point(pos1.x, pos1.y, p1.particle));

            testContainer.container.particles.addParticle(p1.particle);

            it('should link Particle (10, 10)', function () {
                const p2 = new TestParticle(testContainer.container, { x: 10, y: 10 });

                testContainer.container.particles.addParticle(p2.particle);

                const pos2 = p2.particle.getPosition();

                testContainer.container.particles.quadTree.insert(new Point(pos2.x, pos2.y, p2.particle));
                testContainer.container.canvas = testCanvas.canvas;

                Linker.link(p1.particle, testContainer.container, 0);

                const links = p1.particle.links;

                expect(links.filter(t => t.opacity > 0)).to.be.not.empty;
                expect(links.map(t => t.destination.getPosition())).to.deep.include(pos2);
            });

            it('should link Particle (199, 199)', function () {
                const p2 = new TestParticle(testContainer.container, { x: 199, y: 199 });

                testContainer.container.particles.addParticle(p2.particle);

                const pos2 = p2.particle.getPosition();

                testContainer.container.particles.quadTree.insert(new Point(pos2.x, pos2.y, p2.particle));
                testContainer.container.canvas = testCanvas.canvas;

                Linker.link(p1.particle, testContainer.container, 0);

                const links = p1.particle.links;

                expect(links.filter(t => t.opacity > 0)).to.be.not.empty;
                expect(links.map(t => t.destination.getPosition())).to.deep.include(pos2);
            });
        });
    });
});