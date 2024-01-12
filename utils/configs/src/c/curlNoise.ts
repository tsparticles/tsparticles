import type { ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
    key: "curlNoise",
    name: "Curl Noise",
    particles: {
        number: {
            value: 300,
        },
        color: {
            value: "#ff0000",
            animation: {
                enable: true,
                speed: { min: 60, max: 360 },
                sync: true,
            },
        },
        shape: {
            type: "circle",
        },
        size: {
            value: { min: 1, max: 3 },
        },
        move: {
            path: {
                clamp: false,
                enable: true,
                options: {
                    step: 250,
                    speed: 1,
                },
                delay: {
                    value: 0,
                },
                generator: "curlNoise",
            },
            enable: true,
            speed: { min: 1, max: 3 },
            trail: {
                fill: {
                    color: "#000",
                },
                enable: true,
                length: 1000,
            },
        },
    },
    background: {
        color: "#000000",
    },
};

export default options;
