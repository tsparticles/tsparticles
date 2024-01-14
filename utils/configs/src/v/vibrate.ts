import type { ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
    key: "vibrate",
    name: "Vibrate",
    particles: {
        number: {
            value: 80,
            density: {
                enable: true,
            },
        },
        color: {
            value: "#ffffff",
        },
        shape: {
            type: "circle",
        },
        opacity: {
            value: {
                min: 0.1,
                max: 0.5,
            },
            animation: {
                enable: true,
                speed: 3,
                sync: false,
            },
        },
        size: {
            value: {
                min: 0.1,
                max: 5,
            },
            animation: {
                enable: true,
                speed: 20,
            },
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
            speed: 0,
            vibrate: true,
        },
    },
    interactivity: {
        events: {
            onHover: {
                enable: true,
                mode: "repulse",
            },
            onClick: {
                enable: true,
                mode: "push",
            },
        },
        modes: {
            repulse: {
                distance: 200,
            },
            push: {
                quantity: 4,
            },
        },
    },
    background: {
        color: "#0d47a1",
    },
};
export default options;
