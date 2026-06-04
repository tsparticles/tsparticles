import { describe, it, expect } from "vitest";
import { listPackages } from "./listPackages.js";

describe("listPackages", () => {
  it("should return all packages when no filter", () => {
    const result = listPackages({});
    expect(result.packages.length).toBeGreaterThan(50);
    expect(result.categories.length).toBeGreaterThan(5);
  });

  it("should filter by category", () => {
    const result = listPackages({ category: "shape" });
    for (const pkg of result.packages) {
      expect(pkg.category).toBe("shape");
    }
  });

  it("should filter by text query", () => {
    const result = listPackages({ query: "absorbers" });
    expect(result.packages.length).toBeGreaterThanOrEqual(1);
    expect(result.packages.some(p => p.name.includes("absorbers"))).toBe(true);
  });

  it("should return all packages for unknown category", () => {
    const result = listPackages({ category: "nonexistent" });
    expect(result.packages.length).toBeGreaterThan(50);
  });

  it("should include categories listing", () => {
    const result = listPackages({});
    expect(result.categories).toContain("shape");
    expect(result.categories).toContain("plugin");
    expect(result.categories).toContain("bundle");
  });
});
