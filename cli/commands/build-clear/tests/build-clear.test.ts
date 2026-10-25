/* eslint-disable */
import { describe, expect, it } from "vitest";
import { clearDist, clearCommand } from "../src/clear.js";

describe("build-clear", () => {
  it("should export clearDist function", () => {
    expect(typeof clearDist).toBe("function");
  });

  it("should export clearCommand", () => {
    expect(clearCommand).toBeDefined();
    expect(typeof clearCommand.name).toBe("function");
  });
});
