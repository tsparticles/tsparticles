import type { ISourceOptions } from "tsparticles-engine";

const options: ISourceOptions = {
    name: "Path SVG",
    particles: {
        color: {
            value: "#ffffff",
        },
        move: {
            enable: true,
            outModes: "bounce",
            speed: 1,
            path: {
                enable: true,
                options: {
                    path: {
                        data: ["M 75,0 0,200 h 150 z"],
                        size: {
                            width: 150,
                            height: 200,
                        },
                    },
                    scale: 2,
                },
                generator: "svgPathGenerator",
            },
        },
        number: {
            limit: 0,
            value: 80,
        },
        opacity: {
            animation: {
                enable: true,
                speed: 2,
                sync: false,
            },
            value: {
                min: 0.05,
                max: 0.4,
            },
        },
        shape: {
            type: "circle",
        },
        size: {
            value: 1,
        },
    },
    background: {
        color: "#000000",
    },
};

export default options;
