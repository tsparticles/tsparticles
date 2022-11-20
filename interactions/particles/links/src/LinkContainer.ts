import type { Container, ICoordinates, IRgb } from "tsparticles-engine";

export type LinkContainer = Container & {
    offsets: ICoordinates[];
    particles: {
        linksColor?: IRgb | string;
        linksColors: Map<string, IRgb | string | undefined>;
    };
};
