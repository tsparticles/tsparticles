import type { ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
    key: "bubble",
    name: "Bubble",
    particles: {
        number: {
            value: 6,
            density: {
                enable: true,
            },
        },
        color: {
            value: "#1b1e34",
        },
        shape: {
            type: "polygon",
            options: {
                polygon: {
                    sides: 6,
                },
            },
        },
        opacity: {
            value: {
                min: 0.3,
                max: 0.5,
            },
        },
        size: {
            value: {
                min: 100,
                max: 160,
            },
        },
        links: {
            enable: false,
            distance: 200,
            color: "#ffffff",
            opacity: 1,
            width: 2,
        },
        move: {
            enable: true,
            speed: 8,
        },
    },
    interactivity: {
        events: {
            onHover: {
                enable: true,
                mode: "bubble",
            },
            onClick: {
                enable: false,
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
                duration: 2,
                size: 40,
                opacity: 0.8,
                color: "#ff0000",
                mix: true,
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
        color: "#efefef",
    },
};
export default options;
