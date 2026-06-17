import { type Engine } from "@tsparticles/engine/lazy";

declare const __VERSION__: string;

/**
 * @param engine - The engine to load the shape in
 */
export async function loadGenericPolygonShape(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.pluginManager.register(async e => {
    const { PolygonDrawer } = await import("./PolygonDrawer.js");

    e.pluginManager.addShape(["polygon"], () => Promise.resolve(new PolygonDrawer()));
  });
}

/**
 * @param engine - The engine to load the shape in
 */
export async function loadTriangleShape(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.pluginManager.register(async e => {
    const { TriangleDrawer } = await import("./TriangleDrawer.js");

    e.pluginManager.addShape(["triangle"], () => Promise.resolve(new TriangleDrawer()));
  });
}

/**
 * @param engine - The engine to load the shape in
 */
export async function loadPolygonShape(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await Promise.all([
    loadGenericPolygonShape(engine),
    loadTriangleShape(engine),
  ]);
}
