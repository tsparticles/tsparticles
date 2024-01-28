import {
    type Container,
    type IDelta,
    type IParticleUpdater,
    OutMode,
    OutModeDirection,
    type OutModes,
    type Particle,
} from "@tsparticles/engine";
import type { IOutModeManager } from "./IOutModeManager.js";

const checkOutMode = (outModes: OutModes, outMode: OutMode | keyof typeof OutMode): boolean => {
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

    async update(particle: Particle, delta: IDelta): Promise<void> {
        const outModes = particle.options.move.outModes;

        await this._updateOutMode(particle, delta, outModes.bottom ?? outModes.default, OutModeDirection.bottom);
        await this._updateOutMode(particle, delta, outModes.left ?? outModes.default, OutModeDirection.left);
        await this._updateOutMode(particle, delta, outModes.right ?? outModes.default, OutModeDirection.right);
        await this._updateOutMode(particle, delta, outModes.top ?? outModes.default, OutModeDirection.top);
    }

    private readonly _updateOutMode = async (
        particle: Particle,
        delta: IDelta,
        outMode: OutMode | keyof typeof OutMode,
        direction: OutModeDirection,
    ): Promise<void> => {
        for (const updater of this.updaters) {
            await updater.update(particle, direction, delta, outMode);
        }
    };
}
