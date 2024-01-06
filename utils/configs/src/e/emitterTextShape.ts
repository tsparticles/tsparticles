import type { ICoordinates, IRgba, ISourceOptions } from "@tsparticles/engine";

const minAlphaFilter = 0,
    rate = {
        delay: 0.1,
        quantity: 100,
    },
    generateEmitter = (
        shape: string,
        options: Record<string, unknown>,
        fill: boolean,
        position: ICoordinates,
    ): unknown => {
        return {
            shape: {
                type: shape,
                options,
            },
            position: position,
            size: {
                width: 500,
                height: 500,
                mode: "precise",
            },
            startCount: 300,
            rate,
            fill,
        };
    },
    options: ISourceOptions = {
        key: "emitterTextShape",
        name: "Emitter Text Shape",
        particles: {
            number: {
                value: 0,
            },
            color: {
                value: [
                    "#f44336",
                    "#e91e63",
                    "#9c27b0",
                    "#673ab7",
                    "#3f51b5",
                    "#2196f3",
                    "#03a9f4",
                    "#00bcd4",
                    "#009688",
                    "#4CAF50",
                    "#8BC34A",
                    "#CDDC39",
                    "#FFEB3B",
                    "#FFC107",
                    "#FF9800",
                    "#FF5722",
                ],
            },
            life: {
                count: 1,
                duration: {
                    value: 1.5,
                },
            },
            move: {
                enable: true,
                speed: 0.5,
            },
            shape: {
                type: "circle",
            },
            opacity: {
                value: 1,
            },
            size: {
                value: { min: 1, max: 10 },
                animation: {
                    enable: true,
                    speed: 30,
                    sync: true,
                    startValue: "min",
                    count: 2,
                },
            },
        },
        background: {
            color: "#fff",
        },
        emitters: [
            generateEmitter(
                "canvas",
                {
                    scale: 1,
                    pixels: {
                        filter: (pixel: IRgba) => pixel.a > minAlphaFilter,
                        offset: 4,
                    },
                    text: {
                        color: "#ff0000",
                        font: {
                            size: 500,
                            family: "Verdana",
                        },
                        text: "Particles",
                        lines: {
                            separator: "\n",
                            spacing: 10,
                        },
                    },
                },
                true,
                { x: 50, y: 50 },
            ),
        ],
    };

export default options;
