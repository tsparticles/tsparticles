import { Utils } from "../../Utils/Utils";
import { Particle } from "../../Particle";
import { Container } from "../../Container";
import { IParticle } from "../../../Interfaces/IParticle";
import { IVelocity } from "../../../Interfaces/IVelocity";
import { CollisionMode } from "../../../Enums/CollisionMode";

export class Collider {
    public static collide(p1: Particle, container: Container): void {
        for (const p2 of container.particles.spatialGrid.queryRadius(p1.position, p1.size.value * 2)) {
            if (p1 === p2 || !p2.particlesOptions.collisions.enable ||
                p1.particlesOptions.collisions.mode !== p2.particlesOptions.collisions.mode) {
                continue;
            }

            const pos1 = {
                x: p1.position.x + p1.offset.x,
                y: p1.position.y + p1.offset.y
            };
            const pos2 = {
                x: p2.position.x + p2.offset.x,
                y: p2.position.y + p2.offset.y
            };
            const dist = Utils.getDistanceBetweenCoordinates(pos1, pos2);
            const defaultSize = container.retina.sizeValue;
            const radius1 = this.getRadius(p1, defaultSize);
            const radius2 = this.getRadius(p2, defaultSize);
            const distP = radius1 + radius2;

            if (dist <= distP) {
                this.resolveCollision(p1, p2);
            }
        }
    }

    private static getRadius(particle: IParticle, fallback: number): number {
        return particle.bubble.radius || particle.size.value || fallback;
    }

    private static resolveCollision(p1: Particle, p2: Particle): void {
        const pos1 = {
            x: p1.position.x + p1.offset.x,
            y: p1.position.y + p1.offset.y
        };
        const pos2 = {
            x: p2.position.x + p2.offset.x,
            y: p2.position.y + p2.offset.y
        };

        switch (p1.particlesOptions.collisions.mode) {
            case CollisionMode.bounce:
                const xVelocityDiff = p1.velocity.horizontal - p2.velocity.horizontal;
                const yVelocityDiff = p1.velocity.vertical - p2.velocity.vertical;

                const xDist = pos2.x - pos1.x;
                const yDist = pos2.y - pos1.y;

                // Prevent accidental overlap of particles
                if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {

                    // Grab angle between the two colliding particles
                    const angle = -Math.atan2(pos2.y - pos1.y,
                        pos2.x - pos1.x);

                    // Store mass in var for better readability in collision equation
                    const m1 = p1.size.value;
                    const m2 = p2.size.value;

                    // Velocity before equation
                    const u1 = this.rotate(p1.velocity, angle);
                    const u2 = this.rotate(p2.velocity, angle);

                    // Velocity after 1d collision equation
                    const v1 = {
                        horizontal: u1.horizontal * (m1 - m2) / (m1 + m2) + u2.horizontal * 2 * m2 / (m1 + m2),
                        vertical: u1.vertical,
                    };
                    const v2 = {
                        horizontal: u2.horizontal * (m1 - m2) / (m1 + m2) + u1.horizontal * 2 * m2 / (m1 + m2),
                        vertical: u2.vertical,
                    };

                    // Final velocity after rotating axis back to original location
                    const vFinal1 = this.rotate(v1, -angle);
                    const vFinal2 = this.rotate(v2, -angle);

                    // Swap particle velocities for realistic bounce effect
                    p1.velocity.horizontal = vFinal1.horizontal;
                    p1.velocity.vertical = vFinal1.vertical;

                    p2.velocity.horizontal = vFinal2.horizontal;
                    p2.velocity.vertical = vFinal2.vertical;
                }
        }
    }

    private static rotate(velocity: IVelocity, angle: number): IVelocity {
        return {
            horizontal: velocity.horizontal * Math.cos(angle) - velocity.vertical * Math.sin(angle),
            vertical: velocity.horizontal * Math.sin(angle) + velocity.vertical * Math.cos(angle),
        };
    }
}
