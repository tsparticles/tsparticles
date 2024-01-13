import { type Container, type IShapeDrawData, type IShapeDrawer } from "@tsparticles/engine";
import type { IPathData } from "./IPathData.js";
import type { PathParticle } from "./PathParticle.js";
import { drawPath } from "./Utils.js";

export class PathDrawer implements IShapeDrawer<PathParticle> {
    draw(data: IShapeDrawData<PathParticle>): void {
        const { context, particle, radius } = data;

        if (!particle.pathData) {
            return;
        }

        drawPath(context, radius, particle.pathData);
    }

    async particleInit(container: Container, particle: PathParticle): Promise<void> {
        const shape = particle.shapeData as IPathData | undefined;

        if (!shape) {
            return;
        }

        const { deepExtend } = await import("@tsparticles/engine");

        particle.pathData = deepExtend({}, shape) as IPathData;
    }
}
