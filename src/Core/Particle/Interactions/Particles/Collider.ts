import { Utils } from "../../../../Utils/Utils";
import { Particle } from "../../../Particle";
import type { Container } from "../../../Container";
import type { IParticle } from "../../../Interfaces/IParticle";
import type { IVelocity } from "../../../Interfaces/IVelocity";
import { CollisionMode } from "../../../../Enums/CollisionMode";
import { Circle } from "../../../../Utils/Circle";

export class Collider {
    public static collide(p1: Particle, container: Container, _delta: number): void {
        const pos1 = p1.getPosition();

        //const query = container.particles.spatialGrid.queryRadius(pos1, p1.size.value * 2);
        const query = container.particles.quadTree.query(new Circle(pos1.x, pos1.y, p1.size.value * 2));

        for (const p2 of query) {
            if (p1 === p2 || !p2.particlesOptions.collisions.enable ||
                p1.particlesOptions.collisions.mode !== p2.particlesOptions.collisions.mode) {
                continue;
            }

            const pos2 = p2.getPosition();
            const dist = Utils.getDistance(pos1, pos2);
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
        const pos1 = p1.getPosition();
        const pos2 = p2.getPosition();

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
