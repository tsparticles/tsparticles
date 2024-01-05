import type { ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
    key: "nasa",
    name: "NASA",
    particles: {
        number: {
            value: 160,
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
                max: 1,
            },
            animation: {
                enable: true,
                speed: 1,
                sync: false,
            },
        },
        size: {
            value: {
                min: 1,
                max: 3,
            },
        },
        move: {
            enable: true,
            speed: {
                min: 0.1,
                max: 1,
            },
        },
    },
    interactivity: {
        events: {
            onHover: {
                enable: true,
                mode: "bubble",
            },
            onClick: {
                enable: true,
                mode: "repulse",
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
                distance: 250,
                size: 0,
                duration: 2,
                opacity: 0,
            },
            repulse: {
                distance: 400,
                duration: 0.4,
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
        color: "#232741",
        image: "url('http://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/NASA_logo.svg/1237px-NASA_logo.svg.png')",
        position: "50% 50%",
        repeat: "no-repeat",
        size: "20%",
    },
};

export default options;
