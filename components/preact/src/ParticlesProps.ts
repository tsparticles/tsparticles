import { RefObject } from "react";
import type { Container } from "tsparticles/dist/Core/Container";
import type { IOptions } from "tsparticles/dist/Options/Interfaces/IOptions";
import type { RecursivePartial } from "tsparticles/dist/Types/RecursivePartial";
import type { IPolygonMaskOptions } from "tsparticles/dist/Plugins/PolygonMask/PolygonMaskPlugin";
import type { IAbsorberOptions } from "tsparticles/dist/Plugins/Absorbers/AbsorbersPlugin";
import type { IEmitterOptions } from "tsparticles/dist/Plugins/Emitters/EmittersPlugin";

export interface ParticlesProps {
    id: string;
    width: string;
    height: string;
    options: RecursivePartial<IOptions & IPolygonMaskOptions & IAbsorberOptions & IEmitterOptions>;
    params?: RecursivePartial<IOptions & IPolygonMaskOptions & IAbsorberOptions & IEmitterOptions>;
    style: any;
    className?: string;
    canvasClassName?: string;
    container?: RefObject<Container>;
}
