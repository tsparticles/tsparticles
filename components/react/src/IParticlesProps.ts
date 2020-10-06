import type { RefObject } from "react";
import type { Container, ISourceOptions } from "tsparticles";
import type { CSSProperties } from "react";

export interface IParticlesProps {
    id?: string;
    width?: string;
    height?: string;
    options?: ISourceOptions;
    params?: ISourceOptions;
    style?: CSSProperties;
    className?: string;
    canvasClassName?: string;
    container?: RefObject<Container>;
}
