import { MoveDirection, OutMode } from "tsparticles-engine";
import type { ISourceOptions } from "tsparticles-engine";

export const options: ISourceOptions = {
    fpsLimit: 60,
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
            speed: 10,
            direction: MoveDirection.top,
            outModes: {
                top: OutMode.destroy,
                default: OutMode.out,
            },
        },
    },
    detectRetina: true,
    emitters: {
        position: {
            x: 50,
            y: 130,
        },
        rate: {
            delay: 0.2,
            quantity: 2,
        },
        size: {
            width: 100,
            height: 0,
        },
    },
};
