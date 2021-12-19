import type { IParticle, IShapeDrawer, IShapeValues } from "tsparticles-engine";

/**
 * @category Options
 */
export interface IStarShape extends IShapeValues {
    sides: number;

    inset: number;
}

/**
 * @category Shape Drawers
 */
export class StarDrawer implements IShapeDrawer {
    getSidesCount(particle: IParticle): number {
        const star = particle.shapeData as IStarShape;

        return star?.sides ?? star?.nb_sides ?? 5;
    }

    draw(context: CanvasRenderingContext2D, particle: IParticle, radius: number): void {
        const star = particle.shapeData as IStarShape;
        const sides = this.getSidesCount(particle);
        const inset = star?.inset ?? 2;

        context.moveTo(0, 0 - radius);

        for (let i = 0; i < sides; i++) {
            context.rotate(Math.PI / sides);
            context.lineTo(0, 0 - radius * inset);
            context.rotate(Math.PI / sides);
            context.lineTo(0, 0 - radius);
        }
    }
}
