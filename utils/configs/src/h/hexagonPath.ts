import type { ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
    key: "hexagonPath",
    name: "Hexagon Path",
    particles: {
        color: {
            value: "#FF0000",
            animation: {
                enable: true,
                speed: 10,
            },
        },
        move: {
            direction: "none",
            enable: true,
            outModes: {
                default: "destroy",
            },
            path: {
                clamp: false,
                enable: true,
                delay: {
                    value: 0,
                },
                generator: "polygonPathGenerator",
                options: {
                    sides: 6,
                    turnSteps: 30,
                    angle: 30,
                },
            },
            speed: 3,
            trail: {
                fill: { color: "#000" },
                length: 20,
                enable: true,
            },
        },
        number: {
            density: {
                enable: true,
            },
            value: 0,
        },
        opacity: {
            value: 1,
        },
        shape: {
            type: "circle",
        },
        size: {
            value: 2,
        },
    },
    background: {
        color: "#000",
    },
    emitters: {
        direction: "none",
        rate: {
            quantity: 1,
            delay: 0.25,
        },
        size: {
            width: 0,
            height: 0,
        },
        position: {
            x: 50,
            y: 50,
        },
    },
};

export default options;
