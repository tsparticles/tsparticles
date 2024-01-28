import {
    type Container,
    type IDelta,
    OutMode,
    type OutModeDirection,
    type Particle,
    calculateBounds,
} from "@tsparticles/engine";
import type { IOutModeManager } from "./IOutModeManager.js";

export class BounceOutMode implements IOutModeManager {
    modes: (OutMode | keyof typeof OutMode)[];

    constructor(private readonly container: Container) {
        this.modes = [
            OutMode.bounce,
            OutMode.split,
        ];
    }

    async update(
        particle: Particle,
        direction: OutModeDirection,
        delta: IDelta,
        outMode: OutMode | keyof typeof OutMode,
    ): Promise<void> {
        if (!this.modes.includes(outMode)) {
            return;
        }

        const container = this.container;
        let handled = false;

        for (const [, plugin] of container.plugins) {
            if (plugin.particleBounce !== undefined) {
                handled = await plugin.particleBounce(particle, delta, direction);
            }

            if (handled) {
                break;
            }
        }

        if (handled) {
            return;
        }

        const pos = particle.getPosition(),
            offset = particle.offset,
            size = particle.getRadius(),
            bounds = calculateBounds(pos, size),
            canvasSize = container.canvas.size,
            { bounceHorizontal, bounceVertical } = await import("./Utils.js");

        bounceHorizontal({ particle, outMode, direction, bounds, canvasSize, offset, size });
        bounceVertical({ particle, outMode, direction, bounds, canvasSize, offset, size });
    }
}
