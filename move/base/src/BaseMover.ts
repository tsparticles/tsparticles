import { type IDelta, type IParticleMover, type Particle, getRangeMax, getRangeValue } from "@tsparticles/engine";
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
    async init(particle: MoveParticle): Promise<void> {
        const options = particle.options,
            gravityOptions = options.move.gravity;

        particle.gravity = {
            enable: gravityOptions.enable,
            acceleration: getRangeValue(gravityOptions.acceleration),
            inverse: gravityOptions.inverse,
        };

        const { initSpin } = await import("./Utils.js");

        initSpin(particle);

        await Promise.resolve();
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
    async move(particle: MoveParticle, delta: IDelta): Promise<void> {
        const particleOptions = particle.options,
            moveOptions = particleOptions.move;

        if (!moveOptions.enable) {
            return;
        }

        const container = particle.container,
            pxRatio = container.retina.pixelRatio;

        particle.retina.moveSpeed ??= getRangeValue(moveOptions.speed) * pxRatio;
        particle.retina.moveDrift ??= getRangeValue(particle.options.move.drift) * pxRatio;

        const { getProximitySpeedFactor } = await import("./Utils.js"),
            slowFactor = getProximitySpeedFactor(particle),
            baseSpeed = particle.retina.moveSpeed * container.retina.reduceFactor,
            moveDrift = particle.retina.moveDrift,
            maxSize = getRangeMax(particleOptions.size.value) * pxRatio,
            sizeFactor = moveOptions.size ? particle.getRadius() / maxSize : defaultSizeFactor,
            deltaFactor = delta.factor || defaultDeltaFactor,
            moveSpeed = (baseSpeed * sizeFactor * slowFactor * deltaFactor) / diffFactor,
            maxSpeed = particle.retina.maxSpeed ?? container.retina.maxSpeed;

        if (moveOptions.spin.enable) {
            const { spin } = await import("./Utils.js");

            spin(particle, moveSpeed);
        } else {
            const { move } = await import("./Utils.js");

            move(particle, moveOptions, moveSpeed, maxSpeed, moveDrift, delta);
        }

        const { applyDistance } = await import("./Utils.js");

        applyDistance(particle);
    }
}
