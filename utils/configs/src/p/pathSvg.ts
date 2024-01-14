import type { ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
    key: "pathSvg",
    name: "Path SVG",
    particles: {
        color: {
            value: ["#ffffff", "#ff0000", "#00ff00", "#0000ff"],
        },
        move: {
            enable: true,
            outModes: "bounce",
            speed: { min: 1, max: 3 },
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
                    scale: 1,
                    width: 10,
                },
                generator: "svgPathGenerator",
            },
            trail: {
                enable: true,
                length: 10,
                fill: {
                    color: "#000000",
                },
            },
        },
        number: {
            value: 80,
        },
        opacity: {
            value: 1,
        },
        shape: {
            type: "circle",
        },
        size: {
            value: 3,
        },
    },
    background: {
        color: "#000000",
    },
};

export default options;
