import { MoveDirection } from "tsparticles-engine";

export const options = {
    background: {
        color: "#333",
    },
    fullScreen: {
        enable: true,
    },
    particles: {
        move: {
            direction: MoveDirection.bottom,
            enable: true,
            random: false,
            straight: false,
        },
        opacity: {
            random: true,
            value: 0.5,
        },
        size: {
            random: true,
            value: 10,
        },
    },
};
