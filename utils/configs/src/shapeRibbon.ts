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
        },
        opacity: {
            value: 1,
        },
        size: {
            value: {
                min: 30,
                max: 50,
            },
        },
        move: {
            enable: true,
            speed: 6,
        },
    },
    background: {
        color: "#000000",
    },
};

export default options;
