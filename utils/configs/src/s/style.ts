import type { ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
    key: "style",
    name: "Style",
    particles: {
        number: {
            value: 200,
            limit: { value: 200 },
        },
        color: {
            value: ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff", "#00ffff"],
            animation: {
                enable: true,
                speed: 20,
                sync: false,
            },
        },
        shape: {
            type: ["circle", "square", "triangle", "star", "polygon"],
        },
        opacity: {
            value: 0.5,
        },
        size: {
            value: {
                min: 50,
                max: 100,
            },
        },
        move: {
            enable: true,
            speed: 6,
            direction: "none",
            trail: {
                enable: true,
                length: 50,
                fill: {
                    color: "#000",
                },
            },
            path: {
                enable: true,
                delay: {
                    value: 0.1,
                },
                options: {
                    size: 50,
                    draw: false,
                    increment: 0.001,
                },
                generator: "perlinNoise",
            },
        },
    },
    interactivity: {
        events: {
            onHover: {
                enable: true,
                mode: "trail",
            },
            onClick: {
                enable: true,
                mode: "push",
            },
        },
        modes: {
            push: {
                quantity: 4,
            },
            trail: {
                delay: 0.1,
                pauseOnStop: true,
            },
        },
    },
    background: {
        color: "#000000",
    },
    style: {
        filter: "blur(50px)",
    },
};
export default options;
