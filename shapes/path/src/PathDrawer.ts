import { type Container, type IShapeDrawData, type IShapeDrawer, deepExtend } from "@tsparticles/engine";
import type { IPathData } from "./IPathData.js";
import type { PathParticle } from "./PathParticle.js";

export class PathDrawer implements IShapeDrawer<PathParticle> {
    async draw(data: IShapeDrawData<PathParticle>): Promise<void> {
        const { context, particle, radius } = data;

        if (!particle.pathData) {
            return;
        }

        const { drawPath } = await import("./Utils.js");

        drawPath(context, radius, particle.pathData);
    }

    async particleInit(container: Container, particle: PathParticle): Promise<void> {
        const shape = particle.shapeData as IPathData | undefined;

        if (!shape) {
            return;
        }

        particle.pathData = deepExtend({}, shape) as IPathData;

        await Promise.resolve();
    }
}
