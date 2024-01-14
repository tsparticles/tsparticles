import type { ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
    key: "growing",
    name: "Growing",
    emitters: {
        direction: "top",
        size: {
            width: 100,
            height: 0,
        },
        position: {
            x: 50,
            y: 100,
        },
        rate: {
            delay: 0.1,
            quantity: 2,
        },
    },
    particles: {
        number: {
            value: 0,
            density: {
                enable: true,
            },
        },
        color: {
            value: "random",
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
                max: 20,
            },
            animation: {
                enable: true,
                speed: 5,
                sync: true,
                startValue: "min",
                destroy: "max",
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
            speed: 5,
            outModes: "destroy",
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
