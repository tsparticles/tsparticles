import { describe, it, expect } from "vitest";
import {
  diagnoseIssuesArgsSchema,
  formatZodError,
  getPackageInfoArgsSchema,
  listPackagesArgsSchema,
  suggestPluginsArgsSchema,
} from "./validation.js";

describe("suggestPluginsArgsSchema", () => {
  it("accepts a plain options object", () => {
    const result = suggestPluginsArgsSchema.safeParse({ options: { particles: {} } });
    expect(result.success).toBe(true);
  });

  it("rejects missing options", () => {
    expect(suggestPluginsArgsSchema.safeParse({}).success).toBe(false);
  });

  it("rejects options provided as a string", () => {
    expect(suggestPluginsArgsSchema.safeParse({ options: "not an object" }).success).toBe(false);
  });

  it("rejects options provided as an array", () => {
    expect(suggestPluginsArgsSchema.safeParse({ options: [1, 2, 3] }).success).toBe(false);
  });

  it("rejects options provided as null", () => {
    expect(suggestPluginsArgsSchema.safeParse({ options: null }).success).toBe(false);
  });
});

describe("diagnoseIssuesArgsSchema", () => {
  it("accepts a plain options object", () => {
    expect(diagnoseIssuesArgsSchema.safeParse({ options: {} }).success).toBe(true);
  });

  it("rejects missing options", () => {
    expect(diagnoseIssuesArgsSchema.safeParse({}).success).toBe(false);
  });
});

describe("getPackageInfoArgsSchema", () => {
  it("accepts a non-empty package name", () => {
    expect(getPackageInfoArgsSchema.safeParse({ package: "@tsparticles/engine" }).success).toBe(true);
  });

  it("rejects an empty package name", () => {
    expect(getPackageInfoArgsSchema.safeParse({ package: "" }).success).toBe(false);
  });

  it("rejects a missing package field", () => {
    expect(getPackageInfoArgsSchema.safeParse({}).success).toBe(false);
  });

  it("rejects a non-string package field", () => {
    expect(getPackageInfoArgsSchema.safeParse({ package: 123 }).success).toBe(false);
  });
});

describe("listPackagesArgsSchema", () => {
  it("accepts no filters", () => {
    expect(listPackagesArgsSchema.safeParse({}).success).toBe(true);
  });

  it("accepts a known category", () => {
    expect(listPackagesArgsSchema.safeParse({ category: "shape" }).success).toBe(true);
  });

  it("rejects an unknown category", () => {
    expect(listPackagesArgsSchema.safeParse({ category: "not-a-category" }).success).toBe(false);
  });

  it("accepts a query string", () => {
    expect(listPackagesArgsSchema.safeParse({ query: "circle" }).success).toBe(true);
  });
});

describe("formatZodError", () => {
  it("produces a readable path: message summary", () => {
    const result = suggestPluginsArgsSchema.safeParse({});
    expect(result.success).toBe(false);
    if (!result.success) {
      const message = formatZodError(result.error);
      expect(message).toContain("options");
    }
  });
});
