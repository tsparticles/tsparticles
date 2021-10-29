import { MoveDirection, OutMode } from "tsparticles";

export const options = {
    background: {
        color: "#000",
    },
    particles: {
        color: {
            value: "#ffffff",
        },
        lineLinked: {
            enable: false,
        },
        move: {
            bounce: false,
            direction: MoveDirection.none,
            enable: true,
            outMode: OutMode.out,
            random: true,
            speed: 0.1,
            straight: false,
        },
        opacity: {
            animation: {
                enable: true,
                minimumValue: 0,
                speed: 1,
                sync: false,
            },
            random: true,
            value: 1,
        },
        shape: {
            type: "circle",
        },
        size: {
            random: true,
            value: 3,
        },
    },
};
