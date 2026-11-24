import { describe, expect, it } from "vitest";
import { getOptionsGuideResource } from "./optionsGuide.js";

describe("getOptionsGuideResource", () => {
  it("documents OKLCH color channels and legacy HSL animation migration", () => {
    const guide = getOptionsGuideResource();

    expect(guide).toContain("`color.animation.h`");
    expect(guide).toContain("`color.animation.c`");
    expect(guide).toContain("`color.animation.l`");
    expect(guide).toContain("`color.animation.s`");
    expect(guide).toContain("default maximum 0.4");
    expect(guide).toContain("HSL saturation and OKLCH chroma use different units");
  });
});
