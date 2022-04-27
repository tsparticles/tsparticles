import { MoveDirection, OutMode } from "@tsparticles/engine";
import type { ISourceOptions } from "@tsparticles/engine";

export const options: ISourceOptions = {
    fpsLimit: 120,
    background: {
        color: "#fff",
    },
    particles: {
        number: {
            value: 50,
        },
        color: {
            value: ["#3998D0", "#2EB6AF", "#A9BD33", "#FEC73B", "#F89930", "#F45623", "#D62E32", "#EB586E", "#9952CF"],
        },
        shape: {
            type: "circle",
        },
        opacity: {
            value: 0.5,
        },
        size: {
            value: { min: 200, max: 400 },
        },
        move: {
            enable: true,
            angle: {
                value: 30,
                offset: 0,
            },
            speed: {
                min: 10,
                max: 20,
            },
            direction: MoveDirection.top,
            outModes: {
                default: OutMode.destroy,
                bottom: OutMode.none,
            },
        },
    },
    detectRetina: true,
    emitters: {
        position: {
            x: 50,
            y: 150,
        },
        rate: {
            delay: 0.2,
            quantity: 3,
        },
        size: {
            width: 100,
            height: 50,
        },
    },
};
