import type { ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
    key: "effectTrail",
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
                speed: 360,
                sync: true,
            },
        },
        effect: {
            type: "trail",
            options: {
                trail: {
                    fade: true,
                    length: {
                        min: 10,
                        max: 30,
                    },
                },
            },
        },
        shape: {
            type: "circle",
        },
        size: {
            value: 10,
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
            speed: { min: 6, max: 15 },
        },
    },
    background: {
        color: "#000000",
    },
};

export default options;
