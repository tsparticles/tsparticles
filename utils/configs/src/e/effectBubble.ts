import type { ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
    key: "effectBubble",
    name: "Effect Bubble",
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
                speed: 20,
                sync: true,
            },
        },
        effect: {
            type: "bubble",
        },
        shape: {
            type: ["circle", "square"],
        },
        opacity: {
            value: 0.5,
        },
        size: {
            value: {
                min: 5,
                max: 50,
            },
        },
        move: {
            enable: true,
            speed: 6,
        },
    },
    interactivity: {
        events: {
            onHover: {
                enable: true,
                mode: "repulse",
            },
            onClick: {
                enable: true,
                mode: "push",
            },
        },
        modes: {
            grab: {
                distance: 400,
                links: {
                    opacity: 1,
                },
            },
            bubble: {
                distance: 400,
                size: 40,
                duration: 2,
                opacity: 0.8,
            },
            repulse: {
                distance: 200,
            },
            push: {
                quantity: 4,
            },
            remove: {
                quantity: 2,
            },
        },
    },
    background: {
        color: "#000000",
    },
};

export default options;
