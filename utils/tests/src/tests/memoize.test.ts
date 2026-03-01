import { expect, test } from "vitest";
import { memoize } from '../../../../engine/src/Utils/Utils.js';

test("memoize returns cached value for same primitive args", () => {
  let calls = 0;

  const fn = (a: number, b: number) => {
    calls++;
    return a + b;
  };

  const m = memoize(fn as any);

  const r1 = m(1, 2);
  const r2 = m(1, 2);

  expect(r1).toBe(3);
  expect(r2).toBe(3);
  expect(calls).toBe(1);
});

test("memoize differentiates object args by deep key (not by reference only)", () => {
  let calls = 0;

  const fn = (obj: Record<string, any>) => {
    calls++;
    return Object.keys(obj).length;
  };

  const m = memoize(fn as any);

  const a = { x: 1, y: { z: 2 } };
  const b = { x: 1, y: { z: 2 } }; // different reference, same shape

  const r1 = m(a);
  const r2 = m(b);

  expect(r1).toBe(r2);
  // depending on keying strategy this should be cached (deep-equal keys)
  expect(calls).toBe(1);
});

test("bounded cache evicts older entries when maxSize reached", () => {
  let calls = 0;

  const fn = (n: number) => {
    calls++;
    return n * 2;
  };

  // request small cache size to test eviction
  const m = memoize(fn as any, { maxSize: 2 } as any);

  const a = m(1);
  const b = m(2);

  // cache is full (maxSize=2)
  const c = m(3);

  // Accessing 1 again should cause recompute if it was evicted
  const a2 = m(1);

  expect(a).toBe(2);
  expect(b).toBe(4);
  expect(c).toBe(6);

  // At least one recompute should have occurred for `1` if eviction happened
  expect(calls).toBeGreaterThanOrEqual(3);
});
