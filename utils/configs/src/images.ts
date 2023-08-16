import type { ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
    name: "Images",
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
            value: "#ffffff",
        },
        move: {
            enable: true,
            speed: 2,
        },
        number: {
            density: {
                enable: true,
            },
            limit: 0,
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
                        src: "https://particles.js.org/images/fruits/apple.png",
                        width: 32,
                        height: 32,
                    },
                    {
                        src: "https://particles.js.org/images/fruits/avocado.png",
                        width: 32,
                        height: 32,
                    },
                    {
                        src: "https://particles.js.org/images/fruits/banana.png",
                        width: 32,
                        height: 32,
                    },
                    {
                        src: "https://particles.js.org/images/fruits/berries.png",
                        width: 32,
                        height: 32,
                    },
                    {
                        src: "https://particles.js.org/images/fruits/cherry.png",
                        width: 32,
                        height: 32,
                    },
                    {
                        src: "https://particles.js.org/images/fruits/grapes.png",
                        width: 32,
                        height: 32,
                    },
                    {
                        src: "https://particles.js.org/images/fruits/lemon.png",
                        width: 32,
                        height: 32,
                    },
                    {
                        src: "https://particles.js.org/images/fruits/orange.png",
                        width: 32,
                        height: 32,
                    },
                    {
                        src: "https://particles.js.org/images/fruits/peach.png",
                        width: 32,
                        height: 32,
                    },
                    {
                        src: "https://particles.js.org/images/fruits/pear.png",
                        width: 32,
                        height: 32,
                    },
                    {
                        src: "https://particles.js.org/images/fruits/pepper.png",
                        width: 32,
                        height: 32,
                    },
                    {
                        src: "https://particles.js.org/images/fruits/plum.png",
                        width: 32,
                        height: 32,
                    },
                    {
                        src: "https://particles.js.org/images/fruits/star.png",
                        width: 32,
                        height: 32,
                    },
                    {
                        src: "https://particles.js.org/images/fruits/strawberry.png",
                        width: 32,
                        height: 32,
                    },
                    {
                        src: "https://particles.js.org/images/fruits/watermelon.png",
                        width: 32,
                        height: 32,
                    },
                    {
                        src: "https://particles.js.org/images/fruits/watermelon_slice.png",
                        width: 32,
                        height: 32,
                    },
                ],
            },
            type: "image",
        },
        size: {
            value: 16,
        },
    },
    background: {
        color: "#fff",
    },
};
export default options;