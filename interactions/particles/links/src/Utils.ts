import type { LinkParticle } from "./Types.js";
import { getRandom } from "@tsparticles/engine";

/**
 * @param ids - The ids
 * @returns the link key
 */
export function getLinkKey(ids: number[]): string {
  return [...ids].sort((a, b) => a - b).join("_");
}

/**
 * @param particles - The particles
 * @param dictionary - The dictionary
 * @returns the link frequency
 */
export function setLinkFrequency(particles: LinkParticle[], dictionary: Map<string, number>): number {
  const key = getLinkKey(particles.map(t => t.id));

  let res = dictionary.get(key);

  if (res === undefined) {
    res = getRandom();

    dictionary.set(key, res);
  }

  return res;
}
