import type { IDelta, IParticleMover, Particle } from "tsparticles-engine";
import { applyDistance, applyPath, getProximitySpeedFactor, spin } from "./Utils";
import { getRangeMax, getRangeValue } from "tsparticles-engine";

export class BaseMover implements IParticleMover {
    init(): void {
        // nothing to do
    }

    isEnabled(particle: Particle): boolean {
        return !particle.destroyed && particle.options.move.enable;
    }

    move(particle: Particle, delta: IDelta): void {
        const particleOptions = particle.options,
            moveOptions = particleOptions.move;

        if (!moveOptions.enable) {
            return;
        }

        const container = particle.container,
            slowFactor = getProximitySpeedFactor(particle),
            baseSpeed =
                (particle.retina.moveSpeed ??= getRangeValue(moveOptions.speed) * container.retina.pixelRatio) *
                container.retina.reduceFactor,
            moveDrift = (particle.retina.moveDrift ??=
                getRangeValue(particle.options.move.drift) * container.retina.pixelRatio),
            maxSize = getRangeMax(particleOptions.size.value) * container.retina.pixelRatio,
            sizeFactor = moveOptions.size ? particle.getRadius() / maxSize : 1,
            speedFactor = sizeFactor * slowFactor * (delta.factor || 1),
            diffFactor = 2,
            moveSpeed = (baseSpeed * speedFactor) / diffFactor;

        applyPath(particle, delta);

        const gravityOptions = moveOptions.gravity,
            gravityFactor = gravityOptions.enable && gravityOptions.inverse ? -1 : 1;

        if (gravityOptions.enable && moveSpeed) {
            particle.velocity.y += (gravityFactor * (gravityOptions.acceleration * delta.factor)) / (60 * moveSpeed);
        }

        if (moveDrift && moveSpeed) {
            particle.velocity.x += (moveDrift * delta.factor) / (60 * moveSpeed);
        }

        const decay = particle.moveDecay;

        if (decay != 1) {
            particle.velocity.multTo(decay);
        }

        const velocity = particle.velocity.mult(moveSpeed),
            maxSpeed = particle.retina.maxSpeed ?? container.retina.maxSpeed;

        if (
            gravityOptions.enable &&
            gravityOptions.maxSpeed > 0 &&
            ((!gravityOptions.inverse && velocity.y >= 0 && velocity.y >= maxSpeed) ||
                (gravityOptions.inverse && velocity.y <= 0 && velocity.y <= -maxSpeed))
        ) {
            velocity.y = gravityFactor * maxSpeed;

            if (moveSpeed) {
                particle.velocity.y = velocity.y / moveSpeed;
            }
        }

        const zIndexOptions = particle.options.zIndex,
            zVelocityFactor = (1 - particle.zIndexFactor) ** zIndexOptions.velocityRate;

        if (moveOptions.spin.enable) {
            spin(particle, moveSpeed);
        } else {
            if (zVelocityFactor != 1) {
                velocity.multTo(zVelocityFactor);
            }

            particle.position.addTo(velocity);

            if (moveOptions.vibrate) {
                particle.position.x += Math.sin(particle.position.x * Math.cos(particle.position.y));
                particle.position.y += Math.cos(particle.position.y * Math.sin(particle.position.x));
            }
        }

        applyDistance(particle);
    }
}
