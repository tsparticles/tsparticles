import type { ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
    key: "divEvents",
    name: "Div Events",
    background: {
        color: "#0d47a1",
    },
    interactivity: {
        events: {
            onDiv: [
                {
                    enable: true,
                    selectors: ".bubble.circle",
                    mode: "bubble",
                    type: "circle",
                },
                {
                    enable: true,
                    selectors: ".repulse.circle",
                    mode: "repulse",
                    type: "circle",
                },
                {
                    enable: true,
                    selectors: ".bubble.rectangle",
                    mode: "bubble",
                    type: "rectangle",
                },
                {
                    enable: true,
                    selectors: ".repulse.rectangle",
                    mode: "repulse",
                    type: "rectangle",
                },
                {
                    enable: true,
                    selectors: ".bounce.circle",
                    mode: "bounce",
                    type: "circle",
                },
                {
                    enable: true,
                    selectors: ".bounce.rectangle",
                    mode: "bounce",
                    type: "rectangle",
                },
            ],
        },
        modes: {
            bubble: {
                distance: 400,
                duration: 2,
                opacity: 0.8,
                size: 6,
                color: "#000000",
            },
            grab: {
                distance: 400,
                links: {
                    opacity: 1,
                },
            },
            push: {
                quantity: 4,
            },
            remove: {
                quantity: 2,
            },
            repulse: {
                distance: 200,
                duration: 0.4,
            },
        },
    },
    particles: {
        color: {
            value: "#ffffff",
        },
        links: {
            color: "#ffffff",
            distance: 150,
            enable: true,
            opacity: 0.4,
            width: 1,
        },
        move: {
            enable: true,
            speed: 2,
        },
        number: {
            density: {
                enable: true,
            },
            value: 80,
        },
        opacity: {
            value: 0.5,
        },
        shape: {
            type: "circle",
        },
        size: {
            value: {
                min: 1,
                max: 5,
            },
        },
    },
    detectRetina: true,
};

export default options;
