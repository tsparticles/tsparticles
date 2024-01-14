import type { ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
    key: "polygonMask",
    name: "Polygon Mask",
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
            value: "#ffffff",
        },
        links: {
            blink: false,
            color: "#ffffff",
            consent: false,
            distance: 30,
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
                width: 1,
                opacity: 0.2,
            },
        },
        enable: true,
        move: {
            radius: 10,
        },
        position: {
            x: 50,
            y: 50,
        },
        inline: {
            arrangement: "equidistant",
        },
        scale: 0.5,
        type: "inline",
        url: "https://particles.js.org/images/smalldeer.svg",
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
