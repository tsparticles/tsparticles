import { describe, it } from "mocha";
import type { ICoordinates3d } from "../src";
import { TestCanvas } from "./Fixture/TestCanvas";
import { TestContainer } from "./Fixture/TestContainer";
import { TestParticles } from "./Fixture/TestParticles";
import { expect } from "chai";

const Window = require("window");

describe("Particles", () => {
    globalThis.window = new Window();
    const testContainer = new TestContainer({});
    const testParticles = new TestParticles(testContainer.container);
    const testCanvas = new TestCanvas(testContainer.container, 1920, 1080);

    // Common options used when initializing Particles with a set number of particles
    const numParticles = 5;
    const numParticlesOptions = {
        particles: {
            number: {
                value: numParticles,
            },
        },
    };
    // This is to keep the `removeQuantity` method from executing `container.play`
    // which is not playing well in Node.
    const enableParticleMoveOptions = {
        particles: {
            number: numParticlesOptions.particles.number,
            move: {
                enable: true,
            },
        },
    };

    const enableParticleEmptyMoveOptions = {
        particles: {
            number: { value: 0 },
            move: {
                enable: true,
            },
        },
    };

    it("should create the number of particles configured in container", () => {
        testContainer.reset(numParticlesOptions);
        testParticles.reset(testContainer.container);
        testParticles.particles.init();

        expect(testParticles.particles.count).to.equal(numParticles);
    });

    it("should add particles to array of particles", () => {
        testContainer.reset({
            particles: {
                number: {
                    value: 0,
                },
            },
        });
        testParticles.reset(testContainer.container);

        expect(testParticles.particles.count).to.equal(0);

        const particle1 = testParticles.particles.addParticle({ x: 1, y: 1 });
        expect(testParticles.particles.count).to.equal(1);
        expect(testParticles.particles.array).to.eql([particle1]);

        const particle2 = testParticles.particles.addParticle({ x: 2, y: 2 });
        expect(testParticles.particles.count).to.equal(2);
        expect(testParticles.particles.array).to.eql([particle1, particle2]);

        const particle3 = testParticles.particles.addParticle({ x: 3, y: 3 });
        expect(testParticles.particles.count).to.equal(3);
        expect(testParticles.particles.array).to.eql([particle1, particle2, particle3]);
    });

    it("should remove particles at specified indices", () => {
        testContainer.reset(numParticlesOptions);
        testParticles.reset(testContainer.container);
        testParticles.particles.init();

        const particle1 = testParticles.particles.array[0];
        const particle3 = testParticles.particles.array[2];
        const particle4 = testParticles.particles.array[3];
        const particle5 = testParticles.particles.array[4];

        testParticles.particles.removeAt(1);
        expect(testParticles.particles.array).to.eql([particle1, particle3, particle4, particle5]);
        expect(testParticles.particles.array).to.not.eql([particle5, particle4, particle3, particle1]);

        testParticles.particles.removeAt(2);
        expect(testParticles.particles.array).to.eql([particle1, particle3, particle5]);
        expect(testParticles.particles.array).to.not.eql([particle5, particle3, particle1]);
    });

    it("should remove specified quantity of indices, starting at the specified index", () => {
        testContainer.reset(numParticlesOptions);
        testParticles.reset(testContainer.container);
        testParticles.particles.init();

        const particle1 = testParticles.particles.array[0];
        const particle4 = testParticles.particles.array[3];
        const particle5 = testParticles.particles.array[4];

        testParticles.particles.removeAt(1, 2);
        expect(testParticles.particles.array).to.eql([particle1, particle4, particle5]);
        expect(testParticles.particles.array).to.not.eql([particle5, particle4, particle1]);

        testParticles.particles.removeAt(0, 2);
        expect(testParticles.particles.array).to.eql([particle5]);
    });

    it("should remove specified number of particles", () => {
        testContainer.reset(enableParticleMoveOptions);
        testParticles.reset(testContainer.container);
        testParticles.particles.init();

        expect(testParticles.particles.count).to.equal(numParticles);
        testParticles.particles.removeQuantity(3);
        expect(testParticles.particles.count).to.equal(numParticles - 3);
        testParticles.particles.removeQuantity(2);
        expect(testParticles.particles.count).to.equal(numParticles - 5);
        expect(testParticles.particles.array).to.be.empty;
    });

    it("should remove specified particle", () => {
        testContainer.reset(numParticlesOptions);
        testParticles.reset(testContainer.container);
        testParticles.particles.init();

        const particle1 = testParticles.particles.array[0];
        const particle2 = testParticles.particles.array[1];
        const particle3 = testParticles.particles.array[2];
        const particle4 = testParticles.particles.array[3];
        const particle5 = testParticles.particles.array[4];

        testParticles.particles.remove(particle4);
        expect(testParticles.particles.array).to.eql([particle1, particle2, particle3, particle5]);
        expect(testParticles.particles.array).to.not.eql([particle5, particle3, particle2, particle1]);

        testParticles.particles.remove(particle1);
        expect(testParticles.particles.array).to.eql([particle2, particle3, particle5]);
        expect(testParticles.particles.array).to.not.eql([particle5, particle3, particle2]);
    });

    it("should remove all particles when calling clear", () => {
        testContainer.reset(numParticlesOptions);
        testParticles.reset(testContainer.container);
        testParticles.particles.init();

        expect(testParticles.particles.count).to.equal(numParticles);
        testParticles.particles.clear();
        expect(testParticles.particles.count).to.equal(0);
        expect(testParticles.particles.array).to.be.empty;
    });

    it("should push multiple particles at the specified position", () => {
        testContainer.reset(enableParticleEmptyMoveOptions);
        testCanvas.reset(1920, 1080, testContainer.container);
        testParticles.reset(testContainer.container);

        const position: ICoordinates3d = { x: 100, y: 100, z: 0 };
        testParticles.particles.push(numParticles, { position, clicking: false, inside: false });
        expect(testParticles.particles.count).to.equal(numParticles);

        for (let i = 0; i < numParticles; i++) {
            expect(testParticles.particles.array[i].position).to.eql(position);
        }
    });

    it("should move particles", () => {
        testContainer.reset(enableParticleEmptyMoveOptions);
        testCanvas.reset(1920, 1080, testContainer.container);
        testParticles.reset(testContainer.container);

        const position: ICoordinates3d = { x: 100, y: 100, z: 0 };
        testParticles.particles.push(numParticles, { position, clicking: false, inside: false });
        expect(testParticles.particles.count).to.equal(5);

        let ts = Math.random() * 16.66667;
        const logP = testParticles.particles.array[0];

        console.log(logP.id);

        testParticles.particles.update({
            value: ts,
            factor: (60 * ts) / 1000,
        });

        ts = Math.random() * 16.66667;

        testParticles.particles.update({
            value: ts,
            factor: (60 * ts) / 1000,
        });

        ts = Math.random() * 16.66667;

        testParticles.particles.update({
            value: ts,
            factor: (60 * ts) / 1000,
        });

        ts = Math.random() * 16.66667;

        testParticles.particles.update({
            value: ts,
            factor: (60 * ts) / 1000,
        });

        ts = Math.random() * 16.66667;

        testParticles.particles.update({
            value: ts,
            factor: (60 * ts) / 1000,
        });
    });
});
