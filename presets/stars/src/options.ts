import { MoveDirection, OutMode } from "tsparticles-engine";

export const options = {
    background: {
        color: "#000",
    },
    particles: {
        move: {
            direction: MoveDirection.none,
            enable: true,
            outModes: {
                default: OutMode.out,
            },
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
        size: {
            random: true,
            value: 3,
        },
    },
};
