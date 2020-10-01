import type { CSSProperties, RefObject } from "react";
import type { IOptions, RecursivePartial, Container } from "tsparticles";

export interface IParticlesProps {
    id: string;
    width: string;
    height: string;
    options: RecursivePartial<IOptions>;
    params?: RecursivePartial<IOptions>;
    style: CSSProperties;
    className?: string;
    canvasClassName?: string;
    container?: RefObject<Container>;
}
