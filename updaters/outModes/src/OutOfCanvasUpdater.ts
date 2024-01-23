import {
    type Container,
    type IDelta,
    type IParticleUpdater,
    OutMode,
    type OutModeAlt,
    OutModeDirection,
    type OutModes,
    type Particle,
} from "@tsparticles/engine";
import type { IOutModeManager } from "./IOutModeManager.js";

const checkOutMode = (outModes: OutModes, outMode: OutMode | keyof typeof OutMode | OutModeAlt): boolean => {
    return (
        outModes.default === outMode ||
        outModes.bottom === outMode ||
        outModes.left === outMode ||
        outModes.right === outMode ||
        outModes.top === outMode
    );
};

export class OutOfCanvasUpdater implements IParticleUpdater {
    updaters: IOutModeManager[];

    private readonly container;

    constructor(container: Container) {
        this.container = container;
        this.updaters = [];
    }

    async init(particle: Particle): Promise<void> {
        this.updaters = [];

        const outModes = particle.options.move.outModes;

        if (checkOutMode(outModes, OutMode.bounce)) {
            const { BounceOutMode } = await import("./BounceOutMode.js");

            this.updaters.push(new BounceOutMode(this.container));
        } else if (checkOutMode(outModes, OutMode.out)) {
            const { OutOutMode } = await import("./OutOutMode.js");

            this.updaters.push(new OutOutMode(this.container));
        } else if (checkOutMode(outModes, OutMode.destroy)) {
            const { DestroyOutMode } = await import("./DestroyOutMode.js");

            this.updaters.push(new DestroyOutMode(this.container));
        } else if (checkOutMode(outModes, OutMode.none)) {
            const { NoneOutMode } = await import("./NoneOutMode.js");

            this.updaters.push(new NoneOutMode(this.container));
        }
    }

    isEnabled(particle: Particle): boolean {
        return !particle.destroyed && !particle.spawning;
    }

    update(particle: Particle, delta: IDelta): void {
        const outModes = particle.options.move.outModes;

        this._updateOutMode(particle, delta, outModes.bottom ?? outModes.default, OutModeDirection.bottom);
        this._updateOutMode(particle, delta, outModes.left ?? outModes.default, OutModeDirection.left);
        this._updateOutMode(particle, delta, outModes.right ?? outModes.default, OutModeDirection.right);
        this._updateOutMode(particle, delta, outModes.top ?? outModes.default, OutModeDirection.top);
    }

    private readonly _updateOutMode: (
        particle: Particle,
        delta: IDelta,
        outMode: OutMode | keyof typeof OutMode | OutModeAlt,
        direction: OutModeDirection,
    ) => void = (particle, delta, outMode, direction) => {
        for (const updater of this.updaters) {
            updater.update(particle, direction, delta, outMode);
        }
    };
}
