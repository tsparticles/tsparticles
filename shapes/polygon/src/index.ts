import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 * @param engine -
 */
export function loadGenericPolygonShape(engine: Engine): void {
    engine.checkVersion(__VERSION__);

    engine.register(async e => {
        const { PolygonDrawer } = await import("./PolygonDrawer.js");

        e.addShape(new PolygonDrawer());
    });
}

/**
 * @param engine -
 */
export function loadTriangleShape(engine: Engine): void {
    engine.checkVersion(__VERSION__);

    engine.register(async e => {
        const { TriangleDrawer } = await import("./TriangleDrawer.js");

        e.addShape(new TriangleDrawer());
    });
}

/**
 * @param engine -
 */
export function loadPolygonShape(engine: Engine): void {
    engine.checkVersion(__VERSION__);

    engine.register(e => {
        loadGenericPolygonShape(e);
        loadTriangleShape(e);
    });
}
