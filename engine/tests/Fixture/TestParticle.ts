import { Container } from "../../src/Core/Container";
import type { ICoordinates, ICoordinates3d } from "../../src/Core/Interfaces/ICoordinates";
import { Particle } from "../../src/Core/Particle";

export class TestParticle {
    private container: Container;
    private position?: ICoordinates;
    public particle?: Particle;

    constructor(container: Container, position?: ICoordinates) {
        this.container = container;
        this.position = position;
        this.particle = container.particles.addParticle(this.position);
    }

    /**
     * When creating a particle, the private method `Particle.calcPosition` ensures
     * the particle is completely inside the canvas. It does this by shifting the
     * position if any part of the particle is outsize the canvas. This function
     * returns random positions of particles that are guaranteed to lie completely
     * inside the canvas.
     *
     * @param container
     */
    public randomPositionInCanvas(container?: Container): ICoordinates3d {
        if (container === undefined) {
            container = this.container;
        }
        const sizeValue = container.actualOptions.particles.size.value;
        const maxValue = typeof sizeValue === "number" ? sizeValue : sizeValue.max;
        const width = container.canvas.size.width;
        const height = container.canvas.size.height;
        let x = width * Math.random();
        x = Math.min(Math.max(x, maxValue * 2), width - maxValue * 2);
        let y = height * Math.random();
        y = Math.min(Math.max(y, maxValue * 2), height - maxValue * 2);
        const z = 0;
        return { x, y, z };
    }

    /**
     * If [[container]] is provided, then the new particle will be initialized with
     * this [[container]]. Otherwise the last-used [[container]] will be used.
     *
     * [[position]] will be used verbatim, even if it is not provided. The last-used
     * [[position]] will not be used.
     *
     * @param container
     * @param position
     */
    public reset(container?: Container, position?: ICoordinates): void {
        if (container !== undefined) {
            this.container = container;
        }
        this.position = position;
        this.particle = this.container.particles.addParticle(this.position);
    }

    /**
     * A function that will be passed to [[Array.sort]] to sort particles.
     * It orders them in increasing order based on position, giving priority
     * to x and then y.
     *
     * @param particle1
     * @param particle2
     */
    public static sort(particle1: Particle, particle2: Particle): number {
        const position1 = particle1.getPosition();
        const position2 = particle2.getPosition();

        if (position1.x === position2.x) {
            if (position1.y < position2.y) {
                return -1;
            } else if (position1.y > position2.y) {
                return 1;
            } else {
                return 0;
            }
        } else if (position1.x < position2.x) {
            return -1;
        } else if (position1.x > position2.x) {
            return 1;
        } else {
            return 0;
        }
    }

    /**
     * Sorts the particles and then returns their positions.
     *
     * @param particles
     */
    public static sortedPositions(particles: Particle[]): ICoordinates[] {
        return particles.sort(TestParticle.sort).map((particle) => particle.getPosition());
    }

    /**
     * Sorts the particle and distance objects, then returns a new array
     * of objects and contains the distances and the particle positions.
     *
     * @param queryResults
     */
    public static sortedPositionsWithDistances(
        queryResults: { distance: number; particle: Particle }[]
    ): { distance: number; position: ICoordinates }[] {
        return queryResults
            .sort(
                (
                    result1: { distance: number; particle: Particle },
                    result2: { distance: number; particle: Particle }
                ): number => {
                    return TestParticle.sort(result1.particle, result2.particle);
                }
            )
            .map((sortedResult) => {
                return {
                    distance: sortedResult.distance,
                    position: sortedResult.particle.getPosition(),
                };
            });
    }
}
