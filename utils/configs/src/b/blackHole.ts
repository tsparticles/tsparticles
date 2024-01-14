import type { ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
    key: "blackHole",
    name: "Black Hole",
    particles: {
        number: {
            value: 1000,
            density: {
                enable: true,
            },
        },
        color: {
            value: ["#ffffff", "#77ccff", "#ff3333", "#ffff33"],
        },
        shape: {
            type: "circle",
        },
        opacity: {
            value: 1,
        },
        size: {
            value: {
                min: 1,
                max: 10,
            },
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
            speed: 0.5,
            warp: true,
        },
    },
    interactivity: {
        events: {
            onClick: {
                enable: true,
                mode: "push",
            },
        },
        modes: {
            push: {
                quantity: 4,
            },
        },
    },
    absorbers: {
        orbits: true,
        destroy: false,
        size: {
            value: 5,
            limit: 50,
            density: 1500,
        },
        position: {
            x: 50,
            y: 50,
        },
    },
    background: {
        color: "#000",
        image: "",
        position: "50% 50%",
        repeat: "no-repeat",
        size: "cover",
    },
};

export default options;
