import type { ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
    key: "effectTrailTransform",
    name: "Effect Trail Transform",
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
                    transform: true,
                },
            },
        },
        shape: {
            type: "square",
        },
        size: {
            value: 10,
        },
        move: {
            enable: true,
            speed: { min: 6, max: 15 },
        },
        tilt: {
            direction: "random",
            enable: true,
            value: { min: 0, max: 360 },
            animation: {
                enable: true,
                speed: 60,
                sync: true,
            },
        },
    },
    background: {
        color: "#000000",
    },
};

export default options;
