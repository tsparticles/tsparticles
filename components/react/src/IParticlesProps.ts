import type { RefObject } from "react";
import type { Container, IOptions, RecursivePartial } from "tsparticles";
import type { CSSProperties } from "react";

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
