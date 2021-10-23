import type { Container, IDelta, OutModeAlt, Particle, OutModeDirection } from "tsparticles-engine";
import { OutMode, ParticleOutType, isPointInside, Vector } from "tsparticles-engine";
import type { IOutModeManager } from "./IOutModeManager";

export class DestroyOutMode implements IOutModeManager {
    modes: (OutMode | OutModeAlt | keyof typeof OutMode)[];

    constructor(private readonly container: Container) {
        this.modes = [OutMode.destroy];
    }

    update(
        particle: Particle,
        direction: OutModeDirection,
        delta: IDelta,
        outMode: OutMode | OutModeAlt | keyof typeof OutMode
    ): void {
        if (!this.modes.includes(outMode)) {
            return;
        }

        const container = this.container;

        switch (particle.outType) {
            case ParticleOutType.normal:
            case ParticleOutType.outside:
                if (
                    isPointInside(
                        particle.position,
                        container.canvas.size,
                        Vector.origin,
                        particle.getRadius(),
                        direction
                    )
                ) {
                    return;
                }

                break;
            case ParticleOutType.inside:
                if (
                    !isPointInside(
                        particle.position,
                        {
                            width: 1,
                            height: 1,
                        },
                        particle.moveCenter,
                        particle.getRadius(),
                        direction
                    )
                ) {
                    return;
                }

                break;
        }

        container.particles.remove(particle, undefined, true);
    }
}
