import { Utils } from "../../Utils";
import type { Container } from "../Container";
import type { Particle } from "../Particle";
import { HoverMode } from "../../Enums";
import { INoiseValue } from "../../Options/Interfaces/Particles/Noise/INoiseValue";

export class Mover {
    private readonly container: Container;
    private readonly particle: Particle;

    constructor(container: Container, particle: Particle) {
        this.container = container;
        this.particle = particle;
    }

    private static calcNoiseValue(input: number, size: number, noiseValue: INoiseValue): number {
        return Math.floor(input / size) / noiseValue.value + noiseValue.offset;
    }

    public move(delta: number): void {
        const container = this.container;
        const options = container.options;
        const particle = this.particle;
        const particlesOptions = particle.particlesOptions;

        if (particlesOptions.move.enable) {
            const slowFactor = this.getProximitySpeedFactor();
            const deltaFactor = options.fpsLimit > 0 ? (60 * delta) / 1000 : 3.6;
            const baseSpeed = particle.moveSpeed ?? container.retina.moveSpeed;
            const moveSpeed = (baseSpeed / 2) * slowFactor * deltaFactor;

            const noiseOptions = particlesOptions.move.noise;
            const noiseEnabled = noiseOptions.enable;

            if (noiseEnabled) {
                if (particle.lastNoiseTime > particle.noiseDelay) {
                    const position = particle.position;
                    const noiseFactor = noiseOptions.factor;
                    const simplex = container.simplex;

                    const noise = {
                        angle: simplex.noise3D(
                            Mover.calcNoiseValue(position.x, particle.size.value, noiseFactor.horizontal),
                            Mover.calcNoiseValue(position.y, particle.size.value, noiseFactor.horizontal),
                            container.particles.noiseZ
                        ),
                        length: simplex.noise3D(
                            Mover.calcNoiseValue(position.x, particle.size.value, noiseFactor.vertical),
                            Mover.calcNoiseValue(position.y, particle.size.value, noiseFactor.vertical),
                            container.particles.noiseZ
                        ),
                    };

                    particle.velocity.horizontal += Math.cos(noise.angle) * noise.length;
                    particle.velocity.horizontal = Utils.clamp(particle.velocity.horizontal, -1, 1);
                    particle.velocity.vertical += Math.sin(noise.angle) * noise.length;
                    particle.velocity.vertical = Utils.clamp(particle.velocity.vertical, -1, 1);

                    particle.lastNoiseTime -= particle.noiseDelay;
                } else {
                    particle.lastNoiseTime += delta;
                }
            }

            particle.position.x += particle.velocity.horizontal * moveSpeed;
            particle.position.y += particle.velocity.vertical * moveSpeed;

            if (particlesOptions.move.vibrate) {
                particle.position.x += Math.sin(particle.position.x * Math.cos(particle.position.y));
                particle.position.y += Math.cos(particle.position.y * Math.sin(particle.position.x));
            }
        }

        /* parallax */
        this.moveParallax(delta);
    }

    private moveParallax(_delta: number): void {
        const container = this.container;
        const options = container.options;

        if (!options.interactivity.events.onHover.parallax.enable) {
            return;
        }

        const particle = this.particle;
        const parallaxForce = options.interactivity.events.onHover.parallax.force;
        const mousePos = container.interactivity.mouse.position;

        if (!mousePos) {
            return;
        }

        const windowDimension = {
            height: window.innerHeight / 2,
            width: window.innerWidth / 2,
        };
        const parallaxSmooth = options.interactivity.events.onHover.parallax.smooth;

        /* smaller is the particle, longer is the offset distance */
        const tmp = {
            x: (mousePos.x - windowDimension.width) * (particle.size.value / parallaxForce),
            y: (mousePos.y - windowDimension.height) * (particle.size.value / parallaxForce),
        };

        particle.offset.x += (tmp.x - particle.offset.x) / parallaxSmooth; // Easing equation
        particle.offset.y += (tmp.y - particle.offset.y) / parallaxSmooth; // Easing equation
    }

    private getProximitySpeedFactor(): number {
        const container = this.container;
        const options = container.options;
        const particle = this.particle;
        const active = Utils.isInArray(HoverMode.slow, options.interactivity.events.onHover.mode);

        if (!active) {
            return 1;
        }

        const mousePos = this.container.interactivity.mouse.position;

        if (!mousePos) {
            return 1;
        }

        const particlePos = particle.getPosition();

        const dist = Utils.getDistance(mousePos, particlePos);
        const radius = container.retina.slowModeRadius;

        if (dist > radius) {
            return 1;
        }

        const proximityFactor = dist / radius || 0;
        const slowFactor = options.interactivity.modes.slow.factor;

        return proximityFactor / slowFactor;
    }
}
