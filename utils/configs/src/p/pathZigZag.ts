import type { ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
    key: "pathZigZag",
    name: "Path Zig Zag",
    particles: {
        color: {
            value: ["#ffffff", "#ff0000", "#00ff00", "#0000ff"],
        },
        move: {
            enable: true,
            outModes: "out",
            speed: { min: 1, max: 3 },
            path: {
                enable: true,
                options: {
                    waveLength: { min: 3, max: 7 },
                    waveHeight: { min: 1, max: 5 },
                },
                generator: "zigZagPathGenerator",
            },
            trail: {
                enable: true,
                length: 20,
                fill: {
                    color: "#000000",
                },
            },
        },
        number: {
            value: 80,
        },
        opacity: {
            value: 1,
        },
        shape: {
            type: "circle",
        },
        size: {
            value: 3,
        },
    },
    background: {
        color: "#000000",
    },
};

export default options;
