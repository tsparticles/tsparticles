import type { ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
    key: "multipleClickEmitters",
    name: "Multiple Click Emitters",
    background: {
        color: "#f00",
    },
    interactivity: {
        events: {
            onClick: {
                enable: true,
                mode: "emitter",
            },
        },
        modes: {
            emitters: {
                random: {
                    enable: false,
                    count: 0,
                },
                value: [
                    {
                        name: "big-particle",
                        startCount: 1,
                        life: {
                            count: 1,
                            delay: 0,
                            duration: 0.1,
                        },
                        rate: {
                            delay: 0,
                            quantity: 0,
                        },
                        particles: {
                            color: {
                                value: "#0f0",
                            },
                            size: {
                                value: {
                                    min: 150,
                                    max: 300,
                                },
                                animation: {
                                    enable: true,
                                    speed: 1500,
                                    decay: 0.02,
                                    startValue: "min",
                                    count: 1,
                                    sync: true,
                                },
                            },
                            life: {
                                duration: {
                                    value: 1,
                                    sync: true,
                                },
                                count: 1,
                            },
                        },
                    },
                    {
                        name: "small-particles",
                        startCount: 50,
                        life: {
                            count: 1,
                            delay: 0,
                            duration: 0.1,
                        },
                        particles: {
                            color: {
                                value: "#f00",
                            },
                            move: {
                                decay: 0.1,
                                enable: true,
                                speed: 60,
                                outModes: "destroy",
                            },
                            life: {
                                duration: {
                                    value: 1,
                                    sync: true,
                                },
                                count: 1,
                            },
                            size: {
                                value: {
                                    min: 1,
                                    max: 10,
                                },
                            },
                        },
                    },
                ],
            },
        },
    },
    particles: {
        number: {
            value: 0,
        },
    },
    emitters: [],
};

export default options;
