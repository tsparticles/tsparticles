import { Circle, Utils } from "../../../../Utils";
import { Particle } from "../../../Particle";
import type { Container } from "../../../Container";
import type { IParticle } from "../../../Interfaces/IParticle";
import type { IVelocity } from "../../../Interfaces/IVelocity";
import { CollisionMode } from "../../../../Enums";
import type { IParticlesInteractor } from "../../../Interfaces/IParticlesInteractor";

export class Collider implements IParticlesInteractor {
    constructor(private readonly container: Container) {}

    private static rotate(velocity: IVelocity, angle: number): IVelocity {
        return {
            horizontal: velocity.horizontal * Math.cos(angle) - velocity.vertical * Math.sin(angle),
            vertical: velocity.horizontal * Math.sin(angle) + velocity.vertical * Math.cos(angle),
        };
    }

    private static collisionVelocity(v1: IVelocity, v2: IVelocity, m1: number, m2: number): IVelocity {
        return {
            horizontal: (v1.horizontal * (m1 - m2)) / (m1 + m2) + (v2.horizontal * 2 * m2) / (m1 + m2),
            vertical: v1.vertical,
        };
    }

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
            const m1 = p1.size.value;
            const m2 = p2.size.value;

            // Velocity before equation
            const u1 = Collider.rotate(p1.velocity, angle);
            const u2 = Collider.rotate(p2.velocity, angle);

            // Velocity after 1d collision equation
            const v1 = Collider.collisionVelocity(u1, u2, m1, m2);
            const v2 = Collider.collisionVelocity(u2, u1, m1, m2);

            // Final velocity after rotating axis back to original location
            const vFinal1 = Collider.rotate(v1, -angle);
            const vFinal2 = Collider.rotate(v2, -angle);

            // Swap particle velocities for realistic bounce effect
            p1.velocity.horizontal = vFinal1.horizontal;
            p1.velocity.vertical = vFinal1.vertical;

            p2.velocity.horizontal = vFinal2.horizontal;
            p2.velocity.vertical = vFinal2.vertical;
        }
    }

    private static destroy(p1: Particle, p2: Particle): void {
        if (p1.size.value === undefined && p2.size.value !== undefined) {
            p1.destroy();
        } else if (p1.size.value !== undefined && p2.size.value === undefined) {
            p2.destroy();
        } else if (p1.size.value !== undefined && p2.size.value !== undefined) {
            if (p1.size.value >= p2.size.value) {
                p2.destroy();
            } else {
                p1.destroy();
            }
        }
    }

    private static getRadius(particle: IParticle, fallback: number): number {
        return particle.bubble.radius || particle.size.value || fallback;
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

        //const query = container.particles.spatialGrid.queryRadius(pos1, p1.size.value * 2);
        const query = container.particles.quadTree.query(new Circle(pos1.x, pos1.y, p1.size.value * 2));

        for (const p2 of query) {
            if (
                p1 === p2 ||
                !p2.particlesOptions.collisions.enable ||
                p1.particlesOptions.collisions.mode !== p2.particlesOptions.collisions.mode
            ) {
                continue;
            }

            const pos2 = p2.getPosition();
            const dist = Utils.getDistance(pos1, pos2);
            const defaultSize = container.retina.sizeValue;
            const radius1 = Collider.getRadius(p1, defaultSize);
            const radius2 = Collider.getRadius(p2, defaultSize);
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

        if (p1.size.value === undefined && p2.size.value !== undefined) {
            p1.destroy();
        } else if (p1.size.value !== undefined && p2.size.value === undefined) {
            p2.destroy();
        } else if (p1.size.value !== undefined && p2.size.value !== undefined) {
            if (p1.size.value >= p2.size.value) {
                const factor = Utils.clamp(p1.size.value / p2.size.value, 0, p2.size.value) * fps;

                p1.size.value += factor;
                p2.size.value -= factor;

                if (p2.size.value <= container.retina.pixelRatio) {
                    p2.size.value = 0;
                    p2.destroy();
                }
            } else {
                const factor = Utils.clamp(p2.size.value / p1.size.value, 0, p1.size.value) * fps;

                p1.size.value -= factor;
                p2.size.value += factor;

                if (p1.size.value <= container.retina.pixelRatio) {
                    p1.size.value = 0;
                    p1.destroy();
                }
            }
        }
    }
}
