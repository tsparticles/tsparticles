import type { RefObject } from "react";
import type { ISourceOptions, Container } from "tsparticles";

export interface IParticlesProps {
    id?: string;
    width?: string;
    height?: string;
    options?: ISourceOptions;
    params?: ISourceOptions;
    style?: React.JSX.CSSProperties;
    className?: string;
    canvasClassName?: string;
    container?: RefObject<Container>;
}
