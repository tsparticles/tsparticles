import type { ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
    key: "shapeCog",
    name: "Shape Cog",
    particles: {
        color: {
            value: ["#777", "#333", "#700", "#007", "#070"],
        },
        number: {
            value: 80,
            density: {
                enable: true,
            },
        },
        shape: {
            type: "cog",
            options: {
                cog: {
                    holeRadius: 44,
                    innerRadius: 72,
                    innerTaper: 35,
                    notches: 7,
                    outerTaper: 50,
                },
            },
        },
        opacity: {
            value: 1,
        },
        size: {
            value: { min: 15, max: 30 },
        },
        links: {
            enable: false,
            distance: 100,
            color: "#ffffff",
            opacity: 0.4,
            width: 1,
        },
        rotate: {
            animation: {
                enable: true,
                speed: 20,
                sync: false,
            },
        },
        move: {
            enable: true,
            speed: 6,
            direction: "none",
            random: false,
            straight: false,
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
        color: "#000000",
    },
};
export default options;
