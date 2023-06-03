import type { ISourceOptions } from "tsparticles-engine";

const options: ISourceOptions = {
    name: "Snow",
    particles: {
        number: {
            value: 400,
            density: {
                enable: true,
            },
        },
        color: {
            value: "#fff",
        },
        shape: {
            type: "circle",
        },
        opacity: {
            value: 1,
        },
        size: {
            value: 10,
        },
        move: {
            enable: true,
            speed: 2,
            direction: "bottom",
            straight: true,
        },
        wobble: {
            enable: true,
            distance: 10,
            speed: 10,
        },
        zIndex: {
            value: {
                min: 0,
                max: 100,
            },
            opacityRate: 10,
            sizeRate: 10,
            velocityRate: 10,
        },
    },
    background: {
        color: "#333333",
    },
};

export default options;
