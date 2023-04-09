import { CogDrawer } from "./CogDrawer";
import type { Engine } from "tsparticles-engine";

/**
 *
 * @param engine
 */
export function loadCogShape(engine: Engine): void {
    engine.addShape("cog", new CogDrawer());
}
