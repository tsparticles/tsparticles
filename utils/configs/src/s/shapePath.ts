import type { ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
    key: "shapePath",
    name: "Shape Path",
    particles: {
        number: {
            value: 80,
            density: {
                enable: true,
            },
        },
        color: {
            value: "#ff0000",
            animation: {
                enable: true,
                speed: 20,
                sync: true,
            },
        },
        shape: {
            type: "path",
            options: {
                path: [
                    {
                        segments: [
                            {
                                type: "line",
                                values: [
                                    {
                                        x: -0.5,
                                        y: -0.5,
                                    },
                                ],
                            },
                            {
                                type: "bezier",
                                values: [
                                    {
                                        x: -0.5,
                                        y: 0.5,
                                    },
                                    {
                                        x: 1,
                                        y: 1,
                                    },
                                    {
                                        x: 1,
                                        y: 0.5,
                                    },
                                    {
                                        x: 1,
                                        y: -0.5,
                                    },
                                ],
                            },
                            {
                                type: "quadratic",
                                values: [
                                    {
                                        x: 0.5,
                                        y: 0.5,
                                    },
                                    {
                                        x: 0.5,
                                        y: -0.5,
                                    },
                                    {
                                        x: -0.5,
                                        y: 0.5,
                                    },
                                ],
                            },
                            {
                                type: "line",
                                values: [
                                    {
                                        x: 0.5,
                                        y: -0.5,
                                    },
                                ],
                            },
                        ],
                        half: false,
                    },
                    {
                        segments: [
                            {
                                type: "line",
                                values: [
                                    {
                                        x: -1,
                                        y: -1,
                                    },
                                ],
                            },
                            {
                                type: "bezier",
                                values: [
                                    {
                                        x: -1,
                                        y: 1,
                                    },
                                    {
                                        x: 1,
                                        y: 1,
                                    },
                                    {
                                        x: 0.5,
                                        y: 1,
                                    },
                                    {
                                        x: -0.5,
                                        y: 1,
                                    },
                                ],
                            },
                            {
                                type: "quadratic",
                                values: [
                                    {
                                        x: 1,
                                        y: 1,
                                    },
                                    {
                                        x: 1,
                                        y: -1,
                                    },
                                    {
                                        x: -1,
                                        y: 1,
                                    },
                                ],
                            },
                            {
                                type: "line",
                                values: [
                                    {
                                        x: 1,
                                        y: -1,
                                    },
                                ],
                            },
                        ],
                        half: false,
                    },
                ],
            },
        },
        opacity: {
            value: 0.5,
        },
        size: {
            value: {
                min: 5,
                max: 50,
            },
        },
        move: {
            enable: true,
            speed: 6,
            direction: "none",
        },
    },
    background: {
        color: "#000000",
    },
};

export default options;
