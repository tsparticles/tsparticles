import type { ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
    key: "ring",
    name: "Ring",
    particles: {
        number: {
            value: 0,
            limit: { value: 1000 },
        },
        color: {
            value: "#ffffff",
        },
        move: {
            enable: true,
            outModes: {
                default: "destroy",
            },
            speed: 1,
            path: {
                enable: true,
                delay: {
                    value: 0.75,
                },
            },
            trail: {
                enable: true,
                fill: { color: "#031927" },
                length: 1000,
            },
        },
        shape: {
            type: "circle",
        },
        opacity: {
            value: 0.05,
        },
        size: {
            value: 1,
        },
    },
    background: {
        color: "#031927",
    },
    emitters: {
        fill: false,
        shape: {
            type: "circle",
        },
        position: {
            x: 50,
            y: 50,
        },
        size: {
            width: 250,
            height: 250,
            mode: "precise",
        },
        life: {
            delay: 10,
            wait: true,
        },
        rate: {
            delay: 0.1,
            quantity: 10,
        },
        startCount: 1000,
    },
};

export default options;
