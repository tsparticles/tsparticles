import { BaseMover } from "./BaseMover";
import type { Engine } from "../../engine";

export async function loadBaseMover(engine: Engine): Promise<void> {
    engine.addMover("base", () => new BaseMover());
}
