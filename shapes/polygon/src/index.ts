import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 * @param engine -
 */
export async function loadGenericPolygonShape(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.register(async e => {
    const { PolygonDrawer } = await import("./PolygonDrawer.js");

    e.addShape(new PolygonDrawer());
  });
}

/**
 * @param engine -
 */
export async function loadTriangleShape(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.register(async e => {
    const { TriangleDrawer } = await import("./TriangleDrawer.js");

    e.addShape(new TriangleDrawer());
  });
}

/**
 * @param engine -
 */
export async function loadPolygonShape(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.register(async e => {
    await loadGenericPolygonShape(e);
    await loadTriangleShape(e);
  });
}
