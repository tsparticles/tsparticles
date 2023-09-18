import { IShapeDrawer, Particle, IDelta } from "tsparticles-engine";

export class CombinedDrawer implements IShapeDrawer {
    private shapes: IShapeDrawer[] = [];

    draw(context: CanvasRenderingContext2D, particle: Particle, radius: number, opacity: number, delta: IDelta): void {
        for (const shape of this.shapes) {
            shape.draw(context, particle, radius, opacity, delta);
        }
    }

    getSidesCount(): number {
        let maxSides = 0;
        for (const shape of this.shapes) {
            const sides = shape.getSidesCount();
            if (sides > maxSides) {
                maxSides = sides;
            }
        }
        return maxSides;
    }
}
