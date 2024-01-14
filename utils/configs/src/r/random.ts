import type { ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
    key: "random",
    name: "Random Colors",
    interactivity: {
        events: {
            onClick: {
                enable: true,
                mode: "push",
            },
            onHover: {
                enable: true,
                mode: "connect",
                parallax: {
                    enable: false,
                    force: 60,
                    smooth: 10,
                },
            },
        },
        modes: {
            bubble: {
                distance: 400,
                duration: 2,
                opacity: 0.8,
                size: 40,
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
        },
    },
    particles: {
        color: {
            value: "random",
        },
        links: {
            blink: false,
            color: "#ffffff",
            consent: false,
            distance: 150,
            enable: false,
            opacity: 0.4,
            width: 1,
        },
        move: {
            enable: true,
            speed: 6,
        },
        number: {
            density: {
                enable: true,
            },
            limit: { value: 500 },
            value: 300,
        },
        opacity: {
            value: 0.5,
        },
        shape: {
            type: "circle",
        },
        size: {
            value: {
                min: 10,
                max: 15,
            },
        },
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
