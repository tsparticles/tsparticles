import type { ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
    key: "reactMultipleImages",
    name: "React Multiple Images",
    particles: {
        color: {
            value: "#CCC",
        },
        collisions: {
            enable: true,
        },
        links: {
            blink: false,
            color: "#fff",
            consent: false,
            distance: 150,
            enable: false,
            opacity: 0.6,
            width: 1,
        },
        move: {
            enable: true,
            speed: 1,
        },
        number: {
            density: {
                enable: true,
            },
            value: 8,
        },
        opacity: {
            animation: {
                enable: true,
                speed: 1,
                sync: false,
            },
            value: {
                min: 0.1,
                max: 0.5,
            },
        },
        shape: {
            options: {
                image: [
                    {
                        height: 20,
                        replaceColor: true,
                        src: "https://particles.js.org/images/fruits/cherry.png",
                        width: 23,
                        fill: true,
                        close: true,
                    },
                    {
                        height: 20,
                        replaceColor: true,
                        src: "https://particles.js.org/images/fruits/grapes.png",
                        width: 20,
                        fill: true,
                        close: true,
                    },
                    {
                        height: 20,
                        replaceColor: true,
                        src: "https://particles.js.org/images/fruits/lemon.png",
                        width: 20,
                        fill: true,
                        close: true,
                    },
                ],
            },
            type: ["image", "circle"],
        },
        size: {
            animation: {
                enable: true,
                speed: 4,
                sync: false,
            },
            value: {
                min: 10,
                max: 30,
            },
        },
    },
    pauseOnBlur: true,
    background: {
        color: "#0d47a1",
        image: "",
        position: "50% 50%",
        repeat: "no-repeat",
        size: "cover",
    },
};

export default options;
