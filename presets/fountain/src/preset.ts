import { DestroyMode, InteractivityDetect, MoveDirection, OutMode, Main, ISourceOptions } from "tsparticles-core";
import { loadShape as loadCircleShape } from "tsparticles-shape-circle";
import { loadUpdater as loadOutModesUpdater } from "tsparticles-updater-out-modes";
import { loadPlugin as loadEmittersPlugin } from "tsparticles-plugin-emitters";

export function loadPreset(tsParticles: Main): void {
    loadCircleShape(tsParticles);
    loadOutModesUpdater(tsParticles);
    loadEmittersPlugin(tsParticles);

    const options = ({
        fullScreen: {
            enable: true,
        },
        fpsLimit: 60,
        particles: {
            number: {
                value: 0,
            },
            destroy: {
                mode: DestroyMode.split,
                split: {
                    count: 2,
                    factor: {
                        value: 2,
                        random: {
                            enable: true,
                            minimumValue: 1.1,
                        },
                    },
                    rate: {
                        value: 3,
                        random: {
                            enable: true,
                            minimumValue: 2,
                        },
                    },
                },
            },
            shape: {
                type: "circle",
            },
            opacity: {
                value: 1,
            },
            size: {
                value: 15,
                random: {
                    enable: true,
                    minimumValue: 10,
                },
            },
            move: {
                enable: true,
                gravity: {
                    enable: true,
                },
                speed: 10,
                direction: MoveDirection.none,
                random: false,
                straight: false,
                outModes: {
                    bottom: OutMode.split,
                    default: OutMode.bounce,
                    top: OutMode.none,
                },
                trail: {
                    enable: true,
                    fillColor: "#fff",
                    length: 3,
                },
            },
        },
        interactivity: {
            detectsOn: InteractivityDetect.canvas,
            events: {
                resize: true,
            },
        },
        detectRetina: true,
        background: {
            color: "#fff",
        },
        emitters: {
            direction: MoveDirection.top,
            life: {
                count: 0,
                duration: 0.15,
                delay: 3,
            },
            rate: {
                delay: 0.1,
                quantity: 5,
            },
            size: {
                width: 0,
                height: 0,
            },
            particles: {
                bounce: {
                    vertical: {
                        value: 0.99,
                        random: {
                            enable: true,
                            minimumValue: 0.88,
                        },
                    },
                },
                color: {
                    value: [
                        "#3998D0",
                        "#2EB6AF",
                        "#A9BD33",
                        "#FEC73B",
                        "#F89930",
                        "#F45623",
                        "#D62E32",
                        "#EB586E",
                        "#9952CF",
                    ],
                },
                size: {
                    value: 20,
                    random: {
                        enable: true,
                        minimumValue: 10,
                    },
                },
                opacity: {
                    value: 0.5,
                },
                move: {
                    speed: 10,
                    random: false,
                },
            },
        },
    } as unknown) as ISourceOptions;

    tsParticles.addPreset("fountain", options);
}
