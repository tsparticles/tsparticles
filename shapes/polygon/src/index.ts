import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 * @param engine -
 */
export async function loadGenericPolygonShape(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.register(e => {
    e.addShape(["polygon"], async () => {
      const { PolygonDrawer } = await import("./PolygonDrawer.js");

      return new PolygonDrawer();
    });
  });
}

/**
 * @param engine -
 */
export async function loadTriangleShape(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.register(e => {
    e.addShape(["triangle"], async () => {
      const { TriangleDrawer } = await import("./TriangleDrawer.js");

      return new TriangleDrawer();
    });
  });
}

/**
 * @param engine -
 */
export async function loadPolygonShape(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await Promise.all([
    loadGenericPolygonShape(engine),
    loadTriangleShape(engine),
  ]);
}
