import type { ISourceOptions } from "@tsparticles/engine";

const rate = {
    delay: 0.1,
    quantity: 3,
};

const options: ISourceOptions = {
    name: "Emitter Shapes",
    particles: {
        number: {
            value: 0,
        },
        color: {
            value: "#000000",
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
    },
    background: {
        color: "#fff",
    },
    emitters: [
        {
            shape: "square",
            position: {
                x: 25,
                y: 33,
            },
            size: {
                width: 200,
                height: 200,
                mode: "precise",
            },
            life: {
                duration: 10,
                delay: 0.5,
                count: 1,
            },
            rate,
        },
        {
            shape: "circle",
            position: {
                x: 50,
                y: 33,
            },
            size: {
                width: 200,
                height: 200,
                mode: "precise",
            },
            life: {
                duration: 10,
                delay: 0.5,
                count: 1,
            },
            rate,
        },
        {
            fill: false,
            shape: "square",
            position: {
                x: 25,
                y: 67,
            },
            size: {
                width: 200,
                height: 200,
                mode: "precise",
            },
            life: {
                duration: 10,
                delay: 0.5,
                count: 1,
            },
            rate,
        },
        {
            fill: false,
            shape: "circle",
            position: {
                x: 50,
                y: 67,
            },
            size: {
                width: 200,
                height: 200,
                mode: "precise",
            },
            life: {
                duration: 10,
                delay: 0.5,
                count: 1,
            },
            rate,
        },
        {
            shape: {
                type: "polygon",
                options: {
                    angle: -18,
                    sides: 5,
                },
            },
            position: {
                x: 75,
                y: 33,
            },
            size: {
                width: 200,
                height: 200,
                mode: "precise",
            },
            life: {
                duration: 10,
                delay: 0.5,
                count: 1,
            },
            rate,
        },
        {
            fill: false,
            shape: {
                type: "polygon",
                options: {
                    sides: 6,
                },
            },
            position: {
                x: 75,
                y: 67,
            },
            size: {
                width: 200,
                height: 200,
                mode: "precise",
            },
            life: {
                duration: 10,
                delay: 0.5,
                count: 1,
            },
            rate,
        },
    ],
};

export default options;
