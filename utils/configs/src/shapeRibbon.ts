import type { ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
    name: "Shape Ribbon",
    particles: {
        number: {
            value: 80,
            density: {
                enable: true,
            },
        },
        color: {
            value: "#ff0000",
            animation: {
                enable: true,
                speed: 20,
                sync: true,
            },
        },
        shape: {
            type: "ribbon",
            options: {
                ribbon: {
                    distance: 4,
                    length: 30,
                },
            },
        },
        opacity: {
            value: 1,
        },
        size: {
            value: 4,
        },
        move: {
            enable: true,
            speed: 6,
        },
        roll: {
            darken: {
                enable: true,
                value: 30,
            },
            enlighten: {
                enable: true,
                value: 30,
            },
            enable: true,
            mode: "horizontal",
            speed: 0,
            value: 0,
        },
    },
    background: {
        color: "#000000",
    },
};

export default options;
