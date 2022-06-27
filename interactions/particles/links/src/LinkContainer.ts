import type { Container, IRgb } from "tsparticles-engine";

export type LinkContainer = Container & {
    particles: {
        linksColors: Map<string, IRgb | string | undefined>;
        linksColor?: IRgb | string;
    };
};
