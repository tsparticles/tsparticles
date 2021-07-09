import type { Particle } from "../../Core/Particle";
import type { Container } from "../../Core/Container";
import { CollisionMode } from "../../Enums";
import { circleBounce, circleBounceDataFromParticle, clamp, getDistance } from "../../Utils";
import { ParticlesInteractorBase } from "../../Core/ParticlesInteractorBase";

function bounce(p1: Particle, p2: Particle): void {
    circleBounce(circleBounceDataFromParticle(p1), circleBounceDataFromParticle(p2));
}

function destroy(p1: Particle, p2: Particle): void {
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

/**
 * @category Interactions
 */
export class Collider extends ParticlesInteractorBase {
    constructor(container: Container) {
        super(container);
    }

    isEnabled(particle: Particle): boolean {
        return particle.options.collisions.enable;
    }

    reset(): void {
        // do nothing
    }

    interact(p1: Particle): void {
        const container = this.container;
        const pos1 = p1.getPosition();

        const query = container.particles.quadTree.queryCircle(pos1, p1.getRadius() * 2);

        for (const p2 of query) {
            if (
                p1 === p2 ||
                !p2.options.collisions.enable ||
                p1.options.collisions.mode !== p2.options.collisions.mode ||
                p2.destroyed ||
                p2.spawning
            ) {
                continue;
            }

            const pos2 = p2.getPosition();
            const dist = getDistance(pos1, pos2);
            const radius1 = p1.getRadius();
            const radius2 = p2.getRadius();
            const distP = radius1 + radius2;

            if (dist <= distP) {
                this.resolveCollision(p1, p2);
            }
        }
    }

    private resolveCollision(p1: Particle, p2: Particle): void {
        switch (p1.options.collisions.mode) {
            case CollisionMode.absorb: {
                this.absorb(p1, p2);
                break;
            }
            case CollisionMode.bounce: {
                bounce(p1, p2);
                break;
            }
            case CollisionMode.destroy: {
                destroy(p1, p2);
                break;
            }
        }
    }

    private absorb(p1: Particle, p2: Particle): void {
        const container = this.container;
        const fps = container.actualOptions.fpsLimit / 1000;

        if (p1.getRadius() === undefined && p2.getRadius() !== undefined) {
            p1.destroy();
        } else if (p1.getRadius() !== undefined && p2.getRadius() === undefined) {
            p2.destroy();
        } else if (p1.getRadius() !== undefined && p2.getRadius() !== undefined) {
            if (p1.getRadius() >= p2.getRadius()) {
                const factor = clamp(p1.getRadius() / p2.getRadius(), 0, p2.getRadius()) * fps;

                p1.size.value += factor;
                p2.size.value -= factor;

                if (p2.getRadius() <= container.retina.pixelRatio) {
                    p2.size.value = 0;
                    p2.destroy();
                }
            } else {
                const factor = clamp(p2.getRadius() / p1.getRadius(), 0, p1.getRadius()) * fps;

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
