import type { ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
    key: "randomShapes",
    name: "Random Shapes",
    interactivity: {
        events: {
            onClick: {
                enable: true,
                mode: "push",
            },
            onHover: {
                enable: true,
                mode: "bubble",
            },
        },
        modes: {
            bubble: {
                distance: 400,
                duration: 2,
                opacity: 0.8,
                size: 40,
            },
            push: {
                quantity: 4,
            },
        },
    },
    particles: {
        color: {
            value: "#000000",
        },
        stroke: {
            color: {
                value: "#ff0000",
            },
            width: 1,
        },
        move: {
            enable: true,
            speed: 2,
        },
        number: {
            density: {
                enable: true,
            },
            value: 80,
        },
        opacity: {
            value: 1,
        },
        rotate: {
            animation: {
                enable: true,
                speed: 5,
                sync: false,
            },
            direction: "random",
            value: {
                min: 0,
                max: 360,
            },
        },
        shape: {
            options: {
                image: [
                    {
                        name: "apple",
                    },
                    {
                        name: "avocado",
                    },
                    {
                        name: "banana",
                    },
                    {
                        name: "berries",
                    },
                    {
                        name: "cherry",
                    },
                    {
                        name: "grapes",
                    },
                    {
                        name: "lemon",
                    },
                    {
                        name: "orange",
                    },
                    {
                        name: "peach",
                    },
                    {
                        name: "pear",
                    },
                    {
                        name: "pepper",
                    },
                    {
                        name: "plum",
                    },
                    {
                        name: "star",
                    },
                    {
                        name: "strawberry",
                    },
                    {
                        name: "watermelon",
                    },
                    {
                        name: "watermelon_slice",
                    },
                ],
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
                cog: {
                    holeRadius: 44,
                    innerRadius: 72,
                    innerTaper: 35,
                    notches: 7,
                    outerTaper: 50,
                },
                emoji: {
                    value: "🌈",
                },
                text: {
                    value: "pippo\npluto",
                },
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
                "rounded-polygon": [
                    {
                        radius: { min: 0, max: 10 },
                        sides: { min: 3, max: 8 },
                    },
                ],
                "rounded-rect": {
                    radius: { min: 5, max: 15 },
                },
                spiral: {
                    innerRadius: 0.5,
                    lineSpacing: 0.5,
                    fill: false,
                    close: false,
                },
                spades: {
                    particles: {
                        color: {
                            value: "#000000",
                        },
                    },
                },
                hearts: {
                    particles: {
                        color: {
                            value: "#ff0000",
                        },
                    },
                },
                diamonds: {
                    particles: {
                        color: {
                            value: "#ff0000",
                        },
                    },
                },
                clubs: {
                    particles: {
                        color: {
                            value: "#000000",
                        },
                    },
                },
            },
            type: "random",
        },
        size: {
            value: 16,
        },
    },
    background: {
        color: "#fff",
    },
    preload: [
        {
            src: "https://particles.js.org/images/fruits/apple.png",
            name: "apple",
            width: 32,
            height: 32,
        },
        {
            src: "https://particles.js.org/images/fruits/avocado.png",
            name: "avocado",
            width: 32,
            height: 32,
        },
        {
            src: "https://particles.js.org/images/fruits/banana.png",
            name: "banana",
            width: 32,
            height: 32,
        },
        {
            src: "https://particles.js.org/images/fruits/berries.png",
            name: "berries",
            width: 32,
            height: 32,
        },
        {
            src: "https://particles.js.org/images/fruits/cherry.png",
            name: "cherry",
            width: 32,
            height: 32,
        },
        {
            src: "https://particles.js.org/images/fruits/grapes.png",
            name: "grapes",
            width: 32,
            height: 32,
        },
        {
            src: "https://particles.js.org/images/fruits/lemon.png",
            name: "lemon",
            width: 32,
            height: 32,
        },
        {
            src: "https://particles.js.org/images/fruits/orange.png",
            name: "orange",
            width: 32,
            height: 32,
        },
        {
            src: "https://particles.js.org/images/fruits/peach.png",
            name: "peach",
            width: 32,
            height: 32,
        },
        {
            src: "https://particles.js.org/images/fruits/pear.png",
            name: "pear",
            width: 32,
            height: 32,
        },
        {
            src: "https://particles.js.org/images/fruits/pepper.png",
            name: "pepper",
            width: 32,
            height: 32,
        },
        {
            src: "https://particles.js.org/images/fruits/plum.png",
            name: "plum",
            width: 32,
            height: 32,
        },
        {
            src: "https://particles.js.org/images/fruits/star.png",
            name: "star",
            width: 32,
            height: 32,
        },
        {
            src: "https://particles.js.org/images/fruits/strawberry.png",
            name: "strawberry",
            width: 32,
            height: 32,
        },
        {
            src: "https://particles.js.org/images/fruits/watermelon.png",
            name: "watermelon",
            width: 32,
            height: 32,
        },
        {
            src: "https://particles.js.org/images/fruits/watermelon_slice.png",
            name: "watermelon_slice",
            width: 32,
            height: 32,
        },
    ],
};
export default options;
