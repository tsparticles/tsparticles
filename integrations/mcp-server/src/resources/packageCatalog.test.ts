import { describe, it, expect } from "vitest";
import { getPackageCatalogResource } from "./packageCatalog.js";

describe("getPackageCatalogResource", () => {
  it("should generate markdown with all categories", () => {
    const result = getPackageCatalogResource();
    expect(typeof result).toBe("string");
    expect(result.length).toBeGreaterThan(1000);
    expect(result).toContain("## Bundles");
    expect(result).toContain("## Plugins");
    expect(result).toContain("## Shapes");
  });

  it("should include package descriptions", () => {
    const result = getPackageCatalogResource();
    expect(result).toContain("@tsparticles/plugin-absorbers");
    expect(result).toContain("@tsparticles/shape-circle");
  });
});
