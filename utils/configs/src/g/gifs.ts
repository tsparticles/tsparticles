import type { ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
    key: "gifs",
    name: "Gifs",
    interactivity: {
        events: {
            onClick: {
                enable: true,
                mode: "push",
            },
        },
        modes: {
            push: {
                quantity: 4,
            },
        },
    },
    particles: {
        color: {
            value: "#ffffff",
        },
        move: {
            enable: true,
            speed: { min: 1, max: 6 },
        },
        number: {
            value: 20,
            limit: { value: 30 },
        },
        opacity: {
            value: 1,
        },
        rotate: {
            path: true,
        },
        shape: {
            options: {
                image: {
                    gif: true,
                    height: 200,
                    src: "https://particles.js.org/images/mario.gif",
                    width: 200,
                },
            },
            type: "image",
        },
        size: {
            value: {
                min: 32,
                max: 64,
            },
        },
    },
};

export default options;
