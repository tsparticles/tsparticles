
import type { ICoordinates } from "../../src/Interfaces/ICoordinates";
import { Particle } from "../../src/Classes/Particle";

export class TestParticle {

    /**
     * A function that will be passed to [[Array.sort]] to sort particles.
     * It orders them in increasing order based on position, giving priority
     * to x and then y.
     *
     * @param particle1
     * @param particle2
     */
    public static sort(particle1: Particle, particle2: Particle) : number {
        const position1 = particle1.position;
        const position2 = particle2.position;

        if(position1.x === position2.x) {
            if(position1.y < position2.y) {
                return -1;
            } else if(position1.y > position2.y) {
                return 1;
            } else {
                return 0;
            }
        } else if(position1.x < position2.x) {
            return -1;
        } else if(position1.x > position2.x) {
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
    public static sortedPositions(particles: Particle[]) : ICoordinates[] {
        return particles
            .sort(this.sort)
            .map((particle) => particle.position);
    }

    /**
     * Sorts the particle and distance objects, then returns a new array
     * of objects and contains the distances and the particle positions.
     *
     * @param queryResults
     */
    public static sortedPositionsWithDistances(queryResults: { distance: number, particle: Particle }[]) : { distance: number, position: ICoordinates }[] {
        return queryResults
            .sort((result1: { distance: number, particle: Particle }, result2: { distance: number, particle: Particle }): number => {
                return TestParticle.sort(result1.particle, result2.particle);
            })
            .map((sortedResult) => {
                return {
                    distance: sortedResult.distance,
                    position: sortedResult.particle.position
                };
            });
    }

}