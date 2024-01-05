import type { ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
    key: "noisePlanes",
    name: "Noise Planes",
    background: {
        color: "#000",
    },
    interactivity: {
        events: {
            onClick: {
                enable: true,
                mode: "push",
            },
        },
        modes: {
            bubble: {
                distance: 400,
                duration: 2,
                opacity: 0.8,
                size: 40,
                speed: 3,
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
        move: {
            path: {
                enable: true,
                options: {
                    size: 32,
                    draw: false,
                    increment: 0.004,
                },
                generator: "simplexNoise",
            },
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
            value: 32,
        },
        zIndex: {
            value: {
                min: 0,
                max: 100,
            },
            opacityRate: 0,
            sizeRate: 2,
            velocityRate: 2,
        },
    },
};

export default options;
