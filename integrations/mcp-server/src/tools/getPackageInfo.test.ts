import { describe, it, expect } from "vitest";
import { getPackageInfo } from "./getPackageInfo.js";

describe("getPackageInfo", () => {
  it("should return info for a known package using full name", () => {
    const result = getPackageInfo("@tsparticles/plugin-absorbers");
    expect(result).not.toBeNull();
    expect(result!.name).toBe("@tsparticles/plugin-absorbers");
    expect(result!.description).toBeTruthy();
    expect(result!.category).toBe("plugin");
  });

  it("should return a bundle's sub-packages", () => {
    const result = getPackageInfo("@tsparticles/basic");
    expect(result).not.toBeNull();
    expect(result!.subPackages).toBeDefined();
    expect(result!.subPackages!.length).toBeGreaterThan(3);
  });

  it("should return null for unknown package", () => {
    const result = getPackageInfo("nonexistent-package");
    expect(result).toBeNull();
  });
});
