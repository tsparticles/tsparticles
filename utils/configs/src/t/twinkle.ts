import type { ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
    key: "twinkle",
    name: "Twinkle",
    particles: {
        number: {
            value: 80,
            density: {
                enable: true,
            },
        },
        color: {
            value: "#ff0000",
        },
        shape: {
            type: "circle",
        },
        opacity: {
            value: {
                min: 0.1,
                max: 0.5,
            },
            animation: {
                enable: true,
                speed: 3,
                sync: false,
            },
        },
        size: {
            value: {
                min: 0.1,
                max: 5,
            },
            animation: {
                enable: true,
                speed: 20,
                sync: false,
            },
        },
        links: {
            enable: true,
            distance: 150,
            color: "#ffffff",
            opacity: 0.4,
            width: 1,
        },
        move: {
            enable: true,
            speed: 2,
        },
        twinkle: {
            particles: {
                enable: true,
                color: "#ffff00",
                frequency: 0.05,
                opacity: 1,
            },
            lines: {
                enable: true,
                color: "#ff0000",
                frequency: 0.005,
                opacity: 1,
            },
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
        color: "#0d47a1",
    },
};
export default options;
