import type { ICoordinates, ISourceOptions } from "@tsparticles/engine";

const rate = {
    delay: 0.1,
    quantity: 3,
};

const generateEmitter = (
    shape: string,
    options: Record<string, unknown>,
    fill: boolean,
    position: ICoordinates,
): unknown => {
    return {
        shape: {
            type: shape,
            options,
        },
        position: position,
        size: {
            width: 200,
            height: 200,
            mode: "precise",
        },
        life: {
            duration: 10,
            delay: 0.5,
            count: 1,
        },
        rate,
        fill,
    };
};

const path = [
    { x: 0, y: 0 },
    { x: 0, y: 50 },
    { x: 25, y: 50 },
    { x: 0, y: 100 },
    { x: 50, y: 100 },
    { x: 50, y: 75 },
    { x: 100, y: 100 },
    { x: 100, y: 50 },
    { x: 75, y: 50 },
    { x: 100, y: 0 },
    { x: 50, y: 0 },
    { x: 50, y: 25 },
];

const options: ISourceOptions = {
    key: "emitterShapes",
    name: "Emitter Shapes",
    particles: {
        number: {
            value: 0,
        },
        color: {
            value: "#000000",
        },
        shape: {
            type: "circle",
        },
        opacity: {
            value: 1,
        },
        size: {
            value: 1,
        },
    },
    background: {
        color: "#fff",
    },
    emitters: [
        generateEmitter("square", {}, true, { x: 25, y: 25 }),
        generateEmitter("circle", {}, true, { x: 50, y: 25 }),
        generateEmitter(
            "polygon",
            {
                angle: -18,
                sides: 5,
            },
            true,
            { x: 75, y: 25 },
        ),
        generateEmitter("square", {}, false, { x: 25, y: 50 }),
        generateEmitter("circle", {}, false, { x: 50, y: 50 }),
        generateEmitter(
            "polygon",
            {
                sides: 6,
            },
            false,
            { x: 75, y: 50 },
        ),
        generateEmitter(
            "path",
            {
                points: path,
            },
            true,
            { x: 25, y: 75 },
        ),
        generateEmitter(
            "path",
            {
                points: path,
            },
            false,
            { x: 50, y: 75 },
        ),
    ],
};

export default options;
