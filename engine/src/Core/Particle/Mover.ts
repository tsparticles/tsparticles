import { clamp, getDistance, getDistances, getRangeMax, getRangeValue, isInArray, isSsr, Plugins } from "../../Utils";
import type { Container } from "../Container";
import type { Particle } from "../Particle";
import { HoverMode } from "../../Enums";
import type { IDelta } from "../Interfaces";

function applyDistance(particle: Particle): void {
    const initialPosition = particle.initialPosition;
    const { dx, dy } = getDistances(initialPosition, particle.position);
    const dxFixed = Math.abs(dx),
        dyFixed = Math.abs(dy);

    const hDistance = particle.maxDistance.horizontal;
    const vDistance = particle.maxDistance.vertical;

    if (!hDistance && !vDistance) {
        return;
    }

    if (((hDistance && dxFixed >= hDistance) || (vDistance && dyFixed >= vDistance)) && !particle.misplaced) {
        particle.misplaced = (!!hDistance && dxFixed > hDistance) || (!!vDistance && dyFixed > vDistance);

        if (hDistance) {
            particle.velocity.x = particle.velocity.y / 2 - particle.velocity.x;
        }

        if (vDistance) {
            particle.velocity.y = particle.velocity.x / 2 - particle.velocity.y;
        }
    } else if ((!hDistance || dxFixed < hDistance) && (!vDistance || dyFixed < vDistance) && particle.misplaced) {
        particle.misplaced = false;
    } else if (particle.misplaced) {
        const pos = particle.position,
            vel = particle.velocity;

        if (hDistance && ((pos.x < initialPosition.x && vel.x < 0) || (pos.x > initialPosition.x && vel.x > 0))) {
            vel.x *= -Math.random();
        }

        if (vDistance && ((pos.y < initialPosition.y && vel.y < 0) || (pos.y > initialPosition.y && vel.y > 0))) {
            vel.y *= -Math.random();
        }
    }
}

/**
 * @category Core
 */
export class Mover {
    constructor(private readonly container: Container) {}

    move(particle: Particle, delta: IDelta): void {
        particle.bubble.inRange = false;
        particle.links = [];

        for (const [, plugin] of this.container.plugins) {
            if (particle.destroyed) {
                break;
            }

            if (plugin.particleUpdate) {
                plugin.particleUpdate(particle, delta);
            }
        }

        if (particle.destroyed) {
            return;
        }

        this.moveParticle(particle, delta);

        /* parallax */
        this.moveParallax(particle);
    }

    private moveParticle(particle: Particle, delta: IDelta): void {
        const particlesOptions = particle.options;

        if (!particlesOptions.move.enable) {
            return;
        }

        const container = this.container;
        const slowFactor = this.getProximitySpeedFactor(particle);
        const baseSpeed =
            (particle.moveSpeed ?? getRangeValue(particle.options.move.speed) * container.retina.pixelRatio) *
            container.retina.reduceFactor;
        const maxSize = getRangeMax(particle.options.size.value) * container.retina.pixelRatio;
        const sizeFactor = particlesOptions.move.size ? particle.getRadius() / maxSize : 1;
        const moveSpeed = (baseSpeed / 2) * sizeFactor * slowFactor * delta.factor;
        const moveDrift =
            particle.moveDrift ?? getRangeValue(particle.options.move.drift) * container.retina.pixelRatio;

        this.applyPath(particle, delta);

        const gravityOptions = particlesOptions.move.gravity;
        const gravityFactor = gravityOptions.enable && gravityOptions.inverse ? -1 : 1;

        if (gravityOptions.enable) {
            particle.velocity.y += (gravityFactor * (gravityOptions.acceleration * delta.factor)) / (60 * moveSpeed);
        }

        if (moveSpeed) {
            particle.velocity.x += (moveDrift * delta.factor) / (60 * moveSpeed);
        }

        particle.velocity.multTo(1 - particle.options.move.decay);

        const velocity = particle.velocity.mult(moveSpeed);
        const maxSpeed = particle.maxSpeed ?? container.retina.maxSpeed;

        if (
            gravityOptions.enable &&
            ((!gravityOptions.inverse && velocity.y >= 0 && velocity.y >= maxSpeed) ||
                (gravityOptions.inverse && velocity.y <= 0 && velocity.y <= -maxSpeed)) &&
            gravityOptions.maxSpeed > 0
        ) {
            velocity.y = gravityFactor * maxSpeed;

            if (moveSpeed) {
                particle.velocity.y = velocity.y / moveSpeed;
            }
        }

        const zIndexOptions = particle.options.zIndex,
            zVelocityFactor = 1 - zIndexOptions.velocityRate * particle.zIndexFactor;

        velocity.multTo(zVelocityFactor);

        particle.position.addTo(velocity);

        if (particlesOptions.move.vibrate) {
            particle.position.x += Math.sin(particle.position.x * Math.cos(particle.position.y));
            particle.position.y += Math.cos(particle.position.y * Math.sin(particle.position.x));
        }

        const initialPosition = particle.initialPosition;
        const initialDistance = getDistance(initialPosition, particle.position);

        if (particle.maxDistance) {
            if (initialDistance >= particle.maxDistance && !particle.misplaced) {
                particle.misplaced = initialDistance > particle.maxDistance;
                particle.velocity.x = particle.velocity.y / 2 - particle.velocity.x;
                particle.velocity.y = particle.velocity.x / 2 - particle.velocity.y;
            } else if (initialDistance < particle.maxDistance && particle.misplaced) {
                particle.misplaced = false;
            } else if (particle.misplaced) {
                if (
                    (particle.position.x < initialPosition.x && particle.velocity.x < 0) ||
                    (particle.position.x > initialPosition.x && particle.velocity.x > 0)
                ) {
                    particle.velocity.x *= -Math.random();
                }

                if (
                    (particle.position.y < initialPosition.y && particle.velocity.y < 0) ||
                    (particle.position.y > initialPosition.y && particle.velocity.y > 0)
                ) {
                    particle.velocity.y *= -Math.random();
                }
            }
        }

        applyDistance(particle);
    }

