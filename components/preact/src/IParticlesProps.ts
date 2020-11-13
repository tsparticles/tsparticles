import type { RefObject } from "react";
import type { ISourceOptions, Container } from "tsparticles";
import type { Main } from "tsparticles";

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
    init?: (tsParticles: Main) => void;
}
