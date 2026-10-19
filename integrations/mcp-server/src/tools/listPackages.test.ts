import { describe, expect, it } from "vitest";
import { listPackages } from "./listPackages.js";

const MIN_CATALOG_PACKAGES = 50,
  MIN_CATALOG_CATEGORIES = 5,
  MIN_QUERY_RESULTS = 1;

describe("listPackages", () => {
  it("should return all packages when no filter", () => {
    const result = listPackages({});
    expect(result.packages.length).toBeGreaterThan(MIN_CATALOG_PACKAGES);
    expect(result.categories.length).toBeGreaterThan(MIN_CATALOG_CATEGORIES);
  });

  it("should filter by category", () => {
    const result = listPackages({ category: "shape" });
    for (const pkg of result.packages) {
      expect(pkg.category).toBe("shape");
    }
  });

  it("should filter by text query", () => {
    const result = listPackages({ query: "absorbers" });
    expect(result.packages.length).toBeGreaterThanOrEqual(MIN_QUERY_RESULTS);
    expect(result.packages.some(p => p.name.includes("absorbers"))).toBe(true);
  });

  it("should return all packages for unknown category", () => {
    const result = listPackages({ category: "nonexistent" });
    expect(result.packages.length).toBeGreaterThan(MIN_CATALOG_PACKAGES);
  });

  it("should include categories listing", () => {
    const result = listPackages({});
    expect(result.categories).toContain("shape");
    expect(result.categories).toContain("plugin");
    expect(result.categories).toContain("bundle");
  });
});
