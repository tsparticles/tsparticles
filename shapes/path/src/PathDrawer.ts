import { type Container, type IShapeDrawData, type IShapeDrawer, deepExtend } from "@tsparticles/engine";
import type { IPathData } from "./IPathData.js";
import type { PathParticle } from "./PathParticle.js";
import { drawPath } from "./Utils.js";

export class PathDrawer implements IShapeDrawer<PathParticle> {
    readonly validTypes = ["path"] as const;

    draw(data: IShapeDrawData<PathParticle>): void {
        const { context, particle, radius } = data;

        if (!particle.pathData) {
            return;
        }

        drawPath(context, radius, particle.pathData);
    }

    particleInit(container: Container, particle: PathParticle): void {
        const shape = particle.shapeData as IPathData | undefined;

        if (!shape) {
            return;
        }

        particle.pathData = deepExtend({}, shape) as IPathData;
    }
}
