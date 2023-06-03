import type {
    BackgroundMask,
    Container,
    ICoordinates,
    IDimension,
    IParticlesOptions,
    IRgb,
    Particle,
    ParticlesOptions,
} from "tsparticles-engine";
import type { ILink } from "./Interfaces";
import type { ILinks } from "./Options/Interfaces/ILinks";
import type { Links } from "./Options/Classes/Links";

export type LinkContainer = Container & {
    particles: {
        linksColor?: IRgb | string;
        linksColors: Map<string, IRgb | string | undefined>;
    };
};

export type LinkParticle = Particle & {
    links?: ILink[];
    options: ParticlesLinkOptions;
    retina: {
        linksDistance?: number;
        linksWidth?: number;
    };
};

export type LinkLineDrawParams = {
    backgroundMask: BackgroundMask;
    begin: ICoordinates;
    canvasSize: IDimension;
    colorLine: IRgb;
    context: CanvasRenderingContext2D;
    end: ICoordinates;
    links: Links;
    maxDistance: number;
    opacity: number;
    width: number;
};

export type LinkTriangleDrawParams = {
    backgroundMask: BackgroundMask;
    colorTriangle: IRgb;
    context: CanvasRenderingContext2D;
    opacityTriangle: number;
    pos1: ICoordinates;
    pos2: ICoordinates;
    pos3: ICoordinates;
};

export type IParticlesLinkOptions = IParticlesOptions & {
    /**
     * @deprecated use the new links instead
     */
    lineLinked?: ILinks;

    /**
     * @deprecated use the new links instead
     */
    line_linked?: ILinks;

    links?: ILinks;
};

export type ParticlesLinkOptions = ParticlesOptions & {
    links?: Links;
};
