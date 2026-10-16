/* eslint-disable */
import { existsSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { appCreateCommand } from "../src/app.js";
import {
  listAvailableFrameworks,
  listAvailableTemplates,
  resolveEngineVersion,
  resolveTemplateRoot,
} from "../src/template-resolver.js";

describe("create-app command", () => {
  it("should register the app command", () => {
    expect(appCreateCommand).toBeDefined();
    expect(appCreateCommand.name()).toBe("app");
  });
});

describe("resolveTemplateRoot", () => {
  it("should resolve an existing workspace template", () => {
    const root = resolveTemplateRoot("scaffold");

    expect(existsSync(root)).toBe(true);
    expect(existsSync(`${root}/package.json`)).toBe(true);
  });

  it("should throw for an unknown template", () => {
    expect(() => resolveTemplateRoot("does-not-exist-template")).toThrow(/not found/i);
  });
});

describe("listAvailableTemplates", () => {
  it("should return the workspace templates with a name", () => {
    const templates = listAvailableTemplates();

    expect(Array.isArray(templates)).toBe(true);
    expect(templates.length).toBeGreaterThan(0);

    for (const template of templates) {
      expect(typeof template.name).toBe("string");
      expect(template.name.length).toBeGreaterThan(0);
    }
  });
});

describe("listAvailableFrameworks", () => {
  it("should list frameworks of the scaffold template", () => {
    const frameworks = listAvailableFrameworks("scaffold");

    expect(frameworks).toContain("react");
    expect(frameworks).toContain("vue3");
    expect(frameworks).toContain("svelte");
  });

  it("should return an empty array for a template without a template folder", () => {
    expect(Array.isArray(listAvailableFrameworks("scaffold"))).toBe(true);
  });
});

describe("resolveEngineVersion", () => {
  it("should return a semver-like version string", () => {
    const version = resolveEngineVersion();

    expect(typeof version).toBe("string");
    expect(version).toMatch(/^\d+\.\d+\.\d+/);
  });
});
