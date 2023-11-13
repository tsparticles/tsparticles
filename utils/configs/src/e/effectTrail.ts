import type { ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
    name: "Effect Trail",
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
        effect: {
            type: "trail",
        },
        shape: {
            type: "circle",
        },
        size: {
            value: 5,
        },
        move: {
            path: {
                enable: true,
                options: {
                    size: 32,
                    draw: false,
                    increment: 0.004,
                },
                generator: "simplexNoise",
            },
            enable: true,
            speed: 6,
        },
    },
    background: {
        color: "#000000",
    },
};

export default options;
