import type { ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
    key: "fontawesome",
    name: "Font Awesome",
    interactivity: {
        events: {
            onClick: {
                enable: true,
                mode: "push",
            },
            onHover: {
                enable: true,
                mode: "repulse",
            },
        },
        modes: {
            push: {
                quantity: 4,
            },
            repulse: {
                distance: 200,
                duration: 0.4,
            },
        },
    },
    particles: {
        color: {
            value: "#ffffff",
        },
        links: {
            blink: false,
            color: "#ffffff",
            consent: false,
            distance: 150,
            enable: true,
            opacity: 0.4,
            shadow: {
                blur: 5,
                color: "lime",
                enable: false,
            },
            width: 1,
        },
        move: {
            direction: "none",
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
                char: [
                    {
                        fill: true,
                        font: "Font Awesome 5 Brands",
                        style: "",
                        value: ["\uf179"],
                        weight: "400",
                    },
                    {
                        fill: true,
                        font: "Font Awesome 5 Free",
                        style: "",
                        value: ["\uf5d1"],
                        weight: "900",
                    },
                ],
            },
            type: "char",
        },
        stroke: {
            color: "#ffffff",
            width: 1,
        },
        size: {
            value: 16,
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
