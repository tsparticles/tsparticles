import type { ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
    key: "gravity",
    name: "Gravity",
    particles: {
        destroy: {
            mode: "split",
            split: {
                count: 1,
                factor: {
                    value: {
                        min: 2,
                        max: 4,
                    },
                },
            },
        },
        color: {
            value: "#ffffff",
        },
        shape: {
            type: "circle",
        },
        opacity: {
            value: 0.5,
        },
        size: {
            value: {
                min: 5,
                max: 15,
            },
        },
        life: {
            duration: {
                sync: true,
                value: 5,
            },
            count: 1,
        },
        move: {
            enable: true,
            gravity: {
                enable: true,
            },
            speed: { min: 5, max: 15 },
            outModes: {
                bottom: "split",
                default: "bounce",
                top: "none",
            },
            trail: {
                enable: true,
                fill: { color: "#000000" },
                length: 10,
            },
        },
    },
    background: {
        color: "#000",
    },
    emitters: {
        direction: "top",
        life: {
            count: 0,
            duration: 3,
            delay: 2,
        },
        position: {
            y: { min: 30, max: 70 },
            x: { min: 30, max: 70 },
        },
        rate: {
            delay: 0.1,
            quantity: 2,
        },
        size: {
            width: 0,
            height: 0,
        },
        particles: {
            bounce: {
                vertical: {
                    value: {
                        min: 0.4,
                        max: 0.6,
                    },
                },
            },
            color: {
                value: [
                    "#5bc0eb",
                    "#fde74c",
                    "#9bc53d",
                    "#e55934",
                    "#fa7921",
                    "#2FF3E0",
                    "#F8D210",
                    "#FA26A0",
                    "#F51720",
                ],
            },
            size: {
                value: {
                    min: 5,
                    max: 10,
                },
            },
            opacity: {
                value: 0.5,
            },
            move: {
                speed: { min: 5, max: 15 },
            },
        },
    },
};
export default options;
