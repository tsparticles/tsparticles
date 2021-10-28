import type { Container, IDelta, IParticleUpdater, OutMode, OutModeAlt, Particle } from "tsparticles-engine";
import { OutModeDirection } from "tsparticles-engine";
import type { IOutModeManager } from "./IOutModeManager";
import { BounceOutMode } from "./BounceOutMode";
import { DestroyOutMode } from "./DestroyOutMode";
import { OutOutMode } from "./OutOutMode";
import { NoneOutMode } from "./NoneOutMode";

export class OutOfCanvasUpdater implements IParticleUpdater {
    updaters: IOutModeManager[];

    constructor(private readonly container: Container) {
        this.updaters = [
            new BounceOutMode(container),
            new DestroyOutMode(container),
            new OutOutMode(container),
            new NoneOutMode(container),
        ];
    }

    init(): void {
        // nothing
    }

    isEnabled(particle: Particle): boolean {
        return !particle.destroyed && !particle.spawning;
    }

    update(particle: Particle, delta: IDelta): void {
        const outModes = particle.options.move.outModes;

        this.updateOutMode(particle, delta, outModes.bottom ?? outModes.default, OutModeDirection.bottom);
        this.updateOutMode(particle, delta, outModes.left ?? outModes.default, OutModeDirection.left);
        this.updateOutMode(particle, delta, outModes.right ?? outModes.default, OutModeDirection.right);
        this.updateOutMode(particle, delta, outModes.top ?? outModes.default, OutModeDirection.top);
    }

    private updateOutMode(
        particle: Particle,
        delta: IDelta,
        outMode: OutMode | keyof typeof OutMode | OutModeAlt,
        direction: OutModeDirection
    ) {
        for (const updater of this.updaters) {
            updater.update(particle, direction, delta, outMode);
        }
    }
}
