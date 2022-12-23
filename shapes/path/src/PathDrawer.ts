import type { Container, IShapeDrawer } from "tsparticles-engine";
import type { IPathData } from "./IPathData";
import type { PathParticle } from "./PathParticle";
import { deepExtend } from "tsparticles-engine";
import { drawPath } from "./Utils";

export class PathDrawer implements IShapeDrawer {
    draw(context: CanvasRenderingContext2D, particle: PathParticle, radius: number): void {
        if (!particle.pathData) {
            return;
        }

        drawPath(context, radius, particle.pathData);
    }

    particleInit(container: Container, particle: PathParticle): void {
        const shape = particle.shapeData as IPathData;

        if (!shape) {
            return;
        }

        particle.pathData = deepExtend({}, shape) as IPathData;
    }
}
