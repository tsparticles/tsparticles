/* eslint-disable */
import { describe, expect, it } from "vitest";
import { prettifySrc, prettierCommand } from "../src/prettier.js";

describe("build-prettier", () => {
  it("should export prettifySrc function", () => {
    expect(typeof prettifySrc).toBe("function");
  });

  it("should export prettierCommand", () => {
    expect(prettierCommand).toBeDefined();
    expect(typeof prettierCommand.name).toBe("function");
  });
});
