import {
    type Container,
    type IDelta,
    type IParticleUpdater,
    OutMode,
    OutModeDirection,
    type OutModes,
    type Particle,
} from "@tsparticles/engine";
import { BounceOutMode } from "./BounceOutMode.js";
import { DestroyOutMode } from "./DestroyOutMode.js";
import type { IOutModeManager } from "./IOutModeManager.js";
import { NoneOutMode } from "./NoneOutMode.js";
import { OutOutMode } from "./OutOutMode.js";

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

    init(particle: Particle): void {
        this.updaters = [];

        const outModes = particle.options.move.outModes;

        if (checkOutMode(outModes, OutMode.bounce)) {
            this.updaters.push(new BounceOutMode(this.container));
        } else if (checkOutMode(outModes, OutMode.out)) {
            this.updaters.push(new OutOutMode(this.container));
        } else if (checkOutMode(outModes, OutMode.destroy)) {
            this.updaters.push(new DestroyOutMode(this.container));
        } else if (checkOutMode(outModes, OutMode.none)) {
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

    private readonly _updateOutMode = (
        particle: Particle,
        delta: IDelta,
        outMode: OutMode | keyof typeof OutMode,
        direction: OutModeDirection,
    ): void => {
        for (const updater of this.updaters) {
            updater.update(particle, direction, delta, outMode);
        }
    };
}
