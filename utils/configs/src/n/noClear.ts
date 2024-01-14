import type { ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
    key: "noClear",
    name: "No Clear",
    clear: false,
    interactivity: {
        events: {
            onHover: {
                enable: true,
                mode: "trail",
            },
        },
        modes: {
            trail: {
                delay: 0.01,
                quantity: 1,
                pauseOnStop: true,
            },
        },
    },
    particles: {
        color: {
            value: [
                "#80F31F",
                "#ED8B08",
                "#ED1868",
                "#800CE0",
                "#1274F7",
                "#12E797",
                "#7FF31F",
                "#ED8B08",
                "#ED1868",
                "#800CE0",
                "#1274F7",
                "#12E797",
                "#7FF31F",
                "#ED8B08",
                "#ED1868",
                "#800CE0",
                "#1274F7",
                "#12E797",
                "#7FF31F",
                "#ED8B08",
                "#ED1868",
                "#800CE0",
                "#1274F7",
                "#12E797",
                "#7FF31F",
                "#ED8B08",
                "#ED1868",
                "#800CE0",
                "#1274F7",
                "#12E797",
                "#7FF31F",
                "#ED8B08",
                "#ED1868",
                "#800CE0",
                "#1274F7",
                "#12E797",
                "#7FF31F",
                "#ED8B08",
                "#ED1868",
                "#800CE0",
                "#1274F7",
                "#12E797",
                "#7FF31F",
                "#ED8B08",
                "#ED1868",
                "#800CE0",
                "#1274F7",
                "#12E797",
                "#7FF31F",
                "#ED8B08",
            ],
        },
        life: {
            count: 1,
            duration: {
                sync: true,
                value: 1,
            },
        },
        number: {
            value: 500,
        },
        size: {
            value: 50,
        },
        shape: {
            type: "star",
        },
        rotate: {
            value: {
                min: 0,
                max: 360,
            },
        },
    },
};

export default options;
