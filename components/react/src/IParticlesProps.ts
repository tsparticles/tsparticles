import type { RefObject } from "react";
import type { Container, ISourceOptions } from "tsparticles";
import type { CSSProperties } from "react";
import type { Main } from "tsparticles/dist/main";

export interface IParticlesProps {
    id?: string;
    width?: string;
    height?: string;
    options?: ISourceOptions;
    params?: ISourceOptions;
    url?: string;
    style?: CSSProperties;
    className?: string;
    canvasClassName?: string;
    container?: RefObject<Container>;
    init?: (tsParticles: Main) => void;
}
