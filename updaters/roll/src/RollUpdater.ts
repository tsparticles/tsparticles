import { AlterType, getRandom, getRangeValue, rangeColorToHsl } from "tsparticles-engine";
import type {
    IDelta,
    IParticleTransformValues,
    IParticleUpdater,
    IParticlesOptions,
    Particle,
    ParticlesOptions,
    RecursivePartial,
} from "tsparticles-engine";
import type { IRoll } from "./Options/Interfaces/IRoll";
import { Roll } from "./Options/Classes/Roll";
import { RollMode } from "./RollMode";

type RollParticle = Particle & {
    options: RollParticlesOptions;
};

type RollParticlesOptions = ParticlesOptions & {
    roll?: Roll;
};

type IRollParticlesOptions = IParticlesOptions & {
    roll?: IRoll;
};

function updateRoll(particle: RollParticle, delta: IDelta): void {
    const roll = particle.options.roll;

    if (!particle.roll || !roll?.enable) {
        return;
    }

    const speed = particle.roll.speed * delta.factor,
        max = 2 * Math.PI;

    particle.roll.angle += speed;

    if (particle.roll.angle > max) {
        particle.roll.angle -= max;
    }
}

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

    init(particle: RollParticle): void {
        const rollOpt = particle.options.roll;

        if (rollOpt?.enable) {
            particle.roll = {
                enable: rollOpt.enable,
                horizontal: rollOpt.mode === RollMode.horizontal || rollOpt.mode === RollMode.both,
                vertical: rollOpt.mode === RollMode.vertical || rollOpt.mode === RollMode.both,
                angle: getRandom() * Math.PI * 2,
                speed: getRangeValue(rollOpt.speed) / 360,
            };

            if (rollOpt.backColor) {
                particle.backColor = rangeColorToHsl(rollOpt.backColor);
            } else if (rollOpt.darken.enable && rollOpt.enlighten.enable) {
                const alterType = getRandom() >= 0.5 ? AlterType.darken : AlterType.enlighten;

                particle.roll.alter = {
                    type: alterType,
                    value: getRangeValue(
                        alterType === AlterType.darken ? rollOpt.darken.value : rollOpt.enlighten.value
                    ),
                };
            } else if (rollOpt.darken.enable) {
                particle.roll.alter = {
                    type: AlterType.darken,
                    value: getRangeValue(rollOpt.darken.value),
                };
            } else if (rollOpt.enlighten.enable) {
                particle.roll.alter = {
                    type: AlterType.enlighten,
                    value: getRangeValue(rollOpt.enlighten.value),
                };
            }
        } else {
            particle.roll = {
                enable: false,
                horizontal: false,
                vertical: false,
                angle: 0,
                speed: 0,
            };
        }
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

    update(particle: Particle, delta: IDelta): void {
        if (!this.isEnabled(particle)) {
            return;
        }

        updateRoll(particle, delta);
    }
}
