import type { ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
    key: "emitterAngled",
    name: "Emitter Angled",
    particles: {
        number: {
            value: 0,
        },
        color: {
            value: "random",
        },
        shape: {
            type: "circle",
        },
        opacity: {
            value: 0.3,
        },
        size: {
            value: {
                min: 5,
                max: 10,
            },
        },
        move: {
            angle: {
                offset: 0,
                value: 30,
            },
            enable: true,
            speed: 15,
            direction: "top",
            outModes: {
                default: "destroy",
            },
        },
    },
    background: {
        color: "#fff",
    },
    emitters: [
        {
            direction: "top",
            position: {
                x: {
                    min: 25,
                    max: 75,
                },
                y: 100,
            },
            life: {
                duration: 3,
                delay: 5,
                count: 0,
            },
        },
    ],
};

export default options;
