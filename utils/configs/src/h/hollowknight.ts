import type { ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
    key: "hollowknight",
    name: "Hollow Knight",
    interactivity: {
        events: {
            onHover: {
                enable: true,
                mode: "bubble",
            },
        },
        modes: {
            bubble: {
                distance: 40,
                duration: 2,
                opacity: 8,
                size: 6,
            },
            connect: {
                distance: 80,
                links: {
                    opacity: 0.5,
                },
                radius: 60,
            },
            grab: {
                distance: 400,
                links: {
                    opacity: 1,
                },
            },
            push: {
                quantity: 4,
            },
            remove: {
                quantity: 2,
            },
            repulse: {
                distance: 200,
                duration: 0.4,
            },
            slow: {
                active: false,
                radius: 0,
                factor: 1,
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
            distance: 25,
            enable: true,
            opacity: 0.4,
            width: 1,
        },
        move: {
            enable: true,
            outModes: "bounce",
            speed: 1,
        },
        number: {
            density: {
                enable: false,
            },
            value: 400,
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
    polygon: {
        draw: {
            enable: true,
            stroke: {
                color: "#fff",
                width: 0.5,
                opacity: 0.2,
            },
        },
        enable: true,
        move: {
            radius: 10,
        },
        inline: {
            arrangement: "equidistant",
        },
        scale: 2,
        type: "inline",
        url: "https://particles.js.org/images/hollowknight.svg",
    },
    background: {
        color: "#000000",
        image: "",
        position: "50% 50%",
        repeat: "no-repeat",
        size: "cover",
    },
};

export default options;
