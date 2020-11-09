import { NumberUtils, Plugins, Utils } from "../../Utils";
import type { Container } from "../Container";
import type { Particle } from "../Particle";
import { HoverMode } from "../../Enums";
import type { IDelta } from "../Interfaces/IDelta";

/**
 * @category Core
 */
export class Mover {
    constructor(private readonly container: Container, private readonly particle: Particle) {}

    public move(delta: IDelta): void {
        const particle = this.particle;

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

        this.moveParticle(delta);

        /* parallax */
        this.moveParallax();
    }

    public moveXY(x: number, y: number): void {
        const particle = this.particle;

        particle.position.x += x;
        particle.position.y += y;
    }

    private moveParticle(delta: IDelta): void {
        const particle = this.particle;
        const particlesOptions = particle.particlesOptions;

        if (!particlesOptions.move.enable) {
            return;
        }

        const container = this.container;
        const slowFactor = this.getProximitySpeedFactor();
        const baseSpeed = (particle.moveSpeed ?? container.retina.moveSpeed) * container.retina.reduceFactor;
        const maxSize = particle.sizeValue ?? container.retina.sizeValue;
        const sizeFactor = particlesOptions.move.size ? particle.getRadius() / maxSize : 1;
        const moveSpeed = (baseSpeed / 2) * sizeFactor * slowFactor * delta.factor;

        this.applyNoise(delta);

        const gravityOptions = particlesOptions.move.gravity;

        if (gravityOptions.enable) {
            particle.velocity.vertical += (gravityOptions.acceleration * delta.factor) / (60 * moveSpeed);
        }

        const velocity = {
            horizontal: particle.velocity.horizontal * moveSpeed,
            vertical: particle.velocity.vertical * moveSpeed,
        };

        if (gravityOptions.enable && velocity.vertical >= gravityOptions.maxSpeed && gravityOptions.maxSpeed > 0) {
            velocity.vertical = gravityOptions.maxSpeed;

            particle.velocity.vertical = velocity.vertical / moveSpeed;
        }

        const zIndexOptions = particle.particlesOptions.zIndex;
        const zVelocityFactor = 1 - zIndexOptions.velocityRate * particle.zIndexFactor;

        if (
            particlesOptions.move.spin.enable &&
            particle.spinRadius !== undefined &&
            particle.spinAngle !== undefined &&
            particle.spinCenter !== undefined
        ) {
            particle.position.x = particle.spinCenter.x + particle.spinRadius * Math.cos(particle.spinAngle);
            particle.position.y = particle.spinCenter.y + particle.spinRadius * Math.sin(particle.spinAngle);

            particle.spinRadius += this.particle.particlesOptions.move.spin.acceleration * container.retina.pixelRatio;
            particle.spinAngle += moveSpeed / 100;
        } else {
            this.moveXY(velocity.horizontal * zVelocityFactor, velocity.vertical * zVelocityFactor);

            if (particlesOptions.move.vibrate) {
                this.moveXY(
                    Math.sin(particle.position.x * Math.cos(particle.position.y)),
                    Math.cos(particle.position.y * Math.sin(particle.position.x))
                );
            }
        }

        const initialPosition = particle.initialPosition;
        const initialDistance = NumberUtils.getDistance(initialPosition, particle.position);

        if (particle.maxDistance) {
            if (initialDistance >= particle.maxDistance && !particle.misplaced) {
                particle.misplaced = initialDistance > particle.maxDistance;
                particle.velocity.horizontal = particle.velocity.vertical / 2 - particle.velocity.horizontal;
                particle.velocity.vertical = particle.velocity.horizontal / 2 - particle.velocity.vertical;
            } else if (initialDistance < particle.maxDistance && particle.misplaced) {
                particle.misplaced = false;
            } else if (particle.misplaced) {
                if (
                    (particle.position.x < initialPosition.x && particle.velocity.horizontal < 0) ||
                    (particle.position.x > initialPosition.x && particle.velocity.horizontal > 0)
                ) {
                    particle.velocity.horizontal *= -Math.random();
                }

                if (
                    (particle.position.y < initialPosition.y && particle.velocity.vertical < 0) ||
                    (particle.position.y > initialPosition.y && particle.velocity.vertical > 0)
                ) {
                    particle.velocity.vertical *= -Math.random();
                }
            }
        }
    }

    private applyNoise(delta: IDelta): void {
        const particle = this.particle;
        const particlesOptions = particle.particlesOptions;
        const noiseOptions = particlesOptions.move.noise;
        const noiseEnabled = noiseOptions.enable;

        if (!noiseEnabled) {
            return;
        }

        const container = this.container;

        if (particle.lastNoiseTime <= particle.noiseDelay) {
            particle.lastNoiseTime += delta.value;

            return;
        }

        let generator = container.noise;

        if (noiseOptions.generator) {
            const customGenerator = Plugins.getNoiseGenerator(noiseOptions.generator);

            if (customGenerator) {
                generator = customGenerator;
            }
        }

        const noise = generator.generate(particle);

        particle.velocity.horizontal += Math.cos(noise.angle) * noise.length;
        particle.velocity.vertical += Math.sin(noise.angle) * noise.length;

        if (noiseOptions.clamp) {
            particle.velocity.horizontal = NumberUtils.clamp(particle.velocity.horizontal, -1, 1);
            particle.velocity.vertical = NumberUtils.clamp(particle.velocity.vertical, -1, 1);
        }

        particle.lastNoiseTime -= particle.noiseDelay;
    }

    private moveParallax(): void {
        const container = this.container;
        const options = container.options;

        if (Utils.isSsr() || !options.interactivity.events.onHover.parallax.enable) {
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
        const options = container.options;
        const active = Utils.isInArray(HoverMode.slow, options.interactivity.events.onHover.mode);

        if (!active) {
            return 1;
        }

        const mousePos = this.container.interactivity.mouse.position;

        if (!mousePos) {
            return 1;
        }

        const particlePos = this.particle.getPosition();
        const dist = NumberUtils.getDistance(mousePos, particlePos);
        const radius = container.retina.slowModeRadius;

        if (dist > radius) {
            return 1;
        }

        const proximityFactor = dist / radius || 0;
        const slowFactor = options.interactivity.modes.slow.factor;

        return proximityFactor / slowFactor;
    }
}
