import type { ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
    key: "shapeSpiral",
    name: "Shape Spiral",
    particles: {
        number: {
            value: 80,
            density: {
                enable: true,
            },
        },
        stroke: {
            color: {
                value: "#ff0000",
                animation: {
                    enable: true,
                    speed: 20,
                    sync: true,
                },
            },
            width: 1,
        },
        shape: {
            type: "spiral",
            options: {
                spiral: {
                    innerRadius: 0.5,
                    lineSpacing: 0.5,
                    fill: false,
                    close: false,
                },
            },
        },
        opacity: {
            value: 0.5,
        },
        size: {
            value: {
                min: 5,
                max: 10,
            },
        },
        links: {
            enable: false,
            distance: 100,
            color: "#ffffff",
            opacity: 0.4,
            width: 1,
        },
        rotate: {
            animation: {
                enable: true,
                speed: 20,
                sync: false,
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
