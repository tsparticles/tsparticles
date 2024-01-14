import type { ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
    key: "chars",
    name: "Chars",
    particles: {
        number: {
            value: 80,
            density: {
                enable: true,
            },
        },
        color: {
            value: "#ff0000",
        },
        stroke: {
            width: 1,
            color: "#ffffff",
        },
        shape: {
            type: "char",
            options: {
                char: [
                    {
                        value: ["t", "s", "P", "a", "r", "t", "i", "c", "l", "e", "s"],
                        font: "Verdana",
                        style: "",
                        weight: "400",
                        fill: true,
                    },
                    {
                        value: ["t", "s", "P", "a", "r", "t", "i", "c", "l", "e", "s"],
                        font: "Verdana",
                        style: "",
                        weight: "400",
                        fill: false,
                    },
                ],
            },
        },
        opacity: {
            value: {
                min: 0.1,
                max: 0.5,
            },
            animation: {
                enable: true,
                speed: 1,
            },
        },
        size: {
            value: 16,
        },
        links: {
            enable: true,
            distance: 150,
            color: "#ffffff",
            opacity: 0.4,
            width: 1,
        },
        move: {
            enable: true,
            speed: 2,
        },
    },
    interactivity: {
        events: {
            onHover: {
                enable: true,
                mode: "repulse",
                parallax: {
                    enable: false,
                    force: 60,
                    smooth: 10,
                },
            },
            onClick: {
                enable: true,
                mode: "push",
            },
        },
        modes: {
            grab: {
                distance: 400,
                links: {
                    opacity: 1,
                },
            },
            bubble: {
                distance: 400,
                size: 40,
                duration: 2,
                opacity: 0.8,
            },
            repulse: {
                distance: 200,
            },
            push: {
                quantity: 4,
            },
            remove: {
                quantity: 2,
            },
        },
    },
    background: {
        color: "#0d47a1",
    },
};

export default options;
