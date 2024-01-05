import type { ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
    key: "lightHover",
    name: "Light Hover",
    particles: {
        number: {
            value: 30,
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
            type: ["circle", "square"],
        },
        opacity: {
            value: 1,
        },
        size: {
            value: {
                min: 15,
                max: 30,
            },
        },
        rotate: {
            value: 0,
            direction: "clockwise",
            animation: {
                speed: 5,
                enable: true,
            },
        },
        move: {
            enable: true,
            speed: 6,
            direction: "none",
        },
    },
    interactivity: {
        events: {
            onHover: {
                enable: true,
                mode: "light",
            },
        },
        modes: {
            light: {
                area: {
                    gradient: {
                        start: "3b5e98",
                        stop: "#17163e",
                    },
                },
                shadow: {
                    color: "#17163e",
                },
            },
        },
    },
    background: {
        color: "#17163e",
    },
};

export default options;
