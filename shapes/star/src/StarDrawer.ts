import type { IParticle, IShapeDrawer } from "tsparticles-engine";
import type { IStarShape } from "./IStarShape";

/**
 * @category Shape Drawers
 */
export class StarDrawer implements IShapeDrawer {
    draw(context: CanvasRenderingContext2D, particle: IParticle, radius: number): void {
        const star = particle.shapeData as IStarShape,
            sides = this.getSidesCount(particle),
            inset = star?.inset ?? 2;

        context.moveTo(0, 0 - radius);

        for (let i = 0; i < sides; i++) {
            context.rotate(Math.PI / sides);
            context.lineTo(0, 0 - radius * inset);
            context.rotate(Math.PI / sides);
            context.lineTo(0, 0 - radius);
        }
    }

    getSidesCount(particle: IParticle): number {
        const star = particle.shapeData as IStarShape;

        return star?.sides ?? star?.nb_sides ?? 5;
    }
}
