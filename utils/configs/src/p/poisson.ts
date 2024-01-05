import type { ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
    key: "poisson",
    name: "Poisson",
    particles: {
        number: {
            value: 100,
        },
        color: {
            value: "#ffffff",
        },
        links: {
            enable: true,
            distance: 200,
        },
        shape: {
            type: "circle",
        },
        opacity: {
            value: 1,
        },
        size: {
            value: {
                min: 4,
                max: 6,
            },
        },
        move: {
            enable: true,
            speed: 2,
        },
    },
    background: {
        color: "#000000",
    },
    poisson: {
        enable: true,
    },
};

export default options;
