import { GradientType, type ISourceOptions, RotateDirection } from "@tsparticles/engine";

const options: ISourceOptions = {
    name: "Gradients",
    particles: {
        number: {
            value: 100,
        },
        gradient: [
            {
                type: GradientType.radial,
                colors: [
                    {
                        stop: 0.25,
                        value: "#5bc0eb",
                    },
                    {
                        stop: 1,
                        value: "#000000",
                        opacity: 0,
                    },
                ],
            },
            {
                type: GradientType.radial,
                colors: [
                    {
                        stop: 0.25,
                        value: "#fde74c",
                    },
                    {
                        stop: 1,
                        value: "#000000",
                        opacity: 0,
                    },
                ],
            },
            {
                type: GradientType.radial,
                colors: [
                    {
                        stop: 0.25,
                        value: "#9bc53d",
                    },
                    {
                        stop: 1,
                        value: "#000000",
                        opacity: 0,
                    },
                ],
            },
            {
                type: GradientType.radial,
                colors: [
                    {
                        stop: 0.25,
                        value: "#e55934",
                    },
                    {
                        stop: 1,
                        value: "#000000",
                        opacity: 0,
                    },
                ],
            },
            {
                type: GradientType.radial,
                colors: [
                    {
                        stop: 0.25,
                        value: "#fa7921",
                    },
                    {
                        stop: 1,
                        value: "#000000",
                        opacity: 0,
                    },
                ],
            },
            {
                type: GradientType.radial,
                colors: [
                    {
                        stop: 0.25,
                        value: {
                            value: "#ff0000",
                            animation: {
                                enable: true,
                                speed: 60,
                                sync: true,
                            },
                        },
                    },
                    {
                        stop: 0.5,
                        value: {
                            value: "#00ff00",
                            animation: {
                                enable: true,
                                speed: 60,
                                sync: true,
                            },
                        },
                    },
                    {
                        stop: 0.75,
                        value: {
                            value: "#0000ff",
                            animation: {
                                enable: true,
                                speed: 60,
                                sync: true,
                            },
                        },
                    },
                    {
                        stop: 1,
                        value: "#000000",
                        opacity: 0,
                    },
                ],
            },
            {
                type: GradientType.linear,
                angle: {
                    value: 0,
                    direction: RotateDirection.random,
                    animation: {
                        enable: true,
                        speed: 60,
                        sync: true,
                    },
                },
                colors: [
                    {
                        stop: 0,
                        value: "#00ffff",
                    },
                    {
                        stop: 0.5,
                        value: "#ff00ff",
                    },
                    {
                        stop: 1,
                        value: "#ffff00",
                    },
                ],
            },
        ],
        shape: {
            type: "circle",
        },
        opacity: {
            value: 1,
        },
        size: {
            value: {
                min: 15,
                max: 20,
            },
            animation: {
                enable: true,
                speed: 5,
                sync: false,
            },
        },
        move: {
            enable: true,
            speed: 5,
        },
    },
    background: {
        color: "#000",
    },
};

export default options;
