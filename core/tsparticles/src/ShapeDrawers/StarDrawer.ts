import type { IParticle } from "../Core/Interfaces/IParticle";
import type { IShapeDrawer } from "../Core/Interfaces/IShapeDrawer";
import type { IStarShape } from "../Options/Interfaces/Particles/Shape/IStarShape";

export class StarDrawer implements IShapeDrawer {
    public draw(context: CanvasRenderingContext2D, particle: IParticle, radius: number): void {
        const star = particle.shapeData as IStarShape;
        const sides = star?.sides ?? star?.nb_sides ?? 5;
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
