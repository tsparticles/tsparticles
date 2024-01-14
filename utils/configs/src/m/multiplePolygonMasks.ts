import type { ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
    key: "multiplePolygonMasks",
    name: "Multiple Polygon Masks",
    interactivity: {
        events: {
            onClick: {
                enable: false,
                mode: "push",
            },
            onHover: {
                enable: true,
                mode: "bubble",
                parallax: {
                    enable: false,
                    force: 2,
                    smooth: 10,
                },
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
            value: ["#4285f4", "#34A853", "#FBBC05", "#EA4335"],
        },
        links: {
            blink: false,
            color: "random",
            consent: false,
            distance: 40,
            enable: true,
            opacity: 1,
            width: 1,
        },
        move: {
            enable: true,
            outModes: "bounce",
            speed: 1,
        },
        number: {
            value: 200,
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
        position: {
            x: 30,
            y: 30,
        },
        inline: {
            arrangement: "equidistant",
        },
        scale: 1,
        type: "inline",
        url: "https://particles.js.org/images/google.svg",
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
