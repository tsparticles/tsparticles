import type { ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
    key: "manual",
    name: "Manual Particles",
    manualParticles: [
        {
            position: {
                x: 50,
                y: 50,
            },
        },
        {
            position: {
                x: 25,
                y: 25,
            },
        },
        {
            position: {
                x: 75,
                y: 75,
            },
        },
        {
            position: {
                x: 25,
                y: 75,
            },
        },
        {
            position: {
                x: 75,
                y: 25,
            },
        },
    ],
    particles: {
        number: {
            value: 0,
            density: {
                enable: false,
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
            value: 30,
        },
        links: {
            enable: true,
            distance: 100,
            color: "#ffffff",
            opacity: 0.4,
            width: 1,
        },
        move: {
            enable: true,
            speed: 2,
            direction: "top",
            straight: true,
            warp: true,
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
