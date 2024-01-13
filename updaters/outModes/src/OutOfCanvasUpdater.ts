import {
    type Container,
    type IDelta,
    type IParticleUpdater,
    type OutMode,
    type OutModeAlt,
    OutModeDirection,
    type Particle,
} from "@tsparticles/engine";
import { BounceOutMode } from "./BounceOutMode.js";
import { DestroyOutMode } from "./DestroyOutMode.js";
import type { IOutModeManager } from "./IOutModeManager.js";
import { NoneOutMode } from "./NoneOutMode.js";
import { OutOutMode } from "./OutOutMode.js";

export class OutOfCanvasUpdater implements IParticleUpdater {
    updaters: IOutModeManager[];

    private readonly container;

    constructor(container: Container) {
        this.container = container;
        this.updaters = [
            new BounceOutMode(container),
            new DestroyOutMode(container),
            new OutOutMode(container),
            new NoneOutMode(container),
        ];
    }

    async init(): Promise<void> {
        // nothing
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
