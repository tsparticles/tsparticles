import {
    AnimationStatus,
    type Container,
    type IDelta,
    type IParticleTransformValues,
    type IParticleUpdater,
    type Particle,
    type RecursivePartial,
    getRandom,
    getRangeValue,
} from "@tsparticles/engine";
import type { ITiltParticlesOptions, TiltParticle, TiltParticlesOptions } from "./Types";
import { Tilt } from "./Options/Classes/Tilt";
import { TiltDirection } from "./TiltDirection";
import { updateTilt } from "./Utils";

export class TiltUpdater implements IParticleUpdater {
    constructor(private readonly container: Container) {}

    getTransformValues(particle: TiltParticle): IParticleTransformValues {
        const tilt = particle.tilt?.enable && particle.tilt;

        return {
            b: tilt ? Math.cos(tilt.value) * tilt.cosDirection : undefined,
            c: tilt ? Math.sin(tilt.value) * tilt.sinDirection : undefined,
        };
    }

    init(particle: TiltParticle): void {
        const tiltOptions = particle.options.tilt;

        if (!tiltOptions) {
            return;
        }

        particle.tilt = {
            enable: tiltOptions.enable,
            value: (getRangeValue(tiltOptions.value) * Math.PI) / 180,
            sinDirection: getRandom() >= 0.5 ? 1 : -1,
            cosDirection: getRandom() >= 0.5 ? 1 : -1,
        };

        let tiltDirection = tiltOptions.direction;

        if (tiltDirection === TiltDirection.random) {
            const index = Math.floor(getRandom() * 2);

            tiltDirection = index > 0 ? TiltDirection.counterClockwise : TiltDirection.clockwise;
        }

        switch (tiltDirection) {
            case TiltDirection.counterClockwise:
            case "counterClockwise":
                particle.tilt.status = AnimationStatus.decreasing;
                break;
            case TiltDirection.clockwise:
                particle.tilt.status = AnimationStatus.increasing;
                break;
        }

        const tiltAnimation = particle.options.tilt?.animation;

        if (tiltAnimation?.enable) {
            particle.tilt.decay = 1 - getRangeValue(tiltAnimation.decay);
            particle.tilt.velocity = (getRangeValue(tiltAnimation.speed) / 360) * this.container.retina.reduceFactor;

            if (!tiltAnimation.sync) {
                particle.tilt.velocity *= getRandom();
            }
        }
    }

    isEnabled(particle: TiltParticle): boolean {
        const tiltAnimation = particle.options.tilt?.animation;

        return !particle.destroyed && !particle.spawning && !!tiltAnimation?.enable;
    }

    loadOptions(
        options: TiltParticlesOptions,
        ...sources: (RecursivePartial<ITiltParticlesOptions> | undefined)[]
    ): void {
        if (!options.tilt) {
            options.tilt = new Tilt();
        }

        for (const source of sources) {
            options.tilt.load(source?.tilt);
        }
    }

    update(particle: Particle, delta: IDelta): void {
        if (!this.isEnabled(particle)) {
            return;
        }

        updateTilt(particle, delta);
    }
}
