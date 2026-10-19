/* eslint-disable */
import { describe, expect, it } from "vitest";
import { lint, esLintCommand } from "../src/eslint.js";

describe("build-eslint", () => {
  it("should export lint function", () => {
    expect(typeof lint).toBe("function");
  });

  it("should export esLintCommand", () => {
    expect(esLintCommand).toBeDefined();
    expect(typeof esLintCommand.name).toBe("function");
  });
});
