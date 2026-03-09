/* eslint-disable @typescript-eslint/no-magic-numbers */
import { describe, expect, it } from "vitest";
import { deepExtend } from "@tsparticles/engine";

describe("deepExtend", () => {
  it("merges nested objects predictably", () => {
    const a = { x: { y: 1 } },
      res = deepExtend({}, a);

    expect(res).toEqual(a);
  });

  it("replaces arrays with source arrays mapped", () => {
    const res = deepExtend({ arr: [1] }, { arr: [2, 3] });

    expect((res as { arr: number[] }).arr).toEqual([2, 3]);
  });

  it("does not copy dangerous keys like __proto__ or constructor", () => {
    const src: Record<string, unknown> = {};

    // attempt to carry dangerous keys as plain properties
    src.__proto__ = { polluted: true };
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    src.constructor = { evil: true };

    const res = deepExtend({}, src) as { constructor?: { evil: boolean }; polluted: boolean };

    expect(res.polluted).toBeUndefined();
    // constructor property should remain the native constructor or at least not carry our evil flag
    expect(res.constructor?.evil).toBeUndefined();
    expect((Object.prototype as { polluted: boolean }).polluted).toBeUndefined();
  });

  it("handles null and undefined sources sensibly", () => {
    const res = deepExtend({}, undefined, { a: 1 }, null);

    expect(res).toEqual({ a: 1 });

    const res2 = deepExtend(undefined, { b: 2 });

    expect(res2).toEqual({ b: 2 });
  });
});
