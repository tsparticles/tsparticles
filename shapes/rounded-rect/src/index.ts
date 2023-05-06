import type { Engine } from "@tsparticles/engine";
import { RoundedRectDrawer } from "./RoundedRectDrawer";

/**
 *
 * @param engine
 */
export function loadRoundedRectShape(engine: Engine): void {
    engine.addShape("rounded-rect", new RoundedRectDrawer());
}
