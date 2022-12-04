import type { Container, IRgb } from "tsparticles-engine";

export type LinkContainer = Container & {
    particles: {
        linksColor?: IRgb | string;
        linksColors: Map<string, IRgb | string | undefined>;
    };
};
