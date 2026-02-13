import type { LinkParticle } from "./Types.js";
import { getRandom } from "@tsparticles/engine";

/**
 * @param ids -
 * @returns -
 */
export function getLinkKey(ids: number[]): string {
  ids.sort((a, b) => a - b);
  return ids.join("_");
}

/**
 *
 * @param particles -
 * @param dictionary -
 * @returns -
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
