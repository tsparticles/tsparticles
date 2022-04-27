import { MoveDirection, OutMode } from "@tsparticles/engine";
import type { ISourceOptions } from "@tsparticles/engine";

export const options: ISourceOptions = {
    fpsLimit: 120,
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
            value: { min: 5, max: 10 },
        },
        move: {
            angle: {
                offset: 0,
                value: 30,
            },
            enable: true,
            speed: 15,
            direction: MoveDirection.top,
            random: false,
            straight: false,
            outModes: {
                default: OutMode.destroy,
            },
        },
    },
    detectRetina: true,
    background: {
        color: "#fff",
    },
    emitters: [
        {
            direction: MoveDirection.top,
            position: {
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
