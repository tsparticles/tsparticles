import type { ICoordinates, IDimension, IRgb } from "@tsparticles/engine";
import type {
    IInteractivityParticlesOptions,
    InteractivityContainer,
    InteractivityEngine,
    InteractivityParticle,
    InteractivityParticlesOptions,
} from "@tsparticles/plugin-interactivity";
import type { ILink } from "./Interfaces.js";
import type { ILinks } from "./Options/Interfaces/ILinks.js";
import type { Links } from "./Options/Classes/Links.js";

export type LinkContainer = InteractivityContainer & {
    particles: {
        linksColor?: IRgb | string;
        linksColors: Map<string, IRgb | string | undefined>;
    };
};

export type LinkParticle = InteractivityParticle & {
    links?: ILink[];
    options: ParticlesLinkOptions;
    retina: {
        linksDistance?: number;
        linksWidth?: number;
    };
};

export interface LinkLineDrawParams {
    begin: ICoordinates;
    canvasSize: IDimension;
    colorLine: IRgb;
    context: CanvasRenderingContext2D;
    end: ICoordinates;
    engine: InteractivityEngine;
    hdr: boolean;
    links: Links;
    maxDistance: number;
    opacity: number;
    width: number;
}

export interface LinkTriangleDrawParams {
    colorTriangle: IRgb;
    context: CanvasRenderingContext2D;
    hdr: boolean;
    opacityTriangle: number;
    pos1: ICoordinates;
    pos2: ICoordinates;
    pos3: ICoordinates;
}

export type IParticlesLinkOptions = IInteractivityParticlesOptions & {
    links?: ILinks;
};

export type ParticlesLinkOptions = InteractivityParticlesOptions & {
    links?: Links;
};
