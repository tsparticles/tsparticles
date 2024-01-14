import type { ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
    key: "trailsImage",
    name: "Trails Image",
    background: {
        color: "#ffffff",
        image: "url('https://particles.js.org/images/background3.jpg')",
        position: "50% 50%",
        repeat: "no-repeat",
        size: "cover",
    },
    emitters: {
        position: {
            x: 50,
            y: 50,
        },
        size: {
            width: 50,
            height: 50,
            mode: "precise",
        },
        rate: {
            delay: 1,
            quantity: 10,
        },
    },
    particles: {
        number: {
            value: 0,
            limit: { value: 300 },
        },
        color: {
            value: ["#5bc0eb", "#fde74c", "#9bc53d", "#e55934", "#fa7921"],
        },
        shape: {
            type: "circle",
        },
        opacity: {
            value: 1,
        },
        size: {
            value: 1,
        },
        links: {
            enable: false,
            distance: 150,
            color: "#ffffff",
            opacity: 0.4,
            width: 1,
        },
        move: {
            enable: true,
            speed: 1,
            direction: "none",
            random: false,
            straight: false,
            outModes: {
                default: "destroy",
            },
            path: {
                enable: true,
                delay: {
                    value: 0.1,
                },
                options: {
                    size: 5,
                    draw: false,
                    increment: 0.001,
                },
                generator: "perlinNoise",
            },
            trail: {
                enable: true,
                fill: { image: "https://particles.js.org/images/background3.jpg" },
                length: 20,
            },
        },
    },
    interactivity: {
        events: {
            onHover: {
                enable: false,
                mode: "grab",
            },
            onClick: {
                enable: false,
                mode: "repulse",
            },
        },
        modes: {
            grab: {
                distance: 200,
                links: {
                    opacity: 1,
                },
            },
            bubble: {
                distance: 400,
                size: 40,
                duration: 2,
                opacity: 8,
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
};

export default options;
