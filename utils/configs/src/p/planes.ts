import type { ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
    key: "planes",
    name: "Planes",
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
            speed: 6,
        },
        number: {
            density: {
                enable: true,
            },
            value: 80,
        },
        rotate: {
            value: 45,
            path: true,
        },
        opacity: {
            value: 1,
        },
        shape: {
            options: {
                image: {
                    height: 128,
                    src: "https://particles.js.org/images/plane_alt.png",
                    width: 128,
                },
            },
            type: "image",
        },
        size: {
            value: {
                min: 16,
                max: 32,
            },
        },
    },
    detectRetina: true,
};

export default options;
