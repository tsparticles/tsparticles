import type { ISourceOptions } from "tsparticles";
import { InteractivityDetect, MoveDirection, OutMode } from "tsparticles";

export const options: ISourceOptions = {
    fpsLimit: 60,
    background: {
        color: "#fff",
    },
    fullScreen: {
        enable: true,
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
            value: 400,
            random: {
                enable: true,
                minimumValue: 200,
            },
        },
        move: {
            enable: true,
            speed: 20,
            direction: MoveDirection.top,
            outMode: OutMode.destroy,
        },
    },
    interactivity: {
        detectsOn: InteractivityDetect.canvas,
        events: {
            resize: true,
        },
    },
    detectRetina: true,
    emitters: {
        direction: MoveDirection.top,
        position: {
            x: 50,
            y: 120,
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
