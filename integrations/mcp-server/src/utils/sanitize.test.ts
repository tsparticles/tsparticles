import { describe, it, expect } from "vitest";
import { sanitizeReflection } from "./sanitize.js";

describe("sanitizeReflection", () => {
  it("wraps values in inline code backticks", () => {
    expect(sanitizeReflection("grab")).toBe("`grab`");
  });

  it("strips control characters and newlines", () => {
    expect(sanitizeReflection("push\n\rignored: { 1: 2 }")).toBe("`pushignored: { 1: 2 }`");
  });

  it("collapses runs of whitespace", () => {
    expect(sanitizeReflection("a   b\n\t c")).toBe("`a b c`");
  });

  it("removes backticks so the code fence cannot be terminated early", () => {
    expect(sanitizeReflection("evil` b`")).toBe("`evil b`");
  });

  it("trims surrounding whitespace", () => {
    expect(sanitizeReflection("  hover  ")).toBe("`hover`");
  });

  it("handles non-string values", () => {
    expect(sanitizeReflection(42)).toBe("`42`");
    expect(sanitizeReflection(null)).toBe("`null`");
  });
});
