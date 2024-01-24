import {
    type IDelta,
    type IParticleTransformValues,
    type IParticleUpdater,
    type Particle,
    type RecursivePartial,
} from "@tsparticles/engine";
import type { IRollParticlesOptions, RollParticle, RollParticlesOptions } from "./Types.js";
import { Roll } from "./Options/Classes/Roll.js";

export class RollUpdater implements IParticleUpdater {
    getTransformValues(particle: Particle): IParticleTransformValues {
        const roll = particle.roll?.enable && particle.roll,
            rollHorizontal = roll && roll.horizontal,
            rollVertical = roll && roll.vertical;

        return {
            a: rollHorizontal ? Math.cos(roll.angle) : undefined,
            d: rollVertical ? Math.sin(roll.angle) : undefined,
        };
    }

    async init(particle: RollParticle): Promise<void> {
        const { initParticle } = await import("./Utils.js");

        initParticle(particle);
    }

    isEnabled(particle: RollParticle): boolean {
        const roll = particle.options.roll;

        return !particle.destroyed && !particle.spawning && !!roll?.enable;
    }

    loadOptions(
        options: RollParticlesOptions,
        ...sources: (RecursivePartial<IRollParticlesOptions> | undefined)[]
    ): void {
        if (!options.roll) {
            options.roll = new Roll();
        }

        for (const source of sources) {
            options.roll.load(source?.roll);
        }
    }

    async update(particle: Particle, delta: IDelta): Promise<void> {
        if (!this.isEnabled(particle)) {
            return;
        }

        const { updateRoll } = await import("./Utils.js");

        updateRoll(particle, delta);
    }
}
