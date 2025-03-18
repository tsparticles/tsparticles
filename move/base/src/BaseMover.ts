import { type IDelta, type IParticleMover, type Particle, getRangeMax, getRangeValue } from "@tsparticles/engine";
import { applyDistance, getProximitySpeedFactor, initSpin, move, spin } from "./Utils.js";
import type { MoveParticle } from "./Types.js";

const diffFactor = 2,
    defaultSizeFactor = 1,
    defaultDeltaFactor = 1;

/**
 */
export class BaseMover implements IParticleMover {
    /**
     * @param particle -
     */
    init(particle: MoveParticle): void {
        const options = particle.options,
            gravityOptions = options.move.gravity;

        particle.gravity = {
            enable: gravityOptions.enable,
            acceleration: getRangeValue(gravityOptions.acceleration),
            inverse: gravityOptions.inverse,
        };

        initSpin(particle);
    }

    /**
     * @param particle -
     * @returns check if mover is enabled
     */
    isEnabled(particle: Particle): boolean {
        return !particle.destroyed && particle.options.move.enable;
    }

    /**
     * @param particle -
     * @param delta -
     */
    move(particle: MoveParticle, delta: IDelta): void {
        const particleOptions = particle.options,
            moveOptions = particleOptions.move;

        if (!moveOptions.enable) {
            return;
        }

        const container = particle.container,
            pxRatio = container.retina.pixelRatio;

        particle.retina.moveSpeed ??= getRangeValue(moveOptions.speed) * pxRatio;
        particle.retina.moveDrift ??= getRangeValue(particle.options.move.drift) * pxRatio;

        const slowFactor = getProximitySpeedFactor(particle),
            reduceFactor = container.retina.reduceFactor,
            baseSpeed = particle.retina.moveSpeed * reduceFactor,
            moveDrift = particle.retina.moveDrift * reduceFactor,
            maxSize = getRangeMax(particleOptions.size.value) * pxRatio,
            sizeFactor = moveOptions.size ? particle.getRadius() / maxSize : defaultSizeFactor,
            deltaFactor = delta.factor || defaultDeltaFactor,
            moveSpeed = (baseSpeed * sizeFactor * slowFactor * deltaFactor) / diffFactor,
            maxSpeed = (particle.retina.maxSpeed ?? container.retina.maxSpeed) * reduceFactor;

        if (moveOptions.spin.enable) {
            spin(particle, moveSpeed, reduceFactor);
        } else {
            move(particle, moveOptions, moveSpeed, maxSpeed, moveDrift, reduceFactor, delta);
        }

        applyDistance(particle);
    }
}
