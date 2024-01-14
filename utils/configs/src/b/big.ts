import type { ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
    key: "big",
    name: "Big Particles",
    particles: {
        number: {
            value: 30,
        },
        color: {
            value: ["#5bc0eb", "#fde74c", "#9bc53d", "#e55934", "#fa7921"],
        },
        shape: {
            type: "circle",
        },
        opacity: {
            value: {
                min: 0.4,
                max: 0.8,
            },
        },
        size: {
            value: {
                min: 300,
                max: 400,
            },
            animation: {
                enable: true,
                speed: 100,
                sync: false,
            },
        },
        move: {
            enable: true,
            speed: 10,
            direction: "top",
        },
    },
    background: {
        color: "#ffffff",
    },
};

export default options;
