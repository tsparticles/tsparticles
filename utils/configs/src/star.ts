import type { ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
    name: "Star",
    particles: {
        number: {
            value: 10,
            density: {
                enable: false,
            },
        },
        color: {
            value: "#fff",
        },
        shape: {
            type: "star",
            options: {
                star: {
                    sides: 5,
                },
            },
        },
        opacity: {
            value: 0.8,
        },
        size: {
            value: 4,
        },
        rotate: {
            value: {
                min: 0,
                max: 360,
            },
            direction: "clockwise",
            animation: {
                enable: true,
                speed: 5,
                sync: false,
            },
        },
        links: {
            enable: true,
            distance: 600,
            color: "#ffffff",
            opacity: 0.4,
            width: 2,
        },
        move: {
            enable: true,
            speed: 2,
        },
    },
    interactivity: {
        events: {
            onHover: {
                enable: true,
                mode: "grab",
            },
            onClick: {
                enable: true,
                mode: "bubble",
            },
        },
        modes: {
            grab: {
                distance: 400,
                links: {
                    opacity: 1,
                    color: "#f00",
                },
            },
            bubble: {
                distance: 400,
                size: 40,
                duration: 2,
                opacity: 8,
                color: "#ffff00",
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
        color: "#111",
    },
};
export default options;