    private applyPath(particle: Particle, delta: IDelta): void {
        const particlesOptions = particle.options;
        const pathOptions = particlesOptions.move.path;
        const pathEnabled = pathOptions.enable;

        if (!pathEnabled) {
            return;
        }

        const container = this.container;

        if (particle.lastPathTime <= particle.pathDelay) {
            particle.lastPathTime += delta.value;

            return;
        }

        let generator = container.pathGenerator;

        if (pathOptions.generator) {
            const customGenerator = Plugins.getPathGenerator(pathOptions.generator);

            if (customGenerator) {
                generator = customGenerator;
            }
        }

        const path = generator.generate(particle);

        particle.velocity.addTo(path);

        if (pathOptions.clamp) {
            particle.velocity.x = clamp(particle.velocity.x, -1, 1);
            particle.velocity.y = clamp(particle.velocity.y, -1, 1);
        }

        particle.lastPathTime -= particle.pathDelay;
    }

    private moveParallax(particle: Particle): void {
        const container = this.container;
        const options = container.actualOptions;

        if (isSsr() || !options.interactivity.events.onHover.parallax.enable) {
            return;
        }

        const parallaxForce = options.interactivity.events.onHover.parallax.force;
        const mousePos = container.interactivity.mouse.position;

        if (!mousePos) {
            return;
        }

        const canvasCenter = {
            x: container.canvas.size.width / 2,
            y: container.canvas.size.height / 2,
        };
        const parallaxSmooth = options.interactivity.events.onHover.parallax.smooth;
        const factor = particle.getRadius() / parallaxForce;

        /* smaller is the particle, longer is the offset distance */
        const tmp = {
            x: (mousePos.x - canvasCenter.x) * factor,
            y: (mousePos.y - canvasCenter.y) * factor,
        };

        particle.offset.x += (tmp.x - particle.offset.x) / parallaxSmooth; // Easing equation
        particle.offset.y += (tmp.y - particle.offset.y) / parallaxSmooth; // Easing equation
    }

    private getProximitySpeedFactor(particle: Particle): number {
        const container = this.container;
        const options = container.actualOptions;
        const active = isInArray(HoverMode.slow, options.interactivity.events.onHover.mode);

        if (!active) {
            return 1;
        }

        const mousePos = this.container.interactivity.mouse.position;

        if (!mousePos) {
            return 1;
        }

        const particlePos = particle.getPosition();
        const dist = getDistance(mousePos, particlePos);
        const radius = container.retina.slowModeRadius;

        if (dist > radius) {
            return 1;
        }

        const proximityFactor = dist / radius || 0;
        const slowFactor = options.interactivity.modes.slow.factor;

        return proximityFactor / slowFactor;
    }
}
