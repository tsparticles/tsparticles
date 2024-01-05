import type { ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
    key: "delayStrokeColor",
    name: "Delay Stroke Color",
    background: {
        color: {
            value: "#000",
        },
    },
    particles: {
        stroke: {
            color: {
                value: "#f00",
                animation: {
                    enable: true,
                    speed: 50,
                    sync: true,
                    delay: {
                        min: 1,
                        max: 3,
                    },
                },
            },
            width: 3,
        },
        number: {
            value: 100,
        },
        size: {
            value: 5,
        },
        opacity: {
            value: 1,
        },
        color: {
            value: "transparent",
        },
        move: {
            enable: true,
        },
        shape: {
            type: ["triangle", "circle", "square"],
        },
    },
};

export default options;
