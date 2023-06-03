import type { ISourceOptions } from "tsparticles-engine";

const options: ISourceOptions = {
    name: "Shape Arrow",
    particles: {
        number: {
            value: 80,
            density: {
                enable: true,
            },
        },
        color: {
            value: "none",
        },
        stroke: {
            color: "#ff0000",
            width: 1,
        },
        shape: {
            type: "arrow",
            options: {
                arrow: {
                    heightFactor: {
                        min: 0.3,
                        max: 0.8,
                    },
                    headWidthFactor: {
                        min: 0.3,
                        max: 0.8,
                    },
                    bodyHeightFactor: {
                        min: 0.3,
                        max: 0.8,
                    },
                },
            },
        },
        opacity: {
            value: 1,
        },
        size: {
            value: {
                min: 10,
                max: 20,
            },
        },
        move: {
            enable: true,
            speed: 6,
        },
        rotate: {
            path: true,
        },
    },
    background: {
        color: "#000000",
    },
};

export default options;
