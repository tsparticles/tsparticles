import type { IDelta, IParticleMover, Particle } from "tsparticles-engine";
import { RotateDirection, getDistance, getRangeMax, getRangeValue } from "tsparticles-engine";
import { applyDistance, applyPath, getProximitySpeedFactor, spin } from "./Utils";
import type { MoveParticle } from "./Types";

export class BaseMover implements IParticleMover {
    init(particle: MoveParticle): void {
        const container = particle.container,
            options = particle.options,
            gravityOptions = options.move.gravity,
            spinOptions = options.move.spin;

        particle.gravity = {
            enable: gravityOptions.enable,
            acceleration: getRangeValue(gravityOptions.acceleration),
            inverse: gravityOptions.inverse,
        };

        if (spinOptions.enable) {
            const spinPos = spinOptions.position ?? { x: 50, y: 50 },
                spinCenter = {
                    x: (spinPos.x / 100) * container.canvas.size.width,
                    y: (spinPos.y / 100) * container.canvas.size.height,
                },
                pos = particle.getPosition(),
                distance = getDistance(pos, spinCenter),
                spinAcceleration = getRangeValue(spinOptions.acceleration);

            particle.retina.spinAcceleration = spinAcceleration * container.retina.pixelRatio;

            particle.spin = {
                center: spinCenter,
                direction: particle.velocity.x >= 0 ? RotateDirection.clockwise : RotateDirection.counterClockwise,
                angle: particle.velocity.angle,
                radius: distance,
                acceleration: particle.retina.spinAcceleration,
            };
        }
    }

    isEnabled(particle: Particle): boolean {
        return !particle.destroyed && particle.options.move.enable;
    }

    move(particle: MoveParticle, delta: IDelta): void {
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

        if (moveOptions.spin.enable) {
            spin(particle, moveSpeed);
        } else {
            applyPath(particle, delta);

            const gravityOptions = particle.gravity,
                gravityFactor = gravityOptions?.enable && gravityOptions.inverse ? -1 : 1;

            if (gravityOptions?.enable && moveSpeed) {
                particle.velocity.y +=
                    (gravityFactor * (gravityOptions.acceleration * delta.factor)) / (60 * moveSpeed);
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
                gravityOptions?.enable &&
                maxSpeed > 0 &&
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
