import type { ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
    key: "virus",
    name: "Virus",
    interactivity: {
        events: {
            onClick: {
                enable: true,
                mode: "push",
            },
            onHover: {
                enable: true,
                mode: "bubble",
            },
        },
        modes: {
            bubble: {
                distance: 400,
                duration: 2,
                opacity: 0.8,
                size: 40,
            },
            push: {
                quantity: 4,
            },
        },
    },
    particles: {
        color: {
            value: "#ffffff",
        },
        links: {
            color: "#323031",
            distance: 150,
            enable: false,
            opacity: 0.4,
            width: 1,
        },
        move: {
            enable: true,
            outModes: "bounce",
            speed: 6,
        },
        number: {
            density: {
                enable: true,
            },
            value: 170,
        },
        opacity: {
            value: 0.5,
        },
        shape: {
            options: {
                image: {
                    height: 32,
                    replaceColor: true,
                    src: "https://particles.js.org/images/sars-cov-2.png",
                    width: 32,
                },
            },
            type: "image",
        },
        size: {
            value: 16,
        },
    },
    background: {
        color: "#323031",
    },
};

export default options;
