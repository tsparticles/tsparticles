import type { ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
    key: "reactBubbles",
    name: "React Bubbles",
    interactivity: {
        events: {
            onClick: {
                enable: true,
                mode: "repulse",
            },
            onHover: {
                enable: true,
                mode: "bubble",
            },
        },
        modes: {
            bubble: {
                distance: 250,
                duration: 2,
                opacity: 0,
                size: 0,
            },
            connect: {
                distance: 80,
                links: {
                    opacity: 0.5,
                },
                radius: 60,
            },
            grab: {
                distance: 180,
                links: {
                    opacity: 0.35,
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
                duration: 4,
            },
            slow: {
                factor: 1,
                radius: 0,
            },
        },
    },
    particles: {
        color: {
            value: "#FFF",
        },
        collisions: {
            enable: true,
        },
        move: {
            attract: {
                enable: false,
                rotate: {
                    x: 3000,
                    y: 3000,
                },
            },
            direction: "top",
            enable: true,
            speed: {
                min: 0.1,
                max: 1,
            },
        },
        number: {
            value: 160,
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
            type: "circle",
        },
        size: {
            value: {
                min: 1,
                max: 3,
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
