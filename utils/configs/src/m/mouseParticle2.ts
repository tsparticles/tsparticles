import type { ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
    key: "mouseParticle2",
    name: "Mouse Particle 2",
    background: {
        color: "#000000",
    },
    particles: {
        number: {
            value: 80,
            density: {
                enable: true,
            },
        },
        color: {
            value: "#ff0000",
            animation: {
                enable: true,
                speed: 20,
                sync: true,
            },
        },
        shape: {
            type: "circle",
        },
        opacity: {
            value: 0.5,
        },
        size: {
            value: {
                min: 1,
                max: 3,
            },
        },
        links: {
            enable: true,
            distance: 200,
            color: "#ffffff",
            opacity: 0.4,
            width: 1,
        },
        move: {
            enable: true,
            speed: 6,
        },
    },
    interactivity: {
        events: {
            onHover: {
                enable: true,
                mode: "particle",
            },
        },
        modes: {
            particle: {
                replaceCursor: false,
                pauseOnStop: false,
            },
        },
    },
};

export default options;
