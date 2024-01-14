import type { ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
    key: "forward",
    name: "Forward",
    particles: {
        number: {
            value: 80,
            density: {
                enable: true,
            },
        },
        rotate: {
            path: true,
        },
        color: {
            value: "#ff0000",
            animation: {
                enable: true,
                speed: 20,
                sync: true,
            },
        },
        stroke: {
            width: 0,
            color: "#000000",
        },
        shape: {
            type: "image",
            options: {
                image: {
                    src: "https://particles.js.org/images/arrow.png",
                    width: 512,
                    height: 512,
                    replaceColor: true,
                },
            },
        },
        opacity: {
            value: 1,
        },
        size: {
            value: {
                min: 1,
                max: 32,
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
        color: "#ffffff",
    },
};

export default options;
