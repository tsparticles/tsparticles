import type { ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
    key: "mouseFollow",
    name: "Mouse Follow",
    background: {
        color: "#000000",
    },
    interactivity: {
        events: {
            onHover: {
                enable: true,
                mode: ["bubble", "connect"],
            },
        },
        modes: {
            bubble: {
                distance: 200,
                duration: 2,
                opacity: 1,
                size: 30,
                color: {
                    value: ["#5bc0eb", "#fde74c", "#9bc53d", "#e55934", "#fa7921"],
                },
            },
            connect: {
                distance: 60,
                links: {
                    opacity: 0.2,
                },
                radius: 200,
            },
        },
    },
    particles: {
        color: {
            value: "#000000",
        },
        move: {
            direction: "none",
            enable: true,
            speed: 2,
        },
        number: {
            density: {
                enable: true,
            },
            value: 300,
        },
        opacity: {
            value: 0,
        },
        shape: {
            type: "circle",
        },
        size: {
            value: {
                min: 10,
                max: 15,
            },
        },
    },
    detectRetina: true,
};

export default options;
