import { clamp, getDistance, getRangeMax, getRangeValue, isInArray, isSsr, Plugins } from "../../Utils";
import type { Container } from "../Container";
import type { Particle } from "../Particle";
import { HoverMode } from "../../Enums";
import type { IDelta } from "../Interfaces";

/**
 * @category Core
 */
export class Mover {
    constructor(private readonly container: Container, private readonly particle: Particle) {
    }

    move(delta: IDelta): void {
        const particle = this.particle;

        particle.bubble.inRange = false;
        particle.links = [];

        for (const [ , plugin ] of this.container.plugins) {
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

        this.moveParticle(delta);

        /* parallax */
        this.moveParallax();
    }

    private moveParticle(delta: IDelta): void {
        const particle = this.particle;
        const particlesOptions = particle.options;

        if (!particlesOptions.move.enable) {
            return;
        }

        const container = this.container;
        const slowFactor = this.getProximitySpeedFactor();
        const baseSpeed =
            (particle.moveSpeed ?? getRangeValue(particle.options.move.speed) * container.retina.pixelRatio) *
            container.retina.reduceFactor;
        const maxSize = getRangeMax(particle.options.size.value) * container.retina.pixelRatio;
        const sizeFactor = particlesOptions.move.size ? particle.getRadius() / maxSize : 1;
        const moveSpeed = (baseSpeed / 2) * sizeFactor * slowFactor * delta.factor;
        const moveDrift =
            particle.moveDrift ?? getRangeValue(particle.options.move.drift) * container.retina.pixelRatio;

        this.applyPath(delta);

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
    }

    private applyPath(delta: IDelta): void {
        const particle = this.particle;
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

    private moveParallax(): void {
        const container = this.container;
        const options = container.actualOptions;

        if (isSsr() || !options.interactivity.events.onHover.parallax.enable) {
            return;
        }

        const particle = this.particle;
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

    private getProximitySpeedFactor(): number {
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

        const particlePos = this.particle.getPosition();
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
