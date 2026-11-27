/** Internal random-source normalization. Public random access belongs to Engine. */
export function getRandomValue(random: () => number): number {
  const value = random();

  return Number.isFinite(value)
    ? Math.min(Math.max(value, 0), 1 - Number.EPSILON)
    : 0;
}
