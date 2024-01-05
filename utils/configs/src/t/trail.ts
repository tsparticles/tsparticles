import type { ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
    key: "trails",
    name: "Trails",
    background: {
        color: "#000",
    },
    emitters: {
        position: {
            x: 50,
            y: 50,
        },
        size: {
            width: 50,
            height: 50,
            mode: "precise",
        },
        rate: {
            delay: 1,
            quantity: 10,
        },
    },
    particles: {
        number: {
            value: 0,
            limit: { value: 300 },
        },
        color: {
            value: ["#5bc0eb", "#fde74c", "#9bc53d", "#e55934", "#fa7921"],
        },
        shape: {
            type: "circle",
        },
        opacity: {
            value: 1,
        },
        size: {
            value: 3,
        },
        move: {
            enable: true,
            speed: 1,
            outModes: "destroy",
            path: {
                enable: true,
                delay: {
                    value: 0.1,
                },
                options: {
                    size: 20,
                    draw: false,
                    increment: 0.001,
                },
                generator: "perlinNoise",
            },
            trail: {
                enable: true,
                fill: { color: "#000000" },
                length: 20,
            },
        },
    },
    interactivity: {
        events: {
            onHover: {
                enable: false,
                mode: "grab",
            },
            onClick: {
                enable: false,
                mode: "repulse",
            },
        },
        modes: {
            grab: {
                distance: 200,
                links: {
                    opacity: 1,
                },
            },
            bubble: {
                distance: 400,
                size: 40,
                duration: 2,
                opacity: 8,
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
};

export default options;
