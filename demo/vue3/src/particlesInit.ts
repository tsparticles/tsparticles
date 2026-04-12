import type { Engine } from "@tsparticles/engine";
import { loadFull } from "tsparticles";

export async function registerParticles(engine: Engine): Promise<void> {
  await loadFull(engine);
}
