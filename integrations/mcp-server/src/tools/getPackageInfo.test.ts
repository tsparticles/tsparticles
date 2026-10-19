import { describe, expect, it } from "vitest";
import { getPackageInfo } from "./getPackageInfo.js";

const SUB_PACKAGES_THRESHOLD = 3;

describe("getPackageInfo", () => {
  it("should return info for a known package using full name", () => {
    const result = getPackageInfo("@tsparticles/plugin-absorbers");
    expect(result).not.toBeNull();
    if (!result) {
      return;
    }
    expect(result.name).toBe("@tsparticles/plugin-absorbers");
    expect(result.description).toBeTruthy();
    expect(result.category).toBe("plugin");
  });

  it("should return a bundle's sub-packages", () => {
    const result = getPackageInfo("@tsparticles/basic");
    expect(result).not.toBeNull();
    if (!result) {
      return;
    }
    const subPackages = result.subPackages;
    expect(subPackages).toBeDefined();
    if (subPackages) {
      expect(subPackages.length).toBeGreaterThan(SUB_PACKAGES_THRESHOLD);
    }
  });

  it("should return null for unknown package", () => {
    const result = getPackageInfo("nonexistent-package");
    expect(result).toBeNull();
  });
});
