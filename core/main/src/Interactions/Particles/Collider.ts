import type { Particle } from "../../Core/Particle";
import type { Container } from "../../Core/Container";
import { CollisionMode } from "../../Enums";
import type { IParticlesInteractor } from "../../Core/Interfaces/IParticlesInteractor";
import { NumberUtils } from "../../Utils";

/**
 * @category Interactions
 */
export class Collider implements IParticlesInteractor {
    constructor(private readonly container: Container) {}

    private static bounce(p1: Particle, p2: Particle): void {
        const pos1 = p1.getPosition();
        const pos2 = p2.getPosition();

        const xVelocityDiff = p1.velocity.horizontal - p2.velocity.horizontal;
        const yVelocityDiff = p1.velocity.vertical - p2.velocity.vertical;

        const xDist = pos2.x - pos1.x;
        const yDist = pos2.y - pos1.y;

        // Prevent accidental overlap of particles
        if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {
            // Grab angle between the two colliding particles
            const angle = -Math.atan2(pos2.y - pos1.y, pos2.x - pos1.x);

            // Store mass in var for better readability in collision equation
            const m1 = p1.getRadius();
            const m2 = p2.getRadius();

            // Velocity before equation
            const u1 = NumberUtils.rotateVelocity(p1.velocity, angle);
            const u2 = NumberUtils.rotateVelocity(p2.velocity, angle);

            // Velocity after 1d collision equation
            const v1 = NumberUtils.collisionVelocity(u1, u2, m1, m2);
            const v2 = NumberUtils.collisionVelocity(u2, u1, m1, m2);

            // Final velocity after rotating axis back to original location
            const vFinal1 = NumberUtils.rotateVelocity(v1, -angle);
            const vFinal2 = NumberUtils.rotateVelocity(v2, -angle);

            // Swap particle velocities for realistic bounce effect
            const bounce1 = p1.particlesOptions.collisions.bounce;
            const bounce2 = p2.particlesOptions.collisions.bounce;

            p1.velocity.horizontal = vFinal1.horizontal * NumberUtils.getValue(bounce1.horizontal);
            p1.velocity.vertical = vFinal1.vertical * NumberUtils.getValue(bounce1.vertical);

            p2.velocity.horizontal = vFinal2.horizontal * NumberUtils.getValue(bounce2.horizontal);
            p2.velocity.vertical = vFinal2.vertical * NumberUtils.getValue(bounce2.vertical);
        }
    }

    private static destroy(p1: Particle, p2: Particle): void {
        if (p1.getRadius() === undefined && p2.getRadius() !== undefined) {
            p1.destroy();
        } else if (p1.getRadius() !== undefined && p2.getRadius() === undefined) {
            p2.destroy();
        } else if (p1.getRadius() !== undefined && p2.getRadius() !== undefined) {
            if (p1.getRadius() >= p2.getRadius()) {
                p2.destroy();
            } else {
                p1.destroy();
            }
        }
    }

    public isEnabled(particle: Particle): boolean {
        return particle.particlesOptions.collisions.enable;
    }

    public reset(): void {
        // do nothing
    }

    public interact(p1: Particle): void {
        const container = this.container;
        const pos1 = p1.getPosition();

        const query = container.particles.quadTree.queryCircle(pos1, p1.getRadius() * 2);

        for (const p2 of query) {
            if (
                p1 === p2 ||
                !p2.particlesOptions.collisions.enable ||
                p1.particlesOptions.collisions.mode !== p2.particlesOptions.collisions.mode ||
                p2.destroyed ||
                p2.spawning
            ) {
                continue;
            }

            const pos2 = p2.getPosition();
            const dist = NumberUtils.getDistance(pos1, pos2);
            const radius1 = p1.getRadius();
            const radius2 = p2.getRadius();
            const distP = radius1 + radius2;

            if (dist <= distP) {
                this.resolveCollision(p1, p2);
            }
        }
    }

    private resolveCollision(p1: Particle, p2: Particle): void {
        switch (p1.particlesOptions.collisions.mode) {
            case CollisionMode.absorb: {
                this.absorb(p1, p2);
                break;
            }
            case CollisionMode.bounce: {
                Collider.bounce(p1, p2);
                break;
            }
            case CollisionMode.destroy: {
                Collider.destroy(p1, p2);
                break;
            }
        }
    }

    private absorb(p1: Particle, p2: Particle): void {
        const container = this.container;
        const fps = container.options.fpsLimit / 1000;

        if (p1.getRadius() === undefined && p2.getRadius() !== undefined) {
            p1.destroy();
        } else if (p1.getRadius() !== undefined && p2.getRadius() === undefined) {
            p2.destroy();
        } else if (p1.getRadius() !== undefined && p2.getRadius() !== undefined) {
            if (p1.getRadius() >= p2.getRadius()) {
                const factor = NumberUtils.clamp(p1.getRadius() / p2.getRadius(), 0, p2.getRadius()) * fps;

                p1.size.value += factor;
                p2.size.value -= factor;

                if (p2.getRadius() <= container.retina.pixelRatio) {
                    p2.size.value = 0;
                    p2.destroy();
                }
            } else {
                const factor = NumberUtils.clamp(p2.getRadius() / p1.getRadius(), 0, p1.getRadius()) * fps;

                p1.size.value -= factor;
                p2.size.value += factor;

                if (p1.getRadius() <= container.retina.pixelRatio) {
                    p1.size.value = 0;
                    p1.destroy();
                }
            }
        }
    }
}
