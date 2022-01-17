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
                speed: 1,
                sync: false,
            },
            value: { min: 0, max: 1 },
        },
        size: {
            value: { min: 1, max: 3 },
        },
    },
};
