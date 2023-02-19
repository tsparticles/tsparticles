import type { ISourceOptions } from "tsparticles-engine";

export const options: ISourceOptions = {
    background: {
        color: "#000000",
    },
    particles: {
        number: {
            value: 100,
        },
        links: {
            distance: 125,
            enable: true,
            triangles: {
                enable: true,
                opacity: 0.1,
            },
        },
        move: {
            enable: true,
            speed: 5,
        },
        size: {
            value: 1,
        },
        shape: {
            type: "circle",
        },
    },
};
