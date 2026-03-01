import type { LinkParticle } from "./Types.js";
import { getRandom } from "@tsparticles/engine";

/**
 *
 * @param ids
 */
export function getLinkKey(ids: number[]): string {
  return [...ids].sort((a, b) => a - b).join("_");
}

/**
 *
 * @param particles
 * @param dictionary
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
